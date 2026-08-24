import SkillRadar from "./SkillRadar";
import SkillPanels from "./SkillPanels";

function PlayerStats() {
  return (
    <section className="player-stats-section">
      <div className="section-heading">
        <p className="mini-section-label">SKILL TREE</p>

        <h2>PLAYER STATS</h2>

        <p>
          A snapshot of how my technical experience is distributed.
          Hover over individual skills below to see where I've applied them.
        </p>
      </div>

      <SkillRadar />

      <SkillPanels />
    </section>
  );
}

export default PlayerStats;