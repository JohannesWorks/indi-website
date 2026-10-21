---
title: "3rd Party drivers"
description: "INDI Library includes by default several drivers for popular astronomical instruments mainly used in amateur astronomy."
order: 7
legacyId: 100
---

INDI Library includes by default several drivers for popular astronomical instruments mainly used in amateur astronomy. This is done for several reasons:

-   Make it easy for users new to use their favorite client software and immediately connect to their devices.
-   Decrease footprint and size of libindi.
-   Enable release of 3rd party drivers independent from libindi releases.

When is a 3rd party driver required?

-   Driver requires external dependencies (other than the indi-core package)
-   Driver requires a separate release cycle
-   Driver has a different license than indi-core

Notwithstanding that, INDI Library facilitates the development of 3rd party drivers by providing a shared library (libindidriver) that provides access to the INDI Library framework. To best illustrate how you can do that, let's go over an existing example: QSI CCD driver.

The directory contains the necessary files required to compile an INDI driver:

-   CMakeLists.txt: CMake build rules.
-   config.h.cmake: Required for CMake to make platform checks, if necessary.
-   indi_qsi.xml: XML file describing the driver title, name, version, and hardware family. This information can be parsed by clients.
-   qsiccd.\[h,cpp\]: QSI INDI Driver.
-   99-qsi.rules: udev rules for QSI USB CCDs

In CMakeLists.txt, we have:

```shell
cmake_minimum_required(VERSION 2.4.7)
PROJECT(qsiccd CXX C)

set(CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake_modules/")
set(BIN_INSTALL_DIR "${CMAKE_INSTALL_PREFIX}/bin")
set(RULES_INSTALL_DIR "/etc/udev/rules.d")
```

This sets the paths for installing the XML files unto the DATA_INSTALL_DIR, and the driver unto the BIN_INSTALL_DIR.

```text
find_package(CFITSIO REQUIRED)
find_package(INDI REQUIRED)
find_package(QSI REQUIRED)
find_package(ZLIB REQUIRED)
```

Find REQUIRED packages necessary for the driver. In addition to INDI, we need cfitsio to handle FITS files, and QSI library to control the camera.

```text
configure_file(${CMAKE_CURRENT_SOURCE_DIR}/config.h.cmake ${CMAKE_CURRENT_BINARY_DIR}/config.h )
```

Prepare the config.h from the template config.h.cmake

```text
include_directories( ${CMAKE_CURRENT_BINARY_DIR})
include_directories( ${CMAKE_SOURCE_DIR})
include_directories( ${INDI_INCLUDE_DIR})
include_directories( ${CFITSIO_INCLUDE_DIR})
include_directories( ${QSI_INCLUDE_DIR})
```

Ensures all the required directories are included, including those for optional packages.

```text
set(indiqsi_SRCS
   ${CMAKE_SOURCE_DIR}/qsi_ccd.cpp
   )

add_executable(indi_qsi_ccd ${indiqsi_SRCS})

target_link_libraries(indi_qsi_ccd ${INDI_DRIVER_LIBRARIES} ${CFITSIO_LIBRARIES} ${QSI_LIBRARIES} )

install(TARGETS indi_qsi_ccd RUNTIME DESTINATION bin )

install(FILES indi_qsi.xml DESTINATION ${INDI_DATA_DIR})
install(FILES 99-qsi.rules DESTINATION ${RULES_INSTALL_DIR})
```

Here we set the source files, then we add the INDI driver executable (indi_qsi_ccd). Note that the naming convention for indi driver always starts with indi followed by an underscore followed by the driver name (qsi), and then finally followed by the driver hardware family (ccd). The binary driver is then linked to the shared INDI_DRIVER_LIBRARIES in addition to cfitsio, qsi, and libz libraries. Finally, we install the binary driver and the XML file to their respective directories.

You may request to add your 3rd party driver to INDI subversion repository where it can be maintained. The INDI development team can aid in maintaining the driver when any core INDI code is updated. Furthermore, the INDI development team releases binary packages for all popular distributions making your driver more accessible to the average user.

## Driver XML Schema

All drivers should submit an XML file with metadata for the driver properties. The primary purpose of the XML files is to enable INDI clients to parse them to present a hierarchical list of devices from which users can select to activate and use. A sample XML schema for a CCD driver looks like the following:

```text

     indi_qsi_ccd
     8000
     1.0

```

For drivers that provide multiple devices to the client, set the Multiple-Devices-Per-Driver attribute _mdpd_ to true in the device XML element. For an example on MDPD, please check the INDI Starlight XPress driver.

A group consists of devices which fall under the same hardware category class. Most astronomical devices fall under the following groups:

-   Telescopes
-   CCDs
-   Focusers
-   Filter Wheels
-   Video
-   Adaptive Optics
-   Dome
-   Spectrometers
-   Weather
-   Auxiliary

A driver may define a new group if necessary. If a driver can run multiple devices in one driver instance, set Multiple-Device-Per-Driver **mdpd** device attribute to _true_. For drivers using a _Skeleton_ file for property construction, set the **skel** device attribute to the skeleton file name used for the driver properties.

## DTD

```text
<!DOCTYPE driversList
[
<!ELEMENT driversList (devGroup+)>
<!ELEMENT devGroup (device+)>
<!ELEMENT device (driver,version,port)>
<!ELEMENT driver (#PCDATA)>
<!ELEMENT version (#PCDATA)>
<!ELEMENT port (#PCDATA)>

<!ATTLIST devGroup group CDATA #REQUIRED>
<!ATTLIST device label CDATA>
<!ATTLIST device mdpd CDATA>
<!ATTLIST device skel CDATA>
<!ATTLIST driver name CDATA #REQUIRED>
]>
```
