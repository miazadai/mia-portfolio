import { publicPath } from "../utils/publicPath";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";

import Achievements from "../components/Achievements";

import "../styles/Resume.css";

const xpOrbs = [
  { left: "4%", delay: "-2.1s", size: "large" },
  { left: "9%", delay: "-6.2s", size: "small" },
  { left: "14%", delay: "-3.8s", size: "large" },
  { left: "19%", delay: "-7.1s", size: "small" },
  { left: "25%", delay: "-1.4s", size: "medium" },
  { left: "30%", delay: "-5.4s", size: "small" },
  { left: "35%", delay: "-2.8s", size: "medium" },
  { left: "40%", delay: "-7.6s", size: "large" },
  { left: "44%", delay: "-4.6s", size: "small" },
  { left: "48%", delay: "-1.2s", size: "large" },
  { left: "53%", delay: "-6.7s", size: "medium" },
  { left: "57%", delay: "-3.5s", size: "small" },
  { left: "62%", delay: "-7.9s", size: "large" },
  { left: "67%", delay: "-2.3s", size: "medium" },
  { left: "72%", delay: "-5.8s", size: "small" },
  { left: "76%", delay: "-4.1s", size: "large" },
  { left: "81%", delay: "-7.3s", size: "small" },
  { left: "85%", delay: "-2.9s", size: "medium" },
  { left: "89%", delay: "-5.1s", size: "small" },
  { left: "94%", delay: "-1.8s", size: "large" },
  { left: "12%", delay: "-7.7s", size: "small" },
  { left: "38%", delay: "-5.7s", size: "small" },
  { left: "69%", delay: "-6.4s", size: "small" },
  { left: "91%", delay: "-4.5s", size: "medium" },
];

/* =========================================
   CHARACTER DIALOGUE LOOP
========================================= */

const bubbleMessages = [
  "Welcome to my resume! You can see my experience here.",
  "Psst... there are achievements waiting below too.",
  "I promise I do more than make cute portfolio websites.",
  "You should definitely hire me. Haha... unless?",
];

function Resume() {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [messageIndex, setMessageIndex] =
    useState(0);

  const [isResumeExpanded, setIsResumeExpanded] =
    useState(false);

  const [resumePreviewSrc, setResumePreviewSrc] =
    useState(
      publicPath("MiaZadai_Navarro_Resume_Preview.png")
    );

  const currentMessage =
    bubbleMessages[messageIndex];

  /* =========================================
     TYPEWRITER LOOP
  ========================================= */

  useEffect(() => {
    let timeout;

    /* TYPE MESSAGE */
    if (
      !isDeleting &&
      typedText.length < currentMessage.length
    ) {
      timeout = setTimeout(() => {
        setTypedText(
          currentMessage.slice(
            0,
            typedText.length + 1
          )
        );
      }, 55);
    }

    /* PAUSE AFTER FULL MESSAGE */
    else if (
      !isDeleting &&
      typedText.length === currentMessage.length
    ) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    }

    /* DELETE MESSAGE */
    else if (
      isDeleting &&
      typedText.length > 0
    ) {
      timeout = setTimeout(() => {
        setTypedText(
          currentMessage.slice(
            0,
            typedText.length - 1
          )
        );
      }, 28);
    }

    /* MOVE TO NEXT MESSAGE */
    else if (
      isDeleting &&
      typedText.length === 0
    ) {
      timeout = setTimeout(() => {
        setIsDeleting(false);

        setMessageIndex(
          (previousIndex) =>
            (previousIndex + 1) %
            bubbleMessages.length
        );
      }, 450);
    }

    return () => clearTimeout(timeout);
  }, [
    typedText,
    isDeleting,
    currentMessage,
  ]);

  /* =========================================
     RESUME PREVIEW FALLBACK
  ========================================= */

  const handlePreviewError = () => {
    if (
      resumePreviewSrc !==
      "/resume-preview.png"
    ) {
      setResumePreviewSrc(
        "/resume-preview.png"
      );
    }
  };

  return (
    <main className="resume-page">

      {/* =====================================
          RESUME HERO
      ===================================== */}

      <section className="resume-hero">

        <div
          className="resume-xp-rain"
          aria-hidden="true"
        >
          {xpOrbs.map((orb, index) => (
            <span
              key={index}
              className={`resume-xp-orb resume-xp-orb--${orb.size}`}
              style={{
                left: orb.left,
                animationDelay: orb.delay,
              }}
            >
              <span
                className={`resume-xp-center resume-xp-center--${orb.size}`}
              />
            </span>
          ))}
        </div>

        <h1 className="resume-title">
          RESUME
        </h1>

      </section>


      {/* =====================================
          DOWNLOAD
      ===================================== */}

      <section className="resume-download-section">

        <a
          href="/MiaZadai_Navarro_Resume.pdf"
          download="MiaZadai_Navarro_Resume.pdf"
          className="resume-download-button"
        >
          <Download
            size={19}
            strokeWidth={2.8}
          />

          DOWNLOAD HERE
        </a>

      </section>


      {/* =====================================
          RESUME DISPLAY
      ===================================== */}

      <section className="resume-stage">

        <aside
          className="resume-side-space resume-side-left"
          aria-hidden="true"
        />


        {/* =====================================
            RESUME
        ===================================== */}

        <div
          className={`resume-document-wrapper ${
            isResumeExpanded
              ? "resume-document-wrapper--expanded"
              : "resume-document-wrapper--collapsed"
          }`}
        >

          <div className="resume-document-viewport">

            <a
              href="/MiaZadai_Navarro_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="resume-document-link"
            >

              <img
                src={resumePreviewSrc}
                alt="Mia'Zadai Navarro Resume"
                className="resume-document"
                onError={handlePreviewError}
              />

            </a>


            {!isResumeExpanded && (
              <div
                className="resume-preview-fade"
                aria-hidden="true"
              />
            )}

          </div>


          {/* =====================================
              EXPAND / COLLAPSE BUTTON
          ===================================== */}

          <button
            type="button"
            className="resume-expand-button"
            onClick={() =>
              setIsResumeExpanded(
                (previousValue) =>
                  !previousValue
              )
            }
            aria-expanded={
              isResumeExpanded
            }
            aria-label={
              isResumeExpanded
                ? "Collapse resume preview"
                : "Expand resume preview"
            }
          >

            {isResumeExpanded ? (
              <ChevronUp
                size={27}
                strokeWidth={3}
              />
            ) : (
              <ChevronDown
                size={27}
                strokeWidth={3}
              />
            )}

          </button>

        </div>


        {/* =====================================
            CHARACTER
        ===================================== */}

        <aside className="resume-side-space resume-side-right">

          <div className="resume-character-area">

            <div className="resume-character-circle">

              <img
                src="/avatar.png"
                alt="Pixel character of Mia'Zadai"
                className="resume-character"
              />

            </div>


            {/* =====================================
                TYPEWRITER SPEECH BUBBLE
            ===================================== */}

            <div className="resume-speech-bubble">

              <p className="resume-typewriter-text">

                {typedText}

                <span className="resume-typewriter-cursor">
                  ▋
                </span>

              </p>

            </div>

          </div>

        </aside>

      </section>


      {/* =====================================
          ACHIEVEMENTS
      ===================================== */}

      <Achievements />

    </main>
  );
}

export default Resume;