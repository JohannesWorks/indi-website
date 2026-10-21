// Gallery images shared by the INDI community. Files are in src/assets/gallery/<album>/.
export const ALBUMS = [
  { id: "deep-sky", name: "Deep sky", description: "Nebulae, galaxies and comets captured with INDI." },
  { id: "setups", name: "Astrophotography setups", description: "How INDI users build and wire their rigs." },
] as const;

export interface GalleryItem { album: (typeof ALBUMS)[number]["id"]; file: string; title: string; caption: string }

export const GALLERY: GalleryItem[] = [
  {
    "album": "deep-sky",
    "file": "deep-sky/ngc-7635.webp",
    "title": "NGC 7635 Bubble Nebula",
    "caption": "41×300 s with a RedCat51, CEM25p and 533MC with UV/IR filter."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/m51062124z103asi533mmcroppedversion2.webp",
    "title": "M51 Whirlpool Galaxy",
    "caption": "About 13 hours of RGB data with a William Optics Zenithstar 103 mm, ASI533MM Pro and ZWO filters, 30 s exposures. Processed in PixInsight."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/m-45.webp",
    "title": "M45 Pleiades",
    "caption": "RedCat51, 533MC and CEM25p, unguided. 10×300 s lights, processed in Siril."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/gq0erqvsvygp-16536x0-ietz0inm.webp",
    "title": "Comet C/2023 P1 Nishimura",
    "caption": "Taken on September 5 at 05:00 with KStars from a robotic home observatory in central New Mexico. C11 EdgeHD at f/7, iOptron CEM120 EC2 unguided, ASI1600MM Pro at −15 °C, Moonlite focuser, Baader RGB filters, NexDome. 15×30 s per filter, processed in PixInsight."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/crescentnebula-fb.webp",
    "title": "NGC 6888 Crescent Nebula",
    "caption": "A cosmic bubble about 25 light-years across in Cygnus, blown by winds from its central Wolf-Rayet star. Narrowband hydrogen, oxygen and sulfur data."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/dsc-3608.webp",
    "title": "NGC 6888 Crescent Nebula",
    "caption": "Narrowband image of the Crescent Nebula in Cygnus, about 5,000 light-years away."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/m-31.webp",
    "title": "M31 Andromeda Galaxy",
    "caption": "RedCat51 and 533MC Pro with IR cut filter, Bortle 4 sky in Germany. 60×120 s lights, unguided, processed in Siril 1.2 with StarNet++."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/ngc1396def.webp",
    "title": "NGC 1396",
    "caption": "Median of 57 shots of 30 s with a Newton 150PDS and ASI533MM Pro, processed in PixInsight."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/dragons-egg.webp",
    "title": "Dragon's Egg",
    "caption": ""
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/ngc5907-cn.webp",
    "title": "NGC 5907 Splinter Galaxy",
    "caption": "An edge-on spiral galaxy more than 50 million light-years away in Draco."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/m42-med.webp",
    "title": "M42 Orion Nebula",
    "caption": ""
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/ngc69992-jasem-mutlaq.webp",
    "title": "NGC 6992 Veil Nebula",
    "caption": "By Jasem Mutlaq."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/sh155.webp",
    "title": "Sh2-155 Cave Nebula",
    "caption": ""
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/horsehead.webp",
    "title": "Horsehead Nebula",
    "caption": ""
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/bubble-hst.webp",
    "title": "NGC 7635 Bubble Nebula",
    "caption": "Narrowband."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/m82-pauledd.webp",
    "title": "M82 Cigar Galaxy",
    "caption": ""
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/sh2-190-med.webp",
    "title": "Sh2-190 Heart Nebula",
    "caption": ""
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/ngc2237-sho-enhanced-med.webp",
    "title": "NGC 2237 Rosette Nebula",
    "caption": "SHO palette."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/ngc-2174-sho-med.webp",
    "title": "NGC 2174 Monkey Head Nebula",
    "caption": "SHO palette."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/north-american-stack-of-9-ha-and-9-oiii-5-min-2.webp",
    "title": "NGC 7000 North America Nebula",
    "caption": "9 Ha and 9 OIII frames of 5 minutes."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/andromeda-stack-of-10-ha-and-7-oiii-5-min.webp",
    "title": "M31 Andromeda Galaxy",
    "caption": "10 Ha and 7 OIII frames of 5 minutes."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/cave-nebula-stack-of-15-ha-and-8-oiii.webp",
    "title": "Sh2-155 Cave Nebula",
    "caption": "15 Ha and 8 OIII frames."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/trifid-stack-of-4-rgb-5-min.webp",
    "title": "M20 Trifid Nebula",
    "caption": "4 RGB frames of 5 minutes."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/dumbbell-stack-of-4-rgb-5-min.webp",
    "title": "M27 Dumbbell Nebula",
    "caption": "4 RGB frames of 5 minutes."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/sharpless-184-stack-of-9-ha-and-9-oiii.webp",
    "title": "Sh2-184 Pac-Man Nebula",
    "caption": "9 Ha and 9 OIII frames."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/ngc2244.webp",
    "title": "NGC 2244 Rosette Nebula",
    "caption": ""
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/m71-july8.webp",
    "title": "M71",
    "caption": "Taken on July 8."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/ngc7000-trcol-gimp.webp",
    "title": "NGC 7000 North America Nebula",
    "caption": "Tricolor, processed in GIMP."
  },
  {
    "album": "deep-sky",
    "file": "deep-sky/eagle-hubble3.webp",
    "title": "M16 Eagle Nebula",
    "caption": "Hubble palette."
  },
  {
    "album": "setups",
    "file": "setups/dsc-3608.webp",
    "title": "Celestron CG5 with GOTO upgrade",
    "caption": "Celestron CG5 mount with the GotoNova 8400 upgrade kit and 8401 hand controller."
  },
  {
    "album": "setups",
    "file": "setups/img-6738.webp",
    "title": "Two Raspberry Pis with StellarMate",
    "caption": "Two Raspberry Pis running StellarMate, one for the guide camera and mount and one for the main camera, on a dedicated Wi-Fi network, with KStars and Ekos on a laptop."
  },
  {
    "album": "setups",
    "file": "setups/20190420-0002-lrm-20190420-174812.webp",
    "title": "EQ8 with two cables",
    "caption": "Everything on the scope connects to a Rigrunner and a 7-port USB3 hub, so only two cables come off the mount. Shown with an ASI178MC for planetary and lunar imaging."
  },
  {
    "album": "setups",
    "file": "setups/ca300-eq8.webp",
    "title": "CA300 on an EQ8",
    "caption": ""
  },
  {
    "album": "setups",
    "file": "setups/ca300-setup.webp",
    "title": "CA300 setup",
    "caption": ""
  },
  {
    "album": "setups",
    "file": "setups/ca300-flatfield.webp",
    "title": "CA300 with flat field panel",
    "caption": ""
  },
  {
    "album": "setups",
    "file": "setups/20160124-174718.webp",
    "title": "Setup, January 2016",
    "caption": ""
  },
  {
    "album": "setups",
    "file": "setups/dscf4070-result.webp",
    "title": "Astrophotography setup",
    "caption": ""
  },
  {
    "album": "setups",
    "file": "setups/img-6739.webp",
    "title": "Astrophotography setup",
    "caption": ""
  }
];
