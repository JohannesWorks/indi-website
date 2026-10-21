---
title: "How to run INDI on Windows"
description: "Run INDI on Windows with WSL."
topic: setup
author: "Ken Self"
date: 2025-05-15
legacyUrl: "/develop/tutorials/234-how-to-run-indi-on-windows.html"
legacyId: 234
---

How to run INDI on Windows

You need:

1.  Windows 11 (Build 22000 or later)
2.  A machine with an x64 processor. (x86 and Arm64 are currently not supported)
3.  WSL installed and set up with the latest version
4.  Linux distribution installed and set to WSL 2
5.  Linux kernel version of 5.10.60.1 or higher

Install WSL on Windows. We assume a fresh installation here. If WSL is already installed you can remove and reinstall, upgrade or add an additional WSL environment. Details at:[https://learn.microsoft.com/en-us/windows/wsl/setup/environment](https://learn.microsoft.com/en-us/windows/wsl/setup/environment)

Open a Powershell terminal in Admin mode.

```text
wsl --install
```

The --install command performs the following actions:

1.  Enables the optional WSL and Virtual Machine Platform components
2.  Downloads and installs the latest Linux kernel
3.  Sets WSL 2 as the default
4.  Downloads and installs the Ubuntu Linux distribution (reboot may be required)

Open the Ubuntu istallation from the Start menu. This opens a terminal window for Ubuntu and initially prompts you to create a User Name and Password. This account will be your default user for your Ubuntu installation and automatically logs in when you launch Ubuntu. It is also the Linux administrator, with the ability to run sudo (Super User Do) administrative commands.

You now have a working Ubuntu installation. You can enter Linux commands in the terminal. You can also enter Linux commands from a Powershell windos by prefixing the command with "wsl" e.g: Run the Linux "ls" command to list files:

```text
wsl ls
```

You can shutdown WSL from Powershell

```text
wsl --shutdown
```

Set up for USB

You now need to download and install the usbipd-win installer (.msi) so Windows can share its USB ports with WSL. Details at: [https://learn.microsoft.com/en-us/windows/wsl/connect-usb](https://learn.microsoft.com/en-us/windows/wsl/connect-usb)

1.  Open[https://github.com/dorssel/usbipd-win/releases](https://github.com/dorssel/usbipd-win/releases)in your Windows web browser
2.  Identify the required installer to download e.g. usbipd-win_5.0.0_x64.msi
3.  Click to download the installer
4.  Run the installer and follow the instructions

Make USB devices accessible to WSL

1.  Open a Powershell terminal and list connected USB devices

    ```text
    usbipd list
    ```

2.  Note the BUSID of each one you want to use in WSL
3.  For each BUSID:

    ```text
    usbipd bind --busid N-N
    usbipd attach --wsl --busid N-N
    ```

4.  Check USB status in WSL

    ```text
    wsl lsusb
    ```

You are now ready to install INDI as you would with any other Linux system

Open the Ubuntu terminal window from the Start menu.

```shell
sudo apt-add-repository ppa:mutlaqja/ppa
sudo apt-get update
sudo apt-get -y install indi-full gsc

```

Install INDI Web Manager (optional but recommended)

```shell
sudo apt-get -y install python3-pip python-is-python3
sudo -H pip3 install indiweb
wget https://raw.githubusercontent.com/knro/indiwebmanager/master/indiwebmanager.service
sed -i 's/pi/myusername/' indiwebmanager.service
sudo cp indiwebmanager.service /etc/systemd/system/
sudo chmod 644 /etc/systemd/system/indiwebmanager.service
sudo systemctl daemon-reload
sudo systemctl enable indiwebmanager.service
```

Get the IP address of your WSL installation. You need this to connect to INDI

```text
hostname -I
```

In your browser you can access INDI Web Manager at http://\[WSL IP address\]:8624

Note that indiwebmanager.service does not always start reliably. If not, then from the Ubuntu terminal

```shell
sudo systemctl restart indiwebmanager.service
```

Alternatively you can start INDI server from the command line

```shell
indiserver [driver name]
```

You can also install and run the Linux version of Kstars/EKOS with WSL

For this you need to install the relevant Linux graphics driver for your device into WSL. The specifics depend on what graphics hardware you have on your computer. Full details at: [https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps)

When the graphics driver is installed

```shell
sudo apt-get install kstars-bleeding
```

This adds Kstars to your Windows Start menu as Kstars (Ubuntu).

Launch Kstars then set up EKOS as usual. If using INDI Web Manager, set up the profile as Remote with the WSL IP address noted before
