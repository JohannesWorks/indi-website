---
title: "Install INDI on Fedora"
description: "INDI, third party drivers and KStars from Copr, for Fedora 31 and later."
order: 3
system: "Fedora"
---

Latest INDI Library, 3rdparty drivers and KStars are available for **Fedora 31** and later.

The files are available in the Fedora Copr build system, located here: [https://copr.fedorainfracloud.org/coprs/xsnrg/](https://copr.fedorainfracloud.org/coprs/xsnrg/)

To enable the "bleeding" repositories for the latest builds from git, perform the following:

```shell
sudo dnf copr enable xsnrg/kstars-bleeding
sudo dnf copr enable xsnrg/stellarsolver-bleeding
sudo dnf copr enable xsnrg/libindi-bleeding
sudo dnf copr enable xsnrg/indi-3rdparty-bleeding
sudo dnf copr enable xsnrg/ekosdebugger
```

You should now have all the Copr repositories set up. The below commands are no different than if you were installing any rpm packages from any other repo.

If you only want to install the INDI library with basic drivers, type

```shell
sudo dnf install indi indi-libs
```

To install the 3rd party drivers you want (eqmod for example), just type

```shell
sudo dnf install indi-eqmod
```

To install **all** INDI drivers, use wildcard and type

```shell
sudo dnf install indi-*
```

Bleeding edge KStars can be installed using

```shell
sudo dnf install kstars
```

If for any reason you are not getting the new versions, please uninstall any old versions, and then add \`--refresh\` to the dnf command. example:

```shell
sudo dnf install kstars --refresh
```
