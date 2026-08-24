import { useState } from "react";

import Timeline from "../components/Timeline";
import ExperienceCard from "../components/ExperienceCard";
import SideQuests from "../components/SideQuests";

import timelineData from "../data/timelineData";

const legendItems = [
  { label: "SCHOOL", color: "#f1d77b" },
  { label: "INTERNSHIP", color: "#a9cbea" },
  { label: "RESEARCH", color: "#9fd8ce" },
  { label: "PROJECT", color: "#e7a6b5" },
  { label: "EXTRACURRICULAR", color: "#b9dca9" },
  { label: "FUTURE", color: "#c9bfd6" },
];

function Home() {
  const defaultExperience =
    timelineData.find((event) => event.defaultOpen) || timelineData[0];

  const [selectedExperience, setSelectedExperience] =
    useState(defaultExperience);

  return (
    <main style={styles.page}>
      {/* =====================================
          HOME PAGE BANNER
      ===================================== */}

      <style>
        {`
          .home-page-banner {
            position: relative;

            width: 100%;
            height: 280px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #3f2d56;

            border-bottom: 4px solid #28232d;

            overflow: hidden;
          }

          .home-page-banner-heading {
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            padding: 0 24px;

            text-align: center;
          }

          .home-page-banner-title {
            margin: 0;

            color: #fff8e8;

            font-family: "PixelSerif", serif;

            font-size: clamp(3rem, 6vw, 5.4rem);

            line-height: 1;

            text-align: center;

            /*
              One hard pixel shadow only.
              This keeps the title crisp.
            */
            text-shadow:
              4px 4px 0 #8e79b3;
          }

          .home-page-banner-subtitle {
            margin-top: 18px;

            color: #d7c5e7;

            font-family: "PixelSerif", serif;

            font-size: clamp(0.95rem, 1.7vw, 1.35rem);

            line-height: 1;

            letter-spacing: 0.18em;

            text-align: center;
          }

          @media (max-width: 650px) {
            .home-page-banner {
              height: 200px;
            }

            .home-page-banner-heading {
              padding: 0 18px;
            }

            .home-page-banner-title {
              font-size: clamp(2.2rem, 9vw, 3.5rem);

              text-shadow:
                3px 3px 0 #8e79b3;
            }

            .home-page-banner-subtitle {
              margin-top: 14px;

              font-size: 0.85rem;

              letter-spacing: 0.16em;
            }
          }
        `}
      </style>

      <section className="home-page-banner">
        <div className="home-page-banner-heading">
          <h1 className="home-page-banner-title">
            Mia'Zadai Navarro
          </h1>

          <div className="home-page-banner-subtitle">
            PORTFOLIO
          </div>
        </div>
      </section>

      {/* =====================================
          INTRO
      ===================================== */}

      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.heroEyebrow}>
            BIOMEDICAL ENGINEERING
          </div>

          <div style={styles.introText}>
            <p style={styles.heroSummary}>
              Hi! Welcome to my portfolio. I'm Mia, a Biomedical
              Engineering student at UC Irvine interested in
              neurotechnology, rehabilitation, medical devices, and
              finding creative ways to use engineering to solve
              real-world problems.
            </p>

            <p style={styles.heroSummary}>
              Think of this as my running log of projects, research,
              internships, and side quests I've picked up along the way.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================
          MAIN STORYLINE
      ===================================== */}

      <section style={styles.storySection}>
        <div style={styles.storyHeadingArea}>
          <div style={styles.storyEyebrow}>
            MAIN STORYLINE
          </div>

          <div style={styles.timelineTitleBox}>
            <h2 style={styles.timelineTitle}>
              CAREER TIMELINE
            </h2>
          </div>

          <p style={styles.storyDescription}>
            A look at the experiences that have shaped my path across
            engineering, research, design, leadership, and technology.
            Hover over a chapter to explore the experience below.
          </p>

          <div
            style={styles.legend}
            aria-label="Timeline category legend"
          >
            {legendItems.map((item) => (
              <div
                key={item.label}
                style={styles.legendItem}
              >
                <span
                  style={{
                    ...styles.legendSquare,
                    backgroundColor: item.color,
                  }}
                />

                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Timeline
          selectedExperience={selectedExperience}
          onSelectExperience={setSelectedExperience}
        />

        <div style={styles.cardArea}>
          <ExperienceCard
            experience={selectedExperience}
          />
        </div>
      </section>

      {/* =====================================
          SIDE QUESTS
      ===================================== */}

      <SideQuests />
    </main>
  );
}

const universalCream = "#fffaf1";

const styles = {
  page: {
    width: "100%",
    margin: 0,
    padding: 0,
    backgroundColor: universalCream,
  },

  /* =====================================
     INTRO
  ===================================== */

  hero: {
    width: "100%",

    padding: "42px 20px 48px",

    backgroundColor: universalCream,
  },

  heroInner: {
    width: "min(1200px, calc(100% - 20px))",

    margin: "0 auto",
  },

  heroEyebrow: {
    marginBottom: "18px",

    color: "#82699a",

    fontFamily: "PixelSerif, serif",

    fontSize: "0.88rem",

    letterSpacing: "2px",
  },

  introText: {
    width: "100%",

    maxWidth: "1180px",
  },

  heroSummary: {
    margin: "0 0 12px",

    color: "#665d69",

    fontFamily: "PixelSerif, serif",

    fontSize: "1.05rem",

    lineHeight: 1.75,
  },

  /* =====================================
     STORYLINE
  ===================================== */

  storySection: {
    width: "100%",

    padding: "45px 0 100px",

    backgroundColor: universalCream,
  },

  storyHeadingArea: {
    width: "min(1200px, calc(100% - 20px))",

    margin: "0 auto 15px",
  },

  storyEyebrow: {
    marginBottom: "18px",

    color: "#8d75a2",

    fontFamily: "PixelSerif, serif",

    fontSize: "0.88rem",

    letterSpacing: "2px",
  },

  timelineTitleBox: {
    display: "inline-block",

    padding: "16px 34px",

    backgroundColor: "#6f4b98",

    border: "4px solid #3f295e",

    boxShadow: "6px 6px 0 #3f295e",
  },

  timelineTitle: {
    margin: 0,

    color: "#fffaf0",

    fontFamily: "PixelSerif, serif",

    fontSize: "clamp(2rem, 5vw, 3.4rem)",

    lineHeight: 1,

    letterSpacing: "1px",

    textShadow: "3px 3px 0 #3f295e",
  },

  storyDescription: {
    maxWidth: "820px",

    margin: "30px 0 22px",

    color: "#706776",

    fontFamily: "PixelSerif, serif",

    fontSize: "0.95rem",

    lineHeight: 1.75,
  },

  /* =====================================
     LEGEND
  ===================================== */

  legend: {
    display: "flex",

    flexWrap: "wrap",

    gap: "14px 25px",

    marginTop: "18px",
  },

  legendItem: {
    display: "flex",

    alignItems: "center",

    gap: "9px",

    color: "#675d6b",

    fontFamily: "PixelSerif, serif",

    fontSize: "0.82rem",
  },

  legendSquare: {
    width: "15px",
    height: "15px",

    border: "2px solid #50336b",
  },

  cardArea: {
    width: "min(900px, calc(100% - 40px))",

    margin: "0 auto",

    paddingTop: "10px",
  },
};

export default Home;