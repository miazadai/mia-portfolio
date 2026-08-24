import { publicPath } from "../utils/publicPath";

import { useEffect, useState } from "react";

import "../styles/Contact.css";

const CONTACT_TEXT = "CONTACT ME";

function Contact() {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("typing");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] =
    useState("idle");

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms) =>
      new Promise((resolve) => {
        setTimeout(resolve, ms);
      });

    const runAnimation = async () => {
      while (!cancelled) {
        setPhase("typing");

        for (
          let i = 1;
          i <= CONTACT_TEXT.length;
          i++
        ) {
          if (cancelled) return;

          setDisplayText(
            CONTACT_TEXT.slice(0, i)
          );

          await sleep(115);
        }

        await sleep(650);

        if (cancelled) return;

        setPhase("cursorMove");

        await sleep(900);

        if (cancelled) return;

        setPhase("click");

        await sleep(280);

        if (cancelled) return;

        setPhase("swooshOut");

        await sleep(520);

        if (cancelled) return;

        setPhase("swooshBack");

        await sleep(720);

        if (cancelled) return;

        setPhase("cursorReturn");

        await sleep(700);

        setPhase("deleting");

        for (
          let i = CONTACT_TEXT.length - 1;
          i >= 0;
          i--
        ) {
          if (cancelled) return;

          setDisplayText(
            CONTACT_TEXT.slice(0, i)
          );

          await sleep(65);
        }

        await sleep(400);
      }
    };

    runAnimation();

    return () => {
      cancelled = true;
    };
  }, []);

  const cursorAtSend =
    phase === "cursorMove" ||
    phase === "click" ||
    phase === "swooshOut" ||
    phase === "swooshBack";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitStatus === "sending") {
      return;
    }

    setSubmitStatus("sending");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/miazadai.navarro@gmail.com",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,

            _subject: `Portfolio message from ${formData.name}`,
            _template: "table",
          }),
        }
      );

      const data = await response.json();

      const responseMessage = String(
        data?.message || ""
      ).toLowerCase();

      const needsActivation =
        responseMessage.includes("activate") ||
        responseMessage.includes("activation") ||
        responseMessage.includes("confirm") ||
        responseMessage.includes("confirmation");

      if (needsActivation) {
        setSubmitStatus("activation");
        return;
      }

      const successfulSubmission =
        response.ok &&
        (
          data?.success === true ||
          data?.success === "true"
        );

      if (!successfulSubmission) {
        throw new Error(
          data?.message ||
          "Message could not be sent."
        );
      }

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setSubmitStatus("success");
    } catch (error) {
      console.error(error);

      setSubmitStatus("error");
    }
  };

  return (
    <main className="contact-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="contact-hero">

        <div className="contact-title-stage">

          <h1
            className={[
              "contact-title",

              phase === "swooshOut"
                ? "contact-title--swoosh-out"
                : "",

              phase === "swooshBack"
                ? "contact-title--swoosh-back"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >

            <span className="contact-title-text">
              {displayText}
            </span>

            <span
              className={[
                "contact-type-caret",

                phase === "swooshOut" ||
                phase === "swooshBack"
                  ? "contact-type-caret--hidden"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden="true"
            />

          </h1>

        </div>


        <button
          type="button"
          className={[
            "contact-send-button",

            phase === "click"
              ? "contact-send-button--pressed"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          SEND
        </button>


        <div
          className={[
            "pixel-cursor",

            cursorAtSend
              ? "pixel-cursor--at-send"
              : "",

            phase === "click"
              ? "pixel-cursor--click"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        >

          <img
            src={publicPath(
              "images/cursor.png"
            )}
            alt=""
            className="pixel-cursor-image"
            draggable="false"
          />

        </div>

      </section>


      {/* =========================================
          CONTACT FORM
      ========================================= */}

      <section className="contact-form-section">

        <div className="contact-envelope-stage">

          <img
            src={publicPath(
              "images/fullenvelope.png"
            )}
            alt=""
            className="contact-envelope"
            draggable="false"
            aria-hidden="true"
          />


          <div className="contact-paper">

            <div className="contact-paper-inner">

              {submitStatus === "success" ? (

                <div
                  className="contact-success-box"
                  role="status"
                  aria-live="polite"
                >

                  <div className="contact-success-sparkle contact-success-sparkle-one">
                    ✦
                  </div>

                  <div className="contact-success-sparkle contact-success-sparkle-two">
                    ✦
                  </div>

                  <h2 className="contact-success-title">
                    THANK YOU!
                  </h2>

                  <p className="contact-success-message">
                    Your message has been sent.
                  </p>

                  <p className="contact-success-refresh">
                    Refresh the page if you need to send
                    another message.
                  </p>

                </div>

              ) : submitStatus === "activation" ? (

                <div
                  className="contact-success-box"
                  role="status"
                  aria-live="polite"
                >

                  <h2 className="contact-success-title">
                    ONE MORE STEP!
                  </h2>

                  <p className="contact-success-message">
                    Check the contact inbox and confirm the
                    form connection.
                  </p>

                  <p className="contact-success-refresh">
                    After confirming it, refresh this page
                    and send a test message again.
                  </p>

                </div>

              ) : (

                <>

                  <h2 className="contact-form-heading">
                    LET&apos;S TALK
                  </h2>

                  <p className="contact-form-subheading">
                    Send me a message and I&apos;ll get back
                    to you.
                  </p>


                  <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                  >

                    <div className="contact-field">

                      <label
                        htmlFor="name"
                        className="contact-label"
                      >
                        YOUR NAME

                        <span className="contact-required">
                          *
                        </span>
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="contact-input"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />

                    </div>


                    <div className="contact-field">

                      <label
                        htmlFor="email"
                        className="contact-label"
                      >
                        EMAIL

                        <span className="contact-required">
                          *
                        </span>
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="contact-input"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />

                    </div>


                    <div className="contact-field">

                      <label
                        htmlFor="message"
                        className="contact-label"
                      >
                        MESSAGE

                        <span className="contact-required">
                          *
                        </span>
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        className="contact-textarea"
                        value={formData.message}
                        onChange={handleChange}
                        rows="7"
                        required
                      />

                    </div>


                    {submitStatus === "error" && (
                      <div
                        className="contact-error-message"
                        role="alert"
                      >
                        The message could not be sent. Please
                        try again.
                      </div>
                    )}


                    <div className="contact-form-actions">

                      <button
                        type="submit"
                        className="contact-form-submit"
                        disabled={
                          submitStatus === "sending"
                        }
                      >
                        {submitStatus === "sending"
                          ? "SENDING..."
                          : "SEND"}
                      </button>

                    </div>

                  </form>

                </>

              )}

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contact;