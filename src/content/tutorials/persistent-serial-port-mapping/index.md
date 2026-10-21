---
title: "Persistent serial port mapping"
description: "Give serial and USB devices fixed names so they keep the same port."
topic: setup
author: "Jasem Mutlaq"
legacyUrl: "/support/tutorials/157-persistent-serial-port-mapping.html"
legacyId: 157
---

Numerous astronomical devices still communicate with the venerable RS232 standard despite the wide adoption of Universal Serial Bus (USB) protocol. Since modern PCs/SBCs no longer support connecting to RS232 via the traditional DB9/DB25 connectors, USB serial adapters are often used to pass the RS232 data to the host via a USB stream.

On Linux, USB serial devices are created incrementally on the `/dev` file system and often appear as `/dev/ttyUSB0`, `/dev/ttyUSB1`, ...etc.

This device port is needed in many INDI drivers in order to communicate with the device, but the problem is that the device designations are not persistent. If you reboot the device or unplug/replug the USB device, you are very likely to end up with a different device designation under `/dev`. When you attempt to connect to the device again, you'd be surprised as why INDI is having trouble connecting to it, only to realize that the port mapping changes. This situation is indeed quite frustrating and completely unacceptable especially when operating remote automated observatories. Wouldn't be nice if we can have /dev/mount and /dev/focuser _all the time_?!

Linux offers a method to make persistent port mappings across reboots and disconnections! It's called **udev** and it is a device manager for the Linux kernel. When you connect your serial device, _udev_ creates a device node in `/dev`. To overwrite its behavior, we need to write a udev rules file to have persistent names for our devices.

All USB devices have a _Vendor ID and a Product ID_. Running _lsusb_ in Ikarus Observatory's Odroid, I get the following:

```text
Bus 006 Device 002: ID 0bda:8153 Realtek Semiconductor Corp.
Bus 006 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 005 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 002: ID 05e3:0616 Genesys Logic, Inc.
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 054: ID 1a40:0101 Terminus Technology Inc. 4-Port HUB
Bus 003 Device 053: ID 1a40:0101 Terminus Technology Inc. 4-Port HUB
Bus 003 Device 075: ID 1278:0507 Starlight Xpress Lodestar autoguider
Bus 003 Device 052: ID 1a40:0101 Terminus Technology Inc. 4-Port HUB
Bus 003 Device 057: ID 10c4:ea60 Cygnal Integrated Products, Inc. CP210x UART Bridge / myAVR mySmartUSB light
Bus 003 Device 060: ID 0403:6001 Future Technology Devices International, Ltd FT232 USB-Serial (UART) IC
Bus 003 Device 056: ID 1a40:0101 Terminus Technology Inc. 4-Port HUB
Bus 003 Device 059: ID 0403:6001 Future Technology Devices International, Ltd FT232 USB-Serial (UART) IC
Bus 003 Device 055: ID 1a40:0101 Terminus Technology Inc. 4-Port HUB
Bus 003 Device 051: ID 05e3:0610 Genesys Logic, Inc. 4-port hub
Bus 003 Device 050: ID 05e3:0610 Genesys Logic, Inc. 4-port hub
Bus 003 Device 049: ID 05e3:0610 Genesys Logic, Inc. 4-port hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 002 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

Most serial devices seem to use the FTDI FT232 as seen above which has a Vendor ID (VID) of 0x0403 and Product ID (PID) of 0x6001, so we can't distinguish among the devices alone by the VIDs and PIDs. How can we tell _which is which_? Fortunately, to uniquely differentiate USB devices, we can use **Serial** identifier. Of course, if you have multiple Serial-To-USB adapters that have different VID:PID combinations, then there is _no need_ for a **Serial** identifier, it is only needed if you have multiple adapters from the same manufacturer which is often the case.

To find out the serial ID, run the following command against the device node. For example, the find the serial id of the device connected to _/dev/ttyUSB0_:

```shell
udevadm info -a -n /dev/ttyUSB0 | grep '{serial}' | head -n1
```

In my case, I got the following:

```text
ATTRS{serial}=="A8YNLO6X"
```

To get all the serial numbers, it is recommended to connect each device by itself i.e. no other device are connected, and then run the above command to obtain the serial number, along with the VID:PID. In Ikarus Observatory, the following devices are connected via USB Serial connectors:

-   EQMod Mount
-   MoonLite Focuser
-   Flip-Flat
-   Vantage Vue Weather Console

Vantage Vue INDI driver already installs a udev rules file that creates a symlink at _/dev/vantage_. For the rest of the devices, I created a file in _/lib/udev/rules.d/99-observatory.rules:_

```text
# MoonLite Focuser
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", ATTRS{serial}=="A501T0P9", MODE="0666", SYMLINK+="focuser"

# Flip Flat
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", ATTRS{serial}=="A8YNLO6X", MODE="0666", SYMLINK+="remotecap"

# EQMod Mount
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", ATTRS{serial}=="FTG8H6RX", MODE="0666", SYMLINK+="mount"
```

Therefore, when the mount is plugged, the device symlink _/dev/mount_ is created and remains consistent across reboots. After saving the rules file, it is recommended to reboot the device/PC so that the udev rules take effect.
