import styles from "./ResumePanel.module.css";

// Update these constants if either document moves to a new URL.
export const RESUME_URL = "https://drive.google.com/drive/folders/1nrdejFBcIuSq2mm1jDvy6D4LaKWMtxdP?usp=sharing";
export const BRAND_KIT_URL = "https://www.canva.com/design/DAHQhoRm8T8/lSILK9qlgakTafUfAQ5X9A/view";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M5 15 15 5M6 5h9v9" />
    </svg>
  );
}

export function ResumePanel() {
  return (
    <section className={styles.section} aria-labelledby="resume-panel-title">
      <div className={styles.panel}>
        <div className={styles.copy}>
          <span className={styles.kicker}><span aria-hidden="true">▤</span> The professional side</span>
          <h2 id="resume-panel-title">Want the<br />full picture?</h2>
          <p className={styles.description}>
            My résumé has the detailed version — my experience, skills, projects,
            education and everything in between.
          </p>
          <div className={styles.actions}>
            <a className={`${styles.action} ${styles.resumeAction}`} href={RESUME_URL} target="_blank" rel="noopener noreferrer" aria-label="View my résumé (opens in a new tab)">
              <span>View My Resume</span><ArrowIcon />
            </a>
            <a className={`${styles.action} ${styles.brandAction}`} href={BRAND_KIT_URL} target="_blank" rel="noopener noreferrer" aria-label="View my brand kit (opens in a new tab)">
              <span aria-hidden="true">✦</span><span>View My Brand Kit</span><ArrowIcon />
            </a>
          </div>
          <p className={styles.handNote}>Good work tells a story.<br />My résumé fills in the details. <span aria-hidden="true">☺</span></p>
        </div>

        <div className={styles.art} aria-label="Illustrated résumé preview with experience, education, projects, and skills">
          <div className={styles.paperGlow} aria-hidden="true" />
          <span className={`${styles.spark} ${styles.sparkOne}`} aria-hidden="true">✦</span>
          <span className={`${styles.spark} ${styles.sparkTwo}`} aria-hidden="true">✧</span>
          <span className={styles.sameEnergy} aria-hidden="true">Same energy.<br />More details.</span>
          <svg className={styles.curvedArrow} viewBox="0 0 90 55" aria-hidden="true"><path d="M4 4c5 26 30 42 69 33m-17-12 21 13-22 9" /></svg>

          <aside className={styles.yellowNote} aria-hidden="true">
            <span>Strategy.<br />Creativity.<br />Execution.<br /><b>All in one place.</b></span>
          </aside>

          <article className={styles.resumeSheet}>
            <span className={styles.paperClip} aria-hidden="true" />
            <div className={styles.sheetHeading}>
              <h3>Romil<br />Lodaya</h3>
              <span className={styles.nameUnderline} aria-hidden="true" />
              <p>MARKETER <b>•</b> BUILDER <b>•</b> PEOPLE PERSON</p>
            </div>
            <div className={styles.sheetRows}>
              {[
                ["▣", "Experience"],
                ["◇", "Education"],
                ["▥", "Projects"],
                ["☆", "Skills"],
                ["♡", "More..."],
              ].map(([icon, label]) => (
                <div className={styles.sheetRow} key={label}>
                  <span aria-hidden="true">{icon}</span>
                  <div><b>{label}</b><i /><i /></div>
                </div>
              ))}
            </div>
          </article>

          <aside className={styles.lavenderNote} aria-hidden="true">
            Experience<br />Skills<br />Projects<br />Education<br />&amp; more!
          </aside>
          <div className={styles.paperPlane} aria-hidden="true">➤</div>
          <svg className={styles.flightPath} viewBox="0 0 180 135" aria-hidden="true"><path d="M3 112c45 5 4-63 50-67 48-4 5 73 57 64 27-5 20-39 67-72" /></svg>
          <div className={styles.smiley} aria-hidden="true"><span>• •</span><b>⌣</b></div>
          <span className={styles.curiosity}>Curious about<br />the details?<br /><b>It’s all here!</b></span>
        </div>
      </div>
    </section>
  );
}
