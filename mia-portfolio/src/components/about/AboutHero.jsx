function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-banner">
        <p className="about-banner-kicker">PLAYER PROFILE</p>

        <h1>ABOUT ME</h1>

        <p className="about-banner-subtitle">
          the player behind the projects
        </p>
      </div>

      <div className="about-intro">
        <div className="about-headshot-frame">
          <img
            src="/images/headshot.jpg"
            alt="Mia'Zadai Navarro"
            className="about-headshot"
          />

          <span className="headshot-corner corner-one" />
          <span className="headshot-corner corner-two" />
        </div>

        <div className="about-copy">
          <p className="about-eyebrow">HI, I'M MIA!</p>

          <h2>
            Engineer, researcher,
            <br />
            and a dreamer.
          </h2>

          <p>
            I'm a biomedical engineering student born in Germany and raised
            in Hawaiʻi as a military kid, which taught me early how to adapt
            to new environments, people, and ways of thinking.
          </p>

          <p>
            My experience has taken me across mechanical design, electronics,
            programming, research, and medical-device quality, but I'm
            especially interested in neurological disorders and technologies
            that support mobility, independence, and quality of life.
          </p>

          <p>
            I'm particularly drawn to assistive devices, rehabilitation,
            neural interfaces, prosthetics, and emerging brain-computer
            technologies. Accessibility is an important part of how I think
            about design: innovation matters most when the people who need it
            can actually use it.
          </p>

          <p>
            More than anything, I like understanding how things work, finding
            what could work better, and actually doing something about it.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;