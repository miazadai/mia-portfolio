/*
 * Portfolio copy: the updated Google Doc + your corrections in this chat.
 * Dates and numerical results are source wording, not live employment checks.
 * Unconfirmed glove cost, report length, and RAL start date are omitted.
 *
 * Media shape (add real files later):
 * { type: "image", src: "projects/first-robotics/cover.jpg",
 *   alt: "Describe the actual image", caption: "", approved: true }
 * { type: "video", src: "projects/first-robotics/demo.mp4",
 *   poster: "projects/first-robotics/poster.jpg", caption: "",
 *   approved: true, tracks: [], transcript: "" }
 *
 * Local paths are relative to public/. Never put confidential files there.
 * approved is a publishing safeguard, NOT access control or file security.
 * Section media can use layout: "beside" or "below" and size: "small".
 */

export const COLLECTIONS = [
  { id: "core", title: "CORE PROJECTS", number: "01" },
  { id: "experience", title: "EXPERIENCE & INVOLVEMENT", number: "02" },
];

const entry = (data) => ({
  visible: true,
  kind: "project",
  cover: null,
  media: [],
  mediaAccess: "full",
  links: [],
  relatedIds: [],
  emphasis: [], // Add only after approving qualitative project-emphasis levels.
  events: [],
  ...data,
});

