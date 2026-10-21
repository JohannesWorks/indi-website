---
title: "INDI Library v1.5.0"
description: "INDI development team is happy to announce the release of INDI Library v1.5.0 on August 20th, 2017."
date: "2017-02-27"
author: "Jasem Mutlaq"
legacyId: 175
---

INDI development team is happy to announce the release of INDI Library v1.5.0 on August 20th, 2017. This new exciting release builds on the maturity of INDI Library and comes with many new supported devices and fixes for existing drivers.

The following is the change log for the release:

-   New Detector Interface for photon and radio detectors.
-   New Software-Defined-Radio driver (RTLSDR).
-   New Connections plugin system to facilitate driver development.
-   New standardized tracking properties system for all mounts.
-   New Digital Settings Circiles (DSC) driver.
-   New Lacerta MGen driver.
-   New NightCrawler Focusing Rotator driver.
-   New Optec Gemini Focusing Rotater driver.
-   New iNovaPLX CCD driver.
-   QHY SDK update to 1.10.0. Support for QHY PoleMaster.
-   QSI SDK update to 7.6.0
-   Support for INDI client under Windows.
-   Support for Pier Side in many mount drivers.
-   Support for SkySafari.
-   Fix FLIUSB for 4.6 and 4.9 kernels.
-   Fixed wrong time format in generated SER files.
-   ZWO ASI drivers for MacOS.
-   Various GPSD fixes.
-   Proper handing of ISO8601 timestamps in the generated filenames.
-   Improved Gemini mount driver with more functionality and bug fixes.
-   Many V4L2 fixes and improvements. Support for V4L2 integer menus.
-   Ability to define multiple primary/guide scope configurations.
-   ZEQ25 Improvements and fixes.
-   NStep driver improvements and fixes.
-   Added Ccache support.
-   Support for Gotonova driver.
-   Added Unity Build support.
-   Improved Astrophysics driver.
-   Added USB connectivity to SQM device driver.
-   More robust handling of reading pier side from mount.
-   Warn client that no devices are detected in case of Multiple-Devices-Per-Driver drivers.
-   Added PEC control to INDI::Telescope. Each driver must handle the low level protocol to actually enable or disable PEC.
-   Added security (hardening) flags.
-   SoftPEC implementation for Virtuoso mounts in skywatcherAPIMount.
-   Added TELESCOP, OBSERVER, and OBJECT keywords to the FITS header.
