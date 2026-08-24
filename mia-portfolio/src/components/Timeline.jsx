import { useState } from "react";

import timelineData from "../data/timelineData";

function Timeline({
  selectedExperience,
  onSelectExperience,
}) {
  const [hoveredId, setHoveredId] =
    useState(null);

  const categoryColors = {
    internship: "#a9cbea",
    school: "#f1d77b",
    research: "#9fd8ce",
    project: "#e7a6b5",
    extracurricular: "#b9dca9",
    future: "#c9bfd6",
  };

  const validDates = timelineData.map(
    (event) =>
      new Date(event.sortDate).getTime()
  );

  const firstDate =
    Math.min(...validDates);

  const lastDate =
    Math.max(...validDates);

  const dateRange =
    lastDate - firstDate || 1;

  /*
    KEEP EXISTING SPACING MODEL:

    50% chronological
    +
    50% evenly distributed
  */

  const getTimelinePosition = (
    event,
    index
  ) => {
    const eventDate = new Date(
      event.sortDate
    ).getTime();

    const chronologicalPosition =
      ((eventDate - firstDate) /
        dateRange) *
      100;

    const evenPosition =
      timelineData.length === 1
        ? 50
        : (index /
            (timelineData.length - 1)) *
          100;

    const blendedPosition =
      chronologicalPosition * 0.5 +
      evenPosition * 0.5;

    return 4 + blendedPosition * 0.92;
  };

  const handleSelect = (event) => {
    if (onSelectExperience) {
      onSelectExperience(event);
    }
  };

  return (
    <div style={styles.scrollArea}>
      <div style={styles.timeline}>
        <div style={styles.mainLine} />

        {timelineData.map(
          (event, index) => {
            const isTop =
              event.position === "top";

            const isHovered =
              hoveredId === event.id;

            const isSelected =
              selectedExperience?.id ===
              event.id;

            const nodeColor =
              categoryColors[
                event.category
              ] ||
              categoryColors.future;

            const leftPosition =
              getTimelinePosition(
                event,
                index
              );

            /*
              Uses timelineTitle if your data
              has it; otherwise falls back to
              title so this does not break your
              existing data file.
            */

            const displayTitle =
              event.timelineTitle ||
              event.title;

            return (
              <button
                key={event.id}
                type="button"
                aria-label={
                  event.dateLabel
                    ? `${displayTitle}, ${event.dateLabel}`
                    : displayTitle
                }
                onMouseEnter={() => {
                  setHoveredId(event.id);
                  handleSelect(event);
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                }}
                onFocus={() => {
                  setHoveredId(event.id);
                  handleSelect(event);
                }}
                onBlur={() => {
                  setHoveredId(null);
                }}
                onClick={() =>
                  handleSelect(event)
                }
                style={{
                  ...styles.eventButton,

                  left: `${leftPosition}%`,

                  ...(isTop
                    ? styles.topEventButton
                    : styles.bottomEventButton),
                }}
              >
                {isTop ? (
                  <>
                    {/* LABEL */}

                    <div style={styles.topLabel}>
                      <div
                        style={{
                          ...styles.nodeTitle,

                          ...(isHovered
                            ? styles.hoveredTitle
                            : {}),
                        }}
                      >
                        {displayTitle}
                      </div>

                      {event.dateLabel && (
                        <div
                          style={
                            styles.nodeDate
                          }
                        >
                          {
                            event.dateLabel
                          }
                        </div>
                      )}
                    </div>

                    {/* SQUARE NODE */}

                    <div
                      style={{
                        ...styles.node,
                        ...styles.topNode,

                        backgroundColor:
                          nodeColor,

                        ...(isSelected
                          ? styles.selectedNode
                          : {}),

                        ...(isHovered
                          ? styles.hoveredNode
                          : {}),

                        ...(event.category ===
                        "future"
                          ? styles.futureNode
                          : {}),
                      }}
                    >
                      {event.category ===
                      "future"
                        ? "?"
                        : ""}
                    </div>

                    {/* BRANCH */}

                    <div
                      style={
                        styles.topBranch
                      }
                    />
                  </>
                ) : (
                  <>
                    {/* BRANCH */}

                    <div
                      style={
                        styles.bottomBranch
                      }
                    />

                    {/* SQUARE NODE */}

                    <div
                      style={{
                        ...styles.node,
                        ...styles.bottomNode,

                        backgroundColor:
                          nodeColor,

                        ...(isSelected
                          ? styles.selectedNode
                          : {}),

                        ...(isHovered
                          ? styles.hoveredNode
                          : {}),

                        ...(event.category ===
                        "future"
                          ? styles.futureNode
                          : {}),
                      }}
                    >
                      {event.category ===
                      "future"
                        ? "?"
                        : ""}
                    </div>

                    {/* LABEL */}

                    <div
                      style={styles.bottomLabel}
                    >
                      <div
                        style={{
                          ...styles.nodeTitle,

                          ...(isHovered
                            ? styles.hoveredTitle
                            : {}),
                        }}
                      >
                        {displayTitle}
                      </div>

                      {event.dateLabel && (
                        <div
                          style={
                            styles.nodeDate
                          }
                        >
                          {
                            event.dateLabel
                          }
                        </div>
                      )}
                    </div>
                  </>
                )}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}

const styles = {
  scrollArea: {
    width: "100%",

    overflowX: "auto",
    overflowY: "hidden",

    padding: "25px 0 35px",

    backgroundColor: "#fffaf1",
  },

  timeline: {
    position: "relative",

    width: "max(1500px, 100%)",
    height: "410px",

    margin: "0 auto",

    backgroundColor: "#fffaf1",
  },

  mainLine: {
    position: "absolute",

    top: "205px",

    left: "4%",
    right: "4%",

    height: "5px",

    backgroundColor: "#b99bd1",

    transform: "translateY(-50%)",

    zIndex: 1,
  },

  eventButton: {
    position: "absolute",

    width: "190px",
    height: "160px",

    transform: "translateX(-50%)",

    margin: 0,
    padding: 0,

    border: "none",
    outline: "none",

    backgroundColor: "transparent",

    fontFamily: "PixelSerif, serif",

    cursor: "pointer",

    zIndex: 3,
  },

  topEventButton: {
    top: "45px",
  },

  bottomEventButton: {
    top: "205px",
  },

  /* =====================================
     LABELS
  ===================================== */

  topLabel: {
    position: "absolute",

    width: "190px",

    left: 0,
    bottom: "94px",

    textAlign: "center",
  },

  bottomLabel: {
    position: "absolute",

    width: "190px",

    left: 0,
    top: "94px",

    textAlign: "center",
  },

  /*
    BIGGER than before.
  */

  nodeTitle: {
    marginBottom: "9px",

    color: "#4c3166",

    fontFamily: "PixelSerif, serif",

    fontSize: "1.05rem",
    fontWeight: "700",

    lineHeight: 1.35,

    transition:
      "color 130ms ease, transform 130ms ease",
  },

  hoveredTitle: {
    color: "#8061a0",

    transform: "translateY(-2px)",
  },

  /*
    Also bigger than before,
    but still smaller and lighter
    than the title.
  */

  nodeDate: {
    color: "#9e979f",

    fontFamily: "PixelSerif, serif",

    fontSize: "0.78rem",

    lineHeight: 1.35,

    letterSpacing: "0.5px",
  },

  /* =====================================
     BRANCHES
  ===================================== */

  topBranch: {
    position: "absolute",

    width: "3px",
    height: "55px",

    left: "50%",
    bottom: 0,

    transform: "translateX(-50%)",

    backgroundColor: "#b99bd1",

    zIndex: 1,
  },

  bottomBranch: {
    position: "absolute",

    width: "3px",
    height: "55px",

    left: "50%",
    top: 0,

    transform: "translateX(-50%)",

    backgroundColor: "#b99bd1",

    zIndex: 1,
  },

  /* =====================================
     SQUARE NODES
  ===================================== */

  node: {
    position: "absolute",

    left: "50%",

    width: "24px",
    height: "24px",

    boxSizing: "border-box",

    /*
      SQUARE.
      NO BORDER RADIUS.
    */

    border: "3px solid #50336b",
    borderRadius: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    color: "#50336b",

    fontFamily: "PixelSerif, serif",
    fontSize: "0.7rem",

    zIndex: 4,

    transition:
      "transform 140ms ease, box-shadow 140ms ease, filter 140ms ease",
  },

  topNode: {
    bottom: "47px",

    transform:
      "translateX(-50%) scale(1)",
  },

  bottomNode: {
    top: "47px",

    transform:
      "translateX(-50%) scale(1)",
  },

  selectedNode: {
    boxShadow:
      "3px 3px 0 #d8c5e8",
  },

  /*
    Same functionality:
    grow + hard shadow on hover.
  */

  hoveredNode: {
    transform:
      "translateX(-50%) scale(1.3)",

    boxShadow:
      "6px 6px 0 #50336b",

    filter: "brightness(1.08)",
  },

  futureNode: {
    borderStyle: "dashed",
  },
};

export default Timeline;