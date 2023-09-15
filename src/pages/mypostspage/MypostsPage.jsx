import React from "react";
import styles from "./MypostsPage.module.css";
import Myposts from "../myposts/Myposts";
import Sidebar from "../../components/sidebar/Sidebar";

export default function MypostsPage() {
  return (
    <div className={styles.posts}>
      <Myposts />
      <Sidebar />
    </div>
  );
}
