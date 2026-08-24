import "../styles/Achievements.css";

const achievementBadges = [
  {
    id: 1,
    title: "CSWA",
    description: "Certified SOLIDWORKS Associate",
    type: "CERTIFICATION",
  },

  {
    id: 2,
    title: "MATLAB OnRamp",
    description: "MATLAB fundamentals training",
    type: "TRAINING",
  },

  {
    id: 3,
    title: "Published Research",
    description: "3D anatomical modeling contribution",
    type: "RESEARCH",
  },
];

const skillGroups = [
  {
    id: 1,
    shortLabel: "CAD",
    title: "CAD + 3D",
    skills: [
      "SolidWorks",
      "RealityCapture",
      "ZBrush",
    ],
    color: "yellow",
  },

  {
    id: 2,
    shortLabel: "</>",
    title: "Programming",
    skills: [
      "Python",
      "C / C++",
      "JavaScript",
      "HTML",
      "SQL",
    ],
    color: "blue",
  },

  {
    id: 3,
    shortLabel: "DATA",
    title: "Data + Automation",
    skills: [
      "MATLAB",
      "Excel VBA",
      "Trend Analysis",
    ],
    color: "green",
  },

  {
    id: 4,
    shortLabel: "CNC",
    title: "Manufacturing",
    skills: [
      "CNC Machining",
      "Lathes",
      "3D Printing",
    ],
    color: "pink",
  },

  {
    id: 5,
    shortLabel: "LAB",
    title: "Research Tools",
    skills: [
      "Vicon Nexus",
      "EMG",
      "Force Plates",
    ],
    color: "teal",
  },

  {
    id: 6,
    shortLabel: "VAL",
    title: "Validation",
    skills: [
      "IQ / OQ / PQ / PPQ",
      "PRR Analysis",
      "Quality Engineering",
    ],
    color: "purple",
  },
];

function PixelMedal() {
  return (
    <div
      className="achievement-medal"
      aria-hidden="true"
    >
      <img
        src="/goldmedal.png"
        alt=""
        className="achievement-medal-image"
      />
    </div>
  );
}

function AchievementBadge({ badge }) {
  return (
    <article className="achievement-badge-card">
      <div className="achievement-badge-top">
        <PixelMedal />
      </div>

      <div className="achievement-unlocked">
        UNLOCKED
      </div>

      <h4 className="achievement-badge-title">
        {badge.title}
      </h4>

      <p className="achievement-badge-description">
        {badge.description}
      </p>

      <span className="achievement-badge-type">
        {badge.type}
      </span>
    </article>
  );
}

function SkillCard({ group }) {
  return (
    <article
      className={`achievement-skill-card achievement-skill-card--${group.color}`}
    >
      <div className="achievement-skill-icon">
        {group.shortLabel}
      </div>

      <h4 className="achievement-skill-title">
        {group.title}
      </h4>

      <div className="achievement-skill-list">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="achievement-skill-chip"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

function Achievements() {
  return (
    <section
      className="achievements-section"
      aria-labelledby="achievements-title"
    >
      <div className="achievements-inner">

        {/* =====================================
            SECTION HEADER
        ===================================== */}

        <header className="achievements-header-box">
          <h2
            id="achievements-title"
            className="achievements-title"
          >
            ACHIEVEMENTS
          </h2>

          <p className="achievements-subtitle">
            Skills, certifications &amp; badges
            collected along the way.
          </p>
        </header>

        {/* =====================================
            FEATURED BADGES
        ===================================== */}

        <div className="achievements-block">
          <div className="achievements-block-heading">
            <span className="achievements-heading-pixel" />

            <h3>
              FEATURED BADGES
            </h3>

            <span className="achievements-heading-pixel" />
          </div>

          <div className="achievement-badges-grid">
            {achievementBadges.map((badge) => (
              <AchievementBadge
                key={badge.id}
                badge={badge}
              />
            ))}
          </div>
        </div>

        {/* =====================================
            PIXEL SHELF
        ===================================== */}

        <div
          className="achievement-pixel-shelf"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>

        {/* =====================================
            SKILL INVENTORY
        ===================================== */}

        <div className="achievements-block achievements-skills-block">
          <div className="achievements-block-heading">
            <span className="achievements-heading-pixel" />

            <h3>
              SKILL INVENTORY
            </h3>

            <span className="achievements-heading-pixel" />
          </div>

          <div className="achievement-skill-grid">
            {skillGroups.map((group) => (
              <SkillCard
                key={group.id}
                group={group}
              />
            ))}
          </div>
        </div>

        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="achievements-progress">
          <span className="achievements-progress-label">
            ACHIEVEMENTS UNLOCKED
          </span>

          <span className="achievements-progress-count">
            {achievementBadges.length} / ??
          </span>

          <span
            className="achievements-progress-dots"
            aria-hidden="true"
          >
            • • •
          </span>

          <span className="achievements-progress-more">
            MORE TO DISCOVER
          </span>
        </div>

      </div>
    </section>
  );
}

export default Achievements;