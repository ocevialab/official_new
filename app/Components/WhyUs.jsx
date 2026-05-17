"use client";
import styles from "../styles/pages.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.body}>
        <p>
          <span>Why Us</span>—At OceviaLab, we combine innovation, creativity,
          and expertise to bring your vision to life. From strategy to
          execution, we deliver tailored digital solutions that drive results
          and make an impact. With a commitment to precision and excellence,
          we&apos;re here to help you succeed.
        </p>
      </div>

      <hr className="border-t-20 border-gray-800 w-[90%] mx-auto bg-black/75" />
    </main>
  );
}
