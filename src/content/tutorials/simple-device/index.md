---
title: "Simple device tutorial"
description: "Write the most basic INDI driver: a device that only connects and disconnects."
topic: dev
author: "Jasem Mutlaq"
date: 2012-11-10
legacyUrl: "/develop/tutorials/94-simple-device-tutorial.html"
legacyId: 94
---

In this tutorial we will create the most basic INDI driver: a simple device! The simple device performs no functions, it just connects and disconnects.

All INDI devices inherit from INDI::DefaultDevice. Some specialized classes like INDI::Telescope also inherits from INDI::DefaultDevice and specific telescope drivers then inherit from INDI::Telescope.

Let's checkout the header file for Simple Device, which is included in the INDI Library package

```cpp
#include "indibase/defaultdevice.h"

class SimpleDevice : public INDI::DefaultDevice
{
public:
    SimpleDevice();

protected:
    bool Connect();
    bool Disconnect();
    const char *getDefaultName();

};
```

[](/images/indi/indi_simple_device.png)

Above, we declared a SimpleDevice class and inherited from INDI::DefaultDevice. We declared two functions that are called by the INDI framework when a client wants to Connect to or Disconnect from the device. The last function is called by INDI framework to find out the default name of the device, which may change at run time if necessary.

Let's look now at the implementation of the driver.

```cpp
#include

#include "simpledevice.h"

std::unique_ptr simpleDevice(new SimpleDevice());
```

First, we declare a unique pointer to our class as shown above.

There are six mandatory INDI functions called by the INDI framework that must be declared in **ALL** INDI drivers:

-   ISGetProperties(): Is called when a client wants to retrieve a list of properties from the device.
-   ISNewSwitch: Is called when a client wants to set a new switch value.
-   ISNewText: Is called when a client wants to set a new text value.
-   ISNewNumber: Is called when a client wants to set a new number value.
-   ISNewBLOB: Is called when a client wants to set a new blob (Binary Large Object) value.
-   ISSnoopDevice: Is called when we receive property updates from other drivers we are monitoring for changes.

We then simply pass the calls of the functions above to the SimpleDevice object which will handle them properly.

```cpp
/**************************************************************************************
** Return properties of device.
***************************************************************************************/
void ISGetProperties (const char *dev)
{
 simpleDevice->ISGetProperties(dev);
}

/**************************************************************************************
** Process new switch from client
***************************************************************************************/
void ISNewSwitch (const char *dev, const char *name, ISState *states, char *names[], int n)
{
 simpleDevice->ISNewSwitch(dev, name, states, names, n);
}

/**************************************************************************************
** Process new text from client
***************************************************************************************/
void ISNewText (const char *dev, const char *name, char *texts[], char *names[], int n)
{
 simpleDevice->ISNewText(dev, name, texts, names, n);
}

/**************************************************************************************
** Process new number from client
***************************************************************************************/
void ISNewNumber (const char *dev, const char *name, double values[], char *names[], int n)
{
 simpleDevice->ISNewNumber(dev, name, values, names, n);
}

/**************************************************************************************
** Process new blob from client
***************************************************************************************/
void ISNewBLOB (const char *dev, const char *name, int sizes[], int blobsizes[], char *blobs[], char *formats[], char *names[], int n)
{
    simpleDevice->ISNewBLOB(dev, name, sizes, blobsizes, blobs, formats, names, n);
}

/**************************************************************************************
** Process snooped property from another driver
***************************************************************************************/
void ISSnoopDevice (XMLEle *root)
{
  INDI_UNUSED(root);
}
```

Next we implement the Connect() and Disconnect() functions. We simply inform the client that the device was connected/disconnected successfully and return true.

```cpp
**************************************************************************************
** Client is asking us to establish connection to the device
***************************************************************************************/
bool SimpleDevice::Connect()
{
    IDMessage(getDeviceName(), "Simple device connected successfully!");
    return true;
}

/**************************************************************************************
** Client is asking us to terminate connection to the device
***************************************************************************************/
bool SimpleDevice::Disconnect()
{
    IDMessage(getDeviceName(), "Simple device disconnected successfully!");
    return true;
}
```

Finally we implement the getDefaultName() function that returns, you guessed it, the default name of the device. The device name can be changed in run time, so we must run the default name we want to use.

```cpp
/**************************************************************************************
** INDI is asking us for our default device name
***************************************************************************************/
const char * SimpleDevice::getDefaultName()
{
    return "Simple Device";
}
```

That's all for the most simple INDI device driver! You will also note that SimpleDevice create another tab _Options_, this is created by default for all devices and includes options to load/save configuration in addition to advanced options such as simulation or debugging.
