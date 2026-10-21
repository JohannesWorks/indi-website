---
title: "Clients"
description: "INDI clients are the programs you use to directly control your devices."
---

INDI clients are the programs you use to directly control your devices. There are numerous clients implementations that are tailored to specific requirements. But the most popular clients are the generic _GUI_ clients. GUI clients are capable of running any INDI driver.

The following is a list of popular INDI clients:

| Name | Description | Cost | License | Operating Systems | Notes |
| --- | --- | --- | --- | --- | --- |
| [KStars](http://edu.kde.org/kstars) | **KStars** is free, open source, cross-platform Astronomy Software. It provides an accurate graphical simulation of the night sky, from any location on Earth, at any date and time. The display includes upto 100 million stars, 13,000 deep-sky objects,all 8 planets, the Sun and Moon, and thousands of comets and asteroids. In addition, it provides tools to perform many astronomical calculations, an observation planner, and lots of information and resources to help you explore the universe! | Free | GPL | Linux, BSD, OSX, Windows | INDI Library for KStars is only available for Linux, BSD, and OSX. |
| [Ekos](http://edu.kde.org/kstars/indi/ekos/) | **Ekos** is an advanced cross-platform observatory control and automation tool with particular focus on Astrophotography. It is based on a modular extensible framework to perform common astrophotography tasks. This includes highly accurate GOTOs using astrometry solver, ability to measure andcorrect polar alignment errors , auto-focus & auto-guide capabilities, and capture of single or stack of images with filter wheel support. | Free | GPL | Linux, BSD, OSX | Ekos is part of KStars. |
| [KStars Lite](https://play.google.com/store/apps/details?id=org.kde.kstars&hl=en) | **KStars Lite** supports many features of the desktop version optimized for tablet/phone use. It supports telescope and camera control, color schemes, and different projection systems. Just point it any where in the night sky and identify what objects and constellations you are looking at, plus a lot more! | Free | GPL | Android | [KStars Lite in Google Play Store](https://play.google.com/store/apps/details?id=org.kde.kstars&hl=en) |
| [AstraLite](https://github.com/art-den/astra_lite) | AstraLite is software for deepsky astrophotography and live stacking on low power PCs (like rapsberry Pi or Orange Pi) | Free | MIT | Linux, Windows |   |
| [IPARCOS](/about/news/146-iparcos-android-client-for-indi.html) | **IPARCOS** is a INDI client for Android phones and tablets. It supports connecting and controlling your INDI devices including easy to use telescope and camera controls. | Free | GPL | Android |   |
| [Telescope.Touch](https://github.com/marcocipriani01/Telescope.Touch) | **Telescope.Touch** was born as an attempt of merging [Sky Map](https://github.com/sky-map-team/stardroid) and [IPARCOS](https://github.com/INDIForJava/IPARCOS), an INDI client for Android. It features full telescope control and mobile sky chart functionality, with a completely renewed user interface and base code. | Free | GPL | Android |   |
| [Cartes Du Ciel](http://www.ap-i.net/skychart/start) | **Cartes du Ciel** is a free planetarium program for Linux, Mac OS X and Windows. With the change to version 3, Linux has been added as a target platform, licensing has changed from freeware to GPL and the project moved to a new website. The software maps out and labels most of the constellations, planets, and objects you can see with a telescope. It can also download Digitized Sky Survey Charts and superimpose images over these charts. Numerous star charts and indexes can be installed. There are also telescope interfaces and many versatile display options. | Free | GPL | Linux, OSX, Windows | Cartes Du Ciel only supports telescope control. |
| [CCDCiel](https://sourceforge.net/projects/ccdciel/) | **CCDCiel** is a CCD capture software intended for the amateur astronomer. It include all the features required to perform digital imaging CCD observation of celestial objects. Using the standard drivers protocol INDI and ASCOM it can connect and control the CCD camera, the focuser, the filter wheel and the telescope mount. | Free | GPL | Linux, Windows |   |
| [INDI AllSky](https://github.com/aaronwmorris/indi-allsky/) | **indi-allsky** is software used to manage a Linux-based All Sky Camera using the INDI framework. Theoretically, any INDI supported CCD/CMOS camera should be usable. | Free | NA | Linux |   |
| [DCD](http://pygtkindiclient.sourceforge.net/) | **DCD** is a platform independent user interface for remote telescope and device control, compatible with the INDI standard. | Free | GPL | Linux, BSD, OSX, Windows |   |
| [PHD2](http://openphdguiding.org/) | The Open PHD Guiding **PHD2** software for Linux, Mac OSX and Windows is the continuation of the popular and free [Stark Labs](http://www.stark-labs.com) PHD Guiding package for telescope autoguiding on Macs and PCs. PHD2 supports INDI on Linux, Mac OSX and Windows. | Free | BSD | Linux, OSX, Windows | [GIT repo](https://github.com/OpenPHDGuiding/phd2) |
| [iINDI](http://www.cloudmakers.eu/iindi) | **iINDI** is a mobile control panel for the remote INDI servers for iPhone, iPod Touch or iPad. It offers the same functionality as jINDI Device Manager or KStars Control panel for indiserver and INDI drivers or wINDI and ASCOM drivers. The only limitation is, that it doesn't support BLOB transfer. | €3.99 | Propietary | iPhone, iPod Touch or iPad |   |
| [NodeJS INDI Client](https://www.npmjs.com/package/indi-client) | A node client for INDI. This client will translate the XML INDI protocol into a more JS friendly JSON. | Free | BSD | Linux, Windows, MacOS |   |
| [Xephem](http://www.clearskyinstitute.com/xephem/) | **Xephem** is a Motif based ephemeris and planetarium program for Unix-like operating systems. | $19.95 | Propietary | Unix-like |   |
| [GoQat](http://canburytech.net/GoQat/) | **GoQat** is a hardware control and data acquisition program for astronomy on the Linux platform. It has an INDI client to control any device with an INDI driver and has native support for any CCD camera from [Quantum Scientific Imaging](http://www.qsimaging.com/) and any [Starlight Xpress](http://www.sxccd.com/) USB 2.0 camera. | Free | GPL | Linux |   |
| [EqmodGui](http://sourceforge.net/projects/eqmodgui/) | **EqmodGui** is a user interface for Linux INDI Eqmod telescope driver.
It allow to easily set the main parameters require to use this driver and manage the alignment data. | Free | GPLv3 | Linux |   |
|
[INDI Web Manager App](https://github.com/rlancaste/INDIWebManagerApp)

 | **INDI Web Manager App** is a program designed to configure, launch, and manage an INDI Web Manager with an easy to use graphical UI.  It displays the status of the currently running INDI Web Manager and INDI Server.  It is the only easy way to launch an INDI Web Manager on Mac OS.  It also makes the use of INDI Web Manager on Linux much easier and beginner friendly.  | Free | GPLv3 | Linux, OSX |   |
| [INDI starter](http://sourceforge.net/projects/indistarter/) | **INDI starter** is a user interface to run a INDI server.
You can configure different profile for your astronomical equipment.
The INDI server can be launched locally or remotely on another computer. In this last case a **ssh** tunnel is established to allow local client connection. | Free | GPLv3 | Linux |   |
| [indiprop](https://github.com/aaronevers/indiprop) | **indiprop** provides a generic user interface for browsing device properties published by an INDI server. | Free | GPL | Linux |   |
| [PixInsight](https://pixinsight.com) |

**PixInsight** is an advanced image processing software platform. It has been designed specifically for astrophotography and other technical imaging fields. PixInsight is a modular, open-architecture system where the entire processing and file handling capabilities are implemented as external installable modules.

INDI support is via INDIClient module which is an open-source project released under a BSD-like license.

 | €230 | Proprietary | FreeBSD, Linux, OSX, Windows |

You can try out the PixInsight Platform at no charge for 45 days.

 |
| [HNSky](http://www.hnsky.org/software.htm) |

**Hallo Northern Sky** or **HNSKY** is a full feature planetarium program for Windows and Linux (under development). Contains 30.000 deep sky objects, a comet and asteroid database and the TYCHO2++ 4.5 million star database up to magnitude 12.5. The Sun, Moon, the planets and their major moons are all displayed with surface features. It is supplied with hundreds of DSS deep sky images which will blend in at the correct size and orientation. Online access to UCAC4 en NOMAD star catalog or download the complete GSC 1.2 up to magnitude 15 and the USNO UCAC4 up to magnitude 16. Online access to the DSS2 survey. Menu is adjustable in 21 languages.

 | Free | Proprietary | Windows, Linux | Linux beta edition |
| [Stellarium](http://stellarium.org/) | **Stellarium** is a free open source planetarium for your computer. It shows a realistic sky in 3D, just like what you see with the naked eye, binoculars or a telescope. | Free | GPLv2+ | Linux
OSX
Windows | Yes! You can use Stellarium for telescope control with INDI drivers. |
| [MoonPanoramaMaker](https://github.com/Rolf-Hempel/MoonPanoramaMaker) | **MoonPanoramaMaker** automates the process of taking high-resolution panoramas of the Moon. Since the USB cameras employed cover a very small field of view, multiple views must be combined to produce a complete panorama. MoonPanoramaMaker covers the current Moon phase with an optimal grid of single views and automatically steers the telescope mount and camera during their exposure. | Free |  GPLv3 | Windows, Linux |   |
| [ZWO ASIAIR](https://astronomy-imaging-camera.com/product/zwo-asiair) | The **ASIAIR** Wi-Fi Camera Controller is a smart Wi-Fi device that allows you to control all ASI USB 3.0 cameras, ASI Mini series cameras, and an INDI equatorial mount. With this device, you can plate solve, autoguide, sequence, and capture deep space images with your phone or tablet! |  $179 |  Proprietary |  iOS/Android | [Possible Open Source License Violoation](/forum/development/10380-asiair-and-opensource-software-licences.html) |
| [AstroPhoto Plus](http://astrophotoplus.gulinux.net "AstroPhoto Plus") |

**AstroPhoto Plus** allows you to start and manage an astrophotography sequence directly from your browser. You can install the web server on any GNU/Linux powered device, either a laptop, a compute stick, or one of the now very popular SoC boards such as the Raspberry Pi.

 | Free | GPLv3 | Linux (server), Any OS (client) |   |
| [OpenVLBI](https://openvlbi.com) |

**libOpenVLBI** joins together more INDI detectors or receivers as an interferometer and cross-correlate them, plots a Fourier plane and displays their coherence ratio and an inverse transform of their plots. OpenVLBI can estimate their perspective baselines in aperture synthesis or moving baseline projection.

 | Free | GPLv3 | Windows, Linux | [GIT repo](https://github.com/iliaplatone/OpenVLBI) |
