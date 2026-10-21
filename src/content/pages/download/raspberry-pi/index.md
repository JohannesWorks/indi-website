---
title: "Install INDI on Raspberry Pi"
description: "INDI packages for Raspberry Pi OS and Debian Trixie (arm64) from the Astroberry repository."
order: 2
system: "Raspberry Pi"
---

## Stable Release

You can install INDI core & INDI 3rd party drivers on Raspberry Pi OS / Debian Trixie (arm64). If you plan to use KStars as your INDI client, then it is recommended to install the [KStars Flatpak](https://kstars.kde.org/download/linux/), which is available for all Linux distributions. The Flatpak already includes INDI core and INDI 3rd party drivers. If you do not want to install KStars, then you can install INDI directly using the following commands:

```shell
curl -fsSL https://astroberry.io/debian/astroberry.asc | sudo gpg --dearmor -o /etc/apt/keyrings/astroberry.gpg
curl -fsSL https://astroberry.io/debian/astroberry.sources | sudo tee /etc/apt/sources.list.d/astroberry.sources
sudo apt update
```

After update is complete, you can install INDI and optionally Ekos:

1.  To Install INDI Library including **all** 3rd party drivers:

    ```shell
    sudo apt install indi-3rdparty-drivers gsc
    ```

2.  To install latest Ekos:

    ```shell
    sudo apt install indi-3rdparty-drivers kstars-bleeding
    ```

3.  To install **only** INDI Library with basic drivers:

    ```shell
    sudo apt install libindi1 indi-bin
    ```

## Common Errors

If you receive an error about some package trying to overwrite another, try this:

```shell
sudo apt-get -o Dpkg::Options::="--force-overwrite" -f install
```
