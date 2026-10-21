---
title: "FAQ"
description: "Never ever run indiserver as root user."
---

Never ever run indiserver as root user. Not only it is a bad practice security-wise, but it can lead sometimes to unexpected behavior and poor performance. Only run as root when strictly necessary and you know what you are doing.

## Telescopes/Mounts

### I cannot connect to my telescope, what's wrong?

Please make sure of the following:

1.  Telescope is powered and connected via RS232 to your PC.
2.  Telescope is aligned.
3.  RS232 or RS232-to-USB cable is firmly connected at the mount and PC USB port.
4.  You have read and write permissions to the port. In some Linux distros, this is _not_ the default setting. Under Ubuntu, you need to add your user to the _dialout_ group:
    `sudo adduser $USER dialout`

    Then you must restart your PC for this to take effect and try again.

5.  Ensure the port specified is the correct port. Usually your port is _/dev/ttyUSB0_ but sometimes if you unplug and plug the USB cable again, you might get port _/dev/ttyUSB1_. Use `dmesg` to find out which port your mount is connected to if all of the above fails.

### What's the default port to connect to a telescope

_/dev/ttyUSB0_ is the is default port, it can be updated and saved in a configuration file. After changing the port in INDI Control Panel, go to the _Options_ group and click _Save_ next to the _Configuration_ property.

### The time settings in the mount controller is wrong or it slews to a weird direction in the sky?

Check that your client application has the correct time and location settings including daylight savings corrections, if any. Since INDI sends the time with daylight savings corrections, make sure to **disable** Daylight Savings in your mount controller.

### Can I use a joystick to control my telescope?

Yes, you can use any joystick that is supported under Linux. Please checkout the INDI [joystick tutorial](/tutorials/telescope-joystick.html) for an idea on how to setup your joystick with INDI.

## DSLRs/CCDs

### Why my DSLR camera refuses to connect?

Please check [INDI DSLRs FAQ](/forum/ccds-dslrs/783-indi-dslrs-faq.html)

### I cannot connect to my CCD, what's wrong?

Please make sure of the following:

1.  **Never ever run indiserver as root unless strictly necessary as it can cause problems upon connection and when creating/saving files. Use root with caution.**
2.  CCD is powered and connected via USB to your PC. Make sure the CCD is powered and connected **before** starting the INDI server.
3.  USB3 ports can cause problems, try connecting your CCD to USB2 port
4.  Sometimes USB ports do not provide sufficient power to the CCD (especially on Single-Board-Computers like Raspberry PI). Therefore, try changing the USB port and/or use a dedicated powered USB hub.
5.  On Raspberry PI, the Ethernet shares the same USB bus as the camera so it might cause issues if there are electrical issues in the Ethernet cable. Disconnect your Ethernet cable and check if that solves your problem. If it does then replace it with another.

### My ASI camera keeps looping exposures indefinitely?

You need to flash your camera with the **compatible** firmware suitable for your camera model. Please download the firmware update utility and select the firmware that ends with **\-compatible**. For example, if you have ASI120MC, then select ASI120MC-compatible.iic file.

### Does INDI support color cameras?

