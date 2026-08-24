function CharacterClass() {
  return (
    <section className="character-class-section">
      <div className="character-class-card">
        <p className="mini-section-label">CHARACTER CLASS</p>

        <div className="character-class-grid">
          <div className="class-stat">
            <span>PRIMARY CLASS</span>
            <strong>Biomedical Engineer</strong>
          </div>

          <div className="class-stat">
            <span>SUBCLASS</span>
            <strong>Mechanical / Electrical</strong>
          </div>

          <div className="class-stat">
            <span>SPECIAL INTEREST</span>
            <strong>Neurotechnology + Assistive Systems</strong>
          </div>

          <div className="class-stat">
            <span>PLAYSTYLE</span>
            <strong>Build → Test → Fix → Improve</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CharacterClass;