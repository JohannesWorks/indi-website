---
title: "Standard Properties"
description: "INDI does not place any special semantics on property names (i.e."
order: 8
legacyId: 101
---

## Introduction

INDI does not place any special semantics on property names (i.e. properties are just texts, numbers, or switches that represent no physical function). While GUI clients can construct graphical representation of properties in order to permit the user to operate the device, we run into situations where clients and drivers need to agree on the exact meaning of some fundamental properties.

What if some client need to be aware of the existence of some property in order to perform some function useful to the user? How can that client tie itself to such a property if the property can be arbitrary defined by drivers?

The solution is to define Standard Properties in order to establish a level of interoperability among INDI drivers and clients. We propose a set of shared INDI properties that encapsulate the most common characteristics of astronomical instrumentation of interest.

If the semantics of such properties are properly defined, not only it will insure base interoperability, but complete device automation becomes possible as well. Put another way, INDI standard properties are in essence properties that represent a clearly defined characteristic related to the operation of the device drivers.

For example, a very common standard property is EQUATORIAL_EOD_COORD. This property represents the telescope's current RA and DEC. Clients need to be aware of this property in order to, for example, draw the telescope's cross hair on the sky map. If you write a script to control a telescope, you know that any telescope supporting EQUATORIAL_EOD_COORD will behave in an expected manner when the property is invoked.

INDI clients are required to honor standard properties if when and they implement any functions associated with a particular standard property. Furthermore, INDI drivers employing standard properties should strictly adhere to the standard properties structure as defined next.

## General

The following tables describe standard properties pertaining to generic devices and class-specific devices like telescope, CCDs...etc. The name of a standard property and its members must be strictly reserved in all drivers. However, it is permissible to change the label element of properties. You can find numerous uses of the standard properties in the INDI library driver repository.

| Name | Type | Member | Description |
| --- | --- | --- | --- |
| CONNECTION | Switch |   |   |
| CONNECT | Establish connection to device |
| DISCONNECT | Disconnect device |
| DEVICE_PORT | Text | PORT | Device connection port |
| TIME_LST | Number | LST | Local sidereal time HH:MM:SS |
| TIME_UTC | Text |   |   |
|   | UTC Time & Offset |
| UTC | UTC time in ISO 8601 format |
| OFFSET | UTC offset, in hours +E |
| GEOGRAPHIC_COORD | Number |   |   |
|   | Earth geodetic coordinate |
| LAT | Site latitude (-90 to +90), degrees +N |
| LONG | Site longitude (0 to 360), degrees +E |
| ELEV | Site elevation, meters |
| ATMOSPHERE | Number |   |   |
|   | Weather conditions |
| TEMPERATURE | Kelvin |
| PRESSURE | hPa |
| HUMIDITY | Percentage % |
| UPLOAD_MODE | Switch |   |   |
| UPLOAD_CLIENT | Send BLOB to client |
| UPLOAD_LOCAL | Save BLOB locally |
| UPLOAD_BOTH | Send blob to client and save it locally as well |
| UPLOAD_SETTINGS | Text |   |   |
| UPLOAD_DIR | Upload directory if the BLOB is saved locally |
| UPLOAD_PREFIX | Prefix used when saving filename |
| ACTIVE_DEVICES | Text |   |   |
|   | Name of active devices. If defined, at least one member below must be defined in the vector. |
| ACTIVE_TELESCOPE |   |
| ACTIVE_CCD |   |
| ACTIVE_FILTER |   |
| ACTIVE_FOCUSER |   |
| ACTIVE_DOME |   |
| ACTIVE_GPS |   |

