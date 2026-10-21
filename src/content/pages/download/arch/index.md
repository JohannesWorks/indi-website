---
title: "Install INDI on Arch Linux"
description: "INDI for Arch Linux and derivatives like Manjaro."
order: 4
system: "Arch Linux"
---

You can install INDI core & INDI 3rd party drivers on Arch Linux & Derivatives like Manjaro & Antergos. If you plan to use KStars as your INDI client, then it is recommended to install the [KStars Flatpak](https://kstars.kde.org/download/linux/), which is available for all Linux distributions. The Flatpak already includes INDI core and INDI 3rd party drivers. If you do not want to install KStars, then you can install INDI directly on Arch using the following commands:

## 1\. Install INDI & KStars

`sudo pacman -Syu`
`sudo pacman -S --needed kstars breeze-icons yaourt binutils patch cmake make libraw libindi gpsd gcc`
`yaourt -Sya --noconfirm libindi_3rdparty`

## 2\. Astrometry.net

`yaourt -Sya sextractor-bin`
`yaourt -Sya astrometry.net`

Determine what Index files you require and then download them. Or you can use KStars to download them for you.

wget [broiler.astrometry.net/~dstn/4100/index-4107.fits](http://broiler.astrometry.net//~dstn/4100/index-4107.fits)
wget [broiler.astrometry.net/~dstn/4100/index-4108.fits](http://broiler.astrometry.net//~dstn/4100/index-4108.fits)
wget [broiler.astrometry.net/~dstn/4100/index-4109.fits](http://broiler.astrometry.net//~dstn/4100/index-4109.fits)
sudo mv index-410\[789\].fits /usr/share/astrometry/data
