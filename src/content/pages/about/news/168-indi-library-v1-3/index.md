---
title: "INDI Library v1.3"
description: "INDI Development team is happy to announce the release of INDI Library v1.3.0 on Oct."
date: "2015-02-16"
author: "Jasem Mutlaq"
legacyId: 168
---

![Ekos Alignment](./ekos_capture.webp)

INDI Development team is happy to announce the release of INDI Library v1.3.0 on Oct. 30th, 2016. Following are the highlights of this release:

From 1.2.0 to 1.3.0

-   Support for Shelyak eShel spectrograph.
-   Support for NStep focuser.
-   Support for ASI Filter Wheel.
-   Support for OneStep Telescope Controller.
-   Support for Moravian CCD driver.
-   Support for GigE machine vision cameras.
-   Experimental SSAG CCD driver.
-   Adding support for fast BLOB with ENCLEN. With Fast blob mode enabled, blob performance is now significantly faster.
-   FITS Min/Max calculations are disabled by default to save processing time unless explicitly enabled by the user at compile time.
-   Qt5 based client class is added to enable multiplatform client development.
-   New significantly faster base64 encoding/decoding routines.
-   Selectable alignment modes for INDI EQMod that includes built-in EQMod alignment and INDI Alignment Subsystem.
-   CCD sequence queue number is no longer limited to 999.
-   More Starlight Xpress CCDs cameras supported.
-   Updated Starlight Xpress Adaptive Optics driver.
-   Updated Temma Takahashi mount driver.
-   Updated Apogee CCD driver.
-   Updated QHY CCD driver with numerous fixes.
-   Updated FLI CCD driver.
-   Updated Pulasr2 driver.
-   Updated ASI CCD with support for arm64 architecture, 1600 model and a lot more.
-   Significant improvements to GPhoto driver including better support for Nikon DSLRs.
-   Improved GPSd driver.
-   New CCD_FILE_PATH property to indicate remote file path.
-   New TELESCOPE_PIER_SIDE property.
-   Dome & Telescope Scripting Gateway added.
-   Added support for servos in Indiduino
-   Fix BuiltinMathPlugin crash for Southern Hemisphere
-   Add scope park aware feature to the rolloff roof simulator
-   INDI Logs are now stored under ~/.indi/logs and arranged by date and time per driver.

[Source](/download/source.html) and [Ubuntu packages](/download.html) are available for download.
