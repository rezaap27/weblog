import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Categories from "../components/categories/Categories";
import Styles from "./categoriesHome.module.css";

export default function CategoriesHome() {
  return (
    <div className={Styles.home}>
      <Categories />
      <Sidebar />
    </div>
  );
}
