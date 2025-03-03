import { Link, useLocation, Outlet } from "react-router-dom";
import styles from "../styles/dashboard.module.css";
import React, { useState, useEffect } from "react";
import { getUser } from "../services/index";
import { useProfile } from "../context/ProfileContext";

export default function DashboardPage() {
  const { profileImage, links } = useProfile();
  const [userName, setUserName] = useState("Loading...");
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("link");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUserName("Guest");
        return;
      }

      try {
        const user = await getUser(token);
        setUserName(user?.name || "Unknown User");
      } catch (error) {
        setUserName("Guest");
      }
    };

    fetchUserData();
  }, []);

  // ✅ Hide phone preview in Settings & Analytics
  const hidePhonePreview = location.pathname.includes("settings") || location.pathname.includes("analytics");

  return (
    <div className={styles.dashboardContainer}>
      {/* ✅ Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img src="/assets/Group.png" alt="Group" className={styles.logo} />
          <h1 className={styles.sparkText}>SPARK</h1>
        </div>
        <nav>
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${location.pathname === "/dashboard" ? styles.active : ""}`}>
              <Link to="/dashboard">Links</Link>
            </li>
            <li className={`${styles.navItem} ${location.pathname === "/dashboard/appearance" ? styles.active : ""}`}>
              <Link to="/dashboard/appearance">Appearance</Link>
            </li>
            <li className={`${styles.navItem} ${location.pathname === "/dashboard/analytics" ? styles.active : ""}`}>
              <Link to="/dashboard/analytics">Analytics</Link>
            </li>
            <li className={`${styles.navItem} ${location.pathname === "/dashboard/settings" ? styles.active : ""}`}>
              <Link to="/dashboard/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.username}>{userName}</div>
      </div>

      {/* ✅ Middle Content */}
      <div className={styles.mainContent}>
        <Outlet />
      </div>

      {/* ✅ Conditionally Render Mobile Phone Preview */}
      {!hidePhonePreview && (
        <div className={styles.phoneContainer}>
          <div className={styles.phoneFrame}>
            {/* 🟤 Top 40% Brown Background */}
            <div className={styles.topBackground}>
              <div className={styles.profileImage}>
                <img src={profileImage || "https://via.placeholder.com/150"} alt="Profile" className={styles.profilePic} />
              </div>
            </div>

            {/* 📌 White Bottom Section */}
            <div className={styles.bottomSection}>
              <h2 className={styles.profileName}>{userName}</h2>

              {/* 🔘 Toggle Buttons */}
              <div className={styles.pillButtons}>
                <button className={`${styles.pillButton} ${activeTab === "link" ? styles.active : ""}`} onClick={() => setActiveTab("link")}>
                  Link
                </button>
                <button className={`${styles.pillButton} ${activeTab === "shop" ? styles.active : ""}`} onClick={() => setActiveTab("shop")}>
                  Shop
                </button>
              </div>

              {/* 📌 Dynamically Rendered Links */}
              <div className={styles.linkButtons}>
                {links.length > 0 ? (
                  links.map((link, index) => (
                    <button key={index} className={styles.linkButton}>
                      <img src="/assets/link-icon.png" alt="Link" className={styles.icon} />
                      {link.title}
                    </button>
                  ))
                ) : (
                  <p className={styles.noLinks}>No links added yet</p>
                )}
              </div>

              {/* 🟢 "Get Connected" Button */}
              <button className={styles.getConnectedButton}>Get Connected</button>

              {/* ⚡ Branding */}
              <div className={styles.branding}>SPARK</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