**ACTIVE_DEVICES** is used to aid clients in automatically providing the users with a list of _active_ devices (i.e. CONNECTION is ON) whenever needed. For example, a CCD driver may define **ACTIVE_DEVICES** property with one member: **ACTIVE_TELESCOPE**. Suppose that the client is also running LX200 Basic driver to control the telescope. If the telescope is connected, the client may automatically fill the **ACTIVE_TELESCOPE** field or provide a drop-down list of active telescopes to select from. Once set, the CCD driver may record, for example, the telescope name, RA, DEC, among other metadata once it captures an image. Therefore, **ACTIVE_DEVICES** is primarily used to link together different classes of devices to exchange warnrmation if required.

## Telescopes

Telescope standard properties define critical properties for the operation and control of the mount. In addition to the properties below, all properties in [INDI Alignment Subsystem](/api/md_libs_indibase_alignment_alignment_white_paper.html) are considered standard properties as well and must be reserved in all implementations.

| Name | Type | Member | Description |
| --- | --- | --- | --- |
| EQUATORIAL_COORD | Number |   | Equatorial astrometric J2000 coordinate |
| RA | J2000 RA, hours |
| DEC | J2000 Dec, degrees +N |
| EQUATORIAL_EOD_COORD | Number |   | Equatorial astrometric epoch of date coordinate |
| RA | JNow RA, hours |
| DEC | JNow Dec, degrees +N |
| TARGET_EOD_COORD | Number |   | Slew Target. Read Only property set once requested EQUATORIAL_EOD_COORD is accepted by driver. |
| RA | JNow RA, hours |
| DEC | JNow Dec, degrees +N |
| HORIZONTAL_COORD | Number |   | topocentric coordinate |
| ALT | Altitude, degrees above horizon |
| AZ | Azimuth, degrees E of N |
| ON_COORD_SET | Switch |   | Action device takes when sent any \*\_COORD property. **N.B:** Setting this property does **not** cause any action but it prepares the mount driver for the **next** action when any \*\_COORD number property is received. For example, to sync the mount, first set switch to SYNC and **then** send the EQUATORIAL_EOD_COORD with the desired sync coordinates. |
| SLEW | Slew to a coordinate and stop upon receiving coordinates. |
| TRACK | Slew to a coordinate and track upon receiving coordinates. |
| SYNC | Accept current coordinate as correct upon receiving coordinates. |
| TELESCOPE_MOTION_NS | Switch |   | Move telescope north or south |
| MOTION_NORTH | Move the telescope toward North. |
| MOTION_SOUTH | Move the telescope toward South. |
| TELESCOPE_MOTION_WE | Switch |   | Move telescope west or east |
| MOTION_WEST | Move the telescope toward West. |
| MOTION_EAST | Move the telescope toward East. |
| TELESCOPE_TIMED_GUIDE_NS | Number |   | Timed pulse guide in north/south direction |
| TIMED_GUIDE_N | Guide the scope north for TIMED_GUIDE_N milliseconds. |
| TIMED_GUIDE_S | Guide the scope south for TIMED_GUIDE_S milliseconds. |
| TELESCOPE_TIMED_GUIDE_WE | Number |   | Timed pulse guide in west/east direction |
| TIMED_GUIDE_W | Guide the scope west for TIMED_GUIDE_W milliseconds. |
| TIMED_GUIDE_E | Guide the scope east for TIMED_GUIDE_E milliseconds. |
| TELESCOPE_SLEW_RATE | Switch |   | Multiple switch slew rate. The driver can define as many switches as desirable, but at minimum should implement the four switches below. |
| SLEW_GUIDE | 0.5x to 1.0x sidereal rate or slowest possible speed. |
| SLEW_CENTERING | Slow speed. |
| SLEW_FIND | Medium speed. |
| SLEW_MAX | Maximum speed. |
| TELESCOPE_PARK | Switch |   | Park and unpark the telescope. |
| PARK | Park the telescope to HOME position. |
| UNPARK | Unpark the telescope |
| TELESCOPE_PARK_POSITION | Number |   | Home park position (RA/DEC or AZ/ALT) in degrees or encoder ticks. |
| PARK_RA/PARK_AZ | RA/AZ park coordinates in degrees or ticks. |
| PARK_DEC/PARK_ALT | DEC/ALT park coordinates in degrees or ticks. |
| TELESCOPE_PARK_OPTION | Switch |   | Updates TELESCOPE_PARK_POSITION values |
| PARK_CURRENT | Use current coordinates/encoders as home park position. |
| PARK_DEFAULT | Use driver's default park position. |
| PARK_WRITE_DATA | Write TELESCOPE_PARK_POSITION and current parking status to file ($HOME/.indi/ParkData.xml) |
| TELESCOPE_ABORT_MOTION | Switch | ABORT_MOTION | Stop telescope rapidly, but gracefully |
| TELESCOPE_TRACK_RATE | Switch |   |   |
| TRACK_SIDEREAL | Track at sidereal rate. |
| TRACK_SOLAR | Track at solar rate. |
| TRACK_LUNAR | Track at lunar rate. |
| TRACK_CUSTOM | Custom track rate. This element is optional |
| TELESCOPE_INFO | Number |   |   |
| TELESCOPE_APERTURE | Telescope aperture, mm |
| TELESCOPE_FOCAL_LENGTH | Telescope focal length, mm |
| GUIDER_APERTURE | Guide telescope aperture, mm |
| GUIDER_FOCAL_LENGTH | Guider telescope focal length, mm |
| TELESCOPE_PIER_SIDE | Switch |   | GEM Pier Side |
| PIER_EAST | Mount on the **East** side of pier (_Pointing West_). |
| PIER_WEST | Mount on the **West** side of pier (_Pointing East_). |

For clients that want to implement the GOTO functionality of a telescope, they should expect telescope drivers to define either:

-   EQUATORIAL_EOD_COORD  for current Epoch; and/or
-   HORIZONTAL_COORD.

## CCDs

| Name | Type | Member | Description |
| --- | --- | --- | --- |
| CCD_EXPOSURE | Number | CCD_EXPOSURE_VALUE | Expose the CCD chip for CCD_EXPOSURE_VALUE seconds |
| CCD_ABORT_EXPOSURE | Number | ABORT | Abort CCD exposure |
| CCD_FRAME | Number |   | CCD frame size. |
| X | Left-most pixel position |
| Y | Top-most pixel position |
| WIDTH | Frame width in pixels |
| HEIGHT | Frame height in pixels |
| CCD_TEMPERATURE | Number | CCD_TEMPERATURE_VALUE | CCD chip temperature in degrees Celsius |
| CCD_COOLER | Switch |   | CCD Cooler control. |
| COOLER_ON | Turn cooler on |
| COOLER_OFF | Turn cooler off |
| CCD_COOLER_POWER | Number | CCD_COOLER_VALUE | Percentage % of Cooler Power utilized |
| CCD_FRAME_TYPE | Switch |   |   |
| FRAME_LIGHT | Take a light frame exposure |
| FRAME_BIAS | Take a bias frame exposure |
| FRAME_DARK | Take a dark frame exposure |
| FRAME_FLAT | Take a flat field frame exposure |
| CCD_BINNING | Number |   |   |
| HOR_BIN | Horizontal binning |
| VER_BIN | Vertical binning |
| CCD_COMPRESSION | Switch |   |   |
| CCD_COMPRESS | Compress CCD frame (If FITS, it uses fpack to send a .fz file) |
| CCD_RAW | Send raw CCD frame |
| CCD_FRAME_RESET | Switch |   |   |
| RESET | Reset CCD frame to default X,Y,W, and H settings. Set binning to 1x1. |
| CCD_INFO | Number |   |   |
| CCD_MAX_X | Resolution x |
| CCD_MAX_Y | Resolution y |
| CCD_PIXEL_SIZE | CCD pixel size in microns |
| CCD_PIXEL_SIZE_X | Pixel size X, microns |
| CCD_PIXEL_SIZE_Y | Pixel size Y, microns |
| CCD_BITSPERPIXEL | Bits per pixel |
| CCD_CFA | TEXT |   | Color Filter Array warnrmation if the CCD produces a bayered image. Debayering performed at client side. |
| CFA_OFFSET_X | CFA X Offset. |
| CFA_OFFSET_X | CFA Y Offset. |
| CFA_TYPE | CFA Filter type (e.g. RGGB). |
| CCD1 | BLOB |   | CCD1 for primary CCD, CCD2 for guider CCD. |
| CCD1 | Binary fits data encoded in base64. The CCD1.format is used to indicate the data type (e.g. ".fits") |

