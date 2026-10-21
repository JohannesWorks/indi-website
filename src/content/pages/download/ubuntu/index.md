---
title: "Install INDI on Ubuntu"
description: "INDI and all third party drivers from the INDI PPA, for Ubuntu 22.04 and later."
order: 1
system: "Ubuntu"
---

## Stable Release

You can install INDI core & INDI 3rd party drivers on Ubuntu 22.04+. If you plan to use KStars as your INDI client, then it is recommended to install the [KStars Flatpak](https://kstars.kde.org/download/linux/), which is available for all Linux distributions. The Flatpak already includes INDI core and INDI 3rd party drivers. If you do not want to install KStars, then you can install INDI directly on Ubuntu using the following commands:

```shell
sudo apt-add-repository ppa:mutlaqja/ppa
sudo apt-get update
```

After the update is complete, you can install INDI and optionally Ekos:

1- To install the INDI Library, including **all** 3rd party drivers:

```text
Ubuntu 22.04-24.04:     sudo apt-get install indi-full gsc
Ubuntu 26.04 +:         sudo apt-get install indi-3rdparty-drivers gsc
```

2- To install the latest KStars(Ekos):

```text
Ubuntu 22.04-24.04:     sudo apt-get install indi-full kstars-bleeding
Ubuntu 26.04 +:         sudo apt-get install kstars-bleeding
```

3- To install **_only_** the INDI Library with basic drivers:

```text
All versions:           sudo apt-get install libindi1 indi-bin
```

## Common Errors

If you receive an error about some package trying to overwrite another, try this:

```shell
sudo apt-get -o Dpkg::Options::="--force-overwrite" -f install
```
