import styles from "./header.module.css";
import img from "../../assist/images/header.jpg";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitles}>
        <span className={styles.headerTitleSm}>React & Node</span>
        <span className={styles.headerTitleLg}>BLOG</span>
      </div>
      <img className={styles.headerImg} src={img} alt="not found" />
    </div>
  );
}
