---
title: "Time lapse astrophotography with INDI and Python"
description: "Write a simple Python time lapse script for an INDI camera."
topic: dev
author: "fehlfarbe"
date: 2017-07-11
legacyUrl: "/develop/tutorials/151-time-lapse-astrophotography-with-indi-python.html"
legacyId: 151
---

In this tutorial we create a simple time lapse capture script with Python for an INDI CCD camera. It works with both Python2 and Python3.

First, we need to install some needed packages for Python INDI wrapper pyindi-client.

If you run Ubuntu or Debian just install the packages with:

```shell
sudo apt-get install indi-full swig libcfitsio-dev libnova-dev
```

If you use a Raspberry PI, just install [INDI Library for Raspberry PI](/download/category/6-raspberry-pi.html) instead of indi-full.

For Python2 support install Python2 headers and pip:

```shell
sudo apt-get install python-dev python-pip
```

For Python3 support install Python3 headers and pip3:

```shell
sudo apt-get install python3-dev python3-pip
```

Then we can install the INDI wrapper for Python2 with pip:

```shell
sudo pip install pyindi-client
```

Or for Python3 with pip3:

```shell
sudo pip3 install pyindi-client
```

A Python script is needed to test the wrapper. So we create a Python file client.py and add a simple IndiClient that prints new devices and properties to the terminal:

```python
import sys, time, logging
import PyIndi

class IndiClient(PyIndi.BaseClient):
    def __init__(self):
        super(IndiClient, self).__init__()
        self.logger = logging.getLogger('PyQtIndi.IndiClient')
        self.logger.info('creating an instance of PyQtIndi.IndiClient')
    def newDevice(self, d):
        self.logger.info("new device " + d.getDeviceName())
    def newProperty(self, p):
        self.logger.info("new property "+ p.getName() + " for device "+ p.getDeviceName())
    def removeProperty(self, p):
        self.logger.info("remove property "+ p.getName() + " for device "+ p.getDeviceName())
    def newBLOB(self, bp):
        self.logger.info("new BLOB "+ bp.name)
    def newSwitch(self, svp):
        self.logger.info ("new Switch "+ svp.name + " for device "+ svp.device)
    def newNumber(self, nvp):
        self.logger.info("new Number "+ nvp.name + " for device "+ nvp.device)
    def newText(self, tvp):
        self.logger.info("new Text "+ tvp.name + " for device "+ tvp.device)
    def newLight(self, lvp):
        self.logger.info("new Light "+ lvp.name + " for device "+ lvp.device)
    def newMessage(self, d, m):
        #self.logger.info("new Message "+ d.messageQueue(m))
        pass
    def serverConnected(self):
        print("Server connected ("+self.getHost()+":"+str(self.getPort())+")")
    def serverDisconnected(self, code):
        self.logger.info("Server disconnected (exit code = "+str(code)+","+str(self.getHost())+":"+str(self.getPort())+")")

logging.basicConfig(format='%(asctime)s %(message)s', level=logging.INFO)

# instantiate the client
indiclient=IndiClient()
# set indi server localhost and port 7624
indiclient.setServer("localhost",7624)
# connect to indi server
print("Connecting to indiserver")
if (not(indiclient.connectServer())):
     print("No indiserver running on "+indiclient.getHost()+":"+str(indiclient.getPort())+" - Try to run")
     print("  indiserver indi_simulator_telescope indi_simulator_ccd")
     sys.exit(1)

# start endless loop, client works asynchron in background
while True:
    time.sleep(1)
```

Now we can test the wrappers. Open a second terminal and start an indi server with the CCD Simulator:

```shell
indiserver -v indi_simulator_ccd
```

Then switch to the first terminal and run the client script:

```shell
python client.py
```

The script will connect to your indiserver on localhost and prints connected devices and their properties. The output for CCD Simulatoir should look like this:

```text
2017-07-11 22:08:21,984 creating an instance of PyQtIndi.IndiClient
Connecting to indiserver
Server connected (localhost:7624)
2017-07-11 22:08:21,993 new device CCD Simulator
2017-07-11 22:08:21,995 new property CONNECTION for device CCD Simulator
2017-07-11 22:08:21,998 new property DRIVER_INFO for device CCD Simulator
2017-07-11 22:08:22,001 new property DEBUG for device CCD Simulator
2017-07-11 22:08:22,002 new property CONFIG_PROCESS for device CCD Simulator
2017-07-11 22:08:22,002 new property ACTIVE_DEVICES for device CCD Simulator
2017-07-11 22:08:22,003 new property SIMULATOR_SETTINGS for device CCD Simulator
2017-07-11 22:08:22,004 new property ON_TIME_FACTOR for device CCD Simulator
```

But how to get images from the camera? It's easy, beacuse we alredy have a client. The client inherits from INDI BaseClient and implements the virtual functions. These functions are called when the server sends information like new numbers (newNumber), new devices (newDevice) and so on. At the moment the new values are just printed to the terminal.

The code connects to the server and then it prevents the program from terminating with an endless loop (the client runs asynchronous in the background). If the connection was successfull, you will see some new properties. Now you can connect from another client for example Ekos to your INDI server. Connect Ekos to **remote** (localhost, 7624) and then connect to the CCD Simulator and change some settings (set exposure, gain etc.). You will see the server answers in Ekos and in your Python client.

To start an exposure with the Python client we have to connect our CCD camera and then set the "CCD_EXPOSURE" to a value > 0.

At first we just add a member variable "device" to our client:

```python
class IndiClient(PyIndi.BaseClient):
    device = None
```

Then we edit the newDevice() function. This function is called when a new device is detected. We just test if the device is the CCD Simulator and then we save a reference in our member variable "device":

