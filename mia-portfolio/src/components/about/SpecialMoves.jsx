import { specialMoves } from "../../data/aboutData";

function SpecialMoves() {
  return (
    <section className="special-moves-section">
      <div className="section-heading">
        <p className="mini-section-label">
          ABILITIES UNLOCKED
        </p>

        <h2>SPECIAL MOVES</h2>

        <p>
          The things that are a little harder to put
          into a résumé bullet.
        </p>
      </div>

      <div className="special-moves-grid">
        {specialMoves.map((move) => (
          <article
            key={move.number}
            className="special-move-card"
          >
            <div className="special-move-top">
              <span className="move-number">
                {move.number}
              </span>

              <span className="move-status">
                UNLOCKED
              </span>
            </div>

            <h3>{move.title}</h3>

            <p className="move-tagline">
              {move.tagline}
            </p>

            <div className="special-move-details">
              <p>{move.description}</p>

              <span className="move-effect">
                {move.effect}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SpecialMoves;