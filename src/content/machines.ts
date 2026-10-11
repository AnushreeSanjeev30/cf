// The machine catalogue. Product pages, the home page, the enquiry form,
// the sitemap and the old-URL redirects are all generated from this list.
//
// Only specs that appear on the current site are filled in. When the client
// sends datasheets, add rows to `specs` and set `specsComplete: true`.

export type Stage = "print" | "laminate" | "slit" | "inspect";

export type Machine = {
  slug: string;
  name: string;
  model?: string;
  stage: Stage;
  summary: string;
  description: string[];
  keySpec?: string;
  specs: { label: string; value: string }[];
  specsComplete: boolean;
  colours?: number;
  image?: { src: string; alt: string };
  /** Paths on the old WordPress site that should redirect here. */
  legacyPaths: string[];
};

export const stages: { id: Stage; name: string; what: string }[] = [
  { id: "print", name: "Print", what: "Engraved cylinders transfer ink onto the film, one colour per station." },
  { id: "laminate", name: "Laminate", what: "The printed film is bonded to a second layer for strength and barrier." },
  { id: "slit", name: "Slit", what: "The wide jumbo roll is cut down into the reel widths the pouch maker needs." },
  { id: "inspect", name: "Inspect and rewind", what: "Finished reels are checked for defects, corrected and rewound for dispatch." },
];

const wp = (path: string) => `https://canaraflex.com/wp-content/uploads/${path}`;

export const machines: Machine[] = [
  {
    slug: "shaftless-rotogravure",
    name: "Shaftless rotogravure printing machine",
    model: "RG 3000",
    stage: "print",
    summary: "Eight-colour rotogravure press with an independent drive at every station.",
    description: [
      // TODO: client to confirm wording and add details (web width, register control, dryer type).
      "On a shaftless press each print unit has its own servo drive instead of being linked to a common line shaft. Register is held electronically, so changeovers are quicker and there is less mechanical wear.",
      "The RG 3000 runs eight colours at up to 250 metres a minute, for printing BOPP, PET, CPP and similar films used in food, pharma and FMCG packaging.",
    ],
    keySpec: "8 colours, 250 m/min",
    colours: 8,
    specs: [
      { label: "Model", value: "RG 3000" },
      { label: "Print stations", value: "8 colours" },
      { label: "Machine speed", value: "250 m/min" },
      { label: "Drive", value: "Shaftless (independent servo per station)" },
    ],
    specsComplete: false,
    image: { src: wp("2022/07/RG-3000-shaft-less-scaled.jpg"), alt: "RG 3000 shaftless rotogravure printing machine" },
    legacyPaths: ["/shaft-less-rotogravure-printing-machines"],
  },
  {
    slug: "rotogravure-online-lamination",
    name: "High-speed rotogravure with online lamination",
    stage: "print",
    summary: "Prints and laminates in a single pass, saving a separate lamination run.",
    description: [
      // TODO: client to supply model, colours, speed and laminating method.
      "The lamination unit sits at the end of the press, so the printed web is bonded to its second layer before it is rewound. One pass replaces two, which saves time, floor space and handling.",
    ],
    specs: [],
    specsComplete: false,
    image: { src: wp("2025/05/RG-250-scaled.webp"), alt: "Canara Flex rotogravure press" }, // TODO: confirm this photo shows this machine
    legacyPaths: ["/high-speed-roto-with-online-lamination-machine"],
  },
  {
    slug: "dry-lamination",
    name: "Dry lamination machine",
    model: "LM 2000",
    stage: "laminate",
    summary: "Solvent-based adhesive lamination for multi-layer packaging films.",
    description: [
      "Adhesive is applied to one film, its solvent is driven off in a drying tunnel, and the film is then pressed against the second layer under heat and nip pressure.",
      "The LM 2000 runs at up to 200 metres a minute.",
    ],
    keySpec: "200 m/min",
    specs: [
      { label: "Model", value: "LM 2000" },
      { label: "Machine speed", value: "200 m/min" },
    ],
    specsComplete: false,
    legacyPaths: ["/dry-lamination-machines"],
  },
  {
    slug: "solventless-lamination",
    name: "Solventless laminating machine",
    model: "Canaraflex 3000",
    stage: "laminate",
    summary: "Laminates with solvent-free adhesive, with no drying tunnel to run.",
    description: [
      "Solvent-free adhesive is applied in a very thin coat and the two films are bonded directly. With no solvent to evaporate, the machine uses less energy, takes less space and leaves no retained solvent in the laminate.",
    ],
    specs: [{ label: "Model", value: "Canaraflex 3000" }],
    specsComplete: false,
    legacyPaths: ["/solventfree-laminating-machine"],
  },
  {
    slug: "slitting",
    name: "Slitting machine",
    stage: "slit",
    summary: "Cuts jumbo rolls into finished reels at the widths your customers order.",
    description: [
      "The machine unwinds the master roll, slits it lengthwise with blades or razors, and rewinds each strip as a separate reel with even tension so it runs cleanly on the customer's pouch or form-fill-seal machine.",
    ],
    specs: [],
    specsComplete: false,
    legacyPaths: ["/slitting-machines"],
  },
  {
    slug: "inspection-rewinder",
    name: "Inspection rewinder",
    stage: "inspect",
    summary: "Runs finished reels past an operator or camera to catch print and lamination defects.",
    description: [
      "Reels are unwound and rewound under controlled tension while defects are spotted and marked, so faulty material is caught in the plant rather than at the customer's line.",
    ],
    specs: [],
    specsComplete: false,
    legacyPaths: ["/inspection-rewinder"],
  },
  {
    slug: "doctoring",
    name: "Doctoring machine",
    stage: "inspect",
    summary: "Rewinds reels so defective sections can be removed and the web spliced.",
    description: [
      "When inspection finds a defect, the doctoring machine lets the operator stop at the fault, cut it out and splice the good material back together before the reel is rewound and dispatched.",
    ],
    specs: [],
    specsComplete: false,
    legacyPaths: ["/doctoring-machines"],
  },
];

export const getMachine = (slug: string) => machines.find((m) => m.slug === slug);
export const machinesByStage = (stage: Stage) => machines.filter((m) => m.stage === stage);
