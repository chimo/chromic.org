---
title: LXD Backup Strategy
description: ""
publishdate: 2022-10-01
modified: 2022-10-18
categories: blog
tags: [lxd]
---

<div class="p-summary">
  This post describes the way I handle backups with LXD. Nothing too fancy or
  complicated. Should be good-enough for a hobby. Time will tell.
</div>
<!--more-->

<h2>Preamble</h2>

Unsurprisingly, most of my containers are hosting applications. I also have two
containers running databases: postgres and mariadb. I am planning on migrating
gitea to postgres since it's the only thing left using mariadb, but I digress.

I opted to spin-up dedicated containers to host databases as opposed to "one db
container per app container" to save on resources (I have fairly limited memory
available).

The distinction between "application" and "database" containers plays a role in
the backup strategy below.

<h2>Local Backups</h2>

LXD has native snapshot management, which makes it very easy to get started.
You can setup snapshot schedules and expiry at the container-level, or the
profile-level (among other things).

Up until now, I had been using the same "default" profile for all of my
containers but since I wanted different snapshot schedules/retentions for
database-like containers compared to application-type containers, I ended up
copying the "default" profile to a new one called "data-node". The only
difference between the two so far are snapshot schedules/retentions:

<ul>
  <li>
    "application-nodes" are backed-up weekly, and each snapshot is kept for
    seven weeks.
  </li>
  <li>
    "data-nodes" are backed-up daily, and each snapshot is kept for seven days.
  </li>
</ul>

The idea being that data changes often, hence backed-up more often.
Applications are more "stable", or static, so are backed-up less frequently.
Plus, you can usually re-build/reconfigure applications without losing anything
(except your time, I suppose).

The lxc commands I used to achieve this are:
{{< highlight bash >}}
# Default nodes: weekly backups, on Fridays at 10pm, kept for 7 weeks
lxc profile set default snapshots.schedule='0 22 * * 5'
lxc profile set default snapshots.expiry='7w'
lxc profile set default snapshots.pattern='snapshot-{{creation_date.Format("20060102")}}-%d'

# Data nodes: daily backups, at 10pm, kept for 7 days
lxc profile copy default data-node
lxc profile set data-node snapshots.schedule='0 22 * * *'
lxc profile set data-node snapshots.expiry='7d'
{{< / highlight >}}


<h2>Off-site Backups</h2>

LXD also has the ability to communicate with other remote LXD instances. I'm
running LXD at home as well, so copying containers from the VPS to the home
instance for off-site backups is easily done with a couple of commands.

1. Setup remote LXD:

{{< highlight bash >}}
lxc remote add home-instance https://home-instance.example.org:8443 \
    --protocol lxd --auth-type tls
{{< / highlight >}}

2. Copy containers over:

{{< highlight bash >}}
lxc copy container1 home-instance:backup-container1 --refresh --mode push
{{< / highlight >}}

I have a bash script in a cron job that iterates through the running containers
and copies the VPS containers back home once a month:

{{< highlight bash >}}
#!/bin/bash

lxc storage volume copy default/certs home-instance:default/certs --refresh \
    --mode push \
    --volume-only

mapfile -t containers < <(lxc list status=running -c n --format csv)

for container in "${containers[@]}"
do
    lxc copy "${container}" home-instance:backup-"${container}" --refresh \
        --mode push \
        --instance-only
done
{{< / highlight >}}

This is all subject to change, of course. One thing I want to look into and
leverage more in general are volumes, for example.