```python
def newDevice(self, d):
    self.logger.info("new device " + d.getDeviceName())
    if d.getDeviceName() == "CCD Simulator":
        self.logger.info("Set new device CCD Simulator!")
        # save reference to the device in member variable
        self.device = d
```

Next step is to connect to CCD Simulator. We just wait for the CONNECTION property of CCD Simulator, connect to the device, set BLOB mode so we can get BLOBs (image data) and then we wait for the new property CCD_EXPOSURE by editing the newProperty() function:

```python
def newProperty(self, p):
    self.logger.info("new property "+ p.getName() + " for device "+ p.getDeviceName())
    if self.device is not None and p.getName() == "CONNECTION" and p.getDeviceName() == self.device.getDeviceName():
        self.logger.info("Got property CONNECTION for CCD Simulator!")
        # connect to device
        self.connectDevice(self.device.getDeviceName())
        # set BLOB mode to BLOB_ALSO
        self.setBLOBMode(1, self.device.getDeviceName(), None)
    if p.getName() == "CCD_EXPOSURE":
        # take first exposure
        self.takeExposure()
```

If CCD_EXPOSURE property was found, we call takeExposure(). in takeExposure() we just get the CCD_EXPOSURE property, set a new exposure time and send it back to the server/client:

```python
def takeExposure(self):
    self.logger.info("<<<<<<<< Exposure >>>>>>>>>")
    #get current exposure time
    exp = self.device.getNumber("CCD_EXPOSURE")
    # set exposure time to 5 seconds
    exp[0].value = 5
    # send new exposure time to server/device
    self.sendNewNumber(exp)
```

Now the CCD starts a new exposure and the newNumber() function is called every second. When the exposure finished, the newBlob() function with our image data is called. We just extract the image data from the BLOB and save it to a fits file ("frame.fit") on our harddisk. Then we start a new exposure:

```python
    def newBLOB(self, bp):
        self.logger.info("new BLOB "+ bp.name)
        # get image data
        img = bp.getblobdata()
        # write image data to BytesIO buffer
        import io
        blobfile = io.BytesIO(img)
        # open a file and save buffer to disk
        with open("frame.fit", "wb") as f:
            f.write(blobfile.getvalue())
        # start new exposure
        self.takeExposure()
```

That's it! The whole script should now look like this:

```python
import sys, time, logging
import PyIndi

class IndiClient(PyIndi.BaseClient):

    device = None

    def __init__(self):
        super(IndiClient, self).__init__()
        self.logger = logging.getLogger('PyQtIndi.IndiClient')
        self.logger.info('creating an instance of PyQtIndi.IndiClient')
    def newDevice(self, d):
        self.logger.info("new device " + d.getDeviceName())
        if d.getDeviceName() == "CCD Simulator":
            self.logger.info("Set new device CCD Simulator!")
            # save reference to the device in member variable
            self.device = d
    def newProperty(self, p):
        self.logger.info("new property "+ p.getName() + " for device "+ p.getDeviceName())
        if self.device is not None and p.getName() == "CONNECTION" and p.getDeviceName() == self.device.getDeviceName():
            self.logger.info("Got property CONNECTION for CCD Simulator!")
            # connect to device
            self.connectDevice(self.device.getDeviceName())
            # set BLOB mode to BLOB_ALSO
            self.setBLOBMode(1, self.device.getDeviceName(), None)
        if p.getName() == "CCD_EXPOSURE":
            # take first exposure
            self.takeExposure()
    def removeProperty(self, p):
        self.logger.info("remove property "+ p.getName() + " for device "+ p.getDeviceName())
    def newBLOB(self, bp):
        self.logger.info("new BLOB "+ bp.name)
        # get image data
        img = bp.getblobdata()
        # write image data to BytesIO buffer
        import io
        blobfile = io.BytesIO(img)
        # open a file and save buffer to disk
        with open("frame.fit", "wb") as f:
            f.write(blobfile.getvalue())
        # start new exposure
        self.takeExposure()
    def newSwitch(self, svp):
        self.logger.info ("new Switch "+ svp.name + " for device "+ svp.device)
    def newNumber(self, nvp):
        self.logger.info("new Number "+ nvp.name + " for device "+ nvp.device)
    def newText(self, tvp):
        self.logger.info("new Text "+ tvp.name + " for device "+ tvp.device)
    def newLight(self, lvp):
        self.logger.info("new Light "+ lvp.name + " for device "+ lvp.device)
    def newMessage(self, d, m):
        #self.logger.info("new Message "+ d.messageQueue(m))
        pass
    def serverConnected(self):
        print("Server connected ("+self.getHost()+":"+str(self.getPort())+")")
    def serverDisconnected(self, code):
        self.logger.info("Server disconnected (exit code = "+str(code)+","+str(self.getHost())+":"+str(self.getPort())+")")
    def takeExposure(self):
        self.logger.info(">>>>>>>>")
        #get current exposure time
        exp = self.device.getNumber("CCD_EXPOSURE")
        # set exposure time to 5 seconds
        exp[0].value = 5
        # send new exposure time to server/device
        self.sendNewNumber(exp)

logging.basicConfig(format='%(asctime)s %(message)s', level=logging.INFO)

# instantiate the client
indiclient=IndiClient()
# set indi server localhost and port 7624
indiclient.setServer("localhost",7624)
# connect to indi server
print("Connecting to indiserver")
if (not(indiclient.connectServer())):
     print("No indiserver running on "+indiclient.getHost()+":"+str(indiclient.getPort())+" - Try to run")
     print("  indiserver indi_simulator_telescope indi_simulator_ccd")
     sys.exit(1)

# start endless loop, client works asynchron in background
while True:
    time.sleep(1)
```

At the moment we overwrite the fits file with every new image but you can change the name to current datetime or whatever to create a timelapse sequence.
