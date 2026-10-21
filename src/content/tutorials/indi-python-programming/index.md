---
title: "INDI Python programming"
description: "Install and use the pyindi-client Python bindings."
topic: dev
author: "Jean-Luc"
legacyUrl: "/develop/indi-python-bindings.html"
legacyId: 100
---

This tutorial shows how to install and use the Python [pyindi-client](https://pypi.python.org/pypi/pyindi-client) on a Rapberry Pi 2 or 3 running an Ubuntu distribution. It has been made using the [Ubuntu Classic image for Raspberry Pi](https://developer.ubuntu.com/en/snappy/start/raspberry-pi-2/) and also the [Ubuntu MATE for Raspberry Pi](https://ubuntu-mate.org/raspberry-pi/). Both are fresh installs and you will find my [installation notes](#install-notes) at the end of the tutorial (for [Ubuntu Classic](#install-ubuntu) and for [Ubuntu MATE](#install-mate)). It supposes you have a configured network. It also supposes you already perform the first boot on the Raspberry Pi (first boot on [ubuntu](#firstboot-ubuntu), and on [ubuntu mate](#firstboot-mate)). Finally there are two versions of python, Python 2 and Python 3. The pyindi-client wrapper works with both versions, and both versions may coexist if you have the two versions of Python installed. As for any Python module, the pyindi-client should be installed for each version of Python you want to use. I will be using _Python 3_ in this tutorial as this is the default version in Ubuntu 16.04. You may download the tutorial scripts from the repository.

## Prerequisites

### Ubuntu 16.04+

These are the steps I use on the Ubuntu 16.04+ distribution.

1.  install indi library from the Jasem Mutlaq repository ([recommended for Ubuntu](/download/ubuntu.html));

    ```shell
    $ sudo apt-add-repository ppa:mutlaqja/ppa
    $ sudo apt-get update
    $ sudo apt-get install indi-full
    ```

2.  Install Prerequisites:

    ```shell
    $ sudo apt-get install swig libz3-dev libcfitsio-dev libnova-dev
    ```

### Install pyindi-client

pyindi-client is now distributed through the [Python Package Index](https://pypi.python.org/pypi). The pip default scheme in Ubuntu is to use a per-user installation for Python modules. Then the module will only be available to the `ubuntu` user (which is the only one on the Ubuntu raspberry pi anyway). This is the recommended method. Run the command as the normal user (**not** root nor sudo).

```shell
$ pip3 install --user --install-option="--prefix=" pyindi-client
```

To install the module system-wide, you may use

```shell
$ sudo -H pip3 install --system pyindi-client
```

Use `pip2` and install `swig2` for a Python 2.7 installation.

_I still have to refine the `setup.py` file in the pip distribution._

## Programming with PyINDI

INDI philosophy is to manage a collection of _devices_ through properties: a _property_ is a (set of) typed value and is aimed to reflect a particular aspect of a device. Properties may be texts, numbers, switchs, lights and blobs (Binary Large Objects). They are tightly coupled to a device, and managed by the device _driver_. Here are the [standard properties](/develop/developer-manual/101-standard-properties.html) used in Astronomy. An _indi server_ talks to a set of devices and centralizes their properties for use by _clients_ (or other _snooping_ drivers). In this scheme, a client may only have two actions with regard to a property:

1.  receives the property values as they change along time
2.  asks the driver to change the property value (with no insurance the change will be effective)

As the property values are managed by device drivers, their changes occur asynchronously from the client point of view. Hence the first aspect when programming an INDI client is to define its behavior upon receiving new property values: the libindi framework encapsulates this aspect with the definition of `new*` _virtual_ functions (`newText`, `newNumber`, ...). These functions are automatically called by a listening thread connected to the indi server. Being virtual, you must define these functions in every INDI clients, hence in a pyindi-client.

The second aspect, i.e. changing properties values, is handled by the libindi framework through the use of `sendNew*` functions (`sendNewText`, `sendNewNumber`, ...). They may be called anywhere in the client code.

### A minimal script

Hence the minimal pyndi-client code will look like the code below. Note that before executing this program you should launch an `indiserver` instance on your localhost.

```shell
$ indiserver indi_simulator_ccd indi_simulator_telescope
```

```python
import PyIndi

class IndiClient(PyIndi.BaseClient):
    def __init__(self):
        super(IndiClient, self).__init__()
    def newDevice(self, d):
        pass
    def newProperty(self, p):
        pass
    def removeProperty(self, p):
        pass
    def newBLOB(self, bp):
        pass
    def newSwitch(self, svp):
        pass
    def newNumber(self, nvp):
        pass
    def newText(self, tvp):
        pass
    def newLight(self, lvp):
        pass
    def newMessage(self, d, m):
        pass
    def serverConnected(self):
        pass
    def serverDisconnected(self, code):
        pass

indiclient=IndiClient()
indiclient.setServer("localhost",7624)

indiclient.connectServer()
while (1):
    pass

```

This program defines an `IndiClient` class which inherits from `PyIndi.BaseClient`. This class should implement all virtual functions defined in its parent (all `new*` functions, plus `serverConnected` and `serverDisconnected`). In our case all these functions do nothing. In the main program, we instantiate an `indiclient` object of that class, define the indi server host and port for that client, and connects to the indi server. The program then loops forever. At that point your python program is connected to the server, receiving every indi messages in a separate thread. This thread executes the `new*` methods defined in the class above (which do nothing). At the same time the Python main thread (your main program) loops indefinitely. As it is, this minimal program won't display anything but eat your cpu time for nothing. Hit ctrl-C to kill it.

### How to get and set properties

Firstly, we want to display the property values of a given device as they change along time. The simplest way to achieve this is to put `print` statements in every `new*` functions. This is made possible as the `swig` Python wrapper encapsulates our `new*` functions with a `lock/release` of the Python Global Interpreter Lock. Have in mind that these functions are called from a C function running in a C created thread (that the Python interpreter does not know of). The [`testindiclient.py`](https://sourceforge.net/p/pyindi-client/code/HEAD/tree/trunk/pip/pyindi-client/examples/testindiclient.py) example acts in this way. We also use this method for new devices and new properties in the code below. The main drawback of this method is that all the machinery of your application will live in the C receiving thread, which may slow down the reception of messages from the indi server. Another way is to use global Python variables for the `new*` functions signal the Python main thread that a new value has arrived. In this case, the machinery of your application will stay in the Python main thread. The drawback here is that it requires an active polling of those global variables in the Python main thread, leading to a 100% CPU process, whatever you do (but you may sleep between polling). We use that method in the code below for Number properties. The last method is to use some signalling/event framework: Python offers an `Event` class in the `threading` module. We will use this method in the next example to catch blobs. If you are using PyQt, it would be better to use the Qt signalling mechanism.

Secondly we want to set the value of a property. INDI Properties are grouped into vectors (even if there is only one value), which are implemented as arrays in the C libindi libraries. The pyindi-client wrapper maps those arrays into Python **iterables**: it defines a `__getitem__` function and a `__len__` function for the Property vector types. Hence you may index a property vector `p` (`p[0].value=3.0`), get its length (`len(p)`) or iterate over it (`for item in p: print(item.name)`). We use the index notation with the `CONNECTION` property vector to connect the device in the code below.

```python
import PyIndi
import time

class IndiClient(PyIndi.BaseClient):
    def __init__(self):
        super(IndiClient, self).__init__()
    def newDevice(self, d):
        global dmonitor
        # We catch the monitored device
        dmonitor=d
        print("New device ", d.getDeviceName())
    def newProperty(self, p):
        global monitored
        global cmonitor
        # we catch the "CONNECTION" property of the monitored device
        if (p.getDeviceName()==monitored and p.getName() == "CONNECTION"):
            cmonitor=p.getSwitch()
        print("New property ", p.getName(), " for device ", p.getDeviceName())
    def removeProperty(self, p):
        pass
    def newBLOB(self, bp):
        pass
    def newSwitch(self, svp):
        pass
    def newNumber(self, nvp):
        global newval
        global prop
        # We only monitor Number properties of the monitored device
        prop=nvp
        newval=True
    def newText(self, tvp):
        pass
    def newLight(self, lvp):
        pass
    def newMessage(self, d, m):
        pass
    def serverConnected(self):
        pass
    def serverDisconnected(self, code):
        pass

monitored="Telescope Simulator"
dmonitor=None
cmonitor=None

indiclient=IndiClient()
indiclient.setServer("localhost",7624)

# we are only interested in the telescope device properties
indiclient.watchDevice(monitored)
indiclient.connectServer()

# wait CONNECTION property be defined
while not(cmonitor):
    time.sleep(0.05)

# if the monitored device is not connected, we do connect it
if not(dmonitor.isConnected()):
    # Property vectors are mapped to iterable Python objects
    # Hence we can access each element of the vector using Python indexing
    # each element of the "CONNECTION" vector is a ISwitch
    cmonitor[0].s=PyIndi.ISS_ON  # the "CONNECT" switch
    cmonitor[1].s=PyIndi.ISS_OFF # the "DISCONNECT" switch
    indiclient.sendNewSwitch(cmonitor) # send this new value to the device

newval=False
prop=None
nrecv=0
while (nrecv<10):
    # we poll the newval global variable
    if (newval):
        print("newval for property", prop.name, " of device ",prop.device)
        # prop is a property vector, mapped to an iterable Python object
        for n in prop:
            # n is a INumber as we only monitor number vectors
            print(n.name, " = ", n.value)
        nrecv+=1
        newval=False

```

This program will display all the currently defined properties of the "Telescope Simulator" device, and then the first ten changes occuring in any Number property of that device. Actually if the scope is not tracking (as it should be the case if you don't do anything with it), only the "EQUATORIAL_EOD_COORD" property wil evolve during time. Thus the program will simply display these RA/DEC coordinates.

Note how we connect the telescope with the `sendNewSwitch` function using the "CONNECTION" property. This property has 2 ISwitch, "CONNECT" and "DISCONNECT", in that order (see the standard properties), which we address using the Python index notation. Each ISwitch corresponds to a C structure, where `s` is the switch state. We use the classical dot notation in Python to address this structure member, yielding the expression `cmonitor[0].s`. Generally speaking, every member of a INDI structure, every member or method of a INDI class is accessed using the Python dot notation. INDI constants are accessed by the way of the `PyIndi` module using the same dot notation (`PyInsi.ISS_ON` in the example above).

I usually edit Python programs with the `idle3` editor distributed alongside Python 3. It offers completion for the expression you're typing which could be a great value when you're lost. You may also use Python help. After importing the PyIndi module (`import PyIndi`), you may use `help(PyIndi)` to get further information about the module. For a specific class, use the class name (`help(PyIndi.ISwitch)` for instance). I plan to integrate the doxygen documentation on the Python side as this is made possible by swig.

### Goto Vega and take some pictures

This is a more complex example of a Python script which performs a goto to a star and then takes a series of images. It uses the Python Event mechanism, and shows how it could be possible to perform some computations during these exposures. I put some comments in the script so it should be self-explainatory.

You should start the indi server with the telescope and the CCD simulator.

```shell
$ indiserver indi_simulator_telescope indi_simulator_ccd

```

Beware that for the `indi_simulator_ccd` to produce a realistic image (not just noise), you need to have installed `gsc`, the Guide Star Catalogue. If you use the Jasem ppa repository, just install it.

```shell
$ sudo apt-get install gsc

```

Finally you may run `kstars` from your desktop to visualize the progress of the script and display the fits images. Just connect to the indi server from `kstars` and have a look.

```python
import PyIndi
import time
import sys
import threading

class IndiClient(PyIndi.BaseClient):
    def __init__(self):
        super(IndiClient, self).__init__()
    def newDevice(self, d):
        pass
    def newProperty(self, p):
        pass
    def removeProperty(self, p):
        pass
    def newBLOB(self, bp):
        global blobEvent
        print("new BLOB ", bp.name)
        blobEvent.set()
        pass
    def newSwitch(self, svp):
        pass
    def newNumber(self, nvp):
        pass
    def newText(self, tvp):
        pass
    def newLight(self, lvp):
        pass
    def newMessage(self, d, m):
        pass
    def serverConnected(self):
        pass
    def serverDisconnected(self, code):
        pass

# connect the server
indiclient=IndiClient()
indiclient.setServer("localhost",7624)

if (not(indiclient.connectServer())):
     print("No indiserver running on "+indiclient.getHost()+":"+str(indiclient.getPort())+" - Try to run")
     print("  indiserver indi_simulator_telescope indi_simulator_ccd")
     sys.exit(1)

# connect the scope
telescope="Telescope Simulator"
device_telescope=None
telescope_connect=None

# get the telescope device
device_telescope=indiclient.getDevice(telescope)
while not(device_telescope):
    time.sleep(0.5)
    device_telescope=indiclient.getDevice(telescope)

# wait CONNECTION property be defined for telescope
telescope_connect=device_telescope.getSwitch("CONNECTION")
while not(telescope_connect):
    time.sleep(0.5)
    telescope_connect=device_telescope.getSwitch("CONNECTION")

# if the telescope device is not connected, we do connect it
if not(device_telescope.isConnected()):
    # Property vectors are mapped to iterable Python objects
    # Hence we can access each element of the vector using Python indexing
    # each element of the "CONNECTION" vector is a ISwitch
    telescope_connect[0].s=PyIndi.ISS_ON  # the "CONNECT" switch
    telescope_connect[1].s=PyIndi.ISS_OFF # the "DISCONNECT" switch
    indiclient.sendNewSwitch(telescope_connect) # send this new value to the device

# Now let's make a goto to vega
# Beware that ra/dec are in decimal hours/degrees
vega={'ra': (279.23473479 * 24.0)/360.0, 'dec': +38.78368896 }

# We want to set the ON_COORD_SET switch to engage tracking after goto
# device.getSwitch is a helper to retrieve a property vector
telescope_on_coord_set=device_telescope.getSwitch("ON_COORD_SET")
while not(telescope_on_coord_set):
    time.sleep(0.5)
    telescope_on_coord_set=device_telescope.getSwitch("ON_COORD_SET")
# the order below is defined in the property vector, look at the standard Properties page
# or enumerate them in the Python shell when you're developing your program
telescope_on_coord_set[0].s=PyIndi.ISS_ON  # TRACK
telescope_on_coord_set[1].s=PyIndi.ISS_OFF # SLEW
telescope_on_coord_set[2].s=PyIndi.ISS_OFF # SYNC
indiclient.sendNewSwitch(telescope_on_coord_set)
# We set the desired coordinates
telescope_radec=device_telescope.getNumber("EQUATORIAL_EOD_COORD")
while not(telescope_radec):
    time.sleep(0.5)
    telescope_radec=device_telescope.getNumber("EQUATORIAL_EOD_COORD")
telescope_radec[0].value=vega['ra']
telescope_radec[1].value=vega['dec']
indiclient.sendNewNumber(telescope_radec)
# and wait for the scope has finished moving
while (telescope_radec.s==PyIndi.IPS_BUSY):
    print("Scope Moving ", telescope_radec[0].value, telescope_radec[1].value)
    time.sleep(2)

# Let's take some pictures
ccd="CCD Simulator"
device_ccd=indiclient.getDevice(ccd)
while not(device_ccd):
    time.sleep(0.5)
    device_ccd=indiclient.getDevice(ccd)

ccd_connect=device_ccd.getSwitch("CONNECTION")
while not(ccd_connect):
    time.sleep(0.5)
    ccd_connect=device_ccd.getSwitch("CONNECTION")
if not(device_ccd.isConnected()):
    ccd_connect[0].s=PyIndi.ISS_ON  # the "CONNECT" switch
    ccd_connect[1].s=PyIndi.ISS_OFF # the "DISCONNECT" switch
    indiclient.sendNewSwitch(ccd_connect)

ccd_exposure=device_ccd.getNumber("CCD_EXPOSURE")
while not(ccd_exposure):
    time.sleep(0.5)
    ccd_exposure=device_ccd.getNumber("CCD_EXPOSURE")

# Ensure the CCD simulator snoops the telescope simulator
# otherwise you may not have a picture of vega
ccd_active_devices=device_ccd.getText("ACTIVE_DEVICES")
while not(ccd_active_devices):
    time.sleep(0.5)
    ccd_active_devices=device_ccd.getText("ACTIVE_DEVICES")
ccd_active_devices[0].text="Telescope Simulator"
indiclient.sendNewText(ccd_active_devices)

# we should inform the indi server that we want to receive the
# "CCD1" blob from this device
indiclient.setBLOBMode(PyIndi.B_ALSO, ccd, "CCD1")

ccd_ccd1=device_ccd.getBLOB("CCD1")
while not(ccd_ccd1):
    time.sleep(0.5)
    ccd_ccd1=device_ccd.getBLOB("CCD1")

# a list of our exposure times
exposures=[1.0, 5.0]

# we use here the threading.Event facility of Python
# we define an event for newBlob event
blobEvent=threading.Event()
blobEvent.clear()
i=0
ccd_exposure[0].value=exposures[i]
indiclient.sendNewNumber(ccd_exposure)
while (i < len(exposures)):
    # wait for the ith exposure
    blobEvent.wait()
    # we can start immediately the next one
    if (i + 1 < len(exposures)):
        ccd_exposure[0].value=exposures[i+1]
        blobEvent.clear()
        indiclient.sendNewNumber(ccd_exposure)
    # and meanwhile process the received one
    for blob in ccd_ccd1:
        print("name: ", blob.name," size: ", blob.size," format: ", blob.format)
        # pyindi-client adds a getblobdata() method to IBLOB item
        # for accessing the contents of the blob, which is a bytearray in Python
        fits=blob.getblobdata()
        print("fits data type: ", type(fits))
        # here you may use astropy.io.fits to access the fits data
	# and perform some computations while the ccd is exposing
	# but this is outside the scope of this tutorial
    i+=1

```

## Notes

Please remember that PyIndi is a Python wrapper to the Indi C++ classes. Thus the PyIndi documentation **IS** the Indi C++ documentation. The only difference is that you use a python notation to access members/methods of the Indi C++ objects, and that C++ vectors/arrays are wrapped to python lists (only INDI BLOB are mapped to Python ByteArrays). And C++ enums become Python constants at the module level (there were no enums in Python before 3.4, and no enums in 2.7).

PyIndi uses swig to perform the mapping, and the interface file is just a list of C++ include files. I did not put every C++ Indi include files in the PyIndi client, excluding some driver include files. Thus there may lack some definitions on client side, this was the case for instance of the BLOBHandling enum that I added manually in the interface file, but this is not the normal way to do.

For example, to get the type of device you are communicating with, you need to access the DRIVER_INTERFACE property. I would suggest that you define yourself a python DRIVER_INTERFACE enum (or constants) and performs the desired ORed computations with the result of the getDriverInterface function (which is a real call to the Indi C++ function from your python interpreter).

## Other examples

You will find other examples in the [pyindi-client repository](https://sourceforge.net/p/pyindi-client/code/HEAD/tree/trunk/pip/pyindi-client/).

-   [pyindi-stellarium](https://sourceforge.net/p/pyindi-client/code/HEAD/tree/trunk/pip/pyindi-client/examples/pyindi-stellarium.py): a server for the [Stellarium](http://www.stellarium.org/) planetarium program, implementing its Telescope Control protocol. It displays the position of your scope and performs gotos.

## Installation notes

I used a linux desktop (either ubuntu 16.04 or fedora 24) to perform these installation steps. Commands prefixed with a **$** were run as normal user, those prefixed with a **#** were run as root.

Install Ubuntu Mate for Raspberry Pi 2

-   Download [the ubuntu mate 16.04.1 image](https://ubuntu-mate.org/raspberry-pi/ubuntu-mate-16.04-desktop-armhf-raspberry-pi.img.xz) for Raspberry Pi 2
!--   Download [the 16.04.1 image](http://cdimage.ubuntu.com/ubuntu/releases/16.04/release/ubuntu-16.04.1-preinstalled-server-armhf+raspi2.img.xz) (**Don't use that one**)
\-->-   Uncompress the image and check the overall size and the partition sizes.

    ```shell
    $ unxz ubuntu-mate-16.04-desktop-armhf-raspberry-pi.img.xz
    $ fdisk -l ubuntu-mate-16.04-desktop-armhf-raspberry-pi.img
    Disk ubuntu-mate-16.04-desktop-armhf-raspberry-pi.img: 7.5 GiB, 8053063680 bytes, 15728640 sectors
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: dos
    Disk identifier: 0x580a66ff

    Device                                            Boot  Start      End  Sectors  Size Id Type
    ubuntu-mate-16.04-desktop-armhf-raspberry-pi.img1 *      2048   133119   131072   64M  c W95 FAT32 (LBA)
    ubuntu-mate-16.04-desktop-armhf-raspberry-pi.img2      133120 15728639 15595520  7.4G 83 Linux

    # fdisk -l /dev/sdc
    Disk /dev/sdc: 7.4 GiB, 7948206080 bytes, 15523840 sectors
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: dos
    Disk identifier: 0x00000000

    Device     Boot Start      End  Sectors  Size Id Type
    /dev/sdc1        8192 15523839 15515648  7.4G  b W95 FAT32

    ```

    We have to resize the second partition of the ubuntu mate image file as the SD card has only 15523840 secteurs whereas the image file uses 15728640 secteurs. See [below](#resize-img) for some explanations of the following commands.
-   Resize eventually the second partition in the image file. In this case, it should be 15523840 - 133120 = 15390720 sectors, yielding to (15390720 \* 512) / (4 \* 1024) = 1923840,000 4K blocks. No rouding here so the total number of sectors of the second partiton will be 15390720 sectors.

    ```text
    # losetup --offset $((133120 * 512)) /dev/loop0 /localhome/localuser/rpi2/ubuntu-mate-16.04-desktop-armhf-raspberry-pi.img

    # e2fsck -f /dev/loop0
    e2fsck 1.42.13 (17-May-2015)
    Pass 1: Checking inodes, blocks, and sizes
    Pass 2: Checking directory structure
    Pass 3: Checking directory connectivity
    Pass 4: Checking reference counts
    Pass 5: Checking group summary information
    PI_ROOT: 187666/487680 files (0.1% non-contiguous), 968374/1949440 blocks

    # resize2fs /dev/loop0 15390720s
    resize2fs 1.42.13 (17-May-2015)
    Resizing the filesystem on /dev/loop0 to 1923840 (4k) blocks.
    The filesystem on /dev/loop0 is now 1923840 (4k) blocks long.

    # e2fsck -f /dev/loop0
    e2fsck 1.42.13 (17-May-2015)
    Pass 1: Checking inodes, blocks, and sizes
    Pass 2: Checking directory structure
    Pass 3: Checking directory connectivity
    Pass 4: Checking reference counts
    Pass 5: Checking group summary information
    PI_ROOT: 187666/479552 files (0.1% non-contiguous), 967864/1923840 blocks

    # losetup -d /dev/loop0

    # losetup /dev/loop0 /localhome/localuser/rpi2/ubuntu-mate-16.04-desktop-armhf-raspberry-pi.img

    # fdisk /dev/loop0

    Welcome to fdisk (util-linux 2.27.1).
    Changes will remain in memory only, until you decide to write them.
    Be careful before using the write command.

    Command (m for help): p
    Disk /dev/loop0: 7.5 GiB, 8053063680 bytes, 15728640 sectors
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: dos
    Disk identifier: 0x580a66ff

    Device       Boot  Start      End  Sectors  Size Id Type
    /dev/loop0p1 *      2048   133119   131072   64M  c W95 FAT32 (LBA)
    /dev/loop0p2      133120 15728639 15595520  7.4G 83 Linux

    Command (m for help): d
    Partition number (1,2, default 2): 2

    Partition 2 has been deleted.

    Command (m for help): n
    Partition type
       p   primary (1 primary, 0 extended, 3 free)
       e   extended (container for logical partitions)
    Select (default p): p
    Partition number (2-4, default 2): 2
    First sector (133120-15728639, default 133120): 133120
    Last sector, +sectors or +size{K,M,G,T,P} (133120-15728639, default 15728639): 15523839

    Created a new partition 2 of type 'Linux' and of size 7.3 GiB.

    Command (m for help): p
    Disk /dev/loop0: 7.5 GiB, 8053063680 bytes, 15728640 sectors
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: dos
    Disk identifier: 0x580a66ff

    Device       Boot  Start      End  Sectors  Size Id Type
    /dev/loop0p1 *      2048   133119   131072   64M  c W95 FAT32 (LBA)
    /dev/loop0p2      133120 15523839 15390720  7.3G 83 Linux

    Command (m for help): w
    The partition table has been altered.
    Calling ioctl() to re-read partition table.
    Re-reading the partition table failed.: Invalid argument

    The kernel still uses the old table. The new table will be used at the next reboot or after you run partprobe(8) or kpartx(8).

    # losetup -d /dev/loop0

    ```

-   Write the ubuntu mate image file to the SD card using `dd`. This takes ~30 min here, be patient.

    ```text
    # dd if=/localhome/localuser/rpi2/ubuntu-mate-16.04-desktop-armhf-raspberry-pi.img of=/dev/sdc bs=32M
    dd: error writing '/dev/sdc': No space left on device
    237+0 records in
    236+0 records out
    7948206080 bytes (7.9 GB, 7.4 GiB) copied, 1767.36 s, 4.5 MB/s

    ```

    Don't worry about the error message, this concerns the last blocks that we have put outside the file system. You can put the SD card in your Rapsberry 2.

First boot with Ubuntu Mate 16.04For the first boot I connect a keyboard, a mouse and a monitor to the rpi2 and an ethernet cable linked to the second interface of my desktop. I start the `dnsmasq` server on the desktop after configuring its interface (see below). After the Ubuntu Mate graphics screen appears, you're told to configure system language, timezone, keyboard layout, give new user information, and set host name. It then runs its first-boot script and removes the configuration packages and user. You then get the usual login screen. Openssh is running and you may ssh with user authentication (without using key pairs). So I did not make any special configuration here.Install Ubuntu Classic image for Raspberry Pi 2

-   Download [the 16.04 image](http://cdimage.ubuntu.com/ubuntu/releases/16.04/release/ubuntu-16.04-preinstalled-server-armhf+raspi2.img.xz)
-   Download [the 16.04.1 image](http://cdimage.ubuntu.com/ubuntu/releases/16.04/release/ubuntu-16.04.1-preinstalled-server-armhf+raspi2.img.xz) (**Don't use that one**)
-   Uncompress the image and check the overall size and the partition sizes.

    ```text
    # unxz ubuntu-16.04-preinstalled-server-armhf+raspi2.img.xz
    # fdisk -l ubuntu-16.04-preinstalled-server-armhf+raspi2.img
    Disk ubuntu-16.04.1-preinstalled-server-armhf+raspi2.img: 3.7 GiB, 4000000000 bytes, 7812500 sectors
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: dos
    Disk identifier: 0x72ddab32

    Device                                               Boot  Start     End Sectors  Size Id Type
    ubuntu-16.04-preinstalled-server-armhf+raspi2.img1 *      8192  270335  262144  128M  c W95 FAT32 (LBA)
    ubuntu-16.04-preinstalled-server-armhf+raspi2.img2      270336 7811071 7540736  3.6G 83 Linux

    ```

    When I first try to put the image on my '4G' SD card, I got a `no space left on device` error. So I look at the number of sectors of my SD card[1](#footnote-1).

    ```text
    # fdisk -l /dev/sdX
    Disk /dev/sdb: 3.7 GiB, 3965190144 bytes, 7744512 sectors
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: dos
    Disk identifier: 0x72ddab32

    Device     Boot  Start     End Sectors  Size Id Type
    /dev/sdb1  *      8192  270335  262144  128M  c W95 FAT32 (LBA)
    /dev/sdb2       270336 7811071 7540736  3.6G 83 Linux

    ```

    The 7812500 sectors of the ubuntu image file can not fit in the 7744512 sectors on my SD card.
-   Eventually resize the ubuntu image file. There are 2 steps in this procedure: resize filesystems on partitons, and then resize the partitions themselves. I have to make the image file fit into 7744512 sectors rather than its original 7812500 sectors. I left as is the first boot partiton so have to resize the second one from 7540736 sectors to 7744512 - 270336 = 7474176 (the number of sectors in my SD card less the ending sector of the first partition plus one). I round this new size to a 4KiB limit (the usual filesystem block size) knowing a sector is 512 bytes: (7474176\*512) / (4\*1024) = 934272,000 blocks, rounded it gives 934272 \* (4\*1024/512) = 7474176 sectors. I assign the second partition to a loop device (`/dev/loop0` here) with the `losetup` command: the second partition in the image file starts at sector 270335 + 1 = 270336, so its offset is 270336 \* 512. I then resize the filesystem on `/dev/loop0` to the desired number of 512 bytes sectors. I check the filesystem before and after this operation. Finally I detach the `/dev/loop0` device.

    ```text
    # losetup --offset $((270336 * 512)) /dev/loop0 /localhome/localuser/rpi2/ubuntu-16.04-preinstalled-server-armhf+raspi2.img
    # e2fsck -f /dev/loop0
    e2fsck 1.42.13 (17-May-2015)
    Pass 1: Checking inodes, blocks, and sizes
    Pass 2: Checking directory structure
    Pass 3: Checking directory connectivity
    Pass 4: Checking reference counts
    Pass 5: Checking group summary information
    cloudimg-rootfs: 56269/471424 files (0.0% non-contiguous), 276129/942592 blocks

    # resize2fs /dev/loop0 7474176s
    resize2fs 1.42.13 (17-May-2015)
    Resizing the filesystem on /dev/loop0 to 934272 (4k) blocks.
    The filesystem on /dev/loop0 is now 934272 (4k) blocks long.

    # e2fsck -f /dev/loop0
    e2fsck 1.42.13 (17-May-2015)
    Pass 1: Checking inodes, blocks, and sizes
    Pass 2: Checking directory structure
    Pass 3: Checking directory connectivity
    Pass 4: Checking reference counts
    Pass 5: Checking group summary information
    cloudimg-rootfs: 56269/471424 files (0.0% non-contiguous), 276129/934272 blocks

    # losetup -d /dev/loop0

    ```

    I now resize this second partition with `fdisk`, which consists in first deleting it, and then recreate the partition. You have to carefully note its start sector and type Id.

    ```text
    # losetup /dev/loop0 /localhome/localuser/rpi2/ubuntu-16.04-preinstalled-server-armhf+raspi2.img
    # fdisk /dev/loop0

    Welcome to fdisk (util-linux 2.27.1).
    Changes will remain in memory only, until you decide to write them.
    Be careful before using the write command.

    Command (m for help): p
    Disk /dev/sdb: 3.7 GiB, 3965190144 bytes, 7744512 sectors
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: dos
    Disk identifier: 0x72ddab32

    Device     Boot  Start     End Sectors  Size Id Type
    /dev/sdb1  *      8192  270335  262144  128M  c W95 FAT32 (LBA)
    /dev/sdb2       270336 7811071 7540736  3.6G 83 Linux

    Command (m for help): d
    Partition number (1,2, default 2): 2

    Partition 2 has been deleted.

    Command (m for help): n
    Partition type
       p   primary (1 primary, 0 extended, 3 free)
       e   extended (container for logical partitions)
    Select (default p): p
    Partition number (2-4, default 2): 2
    First sector (2048-7744511, default 2048): 270336
    Last sector, +sectors or +size{K,M,G,T,P} (270336-7744511, default 7744511): 7744511

    Created a new partition 2 of type 'Linux' and of size 3.6 GiB.

    Command (m for help): p
    Disk /dev/sdb: 3.7 GiB, 3965190144 bytes, 7744512 sectors
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: dos
    Disk identifier: 0x72ddab32

    Device     Boot  Start     End Sectors  Size Id Type
    /dev/sdb1  *      8192  270335  262144  128M  c W95 FAT32 (LBA)
    /dev/sdb2       270336 7744511 7474176  3.6G 83 Linux

    Command (m for help): w
    The partition table has been altered.
    Calling ioctl() to re-read partition table.
    Syncing disks.
    # losetup -d /dev/loop0

    ```

    The ubuntu img file is now ready to be written on the SD card.
-   Write the ubuntu image file to the SD card using `dd`.

    ```text
    # dd if=/localhome/localuser/rpi2/ubuntu-16.04-preinstalled-server-armhf+raspi2.img of=/dev/sdX bs=32M
    dd: error writing '/dev/sdb': No space left on device
    119+0 records in
    118+0 records out
    3965190144 bytes (4.0 GB, 3.7 GiB) copied, 969.139 s, 4.1 MB/s
    # sync

    ```

    Note that the "No space left on device error" is no more an issue as the partition and filesystem sizes both fit to our SD card. `dd` has simply been unable to write the full img file. You may check everything is ok by unplugging and plugging again your SD card: `Nautilus` will mount both partitions `system-boot` and `cloudimg-rootfs`. You may now umount these partitions and plug your SD card into your rpi2.

1.  I put `/dev/sdX` here but it should be `/dev/sd` plus an uncapitalized letter, don't use a letter plus a number, this would be a partition

First boot with Ubuntu 16.04For the first boot I connect a keyboard and a monitor to the rpi2 and an ethernet cable linked to the second interface of my desktop. I start the `dnsmasq` server on the desktop after configuring its interface (see above). I get the login prompt on the rpi2. I login with ubuntu/ubuntu user/password pair and am asked to immediately change the password. After logging, I immediately change the password for user ubuntu (after loading the correct keyboard layout) and then let the system perform the usual updates. Meanwhile I permit user authentication in ssh without key pairs.

```shell
# for the new keyboard layout
$ sudo loadkeys fr
$ sudo dpkg-reconfigure keyboard-configuration # did not work on next reboot
$ passwd

# some automatic updates  run in background

# Permit users to ssh with passwords
$ vi /etc/ssh/sshd_config
# Change to no to disable tunnelled clear text passwords
PasswordAuthentication yes

# Due to updates I get a ***System restart required*** so I reboot the rpi2
$ shutdown -r now

# After logging again, I get the message 90 packages can be updated.
# So I perform the upgrade manually
$ sudo apt-get upgrade

```

After 30 minutes, it gets that I now have a

```text
Welcome to Ubuntu 16.04.1 LTS (GNU/Linux 4.4.0-1023-raspi2 armv7l)

```

Using `dnsmasq` on a 2nd network interface for your Raspberry Pi 2This shows how I connect my raspberry pi 2 to a second dedicated network interface on my desktop. This scheme may also be used if you use a laptop connected via wifi and which also has an ethernet connector.

-   Plug the network cable into both desktop an rpi2, and configure the 2nd network interface on the desktop.

    ```text
    # ip link
    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1
        link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    2: enp5s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc pfifo_fast state DOWN mode DEFAULT group default qlen 1000
        link/ether 84:c9:b2:37:93:64 brd ff:ff:ff:ff:ff:ff
    3: eno1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    		  link/ether 2c:41:38:b4:ef:4a brd ff:ff:ff:ff:ff:ff

    ```

    This `ip link` command gives the name of the 2nd interface, `enp5s0`, the one which is in `DOWN` state. I first indicate to the Network manager to not manage this interface. This can be made by defining a configuration file in `/etc/network/interfaces.d` and restarting the manager.

    ```text
    # echo iface enp5s0 inet manual > /etc/network/interfaces.d/enp5s0
    # systemctl restart network-manager

    ```

    I can then assign the second interface a fixed address on the desktop.

    ```text
    # ip addr add 10.9.0.254/24 dev enp5s0
    # ip link set enp5s0 up

    ```

-   Launch `dnsmasq` to act as a DHCP server and DNS proxy.

    ```text
    # dnsmasq --no-daemon --bind-interfaces --interface=enp5s0 --dhcp-range=10.9.0.1,10.9.0.100
    dnsmasq: started, version 2.75 cachesize 150
    dnsmasq: compile time options: IPv6 GNU-getopt DBus i18n IDN DHCP DHCPv6 no-Lua TFTP conntrack ipset auth DNSSEC loop-detect inotify
    dnsmasq-dhcp: DHCP, IP range 10.9.0.1 -- 10.9.0.100, lease time 1h
    dnsmasq-dhcp: DHCP, sockets bound exclusively to interface enp5s0
    dnsmasq: reading /etc/resolv.conf
    dnsmasq: using nameserver 127.0.1.1#53
    dnsmasq: read /etc/hosts - 4 addresses
    dnsmasq-dhcp: DHCPDISCOVER(enp5s0) b8:27:eb:f4:82:74
    dnsmasq-dhcp: DHCPOFFER(enp5s0) 10.9.0.13 b8:27:eb:f4:82:74
    dnsmasq-dhcp: DHCPREQUEST(enp5s0) 10.9.0.13 b8:27:eb:f4:82:74
    dnsmasq-dhcp: DHCPACK(enp5s0) 10.9.0.13 b8:27:eb:f4:82:74 rpi2

    ```

    Launching `dnsmasq` in foreground allows to capture the MAC address of the rpi2. We could then assign it a fixed address in a small script for subsequent use.
-   Configure the desktop as a router. At this point you may ping/ssh to your rpi2 and the rpi2 is able to resolve DNS names. However the rpi2 still can not access the internet as the desktop has to act as a router, i.e. allow packet forwarding and perform Network Address Translation with `iptables`. The method shown here is temporary and will not survive after a reboot.

    ```text
    # sysctl net.ipv4.ip_forward=1
    # iptables -t nat -A POSTROUTING -s 10.9.0.0/24 ! -d 10.9.0.0/24 -j MASQUERADE

    ```

-   Put all this stuff in a script that you could run the next time you'll bring up your rpi2 next to your desktop.

    ```shell
    #!/bin/bash
    ip addr add 10.9.0.254/24 dev enp5s0
    ip link set enp5s0 up
    # Use this the first time to get the MAC address of your raspberry pi 2
    # dnsmasq --no-daemon --bind-interfaces --interface=enp5s0 --dhcp-range=10.9.0.1,10.9.0.100
    # Then you can allocate a fix IP to your rpi2 and run in background
    dnsmasq --bind-interfaces --interface=enp5s0 --dhcp-range=10.9.0.1,10.9.0.100 --dhcp-host=b8:27:eb:f4:82:74,10.9.0.1,rpi2
    sysctl net.ipv4.ip_forward=1
    iptables -t nat -A POSTROUTING -s 10.9.0.0/24 ! -d 10.9.0.0/24 -j MASQUERADE

    ```
