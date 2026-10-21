---
title: "Controlling your telescope with a joystick"
description: "Drive your telescope with a joystick or gamepad on Linux."
topic: ekos
author: "Jasem Mutlaq"
legacyUrl: "/support/tutorials/135-controlling-your-telescope-with-a-joystick.html"
legacyId: 135
---

INDI library v0.9.7 or above supports joystick integration under Linux. To control your telescope under INDI, you need the following:

-   Wired or wireless controller supported by Linux.
-   Telescope driver that supports joystick integration.

To date, all LX200 based (LX200 GPS, Autostar..etc), Celestron, and EQMOd drivers support joystick integration.

So, how do you control your telescope? In this tutorial, I will be connecting my ThurstMaster Wireless Joystick to an LX200 GPS telescope.

Follow the steps below:

## Start KStars

## Go to _Device Manager_ under the _Tools_ Menu --> _Devices._

## Select your telescope driver from the _Telescope_ devices tree.

## Select the joystick driver from _Auxiliary_ devices tree.

Make sure that both drivers are selected. After selecting the telescope driver, hold _**Ctrl**_, and scroll down to the auxliary tree, expand it, and then select the joystick driver.

## Click _Run Service_

## Connect and test your joystick driver.

[](/images/indi/joystick_connect.png)

Here, the driver connected successfully to the wireless controller, which has three joysticks, and six axis (each joystick has 2 axis), and 13 buttons. Next, we need to see if the driver reads the joystick input property. Click on the monitor tab, and start playing with your joystick:

[](/images/indi/joystick_monitor.png)

As illustrated above, I was moving joystick #1 on my controller, and it showed the angle and magnitude of my motion. The numbers do not matter, what matters is to know which joystick on the physical controller correspond to which property and joystick number # within the driver, because we will use this information to map telescope actions to specific joysticks and buttons on our controller.

## Enable joystick input in the telescope driver

 Next, select the telescope driver tab, then select the Options tab, and Enable the joystick support.

[](/images/indi/telescope_joystick_enable.png)

## Set joystick preference in the telescope driver.

After the joystick is enabled, you will see a new joystick tab appearing in the telescope driver, select the joystick tab and set your settings

[](/images/indi/telescope_joystick_settings.png)

In the LX200 GPS driver, the NSWE Control, which is used to move the telescope North/South/West/East is by default assigned to JOYSTICK_1. Buttons #1 to #4 are assigned to different slew speeds. Finally, button #5 is assigned to the Abort Motion function. Here you can change the settings per your preferences. Just make sure you do not put JOYSTICK\_# where it is expecting buttons and vice versa. How to find out which joystick is which number? You can find this out in the Monitor tab of the joystick driver, just move the joystick you prefer around a bit and check which number it is assigned to by the driver, then simply put the joystick name (JOYSTICK_1, JOYSTICK_2...etc) in the field you wish to map it, and that's it! The same is applicable to buttons.

## Control your telescope!

 Now you are ready to control your telescope! You can test your control by click on the _**Motion Control**_ tab in the telescope driver.

[](/images/indi/telescope_joystick_motion.png)

Here I am commanding the telescope to move Northeast by simply moving the joystick in that direction. You have to keep the joystick pressed in that direction for the telescope motion to be continuous. If you release the joystick, the telescope motion is stopped.
