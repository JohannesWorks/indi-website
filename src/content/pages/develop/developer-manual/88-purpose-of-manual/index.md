---
title: "Purpose of Manual"
description: "The goal of this manual is to enable programmers to take full advantage of the INDI architecture by providing a practical guide that illustrates the different aspects…"
order: 2
legacyId: 88
---

The goal of this manual is to enable programmers to take full advantage of the INDI architecture by providing a practical guide that illustrates the different aspects of the control protocol. The manual covers the architecture of INDI and discusses instrument-specific drivers. The [INDI API](/api/) reflects the latest implementation of the INDI wire protocol.

INDI clients do no fall under the scope of this manual. Client applications can be very diverse. They can range from simple loggers to complicated automated scripts. Programmers who are interested in client development should refer to existing client applications such as [KStars](http://edu.kde.org/kstars), [Xephem](http://www.clearskyinstitute.com/xephem), [Cartes Du Ciel](https://www.ap-i.net/skychart/start), and [DCD](http://pygtkindiclient.sourceforge.net).

Developers should feel comfortable about writing INDI drivers after reading this manual. However, a clear understanding of the design and philosophy of the INDI architecture is essential before developing any INDI drivers. Elwood Downey, author of the INDI wire protocol, maintains an up to date INDI White Paper. You should read the white paper as it serves the foundation of this manual.

It is recommended to study the various INDI documents in the following order:

1.  INDI [White Paper](/files/INDI.pdf)
2.  INDI Developers Manual
3.  INDI [API Reference](/api/)

In addition to the tutorials covered in this manual, developers can use existing INDI drivers as a reference implementation for new devices.
