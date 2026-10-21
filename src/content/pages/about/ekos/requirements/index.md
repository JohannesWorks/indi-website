---
title: "Requirements"
description: "Ekos can run on PCs, laptops, and embedded computers."
order: 1
---

Ekos can run on PCs, laptops, and embedded computers. It is a complete astrophotography package with very few external dependencies. Before talking about the requirements, it is important to distinguish between Ekos and INDI:

-   **Ekos**: Ekos is the **frontend** GUI astrophtogoraphy tool that is shipped as part of KStars. It performs capture, focusing, guiding, and scheduling. Ekos depends on INDI for device control.
-   **INDI**: INDI is the **backend** server used to communicate with and control astronomical devices.

Ekos & INDI can work on the same computer, but thanks to the network capabilities of INDI, this is not strictly necessary. Ekos can communicate with one or more **remote** INDI servers without requiring any additional software. Remote control is built into INDI.

## Software Requirements

-   Linux, Windows 10 64bit, or Mac OS 10.4 or higher.
-   INDI is used to control devices and is currently fully supported in Linux, and partially supported under Mac OS. INDI is not officially supported under Windows but you can use [ASCOM to INDI bridge](http://www.cloudmakers.eu/windi/) to communicate with your devices on Windows. It is highly recommended to run INDI in an embedded Linux computer (e.g. Raspberry PI) and connect to it remote from Ekos. Therefore, Ekos can run on multiple operating systems, but it is recommended to run INDI on an embedded single board computer.
-   If you want to use offline astrometry.net solver, then you need astrometry.net >= v0.67

## Hardware Requirements

-   A [CCD](https://drivers.indilib.org/cameras) or DSLR is minimally required to operate Ekos.
-   **Focus Module:** Relative or Absolute INDI [Focuser](https://drivers.indilib.org/focusers). Focus Module can be operated in manual mode if the focuser is not available.
-   **Guide Module:** CCD + [Telescope](https://drivers.indilib.org/mounts) with Autoguider port. The guiding pulses can be sent via any ST4 compatible device.
-   **Alignment Module:** CCD + Telescope that supports Slew & Sync commands.

 Check out [Ekos Raspberry PI complete setup tutorial](/tutorials/ekos-on-raspberry-pi.html) for more details on running Ekos & INDI under Raspberry
