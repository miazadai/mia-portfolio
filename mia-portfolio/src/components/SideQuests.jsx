import { useState } from "react";
import sideQuestData from "../data/sideQuestData";

function SideQuests() {
  const [hoveredId, setHoveredId] = useState(null);
  const [clickedId, setClickedId] = useState(null);

  const activeId = hoveredId ?? clickedId;

  const toggleQuest = (id) => {
    setClickedId((currentId) => (currentId === id ? null : id));
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleQuest(id);
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.headingBox}>
          <h2 style={styles.heading}>SIDE QUESTS</h2>
        </div>

        <p style={styles.subtitle}>
          Because life's about the journey, not the destination... right?
        </p>

        <div style={styles.questList}>
          {sideQuestData.map((quest, index) => {
            const isActive = activeId === quest.id;

            return (
              <div
                key={quest.id}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onMouseEnter={() => setHoveredId(quest.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(quest.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => toggleQuest(quest.id)}
                onKeyDown={(event) => handleKeyDown(event, quest.id)}
                style={{
                  ...styles.questCard,
                  ...(isActive ? styles.questCardActive : {}),
                }}
              >
                <div style={styles.compactRow}>
                  <div style={styles.number}>
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div style={styles.mainInfo}>
                    <div style={styles.date}>{quest.date}</div>

                    <div style={styles.title}>{quest.title}</div>

                    <div style={styles.skillsLine}>
                      {quest.skills.join("  ◆  ")}
                    </div>
                  </div>

                  <div
                    style={{
                      ...styles.arrow,
                      ...(isActive ? styles.arrowActive : {}),
                    }}
                  >
                    ›
                  </div>
                </div>

                {isActive && (
                  <div style={styles.expandedArea}>
                    <div style={styles.divider} />

                    <p style={styles.quote}>"{quest.quote}"</p>

                    <div style={styles.detailsGrid}>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>ORGANIZATION</span>
                        <span style={styles.detailValue}>
                          {quest.organization}
                        </span>
                      </div>

                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>TYPE</span>
                        <span style={styles.detailValue}>{quest.type}</span>
                      </div>

                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>SKILLS</span>
                        <span style={styles.detailValue}>
                          {quest.skills.join(" / ")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: "#ddd2f1",
    padding: "80px 20px 90px",
  },

  container: {
    width: "min(900px, 100%)",
    margin: "0 auto",
  },

  headingBox: {
    display: "table",
    margin: "0 auto",
    backgroundColor: "#6f4b98",
    border: "3px solid #3f295e",
    padding: "12px 30px",
    boxShadow: "5px 5px 0 #3f295e",
  },

  heading: {
    margin: 0,
    color: "#fffaf0",
    fontFamily: "PixelSerif, serif",
    fontSize: "clamp(2rem, 5vw, 3.4rem)",
    lineHeight: 1,
    letterSpacing: "1px",
    textAlign: "center",
    textShadow: "3px 3px 0 #3f295e",
  },

  subtitle: {
    margin: "28px auto 38px",
    color: "#4b3768",
    fontFamily: "PixelSerif, serif",
    fontSize: "1rem",
    textAlign: "center",
    lineHeight: 1.6,
  },

  questList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  questCard: {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#fff8e8",
    border: "3px solid #59406f",
    color: "#3f295e",
    cursor: "pointer",
    outline: "none",
    transition:
      "transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease",
  },

  questCardActive: {
    transform: "translate(-3px, -3px)",
    boxShadow: "8px 8px 0 #6f4b98",
    backgroundColor: "#fffaf0",
  },

  compactRow: {
    display: "grid",
    gridTemplateColumns: "65px 1fr 35px",
    alignItems: "center",
    gap: "16px",
    minHeight: "105px",
    padding: "18px 22px",
  },

  number: {
    color: "#a08bad",
    fontFamily: "PixelSerif, serif",
    fontSize: "1.3rem",
    textAlign: "center",
  },

  mainInfo: {
    minWidth: 0,
  },

  date: {
    color: "#8c8390",
    fontFamily: "PixelSerif, serif",
    fontSize: "0.72rem",
    letterSpacing: "1px",
    marginBottom: "7px",
  },

  title: {
    color: "#493064",
    fontFamily: "PixelSerif, serif",
    fontSize: "clamp(1rem, 2.3vw, 1.35rem)",
    marginBottom: "9px",
  },

  skillsLine: {
    color: "#755e83",
    fontFamily: "PixelSerif, serif",
    fontSize: "0.73rem",
    lineHeight: 1.6,
  },

  arrow: {
    color: "#6f4b98",
    fontFamily: "PixelSerif, serif",
    fontSize: "2rem",
    textAlign: "center",
    transform: "rotate(0deg)",
    transition: "transform 140ms ease",
  },

  arrowActive: {
    transform: "rotate(90deg)",
  },

  expandedArea: {
    padding: "0 26px 28px 103px",
  },

  divider: {
    height: "2px",
    width: "100%",
    backgroundColor: "#d7c9de",
    marginBottom: "22px",
  },

  quote: {
    margin: "0 0 25px",
    color: "#79589b",

    // IMPORTANT:
    // No cursive font. It inherits the same PixelSerif theme.
    fontFamily: "PixelSerif, serif",
    fontStyle: "italic",

    fontSize: "1.05rem",
    lineHeight: 1.7,
  },

  detailsGrid: {
    display: "grid",
    gap: "15px",
  },

  detailItem: {
    display: "grid",
    gridTemplateColumns: "145px 1fr",
    gap: "15px",
    alignItems: "start",
  },

  detailLabel: {
    color: "#9b899f",
    fontFamily: "PixelSerif, serif",
    fontSize: "0.68rem",
    letterSpacing: "1px",
  },

  detailValue: {
    color: "#493064",
    fontFamily: "PixelSerif, serif",
    fontSize: "0.8rem",
    lineHeight: 1.5,
  },
};

export default SideQuests;