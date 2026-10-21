---
title: "Setting development environment"
description: "To start developing INDI drivers, it is necessary to set up an environment for C/C++ development."
order: 13
legacyId: 163
---

To start developing INDI drivers, it is necessary to set up an environment for C/C++ development. While INDI can be developed on any OS, It is recommended to use a Debian based distribution with KDE, preferably [Kubuntu](http://www.kubuntu.org). Kubuntu offers a complete development platform and provides all the necessary packages required to get started including KStars which is used as one of the graphical frontend clients.

Alternatively, if you are developing under another OS, you can opt to download the [Ekos VM](/download.html). It comes pre-installed with INDI & KStars and is based on the latest Kubuntu release.

You can use any text editor or IDE of your preference. It is recommended to use the cross-platform [Qt Creator](https://www.qt.io/ide/) IDE since it supports CMake builds among other features. You can install Qt Creator from Ubuntu by typing the following command in the console:

```shell
sudo apt-get install qtcreator
```

After installing the OS and IDE, install the necessary pre-requisites:

```shell
sudo apt-get install libnova-dev libcfitsio-dev libusb-1.0-0-dev zlib1g-dev libgsl0-dev build-essential cmake git libjpeg-dev libcurl4-gnutls-dev libfftw3-dev librtlsdr-dev
```

Once installation is complete, create the projects directory and check out INDI sources from Git:

```shell
mkdir ~/Projects
cd ~/Projects
git clone https://github.com/indilib/indi.git
```

You can now build libindi. You can either build the INDI Library from the command line or build it from within QtCreator:

#### Console Build

To build indilib from the console, open a terminal and run the following:

```shell
mkdir -p ~/Projects/build/indi
cd ~/Projects/build/indi
cmake -DCMAKE_INSTALL_PREFIX=/usr -DCMAKE_BUILD_TYPE=Debug ~/Projects/indi
sudo make install
```

All the drivers reside in the _drivers_ directory, each placed in the corresponding device category directory. Furthermore, 3rd party drivers are located under _trunk/3rdparty_ directory and each is considered a separate project with dependency on core libindi.

#### QtCreator Build

To open INDI Library in Qt Creator, go to _File -> Open File or Project_ , and then browse to libindi directory and select CMakeLists.txt.  After the project is loaded, click the **Projects** icons on the left pane, then edit the _CMake_ build settings. **Set CMAKE_INSTALL_PREFIX to _/usr_ instead of the default _/usr/local_**

Another important point is that if you are running multiple drivers in INDI server, then the driver you want to debug must be the first driver passed to indiserver. For example, if you plan to run indi_simulator_ccd and indi_simulator_telescope in the debugger, and want to debug indi_simulator_telescope, then run indiserver as following:

```shell
indiserver -v indi_simulator_telescope indi_simulator_ccd
```

After CMake configure process is completed successfully, you can compile libindi and start coding!

You used to be able to configure QtCreator to use kdesudo to install the build from QtCreator to the system.  Unfortunately, kdesudo has been deprecated, and there are no alternatives.  So for now, when you are ready to install to system, go to the build directory you created in the consle build instructions (cd ~/Projects/build/indi) and run:

sudo make -j8 install

For completeness, the following is a short video on how (you used to be able to) to setup libindi in QtCreator in Debug mode (for Celestron GPS driver) and how to use KStars to connect to it while under development.  Some of it may still be applicable, but other parts will likely need some modification.

<div class="video-file"><video preload="none" src="/images/videos/qtcreator_demo.mkv" poster="/images/videos/qtcreator_poster.png" controls=""></video></div>

## Developing 3rd party drivers

As described in the [3rd Party](/develop/developer-manual/100-3rd-party-drivers.html) drivers section, each driver consists of source code to control your device in additional to an XML file that can be used by client applications to list your device.

For example, the Ekos drivers list is built by parsing INDI XML driver files located (by default on Linux) in _/usr/share/indi_. You can start experimenting with 3rd party drivers by checking out the [Generic CCD](https://github.com/indilib/indi/tree/master/3rdparty/generic-ccd) driver example.

Start by opening the Generic CCD CMakelists.txt project in QtCreator. Check out the video below for how to setup Generic CCD under Qt Creator:

<div class="video-file"><video preload="none" src="/images/videos/generic_ccd.mkv" poster="/images/videos/qtcreator_generic_ccd.png" controls=""></video></div>