Yes, color CCDs are supported from INDI Library 1.0.0+. This includes single-shot CCD cameras and also DSLRs. INDI captures the bayered image and generates a FITS file with bayer information on the pattern used (.e.g. RGGB) and any offsets in the bayer pattern. The user may change this information as needed in the INDI control panel. The client is responsible for debayering the image to produce a color image. INDI can also send a color image as a [3D Cube FITS](https://knro.blogspot.com/2015/02/3d-cube-fits-debayer-support-in-kstars.html).

## Astrometry

### Astrometry.net fails to solve my image, what's wrong?

There are several reasons why the **offline** astrometry.net solver may fail:

-   Ensure you have all the [index files](/about/ekos/alignment-module.html) necessary for your Field-of-View (FOV).
-   Ensure image has enough stars that are well focused and not saturated.
-   Enable verbose output in Ekos to see detailed astrometry.net messages to diagnose any issues.
-   Ensure that the FOV displayed in Ekos corresponds to your actual FOV. The FOV depends on the CCD Width, CCD Pixel Size, and the Telescope's Focal Length. The formula to calculate the FOV width (in arcminutes) is as following:

    ```text
    FOV_W (arcmins) = 3437.74677 * CCD_WIDTH * CCD_PIXEL_WIDTH / 1000.0 / FOCAL_LENGTH
    ```

    Where CCD_WIDTH is in pixels, CCD_PIXEL_WIDTH is in microns, and FOCAL_LENGTH is in millimeters. If the calculated FOV does not correspond to your actual FOV, then one of the parameters above is incorrect. Some CCD drivers do not report CCD Width and/or Pixel size correctly and you must set such values manually in the driver itself.
-   Ensure that the solve-field command works properly by running it against a sample image:

    ```shell
    $ solve-field --scale-low 1 /usr/examples/apod2.jpg
    ```

-   Update astrometry.net package to the latest package.
-   If all above fails, make a detailed post in the INDI forums.

## Others

### Can I run INDI in Raspberry PI, ODroid, Beaglebone..etc?

Yes, INDI can run under any Linux distribution and architecture given the minimum requirements are met. We provide [packages](/tutorials/indi-library-on-raspberry-pi.html) for Raspberry PI.

### I can't connect to my remote devices in Ekos, what's wrong?

1.  Ensure that you started all the drivers on the remote host via indiserver.
2.  Ensure the remote INDI server port is accessible from the client machine. The default indiserver port is 7624.
3.  Ensure all devices are powered.
4.  Ensure you are connected to the correct port.

### Can I connect to INDI devices in Android/Windows/OSX/etc..?

Check out the [INDI Clients](/about/clients.html) list for information on the available client across multiple platforms.

### What's the default INDI server port?

7624\. To change the port in INDI server, pass -p following by port. For example, to start LX200 driver INDI server on port 8000:

```shell
indiserver -p 8000 indi_lx200_generic
```

### Can I get/set data from INDI drivers without a GUI client? Scripting?

Yes, you can using INDI's built in [scripting tools](/develop/developer-manual/104-scripting.html). Here is a brief [HOWTO](/forum/mounts/1272-specific-question-about-set-get-eval.html#8436) on simple scripting. You may also use [INDI Python Client](https://sourceforge.net/projects/pyindi-client/) library to control your equipment via Python.

### Guiding calibration fails, what can I do to make it succeed?

-   Better Polar Alignment
-   Set binning to 2x2
-   Select different filter (e.g. High contrast) and see if that makes a difference to bring down the noise.
-   Smaller Square Size.
-   Play with DEC Proportional Gain or disable DEC control completely and see the difference.
-   Leave algorithm to default value (Smart)

### What are the minimum requirements to run INDI?

INDI Library can be compiled under a vanilla POSIX system. It requires the following components:

-   GNU GCC
-   CMake
-   libnova
-   CFITSIO
-   ZLib
-   Libusb

### KStars is missing some icons, how do I fix it?

If KStars is running on a non-KDE desktop environment, it might be missing some necessary environment variables in order to properly load the icons. Run the following to set the environment variable and run KStars:

```shell
export QT_QPA_PLATFORMTHEME=kde
kstars
```

If that doesn't work, try installing the following package:

```shell
sudo apt-get install libqt5libqgtk2
```

You can also check this [Forum post](/forum/ekos/988-missing-button-icons-in-ekos-under-ubuntu-15-10.html?start=6#8274) on the same topic for users who experienced this issue.

### How do I configure my device with KStars/Xephem/DCD/etc...?

Unfortunately, we can't help you with that. Refer to your client documentation or contact the client's maintainer to find out. Please do not post client-specific questions on the INDI mailing list. Direct such question to your client's author.

### I'd like to write my own client, can you help me?

Check out [Developing INDI clients section](/tutorials/client-development.html) in the [INDI Developers Manual](/develop/developer-manual.html). Furthermore, it is highly recommended to examine the getINDI and setINDI tools source code since these two tools are very simple INDI clients.

### I have a problem with an INDI driver, what do I do?

The most common reported problem is that of permission. Please ensure you have proper permissions to access your device. You should check out INDI Devices page for driver-specfic details and troubleshooting. If you found a bug in the software, file a bug report at INDI Bug Tracking system. You may also post your problem to the INDI Development mailing list.

### Why do I see yellow/red weather status codes even when my parameters appear to be in the “green”?

If your weather outside is clear and all parameter values are within the expected range, but you're still seeing a yellow or red status code, there's a specific setting you should check: "Flip alerting to in-bounds."

You may have already adjusted the following settings:

-   OK Range Min/Max
-   % for Warning Threshold

However, the "Flip alerting to in-bounds" option controls how the system interprets whether high or low values are desirable for each parameter.

Here’s how it works:

-   Enable "Flip alerting to in-bounds" for parameters where higher values are better (e.g., temperature on a hot day).
-   Disable it for parameters where lower values are better (e.g., cloud cover on a clear day).

Make sure to configure this setting individually for each weather parameter. Once correctly set, your system should report a green status code during favorable weather conditions.

### I'd like to contribute to INDI, how?

We highly appreciate any help from our users! Do you have a device that is not yet supported by INDI? Tell us about it, or go ahead and write your own driver and submit it to us. If your device is supported, test it with INDI, does it work as expected? If not, please report to us any problems, suggestions, or comments you have. Contributions to this site and documentation are greatly appreciated as well. Let us know if you use INDI in your observatory, home, or club, It's always good to know about more INDI users!
