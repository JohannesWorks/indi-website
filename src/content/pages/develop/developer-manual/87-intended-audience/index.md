---
title: "Intended Audience"
description: "The INDI library is geared toward experienced programmers planning to develop backend hardware drivers to run under the INDI architecture."
order: 3
legacyId: 87
---

The INDI library is geared toward experienced programmers planning to develop backend hardware drivers to run under the INDI architecture. The task of developing hardware drivers requires programmers with sufficient experience in at least one high level programming language such as C++.

Naturally, you need to understand the ins and outs of your hardware thoroughly. This includes communication, control of electronics/motors, physical limitations, and safety considerations.

While the INDI _wire_ protocol is platform-independent, the official INDI Library is designed to operate specifically on POSIX platforms. Developers can port the library and device drivers to different platforms as desired.

Supported operating systems include:

-   **Linux**: Full Support
-   **MacOS**: Full Support, except for few Linux-only drivers.
-   **Windows**: Partial driver support via Cygwin. Client support.
-   **BSD**: Full Support, except for few Linux-only drivers.
-   **iOS**: Client support only.
-   **Android**: Client support only.

INDI Library provides [Python client](https://pypi.python.org/pypi/pyindi-client) bindings to access INDI server and drivers.
