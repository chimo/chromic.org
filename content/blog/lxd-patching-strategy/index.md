---
title: LXD Patching Strategy
description: ""
publishdate: 2022-10-02
categories: blog
tags: [lxd]
---

<div class="p-summary">
  This post describes the way I handle patching with LXD. Nothing too fancy or
  complicated. Should be good-enough for a hobby. Time will tell.
</div>
<!--more-->

(yes, yes. I re-used the introduction paragraph from the <a
href="/blog/lxd-backup-strategy/">previous post</a>. I'm
lazy).

There's not much to say except I use the script at the end of this post  in a
weekly cronjob.

For every running container, it does the following:

1. Checks which Operating System we're dealing with (supports Debian and Alpine
at the moment)
1. Takes a snapshot of the container
1. Runs the appropriate package-manager command to update the system

{{< highlight bash >}}
#!/bin/bash

function apk() {
    local container="${1}"
    local cmd="apk update && apk upgrade"

    upgrade "${container}" "${cmd}"
}

function apt() {
    local container="${1}"
    local cmd="apt update && apt upgrade -y"

    upgrade "${container}" "${cmd}"
}

function upgrade() {
    local container="${1}"
    local cmd="${2}"

    # Take a snapshot
    echo "Snapshotting ${container}"
    lxc snapshot "${name}" "pre-patch-$(date +%Y%m%d)"

    local ret=$?
    if [ $ret -ne 0 ]; then
        echo "${container} failed to snapshot. Skipping upgrade..."
        return
    fi

    # Upgrade
    echo "Upgrading ${container}..."
    lxc exec "${container}" -- sh -c "${cmd}"

    local status=$?
    if [ "${status}" -ne 0 ]; then
        echo "Upgrade failed"
    fi
}

# array of containers and os
mapfile -t containers < <(lxc list status=running -c n,config:image.os --format csv)

for container in "${containers[@]}"
do
    # Split string into array
    # https://stackoverflow.com/a/45201229
    readarray -td, arr <<< "${container},"
    unset 'arr[-1]'

    name="${arr[0]}"
    os="${arr[1]}"

    case "${os}" in
        "Alpine")
            apk "${name}"
            ;;
        "Debian")
            apt "${name}"
            ;;
        *)
            echo "Unknown OS: ${os}"
            ;;
    esac

    lxc restart "${name}"
done
{{< / highlight >}}

