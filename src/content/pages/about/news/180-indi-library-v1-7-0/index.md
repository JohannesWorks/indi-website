---
title: "INDI Library v1.7.0"
description: "INDI development team is happy to announce the release of INDI Library v1.7.0."
date: "2018-04-08"
author: "Jasem Mutlaq"
legacyId: 180
---

INDI development team is happy to announce the release of INDI Library v1.7.0. This new exciting release builds on the maturity of INDI Library and comes with many new supported devices and fixes for existing drivers. Here are some of the highlights:

-   Updated QHY SDK.
-   FLI drivers are now based on libusb rather than legacy kernel driver.
-   New driver for CEM120 mount.
-   New driver for Explore Scientific PMC8.
-   Several memory leaks were fixed.
-   Added support for background flushing for FLI CCDs.
-   Added preliminary support for CCD rapid captures on the millisecond range.
-   SX CCD driver updated to support ￼ICX453 & M25C.
-   SX AO driver updated to emply INDI serial connection plugin.
-   Fix timing issue with GPhoto making it stuck in busy state after initial capture.
-   ASI driver enhancements. Video format recall fix.
-   MaxDomeII driver refactored and updated.
-   Several fixes for Gemini Integra driver.
-   Polling period for most drivers is now customizable.
-   GPhoto driver supported Abort exposure. Subframing fixes.
-   GPS driver can set system time from GPS source.
-   Astrophyics Experimental Driver with multi-parking support.
-   Numerous OnStep driver fixes and updates.
-   SkySensor2000 Pulse guiding support.
-   Prevent sandbox ACCESS_VIOLATION on Gentoo
-   Celestron driver refactoring and support for high-precision formats.
-   Fixed script execution in scripting gateways
-   Fix flags for Cygwin.
-   Fix non-standard POSIX C functions.
-   Replace deprecated usleep with nanosleep.
-   CCD & Telescope simulator updated so that can be used effectively in any combination with physical devices.

Thanks to all the great open source [contributors](https://github.com/indilib/indi/graphs/contributors) who made this release possible.
