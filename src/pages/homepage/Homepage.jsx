import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./homepage.module.css";

export default function Homepage() {
  return (
    <>
      <Header />
      <div className={styles.home}>
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}
