function SkillRow({ skill }) {
  const fullBlocks = Math.floor(skill.value);
  const hasHalfBlock = skill.value % 1 !== 0;

  const blocks = Array.from({ length: 5 }, (_, index) => {
    const position = index + 1;

    let blockClass = "skill-block empty";

    if (position <= fullBlocks) {
      blockClass = "skill-block full";
    } else if (
      hasHalfBlock &&
      position === fullBlocks + 1
    ) {
      blockClass = "skill-block half";
    }

    return (
      <span
        key={index}
        className={blockClass}
      />
    );
  });

  return (
    <div className="skill-row">
      <div className="skill-row-main">
        <div className="skill-name-group">
          <strong>{skill.name}</strong>

          <span>{skill.level}</span>
        </div>

        <div className="skill-rating">
          <div className="skill-blocks">
            {blocks}
          </div>

          <span className="skill-number">
            {skill.value}/5
          </span>
        </div>
      </div>

      {skill.appliedIn.length > 0 && (
        <div className="skill-hover-card">
          <p>APPLIED IN</p>

          {skill.appliedIn.map((item) => (
            <span key={item}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillRow;