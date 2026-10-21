---
title: "INDI Library v1.0.0"
description: "INDI Development team is happy to announce the release of INDI Library v1.0.0 on Feb 15th, 2015."
date: "2015-02-16"
author: "Jasem Mutlaq"
legacyId: 149
---

![Ekos Alignment](./ekos_capture.webp)

INDI Development team is happy to announce the release of INDI Library v1.0.0 on Feb 15th, 2015. Following are the highlights of this release:

-   3rdparty: Support for QHY CCDs and CFWs (BETA).
-   3rdparty: Support for Meade DSI (BETA).
-   3rdparty: Support for FFMV cameras.
-   Support for STAR2000.
-   Support for Baader dome.
-   Support for Baader SteelDrive focuser.
-   Support for dome slaving (BETA).
-   Subframing and debayer support in GPhoto driver.
-   Improved CFW handling and external tracking CCD for SBIG CCDs.
-   Add debayer support for color cameras with user-configurable options.
Debayer is performed at the client level.-   Fixed deinterlacing and subframing support in Starlight Xpress drivers.
-   Fixed issues with joystick support in some drivers.
Added joystick support to focuser and filter wheels.-   Improvements in generation of FITS header.
-   Improvement in performance of some drivers under SBCs like Raspberry PI.
-   Added fan and readout speed controls to QSI CCD.
-   Fixed locale issue in INDI driver.
-   Fixed regression in LX200Basic driver.
-   Fixed issue with INDI Server resetting environment variable for skeleton and config files.
-   Various fixes for loading/saving of user configuration.

[Source](/download/source.html) and [Ubuntu packages](/download.html) are available for download.
