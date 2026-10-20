"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { contact, ideaLabChallenges } from "@/lib/content";
import styles from "./WhatShouldRomilDo.module.css";

export function WhatShouldRomilDo() {
  const [idea, setIdea] = useState("");
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const selectedChallenge = ideaLabChallenges.find(
    (challenge) => challenge.id === selectedChallengeId,
  );
  const emailHref = contact.links.find((link) => link.label === "Email")?.href;
  const emailAddress = emailHref?.replace("mailto:", "") ?? "";

  function shareIdea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedIdea = idea.trim();
    if (!trimmedIdea || !emailAddress) return;

    const subject = encodeURIComponent("A What Should Romil Do? idea");
    const body = encodeURIComponent(
      `${trimmedIdea}\n\nSent from the What Should Romil Do? Lab on Romil's portfolio.`,
    );
    setStatus("Your email draft is ready. Press Send in your mail app to share your idea.");
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  }

  function surpriseMe() {
    const currentIndex = ideaLabChallenges.findIndex(
      (challenge) => challenge.id === selectedChallengeId,
    );
    const nextIndex = currentIndex < 0
      ? Math.floor(Math.random() * ideaLabChallenges.length)
      : (currentIndex + 1 + Math.floor(Math.random() * (ideaLabChallenges.length - 1))) % ideaLabChallenges.length;
    setSelectedChallengeId(ideaLabChallenges[nextIndex].id);
    setStatus("");
  }

  function suggestChallenge(title: string) {
    setIdea((current) => (current.trim() ? `${current.trim()}\n\nInspired by: ${title}` : title));
    setStatus("Challenge added to your idea. Add your twist, then share it.");
  }

  return (
    <section id="what-should-romil-do" className={styles.section} aria-labelledby="idea-lab-title">
      <div className={styles.container}>
        <span className={`${styles.doodle} ${styles.doodleLeft}`} aria-hidden="true">✳</span>
        <span className={`${styles.doodle} ${styles.doodleRight}`} aria-hidden="true">✦</span>

        <header className={styles.heading}>
          <span className={styles.kicker}><span aria-hidden="true">✦</span> The idea lab</span>
          <h2 id="idea-lab-title">What Should<br className={styles.mobileBreak} /> Romil Do?<span> Lab</span></h2>
          <p>Real marketing challenges. Real thinking. Your ideas. My approach.</p>
        </header>

        <div className={styles.heroGrid}>
          <aside className={`${styles.stickyNote} ${styles.noteMint}`}>
            <span className={styles.notePin} aria-hidden="true">✦</span>
            <p>Do the grand tour, then drop me a challenge!</p>
            <span className={styles.noteArrow} aria-hidden="true">↘</span>
          </aside>

          <div className={styles.formWindow}>
            <div className={styles.windowBar} aria-hidden="true">
              <span /><span /><span />
              <b>OPEN FOR IDEAS</b>
            </div>
            <div className={styles.formContent}>
              <div className={styles.formTitleRow}>
                <span className={styles.greenDot} aria-hidden="true" />
                <div>
                  <p className={styles.eyebrow}>Your turn, creative director</p>
                  <h3>My suggestion for Romil is…</h3>
                </div>
                <span className={styles.sparkle} aria-hidden="true">✧</span>
              </div>

              <form onSubmit={shareIdea}>
                <label className={styles.srOnly} htmlFor="idea-submission">Write your marketing idea, challenge, or suggestion</label>
                <textarea
                  id="idea-submission"
                  required
                  maxLength={1200}
                  value={idea}
                  onChange={(event) => {
                    setIdea(event.target.value);
                    setStatus("");
                  }}
                  placeholder="A campaign for… / What if this brand… / I’d love to see Romil try…"
                />
                <div className={styles.formActions}>
                  <button className={styles.primaryButton} type="submit" disabled={!idea.trim()}>
                    Share my idea <span aria-hidden="true">↗</span>
                  </button>
                  <button className={styles.secondaryButton} type="button" onClick={surpriseMe}>
                    <span aria-hidden="true">✳</span> Surprise me
                  </button>
                  <span className={styles.characterCount} aria-live="polite">{idea.length}/1200</span>
                </div>
              </form>
              <p className={styles.privacyNote}>
                Your idea isn’t posted or saved here. Sharing opens an email draft; it reaches Romil only if you send it.
              </p>
              {status && <p className={styles.status} role="status">{status}</p>}
              {emailAddress && (
                <p className={styles.emailFallback}>
                  Mail app not opening? <a href={emailHref}>Email Romil directly</a>.
                </p>
              )}
            </div>
            <span className={styles.pencil} aria-hidden="true">✎</span>
          </div>

          <aside className={`${styles.stickyNote} ${styles.notePink}`}>
            <span className={styles.notePin} aria-hidden="true">⌁</span>
            <p>Ideas from strangers.<br />Potential collaborations.<br />Who knows?</p>
            <span className={styles.noteArrow} aria-hidden="true">↙</span>
          </aside>
        </div>

        <section className={styles.challengeSection} aria-labelledby="challenge-title">
          <div className={styles.challengeHeading}>
            <div>
              <span className={styles.sectionKicker}>Pick a prompt</span>
              <h3 id="challenge-title">Explore Challenges</h3>
              <p>Choose a brief to see how I’d think it through, from insight to impact.</p>
            </div>
            <span className={styles.handNote}>Pick one. Or pitch your own! <span aria-hidden="true">↙</span></span>
          </div>

          <div className={styles.challengeGrid}>
            {ideaLabChallenges.map((challenge, index) => (
              <button
                className={`${styles.challengeCard} ${styles[challenge.color]} ${selectedChallengeId === challenge.id ? styles.challengeSelected : ""}`}
                key={challenge.id}
                type="button"
                aria-pressed={selectedChallengeId === challenge.id}
                onClick={() => {
                  setSelectedChallengeId(challenge.id);
                  setStatus("");
                }}
              >
                <span className={styles.cardTopline}><span>{String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">{challenge.icon}</span></span>
                <strong>{challenge.title}</strong>
                <span className={styles.cardPrompt}>{challenge.prompt}</span>
                <span className={styles.cardArrow} aria-hidden="true">↗</span>
              </button>
            ))}
          </div>

          {selectedChallenge ? (
            <article className={styles.caseStudy} aria-live="polite" aria-labelledby="case-study-title">
              <div className={styles.caseHeader}>
                <div>
                  <span className={styles.caseKicker}>Practice brief · example approach</span>
                  <h4 id="case-study-title">{selectedChallenge.icon} {selectedChallenge.title}</h4>
                </div>
                <button className={styles.pitchButton} type="button" onClick={() => suggestChallenge(selectedChallenge.title)}>
                  Add this to my idea ↗
                </button>
              </div>
              <ol className={styles.caseSteps}>
                {selectedChallenge.steps.map((step, index) => (
                  <li key={step.label}>
                    <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <div><h5>{step.label}</h5><p>{step.detail}</p></div>
                  </li>
                ))}
              </ol>
              <p className={styles.caseDisclaimer}>Impact lists signals to measure; it does not claim results from a completed campaign.</p>
            </article>
          ) : (
            <p className={styles.choosePrompt}><span aria-hidden="true">✦</span> Pick a challenge to open its mini case study.</p>
          )}
        </section>

        <section className={styles.communityPanel} aria-labelledby="community-title">
          <div className={styles.communityIcon} aria-hidden="true">✉</div>
          <div>
            <span className={styles.sectionKicker}>A little idea inbox</span>
            <h3 id="community-title">Community suggestions</h3>
            <p>Ideas are private by default. This site doesn’t publish or store submissions; emailed suggestions can be reviewed by Romil and considered for a future case study.</p>
          </div>
          <div className={styles.boardStatus}>
            <span className={styles.boardDot} aria-hidden="true" />
            <span><strong>Review board</strong><br />Email-powered · no public posts</span>
          </div>
        </section>
      </div>
    </section>
  );
}
