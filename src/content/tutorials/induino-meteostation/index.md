---
title: "Build the induino MeteoStation"
description: "Configure, wire, print and assemble an Arduino weather station for INDI."
topic: diy
author: "Magnus"
cover: "./1-select_board.webp"
legacyUrl: "/support/tutorials/177-howto-configure-compile-wire-print-and-assemble-the-induino-meteostation.html"
legacyId: 177
---

Page 1 of 4

* * *

## Summary

The induino MeteoStation is a complete weather station with arduino firmware, indilib driver and a webinterface with current status and graphs that range back in time from 3 hours to one month.
The indilib driver is capable of issuing alerts, like daytime, clouded, frezzing and more. Indi clients will react to alerts and can be configured to close your observatory and stop the imaging session in unsafe conditions.
MeteoStation does not have a wind or rain sensor, but can be used in combination with wunderground weather trough Meta weather for an extended weather service. There is also seldom rain without the detection of clouds.

This howto will show you how to setup and build the induino meteostation.
I will use the Adafruit Trinket Pro 5v, but other compatible arduinos could be used.
Keep in mind that the SDA and SDL ports are used for the Ir and pressure sensor. Digital pin 3 is used for the humidity sensor and analog 0 for the ir radiance sensor.
For the Trinket pro we will also use ground, 5v, RX and TX of the FTDI header, as the Trinket does not support serial console over the USB port.

Meteostation can be used as a ‘standalone’ weather station for any none observatory use. This could be a raspberry pi or almost any other linux box running apache with indilib installed locally.

## Short on configuring the Arduino IDE

First you must set up the Arduino IDE with the Adafruit Pro Trinket board configuration.
Follow the steps on Adafruit’s web page to add the boards.

See Adafruit’s [IDE Setup](https://learn.adafruit.com/adafruit-arduino-ide-setup/arduino-1-dot-6-x-ide) for ‘Additional Boards Manager URL’

![arduino-board](./1-select_board.webp)

If you are using a FTDI cable with no software reset, you can skip adding the port.
When you want to upload the firmware, start off by compiling the sceatch \[Ctrl + R\] then connect the USB to FTDI dongle to your pc and hit \[Ctrl + U\] to upload.

The IDE will autoselect the /dev/ttyUSBX port.

![no-port](./2-no_port.webp)

If the autodetect fails, then connect the dongle, select port and short out the ground and reset pin on the FTDI header. This will reset / reboot the arduino and put it in upload mode.

## Soddering and connecting the sensors

The pins being used is marked out with red centers.

-   A0 (Analog 0) is IR Radiance input
-   SDA and SCL (A4 and A5) is used for MLX90614 (IR) sensor and BMP 180 (pressure) sensor
-   3 (Digital 3) is used for the DHT22 (humidity) sensor
-   The FTDI header is used for serial to USB connection

The pins with green centers are the FTDI reset pins. This will reboot board and put it in upload mode.

![pinout](./3-pinout.png)

If you are building this device with the hardware used in this tutorial, you will not need to change any pinnnumbers in the firmware. For links to the hardware being used, see the last section of this tutorial.

When setting up for the first time I woud ideally just sodder the pins on the underside of the arduino, place it on a breakout board and have easy access to test the sensors. I ended up by soddering on some of the pins and using wires with connectors. Before completing the build I did have to remove the pins I added for gnd and +5v and sodder the wires, as it was using to mutch space.

![soddering](./4-soddering.webp)

![connecting](./5-connecting.webp)

## Configuring, compiling, uploading and debuuging meteoTEST

Start out by not changing anything in the firmware, compile and upload, then open the Serial Monitor \[Ctrl + Shift + M\]

If you see a output like this, the you are good to go. Double check that the sensor values change when you subjet them to temperature, light and humidity changes.

![define-sensors](./3-serial_monitor.png)

If you see no output at all, then the firmware might have crashed before you connected the serial monitor.
To verify that you have compiled and uploaded the firmware correctly, then comment out all the `#define USE_*_Sensor` and upload again. If you see a output in the monitor with (X sensor skipped, not defined, ending with a RESULT with all 0 values), then you can start adding the sensors back, until you see witch fails.
When the failing sensor is located, then it’s just a matter of checking wiring and pinouts.

![define-sensors](./1-define_sensors.webp)

If you are not using the default pins, then they can be changed in the firmware.

![define-sensors](./2-define_pins.webp)

You do not need to edit anything else in the firmware!

## Configuring, compiling and uploading induinoMETEO

The compiling and upload part of this is the same as for the meteoTEST firmware, but there are more configuration that can be done.

Let’s start off with the sensors used. I do recomend that if you are for some reason not using a sensor, then comment out the definition of it.

![define-use](./1-define_use.webp)

Below 0 celcius is of cource considered frezzing, but you can change it.
I’m imaging in Norway and most of the time during winter, the temperatures will be below 0 degrees. When the firmware detects temperatures below the set value, then the frezzing pin will be set to true. As this is an alert in the indi_duino meteo driver, then clients will react to unsafe eather conditions. I will set mine to -10, but you know best what you need.

![define-frezzing](./2-define_frezzing.webp)

Next is to select witch sensor we should use for ambient temperature. In my installation i found that the BMP 180 gave the best result. You should in most cases be good by leaving this as it is.

![define-t](./3-define_t.webp)

Using a different pin for DHT22? Then update here.

![define-dhtpin](./4-define_dhtpin.webp)

As there are many options of small and low power colar cells, then it is not possible to know what reading yours will have when the sun is setting. To get the correct value for this, then simply check the readout of the irradiance sensor, just after the sun sets under the horizon. This will give you a Daytime alert in the meteo driver, so you know not to open your observatory roof (and or dustcap).

![define-daylight](./5-define_daylight.webp)

Using a different pin for Ir radiance? Update accordingly.

![define-irradiancepin](./6-define_irradiancepin.webp)

If you are either reading a cloud cover when there are no clouds visible to the sensor, or you have a full overcast with the sensor reporting less than 100% clods, then you can edit this.

![define-cloud](./7-define_cloud.webp)

Depending on your use, you might want a clouded warning when it’s more than 15% clods, or you might be happy with less than 50%? Edit this value to customize the alert (cloud flag).

![define-cloud-pnt](./8-define_cloud_pcnt.webp)

-   [Next](/support/tutorials/177-howto-configure-compile-wire-print-and-assemble-the-induino-meteostation.html?start=1 "Connecting to MeteoStation")
