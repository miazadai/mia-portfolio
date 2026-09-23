import {
<<<<<<< HEAD
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { Link, useSearchParams } from "react-router";

import {
  COLLECTIONS,
  PROJECTS,
  PROJECT_ALIASES,
} from "../data/projectData.js";

import "../styles/Projects.css";

const IMAGE_TIME = 5000;
const RESUME_TIME = 10000;

const visibleProjects = PROJECTS.filter(
  (project) => project.visible !== false
);

const projectUrl = (id) =>
  `/projects?project=${encodeURIComponent(id)}`;

const deckPositions = new Map();

function asset(path) {
  if (typeof path !== "string" || !path.trim()) return "";

  const value = path.trim();

  if (/^https?:\/\//i.test(value)) return value;

  if (
    /^\/\//.test(value) ||
    /^[a-z][a-z\d+.-]*:/i.test(value)
  ) {
    return "";
  }

  const base = import.meta.env.BASE_URL || "/";

  return `${base.replace(/\/$/, "")}/${value.replace(/^\/+/, "")}`;
}

function approvedMedia(project, items = []) {
  if (project.mediaAccess === "restricted") return [];

  return items.filter(
    (item) =>
      item &&
      item.approved === true &&
      ["image", "video"].includes(item.type) &&
      asset(item.src)
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
  );

  useEffect(() => {
    const query = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function usePageHidden() {
  const [hidden, setHidden] = useState(
    () =>
      typeof document !== "undefined" &&
      document.hidden
  );

  useEffect(() => {
    const update = () => setHidden(document.hidden);

    document.addEventListener("visibilitychange", update);

    return () =>
      document.removeEventListener("visibilitychange", update);
  }, []);

  return hidden;
}

function MediaTracks({ tracks = [] }) {
  return tracks
    .filter((track) => asset(track.src))
    .map((track) => (
      <track
        key={track.src}
        kind={track.kind || "captions"}
        src={asset(track.src)}
        srcLang={track.language || "en"}
        label={track.label || "English"}
        default={track.default === true}
      />
    ));
}

function Cover({ project, number }) {
  const media = approvedMedia(
    project,
    project.cover ? [project.cover] : []
  )[0];

  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(false);

  const ref = useRef(null);
  const reduced = useReducedMotion();
  const hidden = usePageHidden();

  useEffect(() => {
    if (!ref.current || media?.type !== "video") {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([item]) => setInView(item.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [media?.src, media?.type]);

  useEffect(() => {
    const video = ref.current;

    if (!video || media?.type !== "video") return;

    if (inView && !hidden && !reduced) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, hidden, reduced, media?.type]);

  if (!media || failed) {
    return (
      <div className="pp-cover-placeholder">
        <span className="pp-cover-number" aria-hidden="true">
          {number}
        </span>

        <strong>{project.cardTitle || project.title}</strong>

        <small>
          {project.mediaAccess === "restricted"
            ? "INTERNAL MEDIA NOT DISPLAYED"
            : "PROJECT OVERVIEW"}
=======
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Badge,
  Col,
  Container,
  ProgressBar,
  Row,
} from "react-bootstrap";

import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Github,
  LockKeyhole,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";

import {
  Link,
  useSearchParams,
} from "react-router";

import "../styles/Projects.css";

/* =========================================================
   SETTINGS
========================================================= */

const IMAGE_SLIDE_TIME = 5000;
const AUTOPLAY_RESUME_TIME = 10000;

/*
  GitHub Pages / Vite safe asset path.

  Example:
  media: "projects/first-robotics/cover.jpg"

  becomes:
  /mia-portfolio/projects/first-robotics/cover.jpg
  when deployed with a Vite base path.
*/
const asset = (path) => {
  if (!path) return "";

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(
    /^\/+/,
    ""
  )}`;
};

/* =========================================================
   PROJECT DATA

   As we finish each project together, THIS is the part
   we will keep updating.
========================================================= */

const projects = [
  /* =======================================================
     CORE PROJECTS
  ======================================================= */

  {
    id: "first-robotics",
    collection: "core",
    number: "01",

    title:
      "FIRST Robotics | Engineering & Team Leadership",

    shortTitle: "FIRST Robotics",

    organization:
      "Saber Dynamics 8871 + Crusaders 4270",

    category:
      "ROBOTICS • DESIGN • MANUFACTURING",

    role:
      "Mechanical Lead • Team Captain • Manufacturing • Electrical • Drive Team",

    dates: "2022 – 2024",

    mediaAccess: "full",

    cover: null,

    cardSummary:
      "Designed, modeled, manufactured, and integrated competition robots across FIRST teams 8871 and 4270 using Autodesk Inventor, Fusion 360, and Onshape. My roles expanded from mechanical lead and team captain to manufacturing, electrical, and competitive drive-team strategy while I also trained newer members.",

    heroIntro:
      "Across three FIRST Robotics seasons, I worked through the full cycle of competitive robot development—from researching mechanisms and building CAD models to manufacturing, electrical integration, testing, and match strategy. My responsibilities grew from mechanical leadership with Saber Dynamics 8871 into team captaincy, and later into manufacturing, electrical, and drive-team strategy with Crusaders 4270.",

    overview: [
      "FIRST Robotics was one of my first opportunities to take engineering ideas from research and CAD into physical systems that had to perform under real competition constraints. I used Autodesk Inventor, Fusion 360, and Onshape to research mechanisms, compare design approaches, and create 3D models before fabrication. I then supported manufacturing and assembly, helped integrate mechanical and electrical systems, and worked through repeated design iterations as the robot developed.",

      "With Saber Dynamics 8871, I served as a mechanical lead and later team captain. I helped organize daily build activity, establish priorities and deadlines, and train newer members in shop safety, engineering workflows, and manufacturing processes. I also helped organize the team’s travel to compete internationally in Victoria, British Columbia.",
    ],

    work: [
      "Each season started with a new game and an intensive build period in which the team had to move quickly from game analysis to mechanism research, CAD, prototyping, manufacturing, wiring, assembly, and testing. My work crossed those stages rather than staying in one specialty: I contributed to mechanical design and manufacturing, worked on electrical systems, and helped evaluate whether designs were practical to build and reliable enough for competition.",

      "Competition added a different responsibility. I was a core member of the drive team, serving as a coach or strategist depending on the season and team needs. That meant understanding what our robot could realistically do, evaluating alliance partners and opponents, and helping turn those constraints into a match plan the drive team could execute on the field.",
    ],

    result:
      "Across my three seasons, my teams reached the Hawaii Regional finals each year: Team 8871 won in 2022 and finished as a finalist in 2023, while Team 4270 finished as a finalist in 2024. Team 4270 also won the 2024 Canadian Pacific Regional.",

    achievement: {
      eyebrow: "ACHIEVEMENT UNLOCKED",
      title: "3 CONSECUTIVE HAWAII REGIONAL FINALS",
      detail:
        "2022 Winner • 2023 Finalist • 2024 Finalist",
    },

    emphasis: [
      {
        name: "Mechanical Design",
        level: "primary",
      },
      {
        name: "Manufacturing",
        level: "primary",
      },
      {
        name: "Electrical",
        level: "strong",
      },
      {
        name: "Competition Strategy",
        level: "strong",
      },
      {
        name: "Leadership",
        level: "primary",
      },
    ],

    skillGroups: [
      {
        title: "DESIGN",
        skills: [
          "Autodesk Inventor",
          "Fusion 360",
          "Onshape",
        ],
      },
      {
        title: "ENGINEERING SYSTEMS",
        skills: [
          "Mechanical",
          "Manufacturing",
          "Electrical",
        ],
      },
      {
        title: "COMPETITION",
        skills: [
          "Drive Team",
          "Coach",
          "Strategy",
        ],
      },
      {
        title: "LEADERSHIP",
        skills: [
          "Team Captain",
          "Mechanical Lead",
          "Member Training",
        ],
      },
    ],

    media: [],

    links: [],
  },

  {
    id: "exoskeletal-hand-brace",
    collection: "core",
    number: "02",

    title: "Passive Exoskeletal Hand Brace",

    shortTitle:
      "Passive Exoskeletal Hand Brace",

    organization:
      "BME 60C Design Project",

    category:
      "BIOMEDICAL DESIGN • PROTOTYPING",

    role:
      "Lead Mechanical Designer • Manufacturing",

    dates: "UC Irvine",

    mediaAccess: "full",

    cover: null,

    cardSummary:
      "Designed and manufactured a passive exoskeletal hand brace intended as a low-cost therapy aid for stroke rehabilitation. I developed a 3D-printed tendon-guidance system, ratchet-and-pawl tension mechanism, and two-position release slider in SolidWorks, then iterated the design through printing, assembly, motion testing, and stress analysis.",

    heroIntro:
      "For BME 60C, my team developed a passive hand-brace prototype intended to help users apply and release controlled finger-flexion tension during rehabilitation exercises. I led most of the mechanical design and completed the manufacturing, using SolidWorks and iterative 3D printing to turn the concept into a functional wearable prototype without relying on motors.",

    overview: [
      "The project centered on creating a mechanically simple, low-cost wearable that could apply adjustable tension to the fingers for rehabilitation use. The brace used 3D-printed joints mounted along the top of a glove with tension lines routed through them. Rather than using motors, I designed the system around a ratchet-and-pawl mechanism so the user could progressively increase tension and mechanically hold that setting in place.",

      "My main responsibility was the mechanical design and manufacturing. I modeled the components in SolidWorks, designed the ratchet-and-pawl assembly and glove-mounted printed parts, and developed a sliding release mechanism that could switch between engaged and released states. The slider used flexible leaf-style detents so it naturally settled into only two positions.",
    ],

    work: [
      "The largest challenge was iteration. Limited access to school fabrication resources made the normal print-and-test cycle too slow for the number of design changes the project required, so I adapted by getting my own 3D printer and learning how to operate it for the project. That allowed me to continue revising tolerances, fit, movement, and assembly outside the school workflow and manufacture the later iterations myself.",

      "I used SolidWorks motion and stress analyses alongside physical assembly and movement testing to evaluate the design. The project was also documented in a detailed engineering design report covering the design rationale, analysis, testing, iterations, and major design decisions.",
    ],

    result:
      "The project produced a functional passive prototype demonstrating adjustable finger tension, mechanical locking, and controlled release using a ratchet-and-pawl system.",

    achievement: {
      eyebrow: "BUILD COMPLETE",
      title: "FUNCTIONAL PASSIVE PROTOTYPE",
      detail:
        "Mechanical tensioning • locking • controlled release",
    },

    nextLevel: {
      title: "SENSOR UPGRADE",
      text:
        "The next iteration will add an Arduino Nano ESP32, flex sensors, and a small display mounted on the back of the hand. The goal is to quantify finger movement over time and add a measurable data layer to the mechanical brace.",
    },

    emphasis: [
      {
        name: "Mechanical Design",
        level: "primary",
      },
      {
        name: "Manufacturing",
        level: "primary",
      },
      {
        name: "Testing",
        level: "strong",
      },
      {
        name: "Embedded Systems",
        level: "next",
      },
    ],

    skillGroups: [
      {
        title: "DESIGN",
        skills: [
          "SolidWorks",
          "Mechanism Design",
          "Design Iteration",
        ],
      },
      {
        title: "MANUFACTURING",
        skills: [
          "3D Printing",
          "Assembly",
          "Prototype Fabrication",
        ],
      },
      {
        title: "ANALYSIS",
        skills: [
          "Motion Analysis",
          "Stress Analysis",
          "Physical Testing",
        ],
      },
    ],

    media: [],

    links: [],
  },

  {
    id: "robotic-quality-control-arm",
    collection: "core",
    number: "03",

    title:
      "Robotic Quality Control Arm",

    shortTitle:
      "Robotic Quality Control Arm",

    organization: "Zotbotics",

    category:
      "ROBOTICS • AUTOMATION • COMPUTER VISION",

    role:
      "Mechanical Designer + Programmer",

    dates: "Dec 2025 – Present",

    mediaAccess: "full",

    cover: null,

    cardSummary:
      "Designed a 3D-printed end effector for a 6-DOF sorting arm and developed Arduino-based controls in C++. I also supported image-dataset development and computer-vision testing for automated object classification and sorting.",

    heroIntro:
      "This project combines mechanical design, embedded control, and computer vision in a 6-DOF robotic sorting platform. My work has focused on the physical end effector, Arduino-based control, hardware integration, and supporting image-based classification testing.",

    overview: [
      "The system is being developed as a multi-axis robotic arm capable of identifying and sorting physical objects. My contribution combines mechanical fabrication and programming, including the design of a 3D-printed end effector and Arduino-based controls written in C++.",
    ],

    work: [
      "I also sourced and organized image datasets used during computer-vision testing so the team could evaluate classification before connecting those results to the physical sorting workflow. This page will be expanded as the project progresses.",
    ],

    result:
      "The project is still in development and is being used as a platform for integrating mechanical design, embedded controls, and computer vision.",

    emphasis: [
      {
        name: "Mechanical Design",
        level: "strong",
      },
      {
        name: "Programming",
        level: "strong",
      },
      {
        name: "Automation",
        level: "strong",
      },
    ],

    skillGroups: [
      {
        title: "TOOLS",
        skills: [
          "Arduino",
          "C++",
          "3D Printing",
          "Computer Vision",
        ],
      },
    ],

    media: [],

    links: [],
  },

  /* =======================================================
     FIELD EXPERIENCE
  ======================================================= */

  {
    id: "bbraun-quality-engineering",
    collection: "field",
    number: "01",

    title:
      "Validation + PRR Automation",

    shortTitle:
      "B. Braun Quality Engineering",

    organization: "B. Braun Medical",

    category:
      "QUALITY • VALIDATION • AUTOMATION",

    role:
      "Quality Engineering Intern",

    dates: "Jun 2026 – Present",

    mediaAccess: "restricted",

    cover: null,

    cardSummary:
      "Executed IQ/OQ/PQ/PPQ validation work for a production material introduction and analyzed process data for recurring trends. I also developed Excel VBA automation that reduced a recurring Pareto-chart workflow from 1–3 business days to about one minute.",

    heroIntro:
      "My B. Braun internship introduced me to quality and validation engineering in a regulated medical-device manufacturing environment. Because the work involves internal production and validation information, this page focuses on the methods, responsibilities, and measurable workflow improvements that can be described publicly.",

    overview: [
      "I supported qualification and validation work associated with introducing a new material into production, including execution of IQ/OQ/PQ/PPQ activities and analysis of manufacturing and validation data. I worked across engineering, quality, manufacturing, and production while also supporting updates to controlled documentation.",

      "A major part of my work involved Periodic Review Report trend analysis. I developed an Excel VBA workflow that automated Pareto-chart generation, reducing a process that previously took approximately one to three business days to around one minute.",
    ],

    work: [
      "The experience required balancing technical analysis with documentation and cross-functional communication. Since internal validation records and production materials cannot be displayed publicly, the portfolio presentation focuses on the engineering workflow and measurable process improvement rather than screenshots of proprietary work.",
    ],

    result:
      "Automated a recurring PRR analysis workflow, reducing Pareto-chart generation from approximately 1–3 business days to around one minute.",

    achievement: {
      eyebrow: "PROCESS UPGRADE",
      title: "1–3 DAYS → ~1 MINUTE",
      detail:
        "Automated recurring Pareto-chart generation using Excel VBA.",
    },

    emphasis: [
      {
        name: "Validation",
        level: "primary",
      },
      {
        name: "Data Analysis",
        level: "strong",
      },
      {
        name: "Automation",
        level: "strong",
      },
      {
        name: "Documentation",
        level: "strong",
      },
    ],

    skillGroups: [
      {
        title: "LOADOUT",
        skills: [
          "IQ/OQ/PQ/PPQ",
          "Excel VBA",
          "Data Analysis",
          "Quality Engineering",
        ],
      },
    ],

    media: [],

    links: [],
  },

  {
    id: "ral-proprioception",
    collection: "field",
    number: "02",

    title:
      "Human Proprioception Research",

    shortTitle:
      "Human Proprioception Research",

    organization:
      "Rehabilitation & Augmentation Laboratory | UCI",

    category:
      "BIOMECHANICS • HUMAN SUBJECTS • DATA",

    role:
      "Undergraduate Research Assistant",

    dates: "Research Experience",

    mediaAccess: "limited",

    cover: null,

    cardSummary:
      "Conduct human-subject proprioception experiments using Vicon motion capture, an instrumented treadmill, EMG, and force plates. I also process gait and perception data in Vicon Nexus and MATLAB and support procedure refinement and research figures.",

    heroIntro:
      "At the Rehabilitation & Augmentation Laboratory, I support human-subject research focused on lower-limb proprioception during walking. The work combines participant-facing experimental procedures with synchronized motion-capture, force, EMG, and treadmill data.",

    overview: [
      "I help prepare and run participants through experimental conditions involving different visual and motor tasks while collecting synchronized kinematic and sensor data. The experimental setup includes Vicon motion capture, an instrumented treadmill, EMG, and force plates.",

      "I also process and organize gait and perception data using Vicon Nexus and MATLAB and contribute to procedure refinement, experimental-design improvements, and preparation of research figures.",
    ],

    work: [
      "Because this is ongoing human-subject research, unpublished data and participant information are not displayed on the portfolio. Approved equipment or general lab imagery can be added later if appropriate.",
    ],

    result:
      "The experience has given me hands-on exposure to experimental biomechanics, synchronized sensing, participant procedures, and analysis of human-movement data.",

    emphasis: [
      {
        name: "Biomechanics",
        level: "primary",
      },
      {
        name: "Experimentation",
        level: "primary",
      },
      {
        name: "Data Analysis",
        level: "strong",
      },
    ],

    skillGroups: [
      {
        title: "LOADOUT",
        skills: [
          "Vicon",
          "MATLAB",
          "EMG",
          "Force Plates",
          "Human-Subject Research",
        ],
      },
    ],

    media: [],

    links: [],
  },

  {
    id: "limoli-lab",
    collection: "field",
    number: "03",

    title:
      "Radiation Oncology Wet-Lab Research",

    shortTitle:
      "Limoli Lab Research",

    organization:
      "Charles Limoli Lab | UC Irvine",

    category:
      "WET LAB • CANCER RESEARCH",

    role:
      "Undergraduate Research Assistant",

    dates: "Nov 2025 – Present",

    mediaAccess: "restricted",

    cover: null,

    cardSummary:
      "Support neuroscience-related cancer research through plasmid preparation, sterile technique, pipetting, and selective bacterial culture. The experience has given me hands-on practice with core wet-lab workflows and standard research equipment.",

    heroIntro:
      "The Limoli Lab gave me hands-on experience with the wet-lab side of biomedical research. Rather than owning a standalone study, I support ongoing radiation-oncology and neuroscience-related cancer research while learning the techniques and laboratory discipline needed for reliable experimental work.",

    overview: [
      "My work has included plasmid preparation, sterile technique, pipetting, and selective bacterial culture using antibiotic-containing agar plates. I have also learned to operate and work around standard laboratory equipment including centrifuges, vortex mixers, water baths, incubators, and autoclaves.",

      "Because this work supports larger ongoing studies, the experience has focused on building dependable laboratory habits: maintaining sterile conditions, handling samples carefully, following established procedures consistently, and understanding how small procedural errors can affect downstream research.",
    ],

    work: [],

    result:
      "This experience expanded my engineering background into hands-on biological research and strengthened my foundation in wet-lab methods.",

    emphasis: [
      {
        name: "Wet-Lab Methods",
        level: "primary",
      },
      {
        name: "Research Support",
        level: "strong",
      },
    ],

    skillGroups: [
      {
        title: "LAB METHODS",
        skills: [
          "Pipetting",
          "Sterile Technique",
          "Plasmid Preparation",
          "Bacterial Culture",
        ],
      },
      {
        title: "EQUIPMENT",
        skills: [
          "Centrifuge",
          "Vortex Mixer",
          "Water Bath",
          "Incubator",
          "Autoclave",
        ],
      },
    ],

    media: [],

    links: [],
  },

  {
    id: "xr-labs",
    collection: "field",
    number: "04",

    title:
      "3D Anatomical Modeling & Plastination Research",

    shortTitle:
      "3D Anatomical Modeling",

    organization:
      "XR Labs | University of Hawai‘i JABSOM",

    category:
      "3D MODELING • PHOTOGRAMMETRY • RESEARCH",

    role:
      "Biomedical Researcher + 3D Modeler",

    dates: "Jun 2025 – Jul 2025",

    mediaAccess: "limited",

    cover: null,

    cardSummary:
      "Created high-fidelity 3D anatomical models from specimen photography through photogrammetry, reconstruction, cleanup, and presentation using Adobe Lightroom, RealityCapture, ZBrush, and Sketchfab. I also developed a repeatable ZBrush end-cap cleanup workflow and contributed model work to anatomical modeling research.",

    heroIntro:
      "At XR Labs, I learned how to turn physical anatomical specimens into detailed digital models from the ground up. My workflow began with structured photography around each specimen, continued through image preparation and photogrammetric reconstruction, and ended with detailed mesh cleanup, anatomical refinement, and presentation for teaching and research.",

    overview: [
      "I worked alongside two other interns to create several 3D anatomical models using a full photogrammetry workflow. For each model, the process began with the physical specimen and a controlled series of photographs captured from multiple angles. I prepared image sets in Adobe Lightroom, reconstructed the geometry in RealityCapture, and moved the mesh into ZBrush for cleanup and anatomical refinement before preparing finished models for review and presentation in Sketchfab.",

      "Photogrammetry frequently produced artifacts or incomplete geometry, particularly around the open ends of specimens. I focused on those cleanup problems and developed a more consistent end-cap workflow in ZBrush so those regions could be repaired with cleaner geometry and a more repeatable process. I documented and shared that workflow so others in the lab could reuse it.",
    ],

    work: [
      "My modeling work also extended into plastination research. I cleaned photogrammetry meshes of Olive Ridley and Loggerhead turtle heads, including end-cap correction, internal detail, texture fidelity, and figure-related technical notes. That work contributed to anatomical modeling research and required the models to meet research and teaching expectations rather than simply look polished.",
    ],

    result:
      "The internship produced multiple instruction-ready anatomical models and a reusable workflow for cleaning difficult specimen end caps, while later turtle-model work contributed to published research.",

    achievement: {
      eyebrow: "RESEARCH MILESTONE",
      title: "PUBLISHED MODELING WORK",
      detail:
        "3D anatomical model contributions extended into published research.",
    },

    emphasis: [
      {
        name: "3D Modeling",
        level: "primary",
      },
      {
        name: "Photogrammetry",
        level: "primary",
      },
      {
        name: "Research",
        level: "strong",
      },
      {
        name: "Workflow Development",
        level: "strong",
      },
    ],

    skillGroups: [
      {
        title: "IMAGING",
        skills: [
          "Adobe Lightroom",
          "RealityCapture",
          "Photogrammetry",
        ],
      },
      {
        title: "3D MODELING",
        skills: [
          "ZBrush",
          "Mesh Cleanup",
          "Anatomical Refinement",
          "Sketchfab",
        ],
      },
    ],

    media: [],

    links: [],
  },

  {
    id: "kupu-place",
    collection: "field",
    number: "05",

    title:
      "Low-Cost Aquaponics Filtration System",

    shortTitle:
      "Aquaponics Filtration",

    organization: "Kupu Place Farms",

    category:
      "MECHANICAL • FABRICATION • AGRICULTURE",

    role:
      "Mechanical Engineering Intern",

    dates: "Jun 2024 – Jul 2024",

    mediaAccess: "full",

    cover: null,

    cardSummary:
      "Designed two radial-flow settlers and gravity-fed elevations in Onshape and helped build a Matala mat clarifier system for Kupu Place Farms. The in-house filtration system cost $886 compared with a $4,747 commercial option while supporting a projected increase from about 50 to 150+ lettuce heads per week.",

    heroIntro:
      "At Kupu Place Farms, I worked on engineering problems where cost, simplicity, and maintainability mattered as much as performance. My main project was a larger, lower-cost aquaponics filtration system, while I also designed and fabricated smaller tools intended to improve daily farm work.",

    overview: [
      "The farm needed a filtration solution that could support increased aquaponics production without the cost of a commercial system. I used Onshape to design two radial-flow settlers and plan gravity-fed elevations, then helped fabricate and install the system with a Matala mat clarifier. The design had to work with the farm’s existing layout and water flow while remaining practical to build, clean, and maintain.",

      "Working at the farm also gave me direct exposure to the environment the engineering had to serve. I participated in day-to-day farm activities and worked under food-safety requirements, which made the design constraints more concrete because I was also observing and using the processes the equipment was intended to improve.",
    ],

    work: [
      "The filtration system was the largest build, but I also worked on smaller process-improvement tools. One example was an acrylic seeding tool intended to make microgreen seeding more consistent and efficient.",

      "The in-house filtration system totaled $886 compared with $4,747 for the commercial alternative, a difference of $3,861. Design calculations projected that the expanded system could support an increase from roughly 50 to more than 150 lettuce heads per week.",
    ],

    result:
      "The project combined mechanical design, fabrication, and cost-conscious problem solving to create a filtration system intended to support substantially greater farm output at a lower equipment cost.",

    achievement: {
      eyebrow: "ACHIEVEMENT UNLOCKED",
      title: "$3,861 LOWER COST",
      detail:
        "$4,747 commercial option → $886 in-house system",
    },

    emphasis: [
      {
        name: "Mechanical Design",
        level: "primary",
      },
      {
        name: "Fabrication",
        level: "primary",
      },
      {
        name: "Process Improvement",
        level: "strong",
      },
    ],

    skillGroups: [
      {
        title: "LOADOUT",
        skills: [
          "Onshape",
          "Mechanical Design",
          "Fabrication",
          "Aquaponics",
          "Acrylic Tooling",
        ],
      },
    ],

    media: [],

    links: [],
  },

  {
    id: "nsa-reporting-portal",
    collection: "field",
    number: "06",

    title:
      "Role-Based Reporting Portal",

    shortTitle:
      "Reporting Portal",

    organization:
      "National Security Agency",

    category:
      "SOFTWARE • DATA • USER ACCESS",

    role:
      "Software Development / Computer Aide Intern",

    dates: "Aug 2023 – May 2024",

    mediaAccess: "restricted",

    cover: null,

    cardSummary:
      "Co-developed an HTML, JavaScript, and SQL reporting portal for more than 200 users with role-based access and activity logs. I worked with internal customers to gather requirements and translate them into usable web features without exposing sensitive system details.",

    heroIntro:
      "During my NSA internship, I worked on an internal reporting portal designed to make recurring information easier to submit, organize, and access. Because the system and its data are not appropriate to publish, this page focuses on the technologies, user needs, and engineering responsibilities that can be described publicly.",

    overview: [
      "I helped develop a web-based reporting system using HTML, JavaScript, and SQL. The portal collected form inputs, adapted what users could view based on account permissions, and allowed authorized users to access prior submissions. The system served more than 200 users and included role-based access and activity logs.",

      "An important part of the work was communicating with customers rather than only writing code. I gathered technical requirements, clarified how users expected the system to behave, and helped coordinate development around those needs.",
    ],

    work: [
      "This experience showed me how much successful software depends on translating real user workflows into clear technical requirements while also accounting for permissions, usability, and accountability.",
    ],

    result:
      "The project gave me early experience developing software for a real user base where access control, usability, and customer requirements mattered alongside the code itself.",

    emphasis: [
      {
        name: "Web Development",
        level: "primary",
      },
      {
        name: "Database Work",
        level: "strong",
      },
      {
        name: "Requirements",
        level: "strong",
      },
    ],

    skillGroups: [
      {
        title: "DEVELOPMENT",
        skills: [
          "HTML",
          "JavaScript",
          "SQL",
        ],
      },
      {
        title: "SYSTEM DESIGN",
        skills: [
          "Role-Based Access",
          "Reporting Workflows",
          "Activity Logs",
        ],
      },
    ],

    media: [],

    links: [],
  },
];

/* =========================================================
   EMPHASIS BAR HELPERS

   These are NOT skill percentages.
========================================================= */

const emphasisValue = {
  primary: 100,
  strong: 76,
  supporting: 52,
  next: 24,
};

const emphasisLabel = {
  primary: "PRIMARY",
  strong: "STRONG",
  supporting: "SUPPORTING",
  next: "NEXT LEVEL",
};

/* =========================================================
   COVER MEDIA
========================================================= */

function ProjectCover({ project }) {
  const [failed, setFailed] = useState(false);

  if (!project.cover || failed) {
    return (
      <div className="project-cover-placeholder">
        <span className="project-cover-placeholder-code">
          {project.number}
        </span>

        <strong>
          {project.shortTitle}
        </strong>

        <small>
          MEDIA COMING SOON
>>>>>>> 6588b34bfc65cba862f0d56990c655d47add7e26
        </small>
      </div>
    );
  }

<<<<<<< HEAD
  if (media.type === "video") {
    return (
      <video
        ref={ref}
        src={asset(media.src)}
        poster={asset(media.poster) || undefined}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
=======
  if (project.cover.type === "video") {
    return (
      <video
        className="project-cover-media"
        src={asset(project.cover.src)}
        muted
        loop
        playsInline
        autoPlay
>>>>>>> 6588b34bfc65cba862f0d56990c655d47add7e26
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <img
<<<<<<< HEAD
      src={asset(media.src)}
      alt={media.alt || project.title}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function ProjectCard({ project, index }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className="pp-card"
      data-accent={project.accent}
      style={{
        "--pp-tilt": `${2.2 + (index % 3) * 0.3}deg`,
      }}
    >
      <Link
        to={projectUrl(project.id)}
        className="pp-card-link"
        aria-label={`View ${project.title}`}
      >
        <div className="pp-card-top">
          <strong className="pp-card-number">{number}</strong>

          <span className="pp-card-category">
            {project.category}
          </span>
        </div>

        <div className="pp-card-media">
          <Cover
            key={project.cover?.src || project.id}
            project={project}
            number={number}
          />
        </div>

        <div className="pp-card-body">
          <h3>{project.cardTitle || project.title}</h3>

          <p className="pp-card-org">{project.organization}</p>

          {project.dates && (
            <p className="pp-card-dates">{project.dates}</p>
          )}

          <p className="pp-card-summary">
            {project.cardSummary}
          </p>

          <div className="pp-chips pp-card-chips">
            {(project.cardSkills || []).map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>

          <span className="pp-card-cta">
            VIEW{" "}
            {project.kind === "involvement"
              ? "INVOLVEMENT"
              : "PROJECT"}
            <span aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

function ProjectDeck({ collection }) {
  const projects = visibleProjects.filter(
    (project) => project.collection === collection.id
  );

  const ref = useRef(null);
  const reduced = useReducedMotion();

  const [edges, setEdges] = useState({
    left: false,
    right: true,
  });

  const trackId = `pp-deck-${collection.id}`;

  const measure = useCallback(() => {
    const track = ref.current;
    if (!track) return;

    deckPositions.set(collection.id, track.scrollLeft);

    setEdges({
      left: track.scrollLeft > 2,
      right:
        track.scrollLeft + track.clientWidth <
        track.scrollWidth - 2,
    });
  }, [collection.id]);

  useEffect(() => {
    const track = ref.current;
    if (!track) return undefined;

    track.scrollLeft = deckPositions.get(collection.id) || 0;
    measure();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;

    observer?.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [collection.id, measure]);

  const move = (direction) =>
    ref.current?.scrollBy({
      left:
        direction *
        Math.max(270, ref.current.clientWidth * 0.65),
      behavior: reduced ? "auto" : "smooth",
    });

  if (!projects.length) return null;

  return (
    <section
      className="pp-deck"
      aria-labelledby={`${trackId}-title`}
    >
      <div className="pp-deck-heading">
        <div className="pp-quest-heading">
          <small>COLLECTION {collection.number}</small>
          <h2 id={`${trackId}-title`}>{collection.title}</h2>
        </div>

        <div className="pp-deck-controls">
          <button
            type="button"
            aria-label={`Scroll ${collection.title} left`}
            aria-controls={trackId}
            disabled={!edges.left}
            onClick={() => move(-1)}
          >
            ‹
          </button>

          <button
            type="button"
            aria-label={`Scroll ${collection.title} right`}
            aria-controls={trackId}
            disabled={!edges.right}
            onClick={() => move(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div
        className="pp-track"
        id={trackId}
        ref={ref}
        onScroll={measure}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function CarouselSlide({
  item,
  autoplay,
  advanceAllowed,
  hidden,
  onAdvance,
}) {
  const videoRef = useRef(null);
  const programmaticPause = useRef(false);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ended, setEnded] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const isVideo = item.type === "video";

  useEffect(() => {
    if (!advanceAllowed) return undefined;

    const imageReady = !isVideo && ready;

    if (!imageReady && !failed && !ended) {
      return undefined;
    }

    const timer = window.setTimeout(
      onAdvance,
      ended ? 0 : IMAGE_TIME
    );

    return () => window.clearTimeout(timer);
  }, [
    advanceAllowed,
    ready,
    failed,
    ended,
    isVideo,
    onAdvance,
  ]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isVideo || failed) return undefined;

    if (hidden) {
      if (!video.paused) {
        programmaticPause.current = true;
        video.pause();
      }
      return undefined;
    }

    let cancelled = false;

    if (
      ready &&
      autoplay &&
      !ended &&
      !videoPaused &&
      video.paused
    ) {
      video.play().catch(() => {
        if (!cancelled) setBlocked(true);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [
    isVideo,
    ready,
    autoplay,
    hidden,
    failed,
    ended,
    videoPaused,
  ]);

  if (failed) {
    return (
      <div className="pp-media-fallback" role="status">
        This media could not be loaded. Use the arrows to
        continue.
      </div>
    );
  }

  if (!isVideo) {
    return (
      <img
        src={asset(item.src)}
        alt={item.alt || item.caption || "Project image"}
        style={{
          objectFit: item.fit || "contain",
        }}
        onLoad={() => setReady(true)}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        src={asset(item.src)}
        poster={asset(item.poster) || undefined}
        controls
        muted
        playsInline
        preload="metadata"
        aria-label={
          item.alt || item.caption || "Project video"
        }
        style={{
          objectFit: item.fit || "contain",
        }}
        onLoadedMetadata={() => setReady(true)}
        onError={() => setFailed(true)}
        onEnded={() => setEnded(true)}
        onPlay={() => {
          programmaticPause.current = false;
          setVideoPaused(false);
          setBlocked(false);
          setEnded(false);
        }}
        onPause={(event) => {
          if (programmaticPause.current) {
            programmaticPause.current = false;
            return;
          }

          if (!event.currentTarget.ended) {
            setVideoPaused(true);
          }
        }}
      >
        <MediaTracks tracks={item.tracks} />
      </video>

      {blocked && (
        <span className="pp-play-notice">
          Press the video’s play button to start.
        </span>
      )}
    </>
  );
}

function ProjectCarousel({ media }) {
  const reduced = useReducedMotion();
  const hidden = usePageHidden();

  const [index, setIndex] = useState(0);
  const [enabled, setEnabled] = useState(!reduced);
  const [temporaryPause, setTemporaryPause] =
    useState(false);

  const idleTimer = useRef(null);
  const touchStart = useRef(null);

  const id = useId();
  const count = media.length;
  const item = media[index];

  const interact = useCallback(() => {
    window.clearTimeout(idleTimer.current);

    setTemporaryPause(true);

    idleTimer.current = window.setTimeout(
      () => setTemporaryPause(false),
      RESUME_TIME
    );
  }, []);

  const advance = useCallback(
    () =>
      setIndex(
        (current) => (current + 1) % count
      ),
    [count]
  );

  const select = (next) => {
    interact();
    setIndex((next + count) % count);
  };

  const toggle = () => {
    window.clearTimeout(idleTimer.current);
    setTemporaryPause(false);
    setEnabled((value) => !value);
  };

  useEffect(
    () => () => window.clearTimeout(idleTimer.current),
    []
  );

  useEffect(() => {
    if (reduced) setEnabled(false);
  }, [reduced]);

  const autoplay =
    enabled && !temporaryPause && !hidden;

  if (!item) return null;

  return (
    <section
      className="pp-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Project images and videos"
      onPointerDownCapture={interact}
      onPointerMove={interact}
      onKeyDown={(event) => {
        if (event.target.closest("video")) return;

        if (
          event.key === "ArrowLeft" ||
          event.key === "ArrowRight"
        ) {
          event.preventDefault();

          select(
            index +
              (event.key === "ArrowRight" ? 1 : -1)
          );
        } else if (event.key === "Tab") {
          interact();
        }
      }}
    >
      <div
        className="pp-carousel-stage"
        id={id}
        onTouchStart={(event) => {
          if (event.target.closest("video")) return;

          const touch = event.touches[0];

          touchStart.current = {
            x: touch.clientX,
            y: touch.clientY,
          };
        }}
        onTouchEnd={(event) => {
          if (!touchStart.current) return;

          const touch = event.changedTouches[0];

          const dx =
            touch.clientX - touchStart.current.x;
          const dy =
            touch.clientY - touchStart.current.y;

          touchStart.current = null;

          if (
            Math.abs(dx) > 45 &&
            Math.abs(dx) > Math.abs(dy)
          ) {
            select(index + (dx < 0 ? 1 : -1));
          }
        }}
      >
        <CarouselSlide
          key={`${index}:${item.src}`}
          item={item}
          autoplay={autoplay}
          advanceAllowed={autoplay && count > 1}
          hidden={hidden}
          onAdvance={advance}
        />
      </div>

      <div className="pp-carousel-controls">
        <button
          type="button"
          onClick={() => select(index - 1)}
          disabled={count < 2}
          aria-label="Previous slide"
          aria-controls={id}
        >
          ‹
        </button>

        <span className="pp-slide-count">
          {String(index + 1).padStart(2, "0")}
          {" / "}
          {String(count).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={() => select(index + 1)}
          disabled={count < 2}
          aria-label="Next slide"
          aria-controls={id}
        >
          ›
        </button>

        {count > 1 && (
          <button
            type="button"
            className="pp-autoplay-button"
            onClick={toggle}
            aria-pressed={!enabled}
          >
            {enabled
              ? "PAUSE SLIDESHOW"
              : "START SLIDESHOW"}
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="pp-dots" aria-label="Choose a slide">
          {media.map((slide, number) => (
            <button
              key={`${number}:${slide.src}`}
              type="button"
              aria-label={`Show slide ${number + 1}`}
              aria-current={
                index === number ? "true" : undefined
              }
              className={
                index === number ? "is-active" : ""
              }
              onClick={() => select(number)}
            />
          ))}
        </div>
      )}

      <div
        className="pp-caption"
        aria-live={autoplay ? "off" : "polite"}
      >
        {item.caption && <p>{item.caption}</p>}

        {count > 1 && (
          <small>
            {!enabled
              ? "Automatic slide changes paused."
              : temporaryPause
                ? "Automatic slide changes resume after 10 seconds without interaction."
                : "Images: 5 seconds. Videos: advance after playback finishes."}
          </small>
        )}
      </div>

      {item.transcript && (
        <details className="pp-transcript">
          <summary>Video transcript</summary>
          <p>{item.transcript}</p>
        </details>
      )}
    </section>
  );
}

function InlineMedia({ item }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`pp-inline-media pp-media-${
        item.size || "medium"
      }`}
    >
      {failed ? (
        <div className="pp-media-fallback">
          This media could not be loaded.
        </div>
      ) : item.type === "video" ? (
        <video
          src={asset(item.src)}
          poster={asset(item.poster) || undefined}
          controls
          playsInline
          preload="metadata"
          aria-label={
            item.alt ||
            item.caption ||
            "Supporting project video"
          }
          onError={() => setFailed(true)}
        >
          <MediaTracks tracks={item.tracks} />
        </video>
      ) : (
        <img
          src={asset(item.src)}
          alt={
            item.alt ||
            item.caption ||
            "Supporting project image"
          }
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}

      {item.caption && (
        <figcaption>{item.caption}</figcaption>
      )}

      {item.transcript && (
        <details className="pp-transcript">
          <summary>Video transcript</summary>
          <p>{item.transcript}</p>
        </details>
      )}
    </figure>
  );
}

function ContentSection({
  section,
  project,
  number,
}) {
  const media = approvedMedia(
    project,
    section.media
  );

  return (
    <section className="pp-copy-section">
      <div className="pp-section-title">
        <span>
          {String(number).padStart(2, "0")}
        </span>

        <h2>{section.title}</h2>
      </div>

      <div
        className={
          media.length &&
          section.layout === "beside"
            ? "pp-copy-with-media"
            : ""
        }
      >
        <div className="pp-prose">
          {section.paragraphs.map(
            (paragraph, index) => (
              <p key={index}>{paragraph}</p>
            )
          )}
        </div>

        {media.length > 0 && (
          <div className="pp-inline-grid">
            {media.map((item, index) => (
              <InlineMedia
                key={`${index}:${item.src}`}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectEmphasis({ items }) {
  const levels = {
    primary: { label: "PRIMARY", blocks: 6 },
    strong: { label: "STRONG", blocks: 4 },
    supporting: { label: "SUPPORTING", blocks: 2 },
    next: { label: "PLANNED", blocks: 0 },
  };

  const approved = (items || []).filter(
    (item) =>
      item.approved === true &&
      levels[item.level]
  );

  if (!approved.length) return null;

  return (
    <aside className="pp-panel">
      <h3>PROJECT EMPHASIS</h3>

      <p className="pp-small">
        Qualitative project focus—not proficiency
        scores or measured time.
      </p>

      {approved.map((item) => (
        <div className="pp-focus-stat" key={item.name}>
          <div>
            <span>{item.name}</span>
            <small>{levels[item.level].label}</small>
          </div>

          <div className="pp-meter" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => (
              <i
                key={i}
                className={
                  i < levels[item.level].blocks
                    ? "is-filled"
                    : ""
                }
              />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}

function ProjectDetail({ project }) {
  const media = approvedMedia(
    project,
    project.media
  );

  const sections = project.sections || [];

  const related = visibleProjects.filter(
    (item) => project.relatedIds.includes(item.id)
  );

  const links = project.links.filter(
    (link) => asset(link.url)
  );

  return (
    <div
      className="pp-detail-wrap"
      data-accent={project.accent}
    >
      <div className="pp-detail-frame">
        <header className="pp-detail-hero">
          <div className="pp-reading">
            <Link
              className="pp-back"
              to="/projects"
            >
              ← BACK TO PROJECTS
            </Link>

            <p className="pp-eyebrow">
              {project.category}
            </p>

            <h1 tabIndex={-1}>{project.title}</h1>

            <p className="pp-organization">
              {project.organization}
            </p>

            <div className="pp-detail-meta">
              {project.role && (
                <span>{project.role}</span>
              )}

              {project.dates && (
                <span>{project.dates}</span>
              )}
            </div>

            {project.intro && (
              <p className="pp-intro">
                {project.intro}
              </p>
            )}
          </div>
        </header>

        <div className="pp-detail-content">
          {media.length > 0 && (
            <div className="pp-wide">
              <ProjectCarousel
                key={project.id}
                media={media}
              />
            </div>
          )}

          <div className="pp-reading">
            {project.mediaAccess ===
              "restricted" && (
              <aside className="pp-restricted">
                <strong>
                  INTERNAL MEDIA NOT DISPLAYED
                </strong>

                <p>
                  Internal work products, data,
                  screenshots, and documentation are
                  not shown. This page describes the
                  experience without reproducing
                  those materials.
                </p>
              </aside>
            )}

            {sections.map((section, index) => (
              <ContentSection
                key={`${project.id}:${index}`}
                section={section}
                project={project}
                number={index + 1}
              />
            ))}

            {project.events.length > 0 && (
              <section className="pp-copy-section">
                <h2>EVENT LOG</h2>

                {project.events.map(
                  (event, index) => (
                    <article
                      className="pp-event"
                      key={`${event.title}:${index}`}
                    >
                      <small>
                        {event.date}
                        {event.role
                          ? ` • ${event.role}`
                          : ""}
                      </small>

                      <h3>{event.title}</h3>
                      <p>{event.text}</p>
                    </article>
                  )
                )}
              </section>
            )}

            <section className="pp-copy-section">
              <div className="pp-section-title">
                <span>
                  {String(
                    sections.length + 1
                  ).padStart(2, "0")}
                </span>

                <h2>
                  {project.kind === "involvement"
                    ? "Takeaways + Loadout"
                    : "Result + Loadout"}
                </h2>
              </div>

              {project.result && (
                <div className="pp-prose">
                  <p>{project.result}</p>
                </div>
              )}

              {project.publication && (
                <div className="pp-publication">
                  <small>PUBLICATION</small>

                  <h3>
                    {project.publication.title}
                  </h3>

                  <p>
                    {project.publication.citation}
                  </p>
                </div>
              )}

              {project.achievement && (
                <div className="pp-achievement">
                  <span
                    className="pp-pixel-star"
                    aria-hidden="true"
                  >
                    ★
                  </span>

                  <div>
                    <small>
                      {project.achievement.label}
                    </small>

                    <h3>
                      {project.achievement.title}
                    </h3>

                    <p>
                      {project.achievement.detail}
                    </p>
                  </div>
                </div>
              )}

              <ProjectEmphasis
                items={project.emphasis}
              />

              {project.skillGroups.length > 0 && (
                <div className="pp-panel pp-loadout">
                  <h3>LOADOUT</h3>

                  <div className="pp-skill-grid">
                    {project.skillGroups.map(
                      (group) => (
                        <div key={group.title}>
                          <h4>{group.title}</h4>

                          <div className="pp-chips">
                            {group.skills.map(
                              (skill) => (
                                <span key={skill}>
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {project.nextLevel && (
                <aside className="pp-next-level">
                  <small>
                    NEXT LEVEL • PLANNED
                  </small>

                  <h3>{project.nextLevel.title}</h3>

                  <p>{project.nextLevel.text}</p>

                  <div className="pp-chips">
                    {project.nextLevel.skills.map(
                      (skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </aside>
              )}
            </section>

            {related.length > 0 && (
              <aside className="pp-related">
                <h3>RELATED WORK</h3>

                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={projectUrl(item.id)}
                  >
                    {item.title}
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </aside>
            )}

            <footer className="pp-page-links">
              {links.map((link) => (
                <a
                  className="pp-button"
                  key={link.url}
                  href={asset(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}

                  <span aria-hidden="true">↗</span>

                  <span className="pp-sr-only">
                    {" "}
                    (opens in a new tab)
                  </span>
                </a>
              ))}

              <Link
                className="pp-button pp-button-secondary"
                to="/projects"
              >
                ← ALL PROJECTS
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [searchParams] = useSearchParams();

  const requested = searchParams.get("project");

  const id =
    PROJECT_ALIASES[requested] || requested;

  const project = visibleProjects.find(
    (item) => item.id === id
  );

  const root = useRef(null);

  useEffect(() => {
    const oldTitle = document.title;

    document.title = `${
      project?.title || "Projects"
    } | Mia’Zadai Navarro`;

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    const frame = window.requestAnimationFrame(
      () =>
        root.current
          ?.querySelector("h1")
          ?.focus({ preventScroll: true })
    );

    return () => {
      document.title = oldTitle;
      window.cancelAnimationFrame(frame);
    };
  }, [requested, project]);

  return (
    <main
      className="portfolio-projects"
      ref={root}
    >
      {project ? (
        <ProjectDetail
          key={project.id}
          project={project}
        />
      ) : requested ? (
        <div className="pp-reading pp-not-found">
          <h1 tabIndex={-1}>
            Project not found
          </h1>

          <p>This project link is unavailable.</p>

          <Link
            className="pp-button"
            to="/projects"
          >
            ← ALL PROJECTS
          </Link>
        </div>
      ) : (
        <>
          <header
            className="pp-banner"
            style={{
              backgroundImage: `linear-gradient(
                rgba(74,49,101,.12),
                rgba(74,49,101,.12)
              ),url("${asset(
                "images/purplemat.jpg"
              )}")`,
            }}
          >
            <h1 tabIndex={-1}>PROJECTS</h1>
          </header>

          <div className="pp-collections">
            {COLLECTIONS.map((collection) => (
              <ProjectDeck
                key={collection.id}
                collection={collection}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
=======
      className="project-cover-media"
      src={asset(project.cover.src)}
      alt={project.cover.alt || project.title}
      onError={() => setFailed(true)}
    />
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index,
}) {
  return (
    <article
      className="project-card"
      style={{
        "--card-turn":
          `${2.1 + (index % 3) * 0.35}deg`,
      }}
    >
      <div className="project-card-shell">
        <div className="project-card-top">
          <span>
            {project.category}
          </span>

          <strong>
            {project.number}
          </strong>
        </div>

        <div className="project-card-media">
          <ProjectCover
            project={project}
          />
        </div>

        <div className="project-card-body">
          <h3>
            {project.shortTitle}
          </h3>

          <p className="project-card-org">
            {project.organization}
          </p>

          <div className="project-card-divider" />

          <p className="project-card-summary">
            {project.cardSummary}
          </p>

          <div className="project-card-mini-loadout">
            {project.skillGroups
              .flatMap(
                (group) =>
                  group.skills
              )
              .slice(0, 3)
              .map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}
          </div>

          <Link
            className="project-card-cta"
            to={`/projects?project=${project.id}`}
          >
            VIEW PROJECT
            <ArrowUpRight
              size={17}
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   PROJECT DECK
========================================================= */

function ProjectDeck({
  title,
  collectionNumber,
  projects: deckProjects,
}) {
  const deckRef = useRef(null);

  const moveDeck = (direction) => {
    if (!deckRef.current) return;

    deckRef.current.scrollBy({
      left:
        direction *
        Math.max(
          320,
          deckRef.current.clientWidth *
            0.58
        ),
      behavior: "smooth",
    });
  };

  return (
    <section className="project-deck-section">
      <div className="project-deck-heading">
        <div className="project-quest-header">
          <small>
            COLLECTION {collectionNumber}
          </small>

          <h2>
            {title}
          </h2>
        </div>

        <div className="project-deck-buttons">
          <button
            type="button"
            onClick={() =>
              moveDeck(-1)
            }
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft size={23} />
          </button>

          <button
            type="button"
            onClick={() =>
              moveDeck(1)
            }
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight size={23} />
          </button>
        </div>
      </div>

      <div
        className="project-deck-track"
        ref={deckRef}
      >
        {deckProjects.map(
          (project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          )
        )}
      </div>
    </section>
  );
}

/* =========================================================
   MEDIA CAROUSEL
========================================================= */

function ProjectCarousel({
  media,
}) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [
    interactionPaused,
    setInteractionPaused,
  ] = useState(false);

  const timeoutRef = useRef(null);
  const inactivityRef = useRef(null);

  const currentMedia =
    media[activeIndex];

  const goTo = (
    nextIndex,
    userInteraction = false
  ) => {
    const normalized =
      (nextIndex + media.length) %
      media.length;

    setActiveIndex(normalized);

    if (userInteraction) {
      setInteractionPaused(true);

      window.clearTimeout(
        inactivityRef.current
      );

      inactivityRef.current =
        window.setTimeout(() => {
          setInteractionPaused(false);
        }, AUTOPLAY_RESUME_TIME);
    }
  };

  const next = (
    userInteraction = false
  ) => {
    goTo(
      activeIndex + 1,
      userInteraction
    );
  };

  const previous = () => {
    goTo(
      activeIndex - 1,
      true
    );
  };

  useEffect(() => {
    window.clearTimeout(
      timeoutRef.current
    );

    if (
      !currentMedia ||
      interactionPaused
    ) {
      return undefined;
    }

    if (
      currentMedia.type === "image"
    ) {
      timeoutRef.current =
        window.setTimeout(() => {
          next(false);
        }, IMAGE_SLIDE_TIME);
    }

    return () => {
      window.clearTimeout(
        timeoutRef.current
      );
    };
  }, [
    activeIndex,
    currentMedia,
    interactionPaused,
  ]);

  useEffect(() => {
    return () => {
      window.clearTimeout(
        timeoutRef.current
      );

      window.clearTimeout(
        inactivityRef.current
      );
    };
  }, []);

  if (!media?.length) {
    return null;
  }

  return (
    <section className="project-carousel">
      <div className="project-carousel-stage">
        {currentMedia.type ===
        "video" ? (
          <video
            key={currentMedia.src}
            src={asset(
              currentMedia.src
            )}
            poster={
              currentMedia.poster
                ? asset(
                    currentMedia.poster
                  )
                : undefined
            }
            controls
            muted
            playsInline
            autoPlay={
              !interactionPaused
            }
            onEnded={() => {
              if (
                !interactionPaused
              ) {
                next(false);
              }
            }}
            onPlay={() => {
              if (
                interactionPaused
              ) {
                window.clearTimeout(
                  inactivityRef.current
                );

                inactivityRef.current =
                  window.setTimeout(
                    () => {
                      setInteractionPaused(
                        false
                      );
                    },
                    AUTOPLAY_RESUME_TIME
                  );
              }
            }}
          />
        ) : (
          <img
            src={asset(
              currentMedia.src
            )}
            alt={
              currentMedia.alt ||
              "Project media"
            }
          />
        )}

        <button
          className="project-carousel-arrow project-carousel-arrow-left"
          type="button"
          onClick={previous}
          aria-label="Previous media"
        >
          <ChevronLeft size={26} />
        </button>

        <button
          className="project-carousel-arrow project-carousel-arrow-right"
          type="button"
          onClick={() =>
            next(true)
          }
          aria-label="Next media"
        >
          <ChevronRight size={26} />
        </button>
      </div>

      <div className="project-carousel-footer">
        <div className="project-carousel-count">
          {String(
            activeIndex + 1
          ).padStart(2, "0")}
          {" / "}
          {String(
            media.length
          ).padStart(2, "0")}
        </div>

        <div className="project-carousel-dots">
          {media.map(
            (_, index) => (
              <button
                type="button"
                key={index}
                className={
                  index ===
                  activeIndex
                    ? "active"
                    : ""
                }
                onClick={() =>
                  goTo(
                    index,
                    true
                  )
                }
                aria-label={`Go to media ${
                  index + 1
                }`}
              />
            )
          )}
        </div>

        <div className="project-carousel-mode">
          {interactionPaused ? (
            <>
              <RotateCcw
                size={14}
              />
              AUTO RESUMES
            </>
          ) : (
            <>
              <Sparkles
                size={14}
              />
              AUTO
            </>
          )}
        </div>
      </div>

      {currentMedia.caption && (
        <p className="project-carousel-caption">
          {currentMedia.caption}
        </p>
      )}
    </section>
  );
}

/* =========================================================
   LOCKED MEDIA
========================================================= */

function LockedMedia({
  limited = false,
}) {
  return (
    <div className="locked-media-panel">
      <LockKeyhole
        size={36}
        strokeWidth={2}
      />

      <div>
        <span>
          {limited
            ? "LIMITED MEDIA"
            : "LOCKED MEDIA"}
        </span>

        <h3>
          PROJECT WORK NOT
          DISPLAYED
        </h3>

        <p>
          {limited
            ? "Some work from this project is unpublished or cannot be displayed publicly. Approved media can be added here later."
            : "Internal work products, data, screenshots, or documentation from this experience are not displayed publicly."}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT EMPHASIS
========================================================= */

function ProjectStats({
  emphasis,
}) {
  if (!emphasis?.length) {
    return null;
  }

  return (
    <div className="project-stats-panel">
      <div className="project-panel-label">
        PROJECT EMPHASIS
      </div>

      <p className="project-emphasis-note">
        These meters show where
        this project concentrated
        effort — not skill
        percentages.
      </p>

      {emphasis.map(
        (item) => (
          <div
            className="project-stat"
            key={item.name}
          >
            <div className="project-stat-heading">
              <span>
                {item.name}
              </span>

              <small>
                {
                  emphasisLabel[
                    item.level
                  ]
                }
              </small>
            </div>

            <ProgressBar
              now={
                emphasisValue[
                  item.level
                ]
              }
              className={`project-progress project-progress-${item.level}`}
            />
          </div>
        )
      )}
    </div>
  );
}

/* =========================================================
   LOADOUT
========================================================= */

function ProjectLoadout({
  groups,
}) {
  return (
    <div className="project-loadout">
      <div className="project-panel-label">
        LOADOUT
      </div>

      {groups.map((group) => (
        <div
          className="project-loadout-group"
          key={group.title}
        >
          <h4>
            {group.title}
          </h4>

          <div className="project-loadout-badges">
            {group.skills.map(
              (skill) => (
                <Badge
                  key={skill}
                  className="project-skill-badge"
                >
                  {skill}
                </Badge>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   ACHIEVEMENT
========================================================= */

function Achievement({
  achievement,
}) {
  if (!achievement) {
    return null;
  }

  return (
    <div className="project-achievement">
      <Trophy
        size={31}
        strokeWidth={2.1}
      />

      <div>
        <span>
          {achievement.eyebrow}
        </span>

        <h3>
          {achievement.title}
        </h3>

        <p>
          {achievement.detail}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   NEXT LEVEL
========================================================= */

function NextLevel({
  nextLevel,
}) {
  if (!nextLevel) {
    return null;
  }

  return (
    <div className="project-next-level">
      <div className="project-next-level-icon">
        +
      </div>

      <div>
        <span>
          NEXT LEVEL
        </span>

        <h3>
          {nextLevel.title}
        </h3>

        <p>
          {nextLevel.text}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT DETAIL PAGE
========================================================= */

function ProjectDetail({
  project,
}) {
  const hasMedia =
    project.media?.length > 0;

  return (
    <main className="project-detail-page">
      <section className="project-detail-hero">
        <Container className="project-detail-container">
          <Link
            to="/projects"
            className="project-back-button"
          >
            <ArrowLeft
              size={18}
            />
            ALL PROJECTS
          </Link>

          <div className="project-detail-kicker">
            {project.category}
          </div>

          <h1>
            {project.title}
          </h1>

          <div className="project-detail-meta">
            <span>
              {project.organization}
            </span>

            <span>
              {project.role}
            </span>

            <span>
              {project.dates}
            </span>
          </div>

          <p className="project-detail-intro">
            {project.heroIntro}
          </p>
        </Container>
      </section>

      <section className="project-detail-main">
        <Container className="project-wide-container">
          {hasMedia ? (
            <ProjectCarousel
              media={project.media}
            />
          ) : project.mediaAccess ===
            "restricted" ? (
            <LockedMedia />
          ) : project.mediaAccess ===
            "limited" ? (
            <LockedMedia limited />
          ) : (
            <div className="project-empty-media">
              <span>
                PROJECT MEDIA
              </span>

              <strong>
                PHOTOS + VIDEOS
                COMING NEXT
              </strong>

              <p>
                The page is ready
                for the media we
                select together.
              </p>
            </div>
          )}
        </Container>

        <Container className="project-reading-container">
          <section className="project-copy-section">
            <div className="project-copy-heading">
              <span>
                01
              </span>

              <h2>
                OVERVIEW + MY ROLE
              </h2>
            </div>

            {project.overview.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              )
            )}
          </section>

          {project.work?.length >
            0 && (
            <section className="project-copy-section">
              <div className="project-copy-heading">
                <span>
                  02
                </span>

                <h2>
                  THE WORK
                </h2>
              </div>

              {project.work.map(
                (
                  paragraph,
                  index
                ) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}
            </section>
          )}

          <section className="project-copy-section">
            <div className="project-copy-heading">
              <span>
                03
              </span>

              <h2>
                RESULT + LOADOUT
              </h2>
            </div>

            <p>
              {project.result}
            </p>

            <Achievement
              achievement={
                project.achievement
              }
            />

            <Row className="project-game-row g-4">
              <Col
                xs={12}
                lg={6}
              >
                <ProjectStats
                  emphasis={
                    project.emphasis
                  }
                />
              </Col>

              <Col
                xs={12}
                lg={6}
              >
                <ProjectLoadout
                  groups={
                    project.skillGroups
                  }
                />
              </Col>
            </Row>

            <NextLevel
              nextLevel={
                project.nextLevel
              }
            />
          </section>

          {project.links?.length >
            0 && (
            <section className="project-links-section">
              {project.links.map(
                (link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="project-external-link"
                  >
                    {link.type ===
                    "github" ? (
                      <Github
                        size={19}
                      />
                    ) : (
                      <ArrowUpRight
                        size={19}
                      />
                    )}

                    {link.label}
                  </a>
                )
              )}
            </section>
          )}
        </Container>
      </section>
    </main>
  );
}

/* =========================================================
   PROJECTS MAIN PAGE
========================================================= */

function Projects() {
  const [
    searchParams,
  ] = useSearchParams();

  const selectedId =
    searchParams.get("project");

  const selectedProject =
    useMemo(
      () =>
        projects.find(
          (project) =>
            project.id ===
            selectedId
        ),
      [selectedId]
    );

  if (selectedProject) {
    return (
      <ProjectDetail
        project={
          selectedProject
        }
      />
    );
  }

  const coreProjects =
    projects.filter(
      (project) =>
        project.collection ===
        "core"
    );

  const fieldProjects =
    projects.filter(
      (project) =>
        project.collection ===
        "field"
    );

  return (
    <main className="projects-page">
      <section
        className="projects-banner"
        style={{
          backgroundImage: `linear-gradient(
            rgba(74, 49, 101, 0.12),
            rgba(74, 49, 101, 0.12)
          ),
          url("${asset(
            "images/purplemat.jpg"
          )}")`,
        }}
      >
        <h1>
          PROJECTS
        </h1>
      </section>

      <div className="projects-decks">
        <ProjectDeck
          title="CORE PROJECTS"
          collectionNumber="01"
          projects={
            coreProjects
          }
        />

        <ProjectDeck
          title="FIELD EXPERIENCE"
          collectionNumber="02"
          projects={
            fieldProjects
          }
        />
      </div>
    </main>
  );
}

export default Projects;
>>>>>>> 6588b34bfc65cba862f0d56990c655d47add7e26
