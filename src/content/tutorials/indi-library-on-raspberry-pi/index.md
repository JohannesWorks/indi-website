---
title: "INDI Library on Raspberry Pi"
description: "Install and run INDI on a Raspberry Pi."
topic: setup
author: "Jasem Mutlaq"
legacyUrl: "/support/tutorials/139-indi-library-on-raspberry-pi.html"
legacyId: 139
---

The Raspberry PI (RPi) is an ARM-based credit-card-sized single board computer. It costs around $35 (PI 2) and therefore it is a very attractive choice for amateur astronomers to control their equipment either locally or remotely. It can be used over Ethernet or WiFi to control your equipment remotely.

Due to power limitations of the RPi, it is _recommended_ to connect all devices to a powered USB hub. INDI Library v1.2.0 packages in addition to 3rd party drivers are available for the RPi (Raspbian Jessie, Wheezy packages are **no longer offered**). Furthermore, if you install [Ubuntu Mate for Raspberry PI 2](https://ubuntu-mate.org/raspberry-pi/), you can get **all** the bleeding edge INDI and KStars directly from the Ubuntu INDI PPA, no need to download and install packages manually!

You typically would run an INDI server on the RPi and connect to it remotely from [Ekos](/about/ekos.html). While it is technically possible to build Ekos in RPi, it would not run smoothly; therefore it is recommended to run INDI server on the RPi and Ekos on a more powerful machine.

The following steps are applicable to RPi running the Raspbian OS:

1.  Install the dependencies:

    ```shell
    sudo apt-get install cdbs libcfitsio3-dev libnova-dev libusb-1.0-0-dev libjpeg-dev libusb-dev libtiff5-dev libftdi-dev fxload libkrb5-dev libcurl4-gnutls-dev dcraw libgphoto2-dev libgsl-dev dkms libboost-regex-dev libgps22 libdc1394-22-dev
    ```

2.  [Download](/download/raspberry-pi.html) INDI Library for RPi
3.  Extract and Install INDI Library:

    ```shell
    tar -xzf libindi_1.2.0_rpi.tar.gz
    cd libindi_1.2.0_rpi
    sudo dpkg -i *.deb
    ```

Included in the INDI Library for RPi are INDI servers, tools, and drivers. The following are some of the drivers in the package. For a complete list, please check the [devices](https://drivers.indilib.org) page:

| Driver | Executable |
| --- | --- |
| EQMod Driver | indi_eqmod_telescope |
| Atik CCD Driver | indi_atik_ccd |
| GPhoto Driver (for DSLRs) | indi_gphoto_ccd |
| Starlight Xpress Driver | indi_sx_ccd, indi_sx_wheel, indi_sx_ao |
| QSI Driver | indi_qsi_ccd |
| QHY Driver | indi_qhy_ccd |
| Meade DSI Pro I/II Driver | indi_dsi_ccd |
| Atik CCD Driver | indi_atik_ccd |
| SBIG Driver | indi_sbig_ccd |
| Fishcamp Driver | indi_fishcamp_ccd |
| Apogee Driver | indi_apogee_ccd |
| ZWO Optics ASI Driver | indi_asi_ccd |
| AAG Cloud Watcher Driver | indi_aagcloudwatcher |

To run INDI server:

```shell
indiserver -v -m 100 driver_executable
```

**Replace**_driver_executable_ with the actual INDI driver executable. For example, to run INDI server with EQMod, Atik CCD, and Joystick driver:

```shell
indiserver -v indi_eqmod_telescope indi_joystick indi_atik_ccd
```

This will start INDI server on the RPi on port 7624 by default. You can then connect to the INDI server from Ekos/KStars or any INDI compatible client.

You should power up your Raspberry Pi from the same USB hub you are connecting your CCD to. Powering Raspberry Pi with its own power supply will result in your CCD and Raspberry Pi do not have common ground (GND). This leads to non-zero voltage potential on all wires between your CCD and Raspberry Pi, including data lines. The noise identified on the images represents the current related to this non-zero voltage potential.

## Installing the _Guide Star Catalog_ to work with the indi_simulator_ccd driver

If you are planning to use the indi_simulator_ccd driver and need to retrieve simulated images of star fields you have to install de **[Guide Star Catalog (GSC)](http://gsss.stsci.edu/Catalogs/GSC/GSC1/GSC1.htm)** on your RPi. To do so, follow the next steps:

1.  Create a folder to download and compile the GSC:

    ```shell
    mkdir gsc
    cd gsc
    ```

2.  Download both the Data (more than 200MB!) and the Source files of the 1.2 version:

    ```shell
    wget -O bincats_GSC_1.2.tar.gz http://cdsarc.u-strasbg.fr/viz-bin/nph-Cat/tar.gz?bincats/GSC_1.2
    ```

3.  Untar (uncompress) the downloaded data and source files:

    ```shell
    tar -xvzf bincats_GSC_1.2.tar.gz
    ```

4.  Compile the source code:

    ```shell
    cd src
    make
    ```

    Ignore the error messages regarding some \*.o files that cannot be removed.
5.  Rename the executable and copy it to the /usr/bin directory:

    ```shell
    mv gsc.exe gsc
    sudo cp gsc /usr/bin/
    cd ..
    ```

6.  Copy the regions.\* files from the bin directory to the base gsc directory:

    ```shell
    cp ~/gsc/bin/regions.* ~/gsc
    ```

7.  Update your .bashrc to set the GSCDAT environment variable:

    ```shell
    cp ~/.bashrc ~/.bashrc.copy
    echo "export GSCDAT=~/gsc" >> ~/.bashrc
    ```

8.  Log out and log in again into your RPi for the environment variable to take effect.
9.  Launch the indiserver with the indi_simulator_ccd driver and test it with your favourite client!:

    ```shell
    indiserver indi_simulator_ccd
    ```
