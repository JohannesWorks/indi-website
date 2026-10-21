---
title: "Install INDI on Gentoo"
description: "INDI and drivers from the Gentoo overlay."
order: 6
system: "Gentoo"
---

```shell
0. Login as root or use sudo.

1. Install `app-eselect/eselect-repository` to manage overlays if don't have this tool already.

emerge -v app-eselect/eselect-repository

2. Add `hamari` overlay. See https://wiki.gentoo.org/wiki/Eselect/Repository for details.

eselect repository add hamari
emerge --sync hamari

3. To install all available indilib drivers simply use provided portage set:

emerge -v @indilib-drivers

4. If you want to install only drivers for the devices you use (as is the Gentoo way), you have to set appropriate USE flags: Available USE flags (note that only 3rd party drivers are present. All other drivers are installed by `sci-libs/indilib` itself):

aagcloudwatcherng
ahpxc
aok
apogee
armadillo
astrolink4
astromechfoc
asi
asipower
atik
avalon
beefocus
bresserexos2
celestronaux
dreamfocuser
dsi
duino
eqmod
ffmv
fishcamp
fli
gige
gphoto2
gpsd
gpsnmea
inovaplx
limesdr
maxdomeii
mgen
mi
nexdome
nightscape
orion-ssg3
pentax
playerone
qhy
qsi
rtklib
sbig
shelyak
spectracyber
starbook
starbookten
sv305
sx
talon6
toupbase
webcam

Place your desired USE flags in dedicated file, e.g. `/etc/portage/package.use/indilib`.

# Enable drivers USE flag which pulls sci-libs/indilib-drivers as dependency
sci-libs/indilib drivers

To install `indi_gphoto_ccd`, `indi_qhy_ccd` and `indi_sbig_ccd` write the following into the file.
sci-libs/indilib-drivers gphoto2 qhy sbig

Alternativly, you may place your USE flags globally in `/etc/portage/make.conf`.

5. Install the drivers emerge sci-libs/indilib::hamari
6. Note that ebuilds for stable release of indilib drivers (currently 1.9.3) are keyworded unstable (~amd64, ~x86 specifically) and live source ebuilds are all masked by `package.mask`. You will have to unmask them during installation (use `emerge with --autounmask-write` option). See official docs if you do not know this means exactly.
```
