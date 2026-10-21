**Ekos** is an advanced cross-platform (Windows, macOS, Linux) observatory control and automation tool with particular focus on Astrophotography. It is based on a modular extensible framework to perform common astrophotography tasks. This includes highly accurate GOTOs using astrometry solver, ability to measure _and_ correct polar alignment errors , auto-focus & auto-guide capabilities, and capture of single or stack of images with filter wheel support. Ekos is shipped with KStars.

**Features:**

-   Control your telescope, CCD (& DSLRs), filter wheel, focuser, guider, adaptive optics unit, and any INDI-compatible auxiliary device from Ekos.
-   _Built-in_ native Auto Guiding with support for automatic dithering between exposures and support for Adaptive Optics devices in addition to traditional guiders.
-   [Extremely accurate GOTOs](https://knro.blogspot.com/2013/10/demo-of-ekos-alignment-module.html) using astrometry.net solver (both Online and Offline solvers supported).
-   Load & Slew: Load a FITS image, slew to solved coordinates, and center the mount on the exact image coordinates in order to get the same desired frame.
-   Measure & Correct Polar Alignment errors using astrometry.net solver.
-   Easy to use [Polar Alignment Assistant](https://www.youtube.com/watch?v=sx6Zz9lNd5Q) tool. A very quick and reliable tool to polar align your German Equatorial Mount!
-   Capture and record [video streams in SER format](https://www.youtube.com/watch?v=OJFZWwlAQRM).
-   Completely [automated scheduler](https://www.youtube.com/watch?v=85L3J_iiXZ4) to control all your observatory equipment, select the best targets for imaging given current conditions and constraints, monitor weather conditions, and capture your data while you are away!
-   _Smart_ Dark Library: All your dark frames with different binning/temperature/frame settings are saved for future use. Ekos re-uses dark frames intelligently without taking unnecessary captures. You can configure how long you want to reuse all the dark frames.
-   Define multiple driver profiles for local and remote setups. Switch among them easily.
-   Auto and manual focus modes using Half-Flux-Radius (HFR) method.
-   [Automated _unattended_ meridian flip](https://www.youtube.com/watch?v=stsrcsPxUZA). Ekos performs post meridian flip alignment, calibration, focusing, and guiding to resume the capture session.
-   Automatic focus between exposures when a user-configurable HFR limit is exceeded.
-   Powerful sequence queue for batch capture of images with optional prefixes, timestamps, filter wheel selection, and much more!
-   Export and import sequence queue sets as Ekos Sequence Queue (.esq) files.
-   [Center the telescope anywhere in a captured FITS image](https://youtu.be/fg2HDFg_dCE) or any FITS with World Coordinate System (WCS) header.
-   Automatic flat field capture, just set the desired ADU and let Ekos do the rest!
-   Automatic abort and resumption of exposure tasks if guiding errors exceed a user-configurable value.
-   Support for dome slaving.
-   Complete integration with KStars Observation Planner and SkyMap
-   Fully scriptable via [DBus](http://www.freedesktop.org/wiki/Software/dbus/).
-   Integrate with all INDI native devices.