export const PROJECTS = [
  entry({
    id: "first-robotics",
    collection: "core",
    title: "FIRST Robotics | Engineering & Team Leadership",
    cardTitle: "FIRST Robotics",
    organization: "Saber Dynamics 8871 + Crusaders 4270",
    category: "ROBOTICS • DESIGN • MANUFACTURING",
    role: "Mechanical Lead • Team Captain • Manufacturing • Electrical • Drive Team Coach / Strategist",
    dates: "2022–2024",
    accent: "blue",
    cardSkills: ["Inventor", "Fusion 360", "Onshape"],
    cardSummary: "Designed, modeled, manufactured, and integrated competition robots across FIRST teams 8871 and 4270 using Autodesk Inventor, Fusion 360, and Onshape. My roles expanded from mechanical lead and team captain to manufacturing, electrical, and competitive drive-team strategy, while I also trained newer members and helped lead the teams through three consecutive Hawaii Regional finals appearances.",
    intro: "Across three FIRST Robotics seasons, I worked through the full cycle of competitive robot development—from researching mechanisms and building CAD models to manufacturing, electrical integration, testing, and match strategy. My responsibilities grew from mechanical leadership with Saber Dynamics 8871 into team captaincy, and later into manufacturing, electrical, and drive-team strategy with Crusaders 4270.",
    sections: [
      {
        title: "Overview + My Role",
        paragraphs: [
          "FIRST Robotics was one of my first opportunities to take engineering ideas from research and CAD into physical systems that had to perform under real competition constraints. I used Autodesk Inventor, Fusion 360, and Onshape to research mechanisms, compare design approaches, and create 3D models before fabrication. I then supported manufacturing and assembly, helped integrate mechanical and electrical systems, and worked through repeated design iterations as the robot developed.",
          "With Saber Dynamics 8871, I served as a mechanical lead and team captain, organizing daily build activity, setting priorities and deadlines, and teaching newer members to use shop tools. I also helped organize the team’s travel to the 2023 Canadian Pacific Regional in Victoria, British Columbia, its first recorded competition outside the United States.",
        ],
        media: [],
      },
      {
        title: "Design, Build + Competition",
        paragraphs: [
          "Each season started with a new game and a compressed build period in which the team had to move quickly from game analysis to mechanism research, CAD, prototyping, manufacturing, wiring, assembly, and testing. My work crossed those stages rather than staying in one specialty: I contributed to mechanical design and manufacturing, worked on electrical systems, and helped evaluate whether designs were practical to build and reliable enough for competition.",
          "Competition added a different responsibility. I was a core member of the drive team, serving as a coach or strategist depending on the season and team needs. That meant understanding what our robot could realistically do, evaluating alliance partners and opponents, and helping turn those constraints into a match plan the drive team could execute on the field.",
        ],
        media: [],
      },
    ],
    result: "Across my three seasons, my teams reached the Hawaii Regional finals every year: Team 8871 won the regional in 2022 and finished as a regional finalist in 2023, while Team 4270 finished as a regional finalist in 2024. In my senior season, Team 4270 also won the 2024 Canadian Pacific Regional in Victoria, British Columbia.",
    achievement: { label: "ACHIEVEMENT UNLOCKED", title: "Three Hawaii Regional finals appearances", detail: "2022 Winner • 2023 Finalist • 2024 Finalist" },
    skillGroups: [
      { title: "Design", skills: ["Autodesk Inventor", "Fusion 360", "Onshape"] },
      { title: "Engineering Systems", skills: ["Mechanical", "Manufacturing", "Electrical"] },
      { title: "Competition", skills: ["Drive Team", "Coach", "Strategy"] },
      { title: "Leadership", skills: ["Team Captain", "Mechanical Lead", "Member Training"] },
    ],
    links: [
      { label: "2022 TEAM RECORD", url: "https://frc-events.firstinspires.org/2022/team/8871" },
      { label: "2023 TEAM RECORD", url: "https://frc-events.firstinspires.org/2023/team/8871" },
      { label: "2024 TEAM RECORD", url: "https://frc-events.firstinspires.org/2024/team/4270" },
    ],
  }),

  entry({
    id: "exoskeletal-hand-brace",
    collection: "core",
    title: "Passive Exoskeletal Hand Brace",
    organization: "BME 60C Design Project | UC Irvine",
    category: "BIOMEDICAL DESIGN • MECHANICAL PROTOTYPING",
    role: "Lead Mechanical Designer • Manufacturing",
    dates: "",
    accent: "pink",
    cardSkills: ["SolidWorks", "3D Printing", "Mechanism Design"],
    cardSummary: "Designed and manufactured a passive exoskeletal hand brace intended as a low-cost therapy aid for stroke rehabilitation. I developed a 3D-printed tendon-guidance system, ratchet-and-pawl tension mechanism, and two-position release slider in SolidWorks, then iterated the design through printing, assembly, motion testing, and stress analysis.",
    intro: "For BME 60C, my team developed a passive hand-brace prototype intended to help users apply and release adjustable finger tension during rehabilitation exercises. I led most of the mechanical design and completed the manufacturing, using SolidWorks and iterative 3D printing to turn the concept into a wearable prototype without relying on motors.",
    sections: [
      {
        title: "Overview + My Role",
        paragraphs: [
          "The project centered on creating a mechanically simple, low-cost wearable that could apply adjustable tension to the fingers for rehabilitation use. The brace used 3D-printed joints mounted along the top of a glove with tension lines routed through them. Rather than using motors, I designed the system around a ratchet-and-pawl mechanism so the user could progressively increase tension and mechanically hold that setting in place.",
          "My main responsibility was the mechanical design and manufacturing. I modeled the components in SolidWorks, designed the ratchet-and-pawl assembly and glove-mounted printed parts, and developed a sliding release mechanism that could switch between engaged and released states. The slider used flexible leaf-style detents so it naturally settled into only two positions, helping make the control more deliberate and repeatable.",
        ],
        media: [],
      },
      {
        title: "Iteration + Testing",
        paragraphs: [
          "The largest challenge was iteration. Limited access to school fabrication resources made the normal print-and-test cycle too slow for the number of design changes the project required, so I adapted by getting my own 3D printer and learning how to operate it for the project. That let me continue revising tolerances, fit, movement, and assembly outside the school workflow and manufacture the final iterations myself.",
          "I used SolidWorks motion and stress analyses alongside physical assembly and movement testing to evaluate the design. The final project was documented in a detailed engineering design report covering the design rationale, analysis, testing, iterations, and major design decisions.",
        ],
        media: [],
      },
    ],
    result: "The project produced a passive prototype that demonstrated adjustable finger tension, mechanical locking, and controlled release using a ratchet-and-pawl system. This is a student engineering prototype, not a claim of demonstrated clinical effectiveness.",
    achievement: { label: "BUILD MILESTONE", title: "Passive mechanical prototype", detail: "Adjustable tension • locking • controlled release" },
    nextLevel: {
      title: "Movement-sensing upgrade",
      text: "I plan to add an Arduino Nano ESP32, flex sensors, and a small display mounted on the back of the hand. The goal is to capture readings associated with finger movement and display changes over time, adding a quantitative layer to the mechanical prototype.",
      skills: ["Arduino Nano ESP32", "Flex Sensors", "Back-of-Hand Display"],
    },
    skillGroups: [
      { title: "Design", skills: ["SolidWorks", "Mechanism Design", "Design Iteration"] },
      { title: "Manufacturing", skills: ["3D Printing", "Assembly", "Prototype Fabrication"] },
      { title: "Analysis", skills: ["Motion Analysis", "Stress Analysis", "Physical Testing"] },
      { title: "Project Execution", skills: ["Resourcefulness", "Iterative Development", "Technical Documentation"] },
    ],
  }),

  entry({
    id: "robotic-quality-control-arm",
    collection: "core",
    title: "Robotic Quality Control Arm",
    organization: "Zotbotics",
    category: "ROBOTICS • AUTOMATION • COMPUTER VISION",
    role: "Mechanical Designer + Programmer",
    dates: "Dec 2025–Present",
    accent: "mint",
    cardSkills: ["Arduino", "C++", "3D Printing"],
    cardSummary: "Designed a 3D-printed end effector for a 6-DOF sorting arm and programmed Arduino controls in C++. I also sourced image datasets and supported computer-vision testing for automated banana classification and sorting.",
    intro: "This project brings together a multi-axis robotic arm, embedded controls, and image-based classification. My work has focused on the end effector, Arduino programming, hardware integration, and datasets used to test automated banana sorting.",
    sections: [
      {
        title: "Overview + My Contribution",
        paragraphs: [
          "As part of Zotbotics, I worked on a six-degree-of-freedom robotic sorting arm. I designed a 3D-printed end effector, programmed Arduino-based controls in C++, and worked through hardware and software integration during assembly and testing.",
          "I also sourced image datasets and supported computer-vision testing to evaluate banana classification and sorting. The work connects physical fabrication with programming and image-based decision-making, rather than treating the mechanical and software portions as separate projects.",
        ],
        media: [],
      },
    ],
    result: "The project remains in development. My contributions span end-effector design, Arduino controls, integration, and support for computer-vision testing; no sorting-accuracy or reliability figure is claimed here.",
    skillGroups: [
      { title: "Mechanical", skills: ["3D Printing", "End-Effector Design", "Assembly"] },
      { title: "Programming + Automation", skills: ["Arduino", "C++", "Image Datasets", "Computer-Vision Testing"] },
    ],
  }),

  entry({
    id: "sea-turtle-plastination-research",
    collection: "core",
    title: "Sea Turtle Plastination Research",
    organization: "Journal of Plastination",
    category: "PUBLISHED RESEARCH • PHOTOGRAMMETRY • ANATOMY",
    role: "Co-Author + 3D Model Contributor",
    dates: "Published 2026",
    accent: "gold",
    mediaAccess: "limited",
    cardSkills: ["ZBrush", "Photogrammetry", "Publication"],
    cardSummary: "Co-authored a 2026 Journal of Plastination paper on creating and licensing high-resolution 3D models from plastinated olive ridley and loggerhead sea turtle heads. I contributed to the digital-model workflow through photogrammetry and ZBrush cleanup, including refinement of difficult end-cap geometry and technical work supporting the final research figures and models.",
    intro: "This publication grew out of anatomical 3D-modeling work at the University of Hawai‘i John A. Burns School of Medicine. The study documented a workflow for turning plastinated sea-turtle head specimens into interactive digital models for educational and research use.",
    sections: [
      {
        title: "My Contribution",
        paragraphs: [
          "My contribution focused on the digital-model side of the workflow. I worked with photogrammetry-derived turtle-head meshes and used ZBrush to clean artifacts, refine internal and external detail, and improve difficult end-cap regions where specimen geometry and image coverage created modeling challenges. I also contributed technical notes and model work used in the publication process.",
          "The finished study combined specimen photography, image processing, photogrammetric reconstruction, mesh refinement, model preparation, annotation, and online distribution. The resulting olive ridley and loggerhead models were published for interactive use. This research output is presented separately from my summer XR Labs internship.",
        ],
        media: [],
      },
    ],
    publication: {
      title: "Creation and licensing of digital models from plastinated head specimens of endangered sea turtles",
      citation: "Journal of Plastination • Volume 38(1) • 2026",
    },
    result: "The work was published in the Journal of Plastination, Volume 38(1), in 2026, with me listed as a co-author.",
    achievement: { label: "ACHIEVEMENT UNLOCKED", title: "Peer-reviewed publication", detail: "Journal of Plastination • 2026" },
    skillGroups: [
      { title: "3D Modeling", skills: ["ZBrush", "Mesh Cleanup", "End-Cap Refinement"] },
      { title: "Research", skills: ["Photogrammetry", "Technical Documentation", "Publication Support", "Model Preparation"] },
    ],
    links: [{ label: "VIEW PUBLICATION", type: "publication", url: "https://journal.plastination.org/articles/creation-and-licensing-of-digital-models-from-plastinated-head-specimens-of-endangered-sea-turtles/" }],
    relatedIds: ["xr-labs"],
  }),

  entry({
    id: "ewb-financial-systems",
    collection: "core",
    title: "Engineering Without Borders | Financial Systems",
    cardTitle: "EWB Financial Systems",
    organization: "Engineering Without Borders | UC Irvine",
    category: "LEADERSHIP • BUDGETING • OPERATIONS",
    role: "Vice President of Finance",
    dates: "Feb 2025–Present",
    accent: "lavender",
    mediaAccess: "limited",
    cardSkills: ["Budgeting", "Funding", "Operations"],
    cardSummary: "Built the chapter’s first annual budget and financial system to support tracking, planning, and long-term funding. I also developed a funding pipeline for subteams to request resources and support grant applications.",
    intro: "My work with Engineering Without Borders focuses on the systems that help student engineering teams plan and fund their projects. As Vice President of Finance, I have worked on budgeting, financial documentation, and a more consistent process for requesting resources.",
    sections: [
      {
        title: "My Role + The System",
        paragraphs: [
          "I built the chapter’s first annual budget and financial system, creating structure for tracking, planning, and long-term funding. I also developed a funding pipeline that gives subteams a consistent way to request resources and support grant applications.",
          "My responsibilities also include supporting fundraising, sponsorship outreach, and financial documentation. This project highlights organizational and financial systems rather than claiming ownership of the chapter’s technical designs.",
        ],
        media: [],
      },
    ],
    result: "The chapter gained an annual budget, a financial tracking structure, and a funding-request process for its subteams.",
    skillGroups: [
      { title: "Finance + Operations", skills: ["Budget Development", "Financial Documentation", "Funding Requests"] },
      { title: "Leadership", skills: ["Sponsorship Outreach", "Fundraising", "Team Coordination"] },
    ],
  }),

  entry({
    id: "bbraun-quality-engineering",
    collection: "experience",
    title: "Medical Device Quality Engineering",
    organization: "B. Braun Medical",
    category: "QUALITY • VALIDATION • AUTOMATION",
    role: "Quality Engineering Intern",
    dates: "Jun 2026–Present",
    accent: "blue",
    mediaAccess: "restricted",
    cardSkills: ["Validation", "Excel VBA", "Data Analysis"],
    cardSummary: "Executed IQ/OQ/PQ/PPQ protocols for a production material introduction and analyzed validation data for periodic-review trends. I also built Excel VBA automation that reduced Pareto-chart generation from 1–3 business days to about one minute while supporting cross-functional quality and manufacturing work.",
    intro: "My B. Braun internship introduced me to quality and validation engineering in medical-device manufacturing. I supported material qualification, process-data analysis, periodic review reporting, and documentation while working across engineering, quality, manufacturing, and production.",
    sections: [
      {
        title: "Overview + My Role",
        paragraphs: [
          "I executed IQ/OQ/PQ/PPQ protocols to support the introduction of a new production material. I analyzed production and validation data for recurring issues and process trends, and supported SOP updates and documentation associated with material qualification.",
          "I also developed a new type of Periodic Review Report to improve how validation data, process performance, and recurring trends were documented. The work required coordination with engineering, quality, manufacturing, and production rather than analysis in isolation.",
        ],
        media: [],
      },
      {
        title: "Reporting + Automation",
        paragraphs: [
          "I built an Excel VBA macro to automate Pareto-chart generation for PRR trend analysis. The workflow reduced a task that previously took approximately one to three business days to about one minute, making recurring analysis more efficient.",
          "Internal production records, validation documents, and proprietary screenshots are not displayed here. This page describes my responsibilities and the reported workflow improvement without reproducing the underlying work products.",
        ],
        media: [],
      },
    ],
    result: "The automation shortened a recurring Pareto-chart workflow while my broader internship work supported material qualification, validation-data review, and controlled documentation.",
    achievement: { label: "PROCESS UPGRADE", title: "1–3 business days → about 1 minute", detail: "Pareto-chart generation for periodic-review reporting" },
    skillGroups: [
      { title: "Quality + Validation", skills: ["IQ/OQ/PQ/PPQ", "Material Qualification", "PRR Analysis", "SOP Updates"] },
      { title: "Data + Automation", skills: ["Excel VBA", "Pareto Charts", "Data Analysis"] },
    ],
  }),

  entry({
    id: "ral-proprioception",
    collection: "experience",
    title: "Human Proprioception Research",
    organization: "Rehabilitation & Augmentation Laboratory | UC Irvine",
    category: "BIOMECHANICS • HUMAN SUBJECTS • DATA",
    role: "Undergraduate Research Assistant",
    dates: "", // The source documents disagree about the start year.
    accent: "mint",
    mediaAccess: "limited",
    cardSkills: ["Vicon", "MATLAB", "EMG"],
    cardSummary: "Conduct human-subject proprioception experiments using Vicon motion capture, an instrumented treadmill, EMG, and force plates. I also process gait and perception data in Vicon Nexus and MATLAB and support procedure refinement and research figures.",
    intro: "At the Rehabilitation & Augmentation Laboratory, I support research on lower-limb proprioception during walking. The work combines participant-facing procedures with synchronized motion-capture and sensor data.",
    sections: [
      {
        title: "My Role + Research Work",
        paragraphs: [
          "I help prepare participants under approved protocols and collect synchronized kinematic and sensor data across different visual and motor conditions. The setup includes Vicon motion capture, an instrumented treadmill, EMG, and force plates.",
          "I process and organize gait and perception data in Vicon Nexus and MATLAB, and support procedure refinement, experimental-design improvements, and research figures. Unpublished data and participant information are not displayed in this portfolio.",
        ],
        media: [],
      },
    ],
    result: "This work has given me hands-on experience in experimental biomechanics, participant procedures, synchronized sensing, and analysis of human-movement data.",
    skillGroups: [
      { title: "Data + Analysis", skills: ["Vicon Nexus", "MATLAB", "Gait Data"] },
      { title: "Experimental Methods", skills: ["Motion Capture", "EMG", "Force Plates", "Human-Subject Research"] },
    ],
  }),

  entry({
    id: "limoli-lab",
    collection: "experience",
    title: "Cancer & Radiation Oncology Research",
    organization: "Charles Limoli Lab | UC Irvine",
    category: "WET LAB • CANCER RESEARCH • LAB METHODS",
    role: "Undergraduate Research Assistant",
    dates: "Nov 2025–Present",
    accent: "pink",
    mediaAccess: "restricted",
    cardSkills: ["Pipetting", "Sterile Technique", "Plasmid Prep"],
    cardSummary: "Supported cancer and radiation-oncology research through plasmid preparation, sterile technique, pipetting, and selective bacterial culture on antibiotic-containing agar. The experience built my confidence with core wet-lab workflows and standard equipment including centrifuges, vortex mixers, water baths, incubators, and autoclaves.",
    intro: "The Limoli Lab gave me hands-on experience supporting cancer and radiation-oncology research while building core wet-lab skills. Rather than owning a standalone study, I contributed to ongoing laboratory work through plasmid preparation, sterile technique, pipetting, bacterial culture, and careful use of standard research equipment.",
    sections: [
      {
        title: "My Role + Lab Work",
        paragraphs: [
          "My work has included plasmid preparation, sterile technique, pipetting, and selective bacterial culture using antibiotic-containing agar plates. I also learned to operate and work around standard research equipment such as centrifuges, vortex mixers, water baths, incubators, and autoclaves while following the lab’s established procedures.",
          "Because this work supports larger ongoing studies, the value of the experience has been in building dependable laboratory habits: maintaining sterile conditions, handling samples carefully, following protocols consistently, and understanding how small procedural mistakes can affect downstream research.",
        ],
        media: [],
      },
    ],
    result: "This experience expanded my engineering background into hands-on biological research and gave me a stronger foundation in wet-lab methods that I can carry into future biomedical research and device-development work.",
    skillGroups: [
      { title: "Lab Methods", skills: ["Pipetting", "Sterile Technique", "Plasmid Preparation", "Selective Bacterial Culture"] },
      { title: "Equipment", skills: ["Centrifuge", "Vortex Mixer", "Water Bath", "Incubator", "Autoclave"] },
    ],
    links: [{ label: "LAB RESEARCH CONTEXT", url: "https://profiles.icts.uci.edu/charles.limoli" }],
  }),

  entry({
    id: "xr-labs",
    collection: "experience",
    title: "3D Anatomical Modeling Internship",
    organization: "XR Labs | University of Hawai‘i JABSOM",
    category: "3D MODELING • PHOTOGRAMMETRY • ANATOMY",
    role: "Biomedical Research Intern / 3D Modeler",
    dates: "Jun 2025–Jul 2025",
    accent: "lavender",
    mediaAccess: "limited",
    cardSkills: ["RealityCapture", "ZBrush", "Sketchfab"],
    cardSummary: "Built instruction-ready 3D anatomical models from structured specimen photography using Adobe Lightroom, RealityCapture, ZBrush, and Sketchfab. I developed a repeatable ZBrush cleanup workflow for photogrammetry artifacts and difficult end caps, documented the process for reuse, and supported faculty review of models intended for medical education.",
    intro: "At XR Labs, I learned how to turn physical anatomical specimens into detailed digital models from the ground up. My workflow began with structured photography around each specimen, continued through image preparation and photogrammetric reconstruction, and ended with detailed mesh cleanup, anatomical refinement, and presentation for teaching and research.",
    sections: [
      {
        title: "Overview + My Role",
        paragraphs: [
          "I worked alongside two other interns to create several 3D anatomical models using a full photogrammetry workflow. For each model, the process began with a physical specimen and a controlled series of photographs captured from multiple angles. I prepared image sets in Adobe Lightroom, reconstructed the geometry in RealityCapture, and moved the mesh into ZBrush for cleanup and anatomical refinement before preparing finished models for review and presentation in Sketchfab.",
          "Photogrammetry frequently produced artifacts or incomplete geometry, particularly around the open ends of specimens. I focused on those cleanup problems and developed a more consistent end-cap workflow in ZBrush so those regions could be repaired with cleaner geometry and a more repeatable process. I documented and shared that workflow so it could be reused by others in the lab.",
        ],
        media: [],
      },
    ],
    result: "The internship produced multiple instruction-ready anatomical models and a reusable workflow for cleaning difficult specimen end caps. It also gave me experience carrying a model from physical specimen photography through reconstruction, digital sculpting, review, and final presentation.",
    skillGroups: [
      { title: "Imaging + Reconstruction", skills: ["Adobe Lightroom", "RealityCapture", "Photogrammetry"] },
      { title: "3D Modeling", skills: ["ZBrush", "Mesh Cleanup", "Anatomical Refinement", "Sketchfab"] },
      { title: "Research / Workflow", skills: ["Technical Documentation", "Workflow Development", "Model Review"] },
    ],
    relatedIds: ["sea-turtle-plastination-research"],
  }),

  entry({
    id: "kupu-place",
    collection: "experience",
    title: "Low-Cost Aquaponics Filtration System",
    organization: "Kupu Place Farms",
    category: "MECHANICAL DESIGN • FABRICATION • AGRICULTURE",
    role: "Mechanical Engineering Intern",
    dates: "Jun 2024–Jul 2024",
    accent: "mint",
    cardSkills: ["Onshape", "Fabrication", "Aquaponics"],
    cardSummary: "Designed two radial-flow settlers and gravity-fed elevations in Onshape and helped build a Matala mat clarifier system for Kupu Place Farms. The in-house filtration system cost $886 compared with a $4,747 commercial vortex-filter option, saving $3,861 while supporting a projected increase from about 50 to 150+ lettuce heads per week.",
    intro: "At Kupu Place Farms, I worked on engineering problems where cost, simplicity, and maintainability mattered as much as performance. My main project was a larger, lower-cost aquaponics filtration system, but I also designed and fabricated smaller tools intended to make daily farm work more efficient.",
    sections: [
      {
        title: "Overview + My Role",
        paragraphs: [
          "The farm needed a filtration solution that could support increased aquaponics production without the cost of a commercial system. I used Onshape to design two radial-flow settlers and plan gravity-fed elevations, then helped fabricate and install the system with a Matala mat clarifier. The design had to work with the farm’s existing layout and water flow while remaining practical to build, clean, and maintain on site.",
          "Working at the farm also gave me a better understanding of the environment the engineering had to serve. I participated in day-to-day farm activities and worked under food-safety requirements. That made the design constraints more concrete because I was using and observing the processes the equipment was meant to improve.",
        ],
        media: [],
      },
      {
        title: "Design + Fabrication",
        paragraphs: [
          "The filtration system was the largest build, but I also worked on smaller process-improvement tools. One example was an acrylic seeding tray intended to make microgreen seeding more consistent and efficient. These smaller projects reinforced the same approach as the filtration system: observe a repetitive farm task, identify where a simple tool could reduce effort or inconsistency, design it, and fabricate it.",
          "The main filtration design was evaluated against a commercial vortex-filter alternative. Our in-house system totaled $886 versus $4,747 for the commercial option, a $3,861 cost difference. Calculations projected that the expanded system could support an increase from roughly 50 to more than 150 lettuce heads per week.",
        ],
        media: [],
      },
    ],
    result: "The in-house build cost $3,861 less than the commercial comparison. The increase from about 50 to 150+ lettuce heads per week was a design projection, not a measured production result presented here.",
    achievement: { label: "ACHIEVEMENT UNLOCKED", title: "$3,861 lower equipment cost", detail: "$4,747 commercial comparison − $886 in-house build = $3,861" },
    skillGroups: [
      { title: "Design", skills: ["Onshape", "Mechanical Design", "Gravity-Fed System Layout"] },
      { title: "Fabrication", skills: ["Prototype Fabrication", "Acrylic Tooling", "System Assembly"] },
      { title: "Application", skills: ["Aquaponics", "Farm Process Improvement", "Food-Safety-Aware Design"] },
    ],
  }),

  entry({
    id: "nsa-reporting-portal",
    collection: "experience",
    title: "Role-Based Reporting Portal",
    organization: "National Security Agency",
    category: "SOFTWARE • DATA • USER ACCESS",
    role: "Software Development / Computer Aide Intern",
    dates: "Aug 2023–May 2024",
    accent: "blue",
    mediaAccess: "restricted",
    cardSkills: ["HTML", "JavaScript", "SQL"],
    cardSummary: "Co-developed an HTML, JavaScript, and SQL reporting portal for more than 200 users, with role-based access and activity logs. I worked with internal customers to gather requirements, translate them into usable web features, and coordinate delivery.",
    intro: "During my NSA internship, I worked on an internal reporting portal designed to make recurring information easier to submit, organize, and access. Because the system and its data are not appropriate to publish, this portfolio page focuses on the technologies and responsibilities I can describe publicly rather than screenshots or source code.",
    sections: [
      {
        title: "Overview + My Role",
        paragraphs: [
          "I helped develop a web-based reporting system using HTML, JavaScript, and SQL. The portal collected form inputs, adapted what users could view based on account permissions, and allowed authorized users to access prior submissions. The system served more than 200 users and included role-based access and activity logs.",
          "An important part of the work was communicating with customers rather than only writing code. I gathered technical requirements, clarified how users expected the system to behave, and helped coordinate development and delivery around those needs. That experience taught me how much successful software depends on translating user workflows into clear technical requirements.",
        ],
        media: [],
      },
    ],
    result: "The project gave me early experience building software for a real user base, where permissions, usability, accountability, and customer requirements mattered alongside the code itself.",
    skillGroups: [
      { title: "Development", skills: ["HTML", "JavaScript", "SQL"] },
      { title: "System Design", skills: ["Role-Based Access", "Reporting Workflows", "Activity Logs"] },
      { title: "Professional", skills: ["Requirements Gathering", "Customer Communication", "Delivery Coordination"] },
    ],
  }),

  // Prepared but NOT published: no membership dates or attendance invented.
  entry({
    id: "swe-involvement", visible: false, kind: "involvement",
    collection: "experience", title: "Society of Women Engineers",
    organization: "", category: "PROFESSIONAL INVOLVEMENT",
    role: "", dates: "", accent: "gold", cardSkills: [],
    cardSummary: "", intro: "", sections: [], result: "", skillGroups: [],
  }),
  entry({
    id: "engineering-conferences", visible: false, kind: "involvement",
    collection: "experience", title: "Engineering Conferences & Professional Development",
    organization: "", category: "CONFERENCES • PROFESSIONAL DEVELOPMENT",
    role: "", dates: "", accent: "lavender", cardSkills: [],
    cardSummary: "", intro: "", sections: [], result: "", skillGroups: [],
  }),
];

// Preserve links generated by earlier versions of this page.
export const PROJECT_ALIASES = {
  "first-competition-robotics": "first-robotics",
  "validation-prr-automation": "bbraun-quality-engineering",
  "human-proprioception-research": "ral-proprioception",
  "neuroscience-lab-research": "limoli-lab",
  "3d-anatomical-modeling": "xr-labs",
  "aquaponics-filtration-system": "kupu-place",
  "secure-reporting-portal": "nsa-reporting-portal",
};
