import SkillRow from "./SkillRow";

import {
  designSkills,
  codeSkills,
} from "../../data/aboutData";

function SkillPanels() {
  return (
    <div className="skill-panel-grid">
      <div className="skill-panel">
        <div className="skill-panel-heading">
          <span>01</span>
          <h3>DESIGN + BUILD</h3>
        </div>

        <div className="skill-list">
          {designSkills.map((skill) => (
            <SkillRow
              key={skill.name}
              skill={skill}
            />
          ))}
        </div>
      </div>

      <div className="skill-panel">
        <div className="skill-panel-heading">
          <span>02</span>
          <h3>CODE + DATA</h3>
        </div>

        <div className="skill-list">
          {codeSkills.map((skill) => (
            <SkillRow
              key={skill.name}
              skill={skill}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillPanels;