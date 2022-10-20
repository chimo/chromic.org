---
title: Switching LXD Storage Pools
description: ""
publishdate: 2022-10-19
modified: 2022-10-19
categories: blog
tags: [lxd]
---

<div class="p-summary">
  Short post so I remember how I moved my containers from a <a
  href="https://linuxcontainers.org/lxd/docs/master/reference/storage_dir/">"dir"
  storage pool</a> to <a
  href="https://linuxcontainers.org/lxd/docs/master/reference/storage_btrfs/">btrfs</a>.
</div>
<!--more-->

I found the <a
href="https://discuss.linuxcontainers.org/t/change-storage-size-and-driver/6097/2">answer
here</a>. Turns out it's pretty simple. I have about 27 containers at the
moment, which isn't a huge lot, but enough that I didn't want to run these
commands manually for every container. I ended up using the following script to
migrate my running containers to the new storage pool:

{{< highlight bash >}}
#!/bin/bash

mapfile -t containers < <(lxc list status=running -c n --format csv)

for container in "${containers[@]}"
do
    echo "Stopping ${container}..."
    lxc stop "${container}"

    echo "Renaming ${container}..."
    lxc move "${container}" "${container}"-tobemoved

    echo "Moving ${container}..."
    lxc move "${container}"-tobemoved "${container}" --storage=btrfs_pool

    echo "Starting ${container}..."
    lxc start "${container}"
done
{{< / highlight >}}

