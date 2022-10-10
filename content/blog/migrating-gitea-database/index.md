---
title: "Migrating Gitea's Database from MariaDB to PostgreSQL" 
description: ""
publishdate: 2022-10-03
categories: blog
tags: [gitea, mariadb, postgresql]
---

<div class="p-summary">
  I don't have anything against MariaDB, and had no problems with it being the
  database for Gitea. Everything else I have runs on PostgreSQL though so I
  figured I'd migrate Gitea over to PostgreSQL and be able to free-up some
  resources by getting rid of the MariaDB container I had running.
</div>
<!--more-->

The <a
href="https://docs.gitea.io/en-us/backup-and-restore/#backup-command-dump">`gitea
dump`</a> command can supposedly create an SQL dump for a different target
engine than it's running (ex: from a MariaDB Gitea instance to a PostgreSQL
dump). However, <a href="https://github.com/go-gitea/gitea/issues/6090">this is
broken</a>: "Postgres expects 't' or 'f' for boolean values or requires an
explicit cast". The issue is closed as "stale", but that's the error I got.


The <a
href="https://github.com/go-gitea/gitea/issues/5651#issuecomment-661953408">comments
on another issue</a> mention some success using <a
href="https://pgloader.io/">pgloader</a> instead.

The idea is:

1. Install a new Gitea instance backed by PostgreSQL so it creates the
necessary tables
1. Use pgloader to copy only the data (no tables, etc.) from MariaDB to
PostgreSQL

Simple, right? Well, kind of but not really.

My "load" file looked like this:

{{< highlight bash >}}
load database from
    mysql://gitea:$PASSWORD@mariadb.lxc.chromic.org:3306/gitea into
    postgresql://gitea@postgres.lxc.chromic.org:5432/gitea
 with data only
{{< /highlight >}}

For me, pgloader failed with "<a
href="https://github.com/dimitri/pgloader/issues/1183">pgloader 10 fell through
ECASE expression</a>". A workaround someone mentions in the thread is to edit
PostgreSQL's pg_hba.conf file so that the PostgreSQL user pgloader is
temporarily using "trusted" login method and thus doesn't need a password to
connect (don't do this if your database is, for whatever reason, accessible
from the public internet...):

{{< highlight bash >}}
# Original:
# host    gitea           gitea           10.0.3.234/32           md5
# Temporary:
host    gitea           gitea           10.0.3.234/32           trusted {{< /
highlight >}}

This seemed to fix the issue, however I ran into another error: "failed to find
schema 'gitea' in target catalog"

I found a workaround/solution to this in a random <a
href="https://github.com/dimitri/pgloader/issues/529#issuecomment-346727505">pgloader
Github issue</a>. Append the following ALTER SCHEMA 'gitea' RENAME TO 'public';

{{< highlight bash >}}
load database from
    mysql://gitea:$PASSWORD@mariadb.lxc.chromic.org:3306/gitea into
    postgresql://gitea@postgres.lxc.chromic.org:5432/gitea
 with data only
 ALTER SCHEMA 'gitea' RENAME TO 'public';
{{< / highlight >}}

pgloader then finally started creating tables and inserting things.

Now because my Gitea instance is <a
href="https://chromic.org/blog/gitea-drone-hugo/">a few years old</a> and went
through a several upgrades, there was a column present in one of my tables
(don't remember which) that didn't exist in the new Gitea install (something
about "old_id" or some such).

What I ended up doing was:

1. Dump a copy of the current MariaDB Gitea database: `mysqldump gitea > gitea_tmp.sql`
1. Create a temporary database: `CREATE DATABASE gitea_tmp CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';`
1. Grant permissions to the current gitea user: `GRANT ALL PRIVILEGES ON gitea_tmp.* TO 'gitea';`
1. Load data in the temporary MariaDB databse: `mysql -u gitea -p gitea_tmp < gitea_tmp.sql`
1. Drop the offending column from the temporary database: `ALTER TABLE table_name DROP COLUMN column_name;`

Try pgloader with the temporary database:

{{< highlight bash >}}
load database from
    mysql://gitea:$PASSWORD@mariadb.lxc.chromic.org:3306/gitea_tmp into
    postgresql://gitea@postgres.lxc.chromic.org:5432/gitea
 with data only
 ALTER SCHEMA 'gitea_tmp' RENAME TO 'public';
{{< / highlight >}}

Another thing that was wrong with my running database is the fact that I
somehow had NULL values in a "NOT NULL" column ("user.keep_activity_private")
so filled those in:

`UPDATE user SET keep_activity_private=1;`

And... <a href="https://code.chromic.org">Success</a>!

