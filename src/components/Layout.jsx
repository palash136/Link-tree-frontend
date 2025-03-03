import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; 
import styles from "../styles/dashboard.module.css";

const Layout = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* ✅ Static Sidebar */}
      <Sidebar />

      {/* ✅ Right-Side Content */}
      
      </div>
    
  );
};

export default Layout;
