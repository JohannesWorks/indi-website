---
title: "Painless remote control with Ekos and INDI"
description: "Run INDI on a small computer at the telescope and control it from Ekos indoors."
topic: remote
author: "Jasem Mutlaq"
legacyUrl: "/support/tutorials/150-painless-remote-control-with-ekos-indi.html"
legacyId: 150
---

##  Getting Started

[](/images/ekos/rpi/ekos_indi_rpi.png)

As more Single-Board-Computers such as the [Raspberry PI](http://www.raspberrypi.org/), [ODroid](http://www.hardkernel.com/main/main.php), [Beaglebone](http://beagleboard.org/)..etc become more powerful with every release, they become closer to replacing the traditional desktop PC for trivial non-graphic intensive tasks. One of the nuisances of astrophotography is the necessity to be in close proximity to your equipment during the typical astrophotography workflow. Your telescope, CCD, focuser..etc are usually connected to a desktop or laptop running your favorite astrophotography software. In addition to freezing temperatures you might encountered in your neck of the wood in winter, it is often far more convenient to operate everything remotely from the comfort of your living room, and it's even better if it's done wirelessly.

Nowadays, the hardware and software technology stacks make this possible thanks to INDI/Ekos and cheap Single board Computers. [INDI](/about/discover-indi.html) is the software that talks to your devices and controls them. INDI is a server and does not require a Graphical-User-Interface (GUI) nor a powerful PC, and hence INDI can run on devices such as the Raspberry PI. [Ekos](/about/ekos.html) is the graphical client used to control the devices exposed by INDI. It offers powerful capabilities to capture, focus, guide, and plate-solve your images. Ekos requires a modern Linux distribution with KDE. Any desktop or laptop that can run Ubuntu/Kubuntu can run Ekos without any issues.

To get started, please check the following steps:

1.  **Verify Your Devices Are Supported**

Ensure that your device is supported under INDI. We strive to make more devices supported under Linux, please check the [INDI Devices page](/devices.html) to find out if you device is supported.

3.  **Desktop/Laptop PC**

For the client side, you have a choice between using a Linux PC or a Windows/OSX box:

**Option 1: Linux**

You need a fairly recent Linux distribution. While you can compile latest Ekos/KStars on any modern Linux distro, the most _painless_ way is to install [Kubuntu](http://www.kubuntu.org/) 15.10 or higher, and install KStars-bleeding package which includes the latest Ekos and INDI drivers in one go. After installing Kubuntu, simply open the console (via the Konsole application) and type the following:

```shell

sudo apt-add-repository ppa:mutlaqja/ppa
sudo apt-get update && sudo apt-get install kstars-bleeding
```

That's it! After all dependencies are installed, you will find KStars in the start menu under Education -> Science.

**Option 2: Windows/OSX**

You will need to install [Ekos VM](/download/download/5-vm/7-ekos-vm.html) on [VirtualBox](https://www.virtualbox.org/). VirtualBox is available for free for Windows and OSX. Ekos VM comes ready with latest Ekos and INDI out of the box!

11.  **Single Board Computers**

Many SBCs are available on the market today. It can be confusing to select which. Perhaps the most popular with a strong community backing is the Raspberry PI (RPi). The recently released [Raspberry PI 2](http://www.raspberrypi.org/raspberry-pi-2-on-sale/) comes with a more powerful processor and more RAM and can run INDI drivers effectively. Other alternatives includes the ODroid C1 and Beaglebone Black. Again, while you can choose any SBC, the most _painless_ choice is RPi (All models are supported) as we provide ready-made packages for it. After installing Raspbian unto the RPi, simply follow the instructions on the [detailed RPi tutorial](/tutorials/indi-library-on-raspberry-pi.html) to fire INDI up.

You might need a powered USB hub to connect all your equipment first (including Raspberry PI). Furthermore, many WiFi dongles are available for the Raspberry PI that enables you to communicate wirelessly with your equipment.

##  How to use Ekos and INDI to remotely control your devices?

You need to run INDI server with the drivers necessary to control your equipment. An INDI driver is an executable file stored under /usr/bin and is prefixed with indi\_. In the device page, you will find the _Driver Name_ and the _Driver Executable_ for each device. For example, the executable for EQMod Mount driver is indi_eqmod_telescope. The **Driver Name** is EQMod Mount and the **Driver Executable** is indi_eqmod_telescope.

[](/images/ekos/rpi/indi_site_devices.png)

To better illustrate this, let us take an example. Suppose you have EQMod, QHY CCD (QHY9 as main CCD, and QHY5 as guider), Baader SteelDrive focuser, and you'd also like the use the joystick to control your mount. In this case, you'd run INDI server on RPi as following:

```shell

indiserver -v indi_eqmod_telescope indi_qhy_ccd indi_steeldrive_focus indi_joystick
```

[](/images/ekos/rpi/indi_on_rpi.png)

As you can see above, we pass the driver executables to INDI server and it runs them. The default INDI server port is 7624.

Now that INDI server is running, it is waiting for INDI clients such as Ekos to connect to it. Fire up KStars on your laptop/desktop, go to Tools menu, and select Ekos. Click the **Options** button and select Ekos icon from left side pane. Set the INDI server host and port. When setting up RPi for the first time, it is recommended to set a static IP address. Enter the RPi IP address and port of INDI server which should be 7624 unless you changed it to something else. If your device is not listed in the combo boxes, you can enter the device name in Ekos options and it will be added.

[](/images/ekos/rpi/ekos_options_remote_names.png)

Next, select the devices from the combo boxes. Click **Start** to connect to the remote INDI server instance. If all goes OK, you will see INDI Control Panel with the devices occupying a tab each.

[](/images/ekos/rpi/ekos_remote_mode.png)

In INDI Control Panel, you can change settings such as which port to connect to for your telescope...etc.

[](/images/ekos/rpi/ekos_indi_control_panel.png)

After you make the necessary changes, if any, click the **Connect** button to connect to your devices. If connection is established, Ekos is ready to be used!

[](/images/ekos/rpi/ekos_online.png)

Congratulations! You made it this far! If you encounter any issues, please report it in the [forums](/forum) and we will try to help you get them resolved!

Clear skies!
