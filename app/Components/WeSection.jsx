"use client";

import styles from "../styles/pages.module.css";

export default function Home() {
  return (
    <>
      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />

      <main className={styles.main}>
        <div className={styles.body}>
          <p>
            We Are <span>OceviaLab</span>—innovative, dynamic, and
            results-driven. We specialize in{" "}
            <span>web design & development</span>,{" "}
            <span>mobile apps</span>,{" "}
            <span>management systems</span>,{" "}
            <span>IT & digital solutions</span>,{" "}
            <span>SEO</span>,{" "}
            <span>digital marketing</span>, and{" "}
            <span>branding & identity</span>. Our mission
            is to turn ideas into engaging digital experiences. From strategy to
            execution, we deliver with creativity and precision. We work
            thoughtfully, creatively, and passionately.
          </p>
        </div>
      </main>

      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />
    </>
  );
}
