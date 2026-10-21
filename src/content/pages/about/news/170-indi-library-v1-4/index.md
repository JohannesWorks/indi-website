---
title: "INDI Library v1.4.1"
description: "INDI development team is happy to announce the release of INDI Library v1.4.1 on Feburary 27th, 2017."
date: "2017-02-27"
author: "Jasem Mutlaq"
legacyId: 170
---

INDI development team is happy to announce the release of INDI Library v1.4.1 on Feburary 27th, 2017. This new exciting release builds on the maturity of INDI Library and comes with many new supported devices and fixes for existing drivers. Several improvements and enhancements are included in this release including native support for Cygwin and MacOS platforms in addition to Linux, BSD, and Windows (Client only).

The following is the change log for the release:

-   Support for HitecAstro DC Focuser.
-   Support for SQL-LE Sky Quality Meter unit.
-   Support for USB Focus V3.
-   Support for Quantum Filter Wheel.
-   Support for 10micron mounts.
-   ZWO ASI filter wheel support. Driver updated to latest SDK. Fix infinite loop exposure.
-   QHY driver updated to latest SDK.
-   Added preliminary support to TCP server connection for all mounts.
-   Updated and improved Nexstar Evo driver.
-   Fixed reset of filter wheel names to default values under some circumstances
-   Fixed feedback loop issue in chained INDI server.
-   Handle correctly broken frames in FLI driver; convert time left from ms to seconds as it should be.
-   V4L2 CCD driver updated to properly work with DMK cameras.
-   Several bugfixes for Moravian CCD driver.
-   CCD Simulator allows for up to 4096x4096 resolution.
-   Raw color video streaming now uses RGB24 instead of RGBA to conserve bandwidth.
-   New Dome and Mount safety interlocks mechanism.
-   Fix the Virtuoso mount detection in SkyWatcherMountAPI driver.
-   Support relative driver paths to INDI server.
-   Fix property cache collision conflict in case of multiple devices per driver.
-   Moonlite driver can now sync to any value instead of reset to zero.
-   Store OBJECTRA and OBJECTDEC as sexigesimal strings.
-   New Axis Lock feature to limit joystick to specific motion axis.
-   INDI server now reaps zombie processes as they appear.
-   EQMod support for AUX encoder values. ST4 Guide Rates settings. PPEC Switches.
-   Fix for TELESCOPE_PIER_SIDE implementation in EQMod driver.
-   Several fixes for Pulsar2 driver.
-   Fix SER file generation for color frames. Added timestamps for each recorded frame. Support subframed video streams.
-   Debug and Logging options can be saved in the config file.
-   New CCD_TRANSFER_FORMAT property.
-   libindi can now be compiled under MacOS and Cygwin. Non-Linux specific 3rd party drivers are also supported under MacOS and Cygwin.
-   When a request for snooped is sent, it is echoed to drivers so that they send the snopped value immediately if it exists.
-   libindi shared library (libindi.so) is _dropped_. libindi now offsers indidriver (shared), indiclient (static), and indiclientqt5 (static) libraries.
-   Legacy drivers removed: SkyCommander, Intelliscope, MagellanI, TruTech, SBIG STV
