function ExperienceCard({ experience }) {
  if (!experience) {
    return null;
  }

  const categoryColors = {
    internship: "#a9cbea",
    school: "#f1d77b",
    research: "#9fd8ce",
    project: "#e7a6b5",
    extracurricular: "#b9dca9",
    future: "#c9bfd6",
  };

  const categoryColor =
    categoryColors[experience.category] ||
    categoryColors.future;

  const categoryLabel =
    experience.category?.toUpperCase() || "UNKNOWN";

  const skills =
    Array.isArray(experience.skills) &&
    experience.skills.length > 0
      ? experience.skills.join(" / ")
      : "Unknown";

  return (
    <article style={styles.card}>
      {/* TOP BAR */}

      <div style={styles.cardHeader}>
        <div style={styles.cardDate}>
          {experience.cardDate || "Unknown"}
        </div>

        <div
          style={{
            ...styles.categoryTag,
            backgroundColor: categoryColor,
          }}
        >
          {categoryLabel}
        </div>
      </div>

      {/* IMAGE PLACEHOLDER */}

      <div style={styles.imageArea}>
        <div style={styles.imagePlaceholder}>
          IMAGE / PROJECT VISUAL
        </div>
      </div>

      {/* MAIN BODY */}

      <div style={styles.cardBody}>
        <h3 style={styles.company}>
          {experience.title}
        </h3>

        <div style={styles.role}>
          {experience.role}
        </div>

        <p style={styles.description}>
          {experience.description}
        </p>

        <button type="button" style={styles.viewMore}>
          VIEW MORE &gt;
        </button>
      </div>

      {/* FOOTER */}

      <div style={styles.footer}>
        <div style={styles.footerItem}>
          <span style={styles.footerLabel}>TYPE:</span>{" "}
          {categoryLabel}
        </div>

        <div style={styles.diamond}>◆</div>

        <div style={styles.footerItem}>
          <span style={styles.footerLabel}>SKILLS:</span>{" "}
          {skills}
        </div>

        <div style={styles.diamond}>◆</div>

        <div style={styles.footerItem}>
          <span style={styles.footerLabel}>
            LOCATION:
          </span>{" "}
          {experience.location || "Unknown"}
        </div>
      </div>
    </article>
  );
}

const styles = {
  card: {
    width: "min(850px, 100%)",

    margin: "15px auto 0",

    overflow: "hidden",

    backgroundColor: "#fffdf8",

    border: "3px solid #5b3c72",

    boxShadow: "7px 7px 0 #d7c4e5",
  },

  cardHeader: {
    minHeight: "55px",

    padding: "12px 16px",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    gap: "15px",

    boxSizing: "border-box",

    backgroundColor: "#fffaf1",

    borderBottom: "2px solid #5b3c72",
  },

  cardDate: {
    color: "#8d858f",

    fontFamily: "PixelSerif, serif",

    fontSize: "0.95rem",

    letterSpacing: "0.5px",
  },

  categoryTag: {
    padding: "8px 12px",

    border: "2px solid #5b3c72",

    color: "#493064",

    fontFamily: "PixelSerif, serif",

    fontSize: "0.88rem",

    letterSpacing: "0.5px",
  },

  imageArea: {
    height: "235px",

    backgroundColor: "#8a66aa",

    borderBottom: "2px solid #5b3c72",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  imagePlaceholder: {
    color: "#d9c9e8",

    fontFamily: "PixelSerif, serif",

    fontSize: "0.9rem",

    letterSpacing: "1px",
  },

  cardBody: {
    padding: "30px 30px 34px",

    backgroundColor: "#fffdf8",
  },

  company: {
    margin: "0 0 8px",

    color: "#573874",

    fontFamily: "PixelSerif, serif",

    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",

    lineHeight: 1.3,
  },

  role: {
    marginBottom: "18px",

    color: "#4f4057",

    fontFamily: "PixelSerif, serif",

    fontSize: "1.08rem",

    lineHeight: 1.5,
  },

  description: {
    margin: "0 0 25px",

    color: "#6d6470",

    fontFamily: "PixelSerif, serif",

    fontSize: "1rem",

    lineHeight: 1.8,
  },

  viewMore: {
    padding: "9px 13px",

    backgroundColor: "#6f4b91",

    color: "#fffaf1",

    border: "2px solid #4b3064",

    boxShadow: "3px 3px 0 #cbb5dd",

    fontFamily: "PixelSerif, serif",

    fontSize: "0.88rem",

    cursor: "pointer",
  },

  footer: {
    padding: "16px 18px",

    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",

    gap: "10px",

    backgroundColor: "#f2ede5",

    borderTop: "2px solid #5b3c72",

    color: "#726878",

    fontFamily: "PixelSerif, serif",

    fontSize: "0.83rem",

    lineHeight: 1.7,
  },

  footerItem: {
    textAlign: "center",
  },

  footerLabel: {
    color: "#4b3064",
  },

  diamond: {
    color: "#9172aa",

    fontSize: "0.72rem",
  },
};

export default ExperienceCard;