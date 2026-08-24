import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

import { radarStats } from "../../data/aboutdata";

function SkillRadar() {
  return (
    <div className="radar-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={radarStats}
          outerRadius="72%"
        >
          <PolarGrid
            gridType="polygon"
            stroke="#D4A28E"
          />

          <PolarAngleAxis
            dataKey="skill"
            tick={{
              fill: "#3F2D56",
              fontSize: 13,
              fontWeight: 700,
            }}
          />

          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={false}
            axisLine={false}
          />

          <Radar
            dataKey="value"
            stroke="#735991"
            fill="#A995C7"
            fillOpacity={0.45}
            strokeWidth={3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SkillRadar;