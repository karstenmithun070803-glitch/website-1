/**
 * Stub content — used when Sanity is not yet populated (no `homePage` document).
 * Mirrors the shape of what the HOME_PAGE_QUERY would return, populated from
 * Deliverable 4 §5 (WHAT we build). Site renders end-to-end from this alone.
 *
 * Once Sanity has a `homePage` doc, this becomes fallback-only.
 */

export type StubHotspot = {
  label: string;
  description: string;
  cardImagePath?: string;
};

export type StubSubScene = {
  stepLabel: string;
  stepDescription: string;
  hotspots: StubHotspot[];
};

export type StubBuildCard = {
  number: string;
  heading: string;
  body: string;
};

export type StubPhase = {
  number: number;
  name: string;
  introBody: string;
  backgroundVideoPath?: string;
  backgroundVideoPoster?: string;
  subScenes: StubSubScene[];
  cards?: StubBuildCard[]; // Phase 4 only
  endOfPhaseCard?: {
    heading: string;
    body: string;
    ctaLabel: string;
  };
};

export type StubTourRoom = {
  slug: string;
  name: string;
  thumbnailPath: string;
  reveal: "video" | "kenBurnsStill";
  revealVideoPath?: string;
  revealImagePath?: string;
  description: string;
  aerialPosition: { xPct: number; yPct: number };
};

export type StubHomePage = {
  intro: {
    tagline: string;
    enterButtonLabel: string;
    backgroundImagePath: string;
    wordmarkImagePath: string;
  };
  hero: {
    headline: string;
    subline: string;
    heroVideoPath: string;
    heroVideoPoster: string;
  };
  manifesto: string[];
  transitionHeadline: string;
  transitionSubline: string;
  phases: StubPhase[];
  tour: {
    introChip: string;
    introHeadline: string;
    introBody: string;
    aerialImagePath: string;
    rooms: StubTourRoom[];
  };
  contactModal: {
    heading: string;
    subline: string;
    confirmationMessage: string;
    backgroundImagePath: string;
  };
};

// URL-encode helpers — user-supplied filenames contain spaces
const VIDEO = (n: number) => `/assets/video/raw/${encodeURIComponent(`Video ${n}.mp4`)}`;
const IMG = (id: string) => `/assets/img/${encodeURIComponent(`IMG ${id}.png`)}`;

export const stubHomePage: StubHomePage = {
  intro: {
    tagline: "Interior Design Studio",
    enterButtonLabel: "Enter",
    backgroundImagePath: IMG("D1"),
    wordmarkImagePath: IMG("D2"),
  },
  hero: {
    headline: "ROOMS THAT HOLD THE DAY.",
    subline:
      "We design homes for the people who actually live in them — thoughtfully, materially, and with no visible seams.",
    heroVideoPath: VIDEO(1),
    heroVideoPoster: IMG("D1"),
  },
  manifesto: [
    "Every project begins with a room's own logic — how light enters, where people gather, which corners deserve the good chair. We start there, not with a mood board.",
    "From that first honest brief through the last curated object, Karst designs residences and quiet commercial spaces that reward the time you spend in them.",
  ],
  transitionHeadline: "BEGIN A HOME WITH US",
  transitionSubline:
    "Every home we design moves through five phases — each measured, each deliberate.",
  phases: [
    // ─── 1. LISTEN ───────────────────────────────────────────────
    {
      number: 1,
      name: "Listen",
      introBody:
        "We spend the first weeks not designing anything at all. We walk the site at different hours, meet everyone who'll live there, and note the small things — where the light lands at four in the afternoon, which door already gets left open.",
      backgroundVideoPath: VIDEO(2),
      backgroundVideoPoster: IMG("B1"),
      subScenes: [
        {
          stepLabel: "STEP 01",
          stepDescription: "We read the plot before we draw on it.",
          hotspots: [
            {
              label: "Orientation & Light",
              description:
                "North–south axis, how each room receives the sun through the year, where shade needs to be built.",
              cardImagePath: IMG("B1"),
            },
            {
              label: "Landscape & Terrain",
              description:
                "Existing trees to preserve, sight-lines to protect, the topography we design with instead of against.",
              cardImagePath: IMG("B1"),
            },
            {
              label: "Neighborhood Grain",
              description:
                "What the surrounding architecture already speaks. Our work continues a conversation — never interrupts one.",
              cardImagePath: IMG("B1"),
            },
          ],
        },
        {
          stepLabel: "STEP 02",
          stepDescription:
            "We translate lived detail into design intent — a working brief you can hold in your hand.",
          hotspots: [
            {
              label: "The Client's Real Day",
              description:
                "How you actually spend a Sunday, where the kids drop their bags, which rooms will hold guests, which are only for you.",
            },
            {
              label: "Objects You Already Love",
              description:
                "The paintings, the books, the chair from your grandmother — they usually tell us more about the room than a mood board can.",
            },
            {
              label: "Rhythm of the House",
              description:
                "When does the house need to be loud, when quiet, when open, when closed. This shapes every plan we draw next.",
            },
          ],
        },
      ],
    },

    // ─── 2. SKETCH (uses subScenes → interpreted as split-column entries) ─
    {
      number: 2,
      name: "Sketch",
      introBody:
        "We begin drawing by hand. Concepts before computers, in soft pencil on tracing paper, so nothing gets committed too early. Every idea we bring you at this stage has been argued for.",
      subScenes: [
        {
          stepLabel: "ENTRY 01",
          stepDescription:
            "Three or four honest directions on the table, each pursued far enough to be judged, not just seen. We show you what we ruled out and why.",
          hotspots: [
            { label: "First Concepts", description: "", cardImagePath: IMG("A1") },
          ],
        },
        {
          stepLabel: "ENTRY 02",
          stepDescription:
            "Once one direction earns its place, we develop the plan drawings — where every wall, opening, and threshold sits. This is the document the whole rest of the project will refer back to.",
          hotspots: [{ label: "The Plan", description: "", cardImagePath: IMG("A2") }],
        },
        {
          stepLabel: "ENTRY 03",
          stepDescription:
            "Every project's material story is decided on a single table. Stone against wood against linen against brass — how they age together, how they meet at every edge.",
          hotspots: [{ label: "Material Palette", description: "", cardImagePath: IMG("A3") }],
        },
        {
          stepLabel: "ENTRY 04",
          stepDescription:
            "A physical model at 1:50, and hand-drawn elevations of every important wall. Rooms are three-dimensional propositions — we test them that way before we commit anyone to build them.",
          hotspots: [{ label: "Models & Elevations", description: "", cardImagePath: IMG("A4") }],
        },
        {
          stepLabel: "ENTRY 05",
          stepDescription:
            "How a stair meets a floor, how a door pull sits in the hand, how a shadow line runs behind a kitchen counter. These are the small decisions that separate a good room from a great one.",
          hotspots: [{ label: "Detail Studies", description: "", cardImagePath: IMG("A5") }],
        },
        {
          stepLabel: "ENTRY 06",
          stepDescription:
            "We compose rooms with model furniture at scale before a single piece is sourced. It tells us where the good chair really wants to sit, and how much room the good chair really needs to breathe.",
          hotspots: [
            { label: "Furniture & Composition", description: "", cardImagePath: IMG("A6") },
          ],
        },
      ],
      endOfPhaseCard: {
        heading: "The Result of Sketch.",
        body: "A full concept package: floor plans, elevations, physical model, material palette, and a fixed budget the whole build will honor.",
        ctaLabel: "See a past project",
      },
    },

    // ─── 3. REFINE ───────────────────────────────────────────────
    {
      number: 3,
      name: "Refine",
      introBody:
        "Refinement is what protects the concept from erosion during construction. Every line on every drawing carries a decision behind it — and a reason we can defend.",
      backgroundVideoPath: VIDEO(3),
      backgroundVideoPoster: IMG("B2"),
      subScenes: [
        {
          stepLabel: "STEP 01",
          stepDescription:
            "Every drawing package we hand to the builders has been reviewed by the entire studio.",
          hotspots: [
            {
              label: "Construction Drawings",
              description:
                "Full working drawings for the builders. Dimensioned floor plans, reflected ceiling plans, elevations of every joinery run, and details for every non-standard condition.",
              cardImagePath: IMG("B2"),
            },
            {
              label: "Joinery & Millwork",
              description:
                "Custom joinery drawn and modeled to millimeter tolerance. Every cabinet, every closet, every built-in — designed to sit exactly right, made by a workshop we know by name.",
              cardImagePath: IMG("B2"),
            },
            {
              label: "Lighting Design",
              description:
                "A room is only as good as its light at 4pm and again at 10pm. We design the lighting layer separately, with photometrics, so the room reads correctly in every hour of the day.",
              cardImagePath: IMG("B2"),
            },
          ],
        },
        {
          stepLabel: "STEP 02",
          stepDescription:
            "Specification schedules go into the contract. Nothing is left to the builder's interpretation.",
          hotspots: [
            {
              label: "Stone & Timber",
              description:
                "Every stone slab selected in person at the yard, every timber batch signed off. No substitutions, no surprises on delivery day.",
            },
            {
              label: "Metals & Fittings",
              description:
                "Solid unlacquered brass, blackened steel, hand-cast bronze. Fittings and hardware chosen to develop a patina, not to be replaced.",
            },
            {
              label: "Fabric & Upholstery",
              description:
                "Belgian linens, un-dyed wools, monk's cloth, boucle. We favor materials that ask to be lived on.",
            },
          ],
        },
      ],
    },

    // ─── 4. BUILD (uses cards[] instead of subScenes) ────────────
    {
      number: 4,
      name: "Build",
      introBody:
        "During construction, Karst remains on site weekly. We meet the trades, review every finish sample against the specification, and protect the project from the small drifts that would compromise it.",
      backgroundVideoPath: VIDEO(3), // portrait-cropped in the component
      backgroundVideoPoster: IMG("B2"),
      subScenes: [],
      cards: [
        {
          number: "01",
          heading: "Site Mobilization",
          body: "Contractors mobilize on site, protections go in, and the first phase of demolition or excavation begins. Karst is present the day the work starts.",
        },
        {
          number: "02",
          heading: "Structure & Envelope",
          body: "Framing, walls, roofing, windows, and the sealing of the building envelope. The house's bones are set — and we visit twice a week to confirm every wall lands where the drawings say it does.",
        },
        {
          number: "03",
          heading: "Finishes First-Fix",
          body: "Plastering, screeds, joinery carcasses installed, wet trades completed. This is when materials arrive on site in volume, and every delivery is checked against the specification schedule.",
        },
        {
          number: "04",
          heading: "Finishes Second-Fix",
          body: "Cabinetry doors, hardware, sanitaryware, lighting fixtures, floor finishes laid. The house begins to look like the drawings — and this is when we're on site the most, protecting every finish transition.",
        },
        {
          number: "05",
          heading: "Commissioning & Snagging",
          body: "Systems tested, defects logged and resolved, cleaning through. We hand over a house that meets the standard we agreed to — no gray-area punch list, no lingering items.",
        },
      ],
    },

    // ─── 5. LIVE ─────────────────────────────────────────────────
    {
      number: 5,
      name: "Live",
      introBody:
        "The last two weeks are the ones that separate a completed house from a home. Styling, objects, and the first quiet evening before the client moves in.",
      backgroundVideoPath: VIDEO(4),
      backgroundVideoPoster: IMG("B3"),
      subScenes: [
        {
          stepLabel: "STEP 01",
          stepDescription:
            "When we hand over the keys, the house is complete — not almost complete.",
          hotspots: [
            {
              label: "Styling & Curation",
              description:
                "We install every piece of furniture, every art work, every object — often over three or four days — until the house has the composed calm we designed for.",
              cardImagePath: IMG("B3"),
            },
            {
              label: "The Handover Book",
              description:
                "A bound document detailing every material, every fixture, every supplier — with care and warranty information — for you to keep.",
              cardImagePath: IMG("B3"),
            },
            {
              label: "Aftercare, One Year",
              description:
                "For twelve months after handover we return quarterly to check every finish, resolve any question, and re-adjust any door that needs it. The relationship isn't over on move-in day.",
              cardImagePath: IMG("B3"),
            },
          ],
        },
      ],
    },
  ],

  tour: {
    introChip: "TAKE A TOUR",
    introHeadline: "STEP INSIDE A KARST HOME",
    introBody:
      "This is a home we completed for a family of four on the coast. Every room shown was styled, photographed, and lived in for six months before we returned to capture it.",
    aerialImagePath: IMG("B3"),
    rooms: [
      {
        slug: "living",
        name: "Living Room",
        thumbnailPath: IMG("C1"),
        reveal: "video",
        revealVideoPath: VIDEO(5),
        description:
          "Boucle sofa in oat, fluted stone table, a single Noguchi Akari, and an abstract painting we sourced specifically for this wall. The room the family gathers in every evening.",
        aerialPosition: { xPct: 30, yPct: 55 },
      },
      {
        slug: "kitchen",
        name: "Kitchen & Dining",
        thumbnailPath: IMG("C2"),
        reveal: "video",
        revealVideoPath: VIDEO(6),
        description:
          "The island is one book-matched slab of Calacatta Viola marble, 2.4m long, resting on hand-plastered black-brown volumes. Brass pendant lights we co-designed with a workshop in Antwerp.",
        aerialPosition: { xPct: 50, yPct: 45 },
      },
      {
        slug: "bedroom",
        name: "Bedroom Suite",
        thumbnailPath: IMG("C3"),
        reveal: "video",
        revealVideoPath: VIDEO(7),
        description:
          "A Belgian-modernist bedroom in limewashed white and pale oak. Every element chosen to soften first light — from the monk's-cloth curtain to the paper drum pendant.",
        aerialPosition: { xPct: 70, yPct: 40 },
      },
      {
        slug: "powder",
        name: "Powder Room",
        thumbnailPath: IMG("C4"),
        reveal: "kenBurnsStill",
        revealImagePath: IMG("C4"),
        description:
          "A jewel-box: one slab of book-matched green marble, an unlacquered brass tap, a ribbed-glass sconce, a candle always burning.",
        aerialPosition: { xPct: 40, yPct: 65 },
      },
      {
        slug: "terrace",
        name: "Garden Terrace",
        thumbnailPath: IMG("C5"),
        reveal: "kenBurnsStill",
        revealImagePath: IMG("C5"),
        description:
          "A raw travertine table, bentwood chairs, and a linen umbrella. The client eats here from May to October.",
        aerialPosition: { xPct: 25, yPct: 75 },
      },
      {
        slug: "cellar",
        name: "Wine Cellar",
        thumbnailPath: IMG("C6"),
        reveal: "kenBurnsStill",
        revealImagePath: IMG("C6"),
        description:
          "A quiet room below the kitchen: vaulted brick, brass sconces, two coupes on a marble tasting counter.",
        aerialPosition: { xPct: 60, yPct: 70 },
      },
    ],
  },

  contactModal: {
    heading: "Begin a conversation.",
    subline:
      "Tell us about the space and the way you want to live in it. We read every note.",
    confirmationMessage: "Thank you. We'll be in touch within two working days.",
    backgroundImagePath: IMG("D3"),
  },
};
