import AboutHero from "../components/about/AboutHero";
import CharacterClass from "../components/about/CharacterClass";
import PlayerStats from "../components/about/PlayerStats";
import SpecialMoves from "../components/about/SpecialMoves";

import "../styles/About.css";

function About() {
  return (
    <main className="about-page">
      <AboutHero />

      <CharacterClass />

      <PlayerStats />

      <SpecialMoves />
    </main>
  );
}

export default About;