Most CCD\_\* properties are also applicable to GUIDER chip, so replace CCD with GUIDER above to define properties for the GUIDER chip, if applicable.

## Streaming

Some CCD drivers support streaming and recording of video streams. All the properties defined in StreamManager are considered reserved standard properties. The stream data is sent via the same CCD1 BLOB used for image transmission and therefore it is not possible to stream and send regular CCD captures at the same time.

| Name | Type | Member | Description |
| --- | --- | --- | --- |
| CCD_VIDEO_STREAM | Switch |   |   |
| STREAM_ON | Turn on video stream |
| STREAM_OFF | Turn off video stream |
| STREAMING_EXPOSURE | Number |   |   |
| STREAMING_EXPOSURE_VALUE | Frame exposure values in seconds when streaming. This is advisory only as some streaming devices cannot control the exposure duration. |
| STREAMING_DIVISOR_VALUE | The divisor is used to skip frames as way to throttle the stream down. By default, a divisor value of 1 does not skip any frames. A value of two would skip every other frame (thereby cutting the FPS in half). A frame is skipped when the number of captured frames % divisor is equal to zero. |
| FPS | Number | Read-Only |   |
| EST_FPS | Instant frame rate. |
| AVG_FPS | Average FPS over 1 second. |
| RECORD_FILE | Text |   |
Recorders are responsible for recording the video stream to a file. The recording file directory and name can be set via the RECORD_FILE property which is composed of RECORD_FILE_DIR and RECORD_FILE_NAME elements. You can specify a record directory name together with a file name. You may use special character sequences to generate dynamic names:

-   \_D\_ is replaced with the date ('YYYY-MM-DD')
-   \_H\_ is replaced with the time ('hh-mm-ss')
-   \_T\_ is replaced with a timestamp
-   \_F\_ is replaced with the filter name currently in use

 |
| RECORD_FILE_DIR | Directory to save the file. It defaults to $HOME/indi\__D\_ |
| RECORD_FILE_NAME | Recording file name. It defaults to indi_record\__T\_ |
| RECORD_OPTIONS | Switch |   | Set the desired duration in seconds or total frames required for the recording. |
| RECORD_DURATION | Duration in seconds. |
| RECORD_FRAME_TOTAL | Total number of frames required |
| RECORD_STREAM | Switch |   | Start or Stop the stream recording to a file. |
| RECORD_ON | Start recording. Do not stop unless asked to. |
| RECORD_DURATION_ON | Start recording until the duration set in RECORD_OPTIONS has elapsed. |
| RECORD_FRAME_ON | Start recording until the number of frames set in RECOR_OPTIONS has been captured. |
| RECORD_OFF | Stops recording. |

## Filter wheels

| Name | Type | Member | Description |
| --- | --- | --- | --- |
| FILTER_SLOT | Number | FILTER_SLOT_VALUE | The filter wheel's current slot number. **Important:** Filter numbers start from 1 to N |
| FILTER_NAME | Text | FILTER_NAME_VALUE | The filter wheel's current slot name |

## Focusers

