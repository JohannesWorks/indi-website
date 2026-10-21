---
title: "Introduction"
description: "The Instrument-Neutral-Distributed-Interface control protocol (INDI) is a key technology for device automation and control."
order: 1
legacyId: 86
---

The Instrument-Neutral-Distributed-Interface control protocol (INDI) is a key technology for device automation and control. INDI introduces a control protocol standard for rapid development of robust, adaptive, and scalable device drivers under several platforms.

INDI has many advantages over similar technologies, including loose coupling between hardware devices and software drivers. Clients that use the device drivers are completely unaware of the device capabilities. In run time, clients discover the device capabilities through introspection. This enables clients to build a completely dynamical GUI based on services provided by the device. Hence, when new or updated device drivers are developed, clients can take full advantage of them without any changes on the client side; thanks to the self-describing nature of INDI.

Since developers don't have to worry about updating GUI clients to reflect changes in their drivers, they can concentrate their time and effort on the development and testing of drivers. This leads to a significant cut in development time and cost, and paves the way for painless maintenance and efficient deployment. Employing XML as the language of the protocol adds other advantages as the protocol can be parsed and processed using any XML library.

Furthermore, remote control of devices is seamless with INDI's server/client architecture. Distributed devices can be controlled from one centralized environment.

The [INDI wire protocol](/files/INDI.pdf) only describes the rules, structures, and mechanisms underlying the protocol's architecture. What will be discussed throughout this manual is a specific POSIX implementation of the INDI protocol. We shall refer to this implementation hereforth as the INDI library.

The INDI library is released under the GNU Library General Public License (LGPL) and is currently maintained in the dedicated [INDI SourceForge website](http://sourceforge.net/projects/indi/).
