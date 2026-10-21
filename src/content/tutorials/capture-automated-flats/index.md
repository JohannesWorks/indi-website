---
title: "Capture automated flats"
description: "Capture flat frames automatically with the Ekos Capture module."
topic: ekos
author: "Jasem Mutlaq"
legacyUrl: "/support/tutorials/156-capture-automated-flats.html"
legacyId: 156
---

[](/images/ekos/ekos_calibration_button.png)

Ekos powerful Capture Module recently added support to automated capture of flat field frames. Using the capture sequence queue, it was always possible to capture flat images with manually-specified exposure times, and now completely automated flats are supported!

Once you select a flat frame from the _Type_ drop-down list, click the _Calibration Options_ button to open the flat calibration options dialog. In the dialog, you can set the flat field frame **Source** and **Duration** as following:

-   **Manual**: The flat field light source is set and turn on/off manually by the user.
-   **Dust Cap**: Use a dust cap device (e.g. FlipFlat) as the flat field light source. Ekos will park (close) the dust cap if it was not already parked when capturing the flat frames.
-   **Wall**: Before capturing flats, slew the telescope to a specific Azimuth/Altitude position on the wall where an evenly-illuminated panel is installed. If the light panel is controllable and is connected as an INDI device, Ekos will turn on/off the panel light as needed.
-   **Dawn/Dusk**: Future options reserved for dawn/dusk flats but might not be implemented due to the unreliability and limited time of dawn/dusk flats.

[](/images/ekos/ekos_calibration_options.png)

After selecting the flat source, you need to specify the flat desired duration:

-   **Manual**: No changes shall be made to the flat exposure duration. The user specified duration in the capture module shall be used.
-   **ADU Percentage**: Analog to Digital Units (ADU) are the dynamic range of pixels values in your CCD. For a 16bit CCD, the maximum possible ADU is 65535. The actual maximum ADU depends on your CCD. ADU count is proportional to the electrons excited by incident photons and CCD gain. Set the desired ADU % and Ekos shall adjust capture time until target ADU % is reached. When using this setting, it is recommended to set the exposure time to 1 second and Ekos will adjust it accordingly.

Optionally, you can select to park the mount and/or the dome if required **before** the flat frames are captured. Please note that this will suspend any ongoing guiding process. Furthermore, once parked you cannot capture any light frames, so capture the flat frames either at the beginning of the session or at the end.

Tip: Using a controllable flat field light source (e.g. Flat-Man) can save a lot of time since light intensity can be adjusted per filter thereby reducing exposure times for narrowband filters considerably.
