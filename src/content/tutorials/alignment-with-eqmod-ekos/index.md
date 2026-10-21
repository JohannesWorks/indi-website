---
title: "Alignment with EQMod and Ekos"
description: "Align your mount with plate solving instead of two or three star alignment."
topic: ekos
author: "Jasem Mutlaq"
legacyUrl: "/support/tutorials/137-alignment-with-eqmod-ekos.html"
legacyId: 137
---

With EQMod & Ekos, you can finally put the alignment woes to rest. No more two or three star alignment, no more trying to recenter that star in the eye piece, all you have to do is to point your mount north, and Ekos does that rest. After the first sync, you can expect your desired object to be dead center. You don't have to build any complicated models, every time you slew to a target, you can use Ekos Alignment Module to verify the location and slew to the real coordinates if necessary. This is all made possible thanks to the astrometry.net solver.

So What do you need in order to achieve sub-arcseconds GOTOs?

-   Recent version of KStars.
-   INDI Library v0.9.7 or higher.
-   Astrometry.net v0.45 or higher (for offline plate solving). Ekos supports both online and offline solvers.
-   Mount that supports EQMod.
-   CCD.

[](/images/ekos/ekos_setup.png)

My personal setup is HEQ5 mount, QSI583wsg CCD, and I have Starlight Xpress Lodestar, but I use that for guiding only.

If you're using Ubuntu, all the packages are available for Ubuntu Saucy or later, including bleeding edge version of KStars & INDI.

```shell
sudo apt-add-repository ppa:mutlaqja/ppa
sudo apt-add-repository ppa:mutlaqja/astrometry.net
sudo apt-get update
sudo apt-get install kstars-bleeding astrometry.net
```

If you prefer to use the offline (local) astrometry.net solver, you need to download the index files necessary for your CCD Field of View (FOV). Please refer to Ekos [Alignment Module](/about/ekos/alignment-module.html) documentation for details.

Point your mount toward Polaris, if you're the northern hemisphere, and attach your CCD to the telescope. Make sure the CCD is already in focus, if not, use Ekos [Focus Module](/about/ekos/focus-module.html) to aid you in the focusing process.

Start KStars, select Ekos from the Tools menu. Next, select the telescope driver as EQMod, and select your CCD from the drop-down list. Click Start INDI, and then Connect.

[](/images/ekos/ekos_track.png)

In KStars SkyMap, you will see the EQMod cross-hair close to Polaris. Go to Ekos alignment tab, and make sure **_Update Coordinates After Slew_** checkbox is checked, and under GOTO, select _**Slew to Target**_. This option instructs Ekos that once a solution is found, it slews the mount to the target coordinates.

Now, select a nearby star, right click, select EQMod, and then Track. Your mount should now start slewing to the star. After slew is complete, go to Ekos Alignment tab and click _**Capture & Solve**_. The solver may take some time to find a solution, but in my setup (offline solver) it usually takes less than 10 seconds to find a solution. Once a solution is found, Ekos will slew the telescope to the actual star coordinates. Capture an image using the CCD module, and your star should be now dead-center.

By default, EQMod driver uses N-Star alignment to build a pointing model. Each time your perform a sync, a new point is added to the model. You don't have to do anything, this is done transparently for you. In practice when performing astrophotography, I run the _**Capture & Solve**_ command after every slew, just to make sure I am really dead-center on my target. The solver typically takes 2-3 seconds to solve the image at this stage.

[](/images/ekos/ekos_align.png)

After you are done with your observation/astrophotography session, make sure to save the model in the Align tab of the EQMod driver, which can be found in the INDI Control Panel so that it gets loaded on subsequent observation sessions.

That's all it takes to achieve highly accurate GOTOs with EQMOd & Ekos for Linux!
