---
title: "DBus scripting with KStars and Python"
description: "Script KStars and INDI devices from Python over DBus."
topic: dev
author: "Jasem Mutlaq"
date: 2014-12-23
legacyUrl: "/develop/tutorials/148-dbus-scripting-with-kstars-python.html"
legacyId: 148
---

[DBUS](http://www.freedesktop.org/wiki/Software/dbus/) is a very powerful and versatile inter-process communication system used in Linux and other OSes. With KStars (>v.2.3.0), it exposes a new INDI DBUS interface in addition to the existing [KStars's DBUS](http://api.kde.org/4.x-api/kdeedu-apidocs/kstars/html/classKStars.html) interface giving you a fine control over most of KStars functionality.

In this tutorial, we will learn how to perform basic control of a telescope and CCD using DBUS and Python. We will utilize an external FITS viewer **fv**, you can install it in Ubuntu:

```shell
sudo apt-get install ftools-fv
```

The complete Python script can be [downloaded](/jdownloads/Source/indidbus.py), to run it, simply run KStars first, then execute the script:

```shell
python indidbus.py
```

We begin by starting a session bus and obtaining a remote object instance to KStars/INDI interface. DBUS can introspect the interface and prints all available methods as shown below.

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

# You must initialize the gobject/dbus support for threading
# before doing anything.
import gobject
import os
import time

gobject.threads_init()

from dbus import glib
glib.init_threads()

# Create a session bus.
import dbus
bus = dbus.SessionBus()

# Create an object that will proxy for a particular remote object.
remote_object = bus.get_object("org.kde.kstars", # Connection name
                               "/KStars/INDI" # Object's path
                              )

# Introspection returns an XML document containing information
# about the methods supported by an interface.
print ("Introspection data:\n")
print remote_object.Introspect()
```

Next, we obtain a handle to the INDI interface that we will use thorough out the script to call methods and get results back.

```text
# Get INDI interface
iface = dbus.Interface(remote_object, 'org.kde.kstars.INDI')
```

We define our target devices as we plan to run the Telescope and CCD simulators

```text
myDevices = [ "indi_simulator_telescope", "indi_simulator_ccd" ]
```

We make our first call to the INDI interface, and we ask it to start an INDI server on port 7624 with our devices

```text
# Start INDI devices
iface.start("7624", myDevices)

print "Waiting for INDI devices..."

# Create array for received devices
devices = []

while True:
    devices = iface.getDevices()
    if (len(devices) < len(myDevices)):
        time.sleep(1)
    else:
        break;

print "We received the following devices:"
for device in devices:
    print device
```

Above, we invoke the getDevices() method which returns an array of devices, and we wait until all the devices are received. Please note that devices are not necessarily received in order, i.e. telescope first followed by CCD. It can be in any order. Furthermore, I didn't implement any timeout or error checking above, please do not forget to check for errors when building DBUS scripts.

Next, we establish a connection to the telescope and CCD. Note that we utilize methods to **set** the value of a property, but the value is not sent to the INDI server unless we use the **sendProperty** method. You must be familiar with [INDI properties](/develop/developer-manual/91-introduction-to-indi.html), and in particular INDI [Standard Properties](/develop/developer-manual/101-standard-properties.html) before you can write any useful script.

```text
print "Establishing connection to Telescope and CCD..."

# Set connect switch to ON to connect the devices
iface.setSwitch("Telescope Simulator", "CONNECTION", "CONNECT", "On")
# Send the switch to INDI server so that it gets processed by the driver
iface.sendProperty("Telescope Simulator", "CONNECTION")
# Same thing for CCD Simulator
iface.setSwitch("CCD Simulator", "CONNECTION", "CONNECT", "On")
iface.sendProperty("CCD Simulator", "CONNECTION")

telescopeState = "Busy"
ccdState       = "Busy"

# Wait until devices are connected
while True:
    telescopeState = iface.getPropertyState("Telescope Simulator", "CONNECTION")
    ccdState       = iface.getPropertyState("CCD Simulator", "CONNECTION")
    if (telescopeState != "Ok" or ccdState != "Ok"):
        time.sleep(1)
    else:
        break

print "Connected to Telescope and CCD is established."
```

Above, after we connected, we inquired about the state of the CONNECTION property. Once we established it is **Ok**, we can proceed.

When we command the telescope, we need to send the Epoch of Date (EOD) coordinates or JNow. The following coordinates are the approximate coordinate for Caph at the time of writing this tutorial.

```text
print "Commanding telescope to slew to coordinates of star Caph..."

# Set Telescope RA,DEC coords in JNOW
iface.setNumber("Telescope Simulator", "EQUATORIAL_EOD_COORD", "RA", 0.166)
iface.setNumber("Telescope Simulator", "EQUATORIAL_EOD_COORD", "DEC", 59.239)
iface.sendProperty("Telescope Simulator", "EQUATORIAL_EOD_COORD")

# Wait until slew is done
telescopeState = "Busy"
while True:
    telescopeState = iface.getPropertyState("Telescope Simulator", "EQUATORIAL_EOD_COORD")
    if (telescopeState != "Ok"):
        time.sleep(1)
    else:
        break

print "Telescope slew is complete, tracking..."
```

As with before, we wait until the property state turns to **Ok**

Next, we take a 5 second exposure

```text
print "Taking a 5 second CCD exposure..."

# Take 5 second exposure
iface.setNumber("CCD Simulator", "CCD_EXPOSURE", "CCD_EXPOSURE_VALUE", 5.0)
iface.sendProperty("CCD Simulator", "CCD_EXPOSURE")

# Wait until exposure is done
ccdState       = "Busy"
while True:
    ccdState = iface.getPropertyState("CCD Simulator", "CCD_EXPOSURE")
    if (ccdState != "Ok"):
        time.sleep(1)
    else:
        break

print "Exposure complete"
```

After exposure is complete, KStars stores the captured FITS image in a temporary file. We have two methods to access BLOB data. The first method is to obtain the filename where the BLOB data is currently stored. Please note that not all BLOB data are stored by KStars into files (such as video streams) and for BLOBs that are updated very frequently (> 1 Hz), the filename might already point to the next BLOB segment and might not be current. But for regular FITS images, the filename method is more than sufficient. The other DBUS method getBLOBData returns the BLOB raw data. This might be inefficient for large blobs as DBUS is not optimized to transfer large amounts of data.

Next we obtain the filename of the blob (CCD1.CCD1 is the primary CCD whereas CCD2.CCD2 is the guide CCD chip if available). We pass the filename to the external **fv** tool.

```text
# Get image file name and open it in external fv tool
fileinfo = iface.getBLOBFile("CCD Simulator", "CCD1", "CCD1")
print "We received file: ", fileinfo[0], " with format ", fileinfo[1], " and size ", fileinfo[2]

print "Invoking fv tool to view the received FITS file..."
# run external fits viewer
command = "fv " + fileinfo[0]
os.system(command)
```

After closing the fv tool, the script continues execution and we finally send a command to shutdown the INDI server running on port 7624

```text
print "Shutting down INDI server..."
# Stop INDI server
iface.stop("7624")
```

That's a very basic tutorial illustrating the capabilities of DBUS scripting with Python in KStars. If you have any questions or suggestions or scripts you'd like to share, please let us know in INDI [forums](/forum.html)!