| Name | Type | Member | Description |
| --- | --- | --- | --- |
| FOCUS_SPEED | Number |   | Select focus speed from 0 to N where 0 maps to no motion, and N maps to the fastest speed possible |
| FOCUS_SPEED_VALUE | Set focuser speed to SPEED |
| FOCUS_MOTION | Switch |   |   |
| FOCUS_INWARD | Focus inward |
| FOCUS_OUTWARD | Focus outward |
| FOCUS_TIMER | Number |   |   |
| FOCUS_TIMER_VALUE | Focus in the direction of FOCUS_MOTION at rate FOCUS_SPEED for FOCUS_TIMER_VALUE milliseconds |
| REL_FOCUS_POSITION | Number |   | Relative position |
| FOCUS_RELATIVE_POSITION | Move # of steps in FOCUS_MOTION direction. |
| ABS_FOCUS_POSITION | Number |   | Absolute position |
| FOCUS_ABSOLUTE_POSITION | Steps |
| FOCUS_MAX | Number |   | Focus maximum travel limit in steps. |
| FOCUS_MAX_VALUE | Steps |
| FOCUS_REVERSE_MOTION | Switch |   |   |
| ENABLED | Reverse default motor direction |
| DISABLED | Do not reverse, move motor in the default direction. |
| FOCUS_ABORT_MOTION | Switch |   |   |
| ABORT | Abort focus motion. |
| FOCUS_SYNC | Number |   | Accept this position as the new focuser absolute position. |
| FOCUS_SYNC_VALUE | Steps |

## Domes

| Name | Type | Member | Description |
| --- | --- | --- | --- |
| DOME_SPEED | Number |   |   |
| DOME_SPEED_VALUE | Set dome speed in RPM. |
| DOME_MOTION | Switch |   |   |
| DOME_CW | Move dome Clockwise, looking down |
| DOME_CCW | Move dome counter clockwise, looking down |
| DOME_TIMER | Number |   |   |
| DOME_TIMER_VALUE | Move the dome in the direction of DOME_MOTION at rate DOME_SPEED for DOME_TIMER_VALUE milliseconds |
| REL_DOME_POSITION | Number |   | Relative position |
| DOME_RELATIVE_POSITION | Move DOME_RELATIVE_POSITION degrees azimuth in the direction of DOME_MOTION. |
| ABS_DOME_POSITION | Number |   | Absolute position |
| DOME_ABSOLUTE_POSITION | Move dome to DOME_ABSOLUTE_POSITION absolute azimuth angle in degrees. |
| DOME_ABORT_MOTION | Switch |   |   |
| ABORT | Abort dome motion. |
| DOME_SHUTTER | Switch |   |   |
| SHUTTER_OPEN | Open dome shutter. |
| SHUTTER_CLOSE | Close dome shutter. |
| DOME_GOTO | Switch |   |   |
| DOME_HOME | Go to home position. |
| DOME_PARK | Go to park position. |
| DOME_PARAMS | Number |   |   |
| HOME_POSITION | Dome home position in absolute degrees azimuth. |
| PARK_POSITION | Dome parking position in absolute degrees azimuth. |
| AUTOSYNC_THRESHOLD | If dome is slaved, AUTOSYNC_THRESHOLD is the number of acceptable azimuth degrees error between reported and requested dome position. Once the difference between target and current dome positions exceed this value, the dome shall be commanded to move to the target position. |
| DOME_AUTOSYNC | Switch |   |   |
| DOME_AUTOSYNC_ENABLE | Enable dome slaving. |
| DOME_AUTOSYNC_DISABLE | Disable dome slaving. |
| DOME_MEASUREMENTS | Number |   |   |
| DM_DOME_RADIUS | Dome radius (m). |
| DOME_SHUTTER_WIDTH | Dome shutter width (m). |
| DM_NORTH_DISPLACEMENT | Displacement to the north of the mount center (m). |
| DM_EAST_DISPLACEMENT | Displacement to the east of the mount center (m). |
| DM_UP_DISPLACEMENT | UP displacement of the mount center (m). |
| DM_OTA_OFFSET | Distance from the optical axis to the mount center (m). |
