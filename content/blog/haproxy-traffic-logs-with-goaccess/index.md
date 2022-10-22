---
title: HAProxy Traffic Logs with GoAccess
description: ""
publishdate: 2022-10-22
modified: 2022-10-22
categories: blog
tags: [lxd]
---

<div class="p-summary">
  <a href="https://www.haproxy.org/">HAProxy</a> is essentially the entry-point
for most of the services I run. Its logs are sent to a central rsyslog
container on a volume that's accessible by the <a
href="https://goaccess.io/">GoAccess</a> container for parsing. I found most of
the <a href="https://serverfault.com/a/765247">configs here</a>.
</div>
<!--more-->

<figure>
  <figcaption>Architecture</figcaption>
  <a href="/images/haproxy-traffic-logs-with-goaccess/haproxy-logs.png"><img src="/images/haproxy-traffic-logs-with-goaccess/haproxy-logs.png" /></a>
</figure>

<figure>
  <figcaption>/etc/haproxy.conf:</figcaption>

{{< highlight bash >}}
global
    log         /dev/log local2 # Log to local syslog, which sends a copy to a
                                # remote rsyslog container.
    [...]

frontend main
    [...]
    capture request header Referer len 128
    capture request header User-Agent len 128

    log-format %si:%sp\ %ci\ [%t]\ \"%r\"\ %ST\ %B\ "%hr"
    # %si - your server ip - very useful if you have multiple application
    # %sp - your server port
    # %ci - user ip
    # %t  - datetime in haproxy format
    # %r  - request
    # %ST - status code
    # %B  - data reponse length
    # %hr - captured headers separated by "|" (Referer|User-Agent)
    [...]
{{< / highlight >}}
</figure>

<figure>
  <figcaption>rsyslog.conf</figcaption>

{{< highlight bash >}}
# Send haproxy logs to its own file
local2.*    -/var/opt/log/haproxy/haproxy.log

# Receive messages from remote host via UDP
module(load="imudp")
input(
        type="imudp"
        port="514"
)
{{< / highlight >}}
</figure>

<figure>
  <figcaption>/etc/goaccess.conf:</figcaption>

{{< highlight bash >}}
time-format %H:%M:%S

date-format %d/%b/%Y

log-format %^ %^ %^ %^ %h [%d:%t.%^] "%r" %s %b "{%R|%u}"

# %^ - skipped token
# %h - user ip
# %d - date-format
# %t - time-format
# %r - request e.g. GET /something
# %s - server status code
# %b - data response length
# %R - referer - very important if you want to know where your users come from
# %u - user agent

# There is so many skipped tokens because my haproxy put some extra information in every line or rsyslog(?)
# Sample line:
#
# Mar 22 09:09:06 server haproxy[PID]: 10.60.10.50:80 1.2.3.4 [22/Mar/2016:09:08:56.989] "POST /UIDL/?v-uiId=0 HTTP/1.1" 200 334 "{https://www.referer.com/|Mozilla/5.0 (Linux; Android 4.4.4; GT-I9060I Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Saf}"
{{< / highlight >}}
</figure>

Now I can look at all crawler traffic from the terminal. Yay.

<figure>
  <figcaption>GoAccess Screenshot</figcaption>
  <a href="/images/haproxy-traffic-logs-with-goaccess/goaccess.png"><img src="/images/haproxy-traffic-logs-with-goaccess/goaccess.png" /></a>
</figure>

I might enable the web version at a later date. Still undecided at the moment.
