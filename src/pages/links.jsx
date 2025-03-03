import React, { useRef, useState } from "react";
import { Camera, X, Trash, Pencil } from "lucide-react";
import styles from "../styles/links.module.css";
import { useProfile } from "../context/ProfileContext";

const applications = [
  { name: "Instagram", icon: "/assets/instagram.png" },
  { name: "Facebook", icon: "/assets/facebook.png" },
  { name: "YouTube", icon: "/assets/youtube.png" },
  { name: "X", icon: "/assets/twitter.png" },
];

export default function ProfilePage() {
  const { profileImage, setProfileImage, links, setLinks, handleDeleteLink } = useProfile();
  const fileInputRef = useRef(null);
  const [bio, setBio] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("link");

  // Handle Save Link
  const handleSaveLink = () => {
    if (!linkTitle || !linkUrl) return;
    
    const newLink = { id: Date.now(), title: linkTitle, url: linkUrl, enabled };
    setLinks([...links, newLink]); // Update links state
    
    setLinkTitle("");
    setLinkUrl("");
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      {/* Profile Section */}
      <div className={styles.profileContainer}>
        <h1 className={styles.profileHeader}>Profile</h1>
        <div className={styles.profileContent}>
          <div className={styles.profileTopSection}>
            <div className={styles.profileImageContainer}>
              <div className={styles.profileImage}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
                ) : (
                  <div className={styles.profilePlaceholder}>
                    <Camera size={32} />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.profileButtons}>
              <button className={styles.btnPrimary} onClick={() => fileInputRef.current?.click()}>
                Pick an Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => setProfileImage(URL.createObjectURL(e.target.files[0]))}
                accept="image/*"
                className={styles.hiddenInput}
              />
              {profileImage && (
                <button className={styles.btnSecondary} onClick={() => setProfileImage(null)}>
                  Remove
                </button>
              )}
            </div>
          </div>
          <div className={styles.profileForm}>
            <div className={styles.formGroup}>
              <label htmlFor="profile-title">Profile Title</label>
              <input type="text" id="profile-title" className={styles.formControl} placeholder="@your_username" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="profile-bio">Bio</label>
              <textarea
                id="profile-bio"
                className={styles.formControl}
                rows="3"
                value={bio}
                onChange={(e) => {
                  if (e.target.value.length <= 80) setBio(e.target.value);
                }}
                placeholder="Tell us about yourself..."
              />
              <div className={`${styles.characterCount} ${bio.length > 80 ? styles.exceeded : ""}`}>
                {bio.length} / 80
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Link Button */}
      <div className={styles.actionContainer}>
        {/* Toggle Tabs */}
        <div className={styles.pillButtons}>
          <button
            className={`${styles.pillButton} ${activeTab === "link" ? styles.active : ""}`}
            onClick={() => setActiveTab("link")}
          >
            Links
          </button>
          <button
            className={`${styles.pillButton} ${activeTab === "shop" ? styles.active : ""}`}
            onClick={() => setActiveTab("shop")}
          >
            Shop
          </button>
        </div>

        {/* Add Button */}
        <button className={styles.addButton} onClick={() => setShowModal(true)}>
          <span className={styles.plusIcon}>+</span> Add {activeTab === "link" ? "Link" : "Product"}
        </button>

        {/* Display Links Below Add Button */}
        {links.length > 0 && (
          <div className={styles.linksList}>
            {links.map((link, index) => (
              <div key={index} className={styles.linkItem}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
                <button onClick={() => handleDeleteLink(link.id)} className={styles.deleteButton}>
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Banner Section - Adjusted to Match Width */}
      <div className={styles.bannerSection}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerPreview}>
            <div className={styles.bannerTop}>
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className={styles.bannerProfilePic}
              />
            </div>
            <h2 className={styles.bannerUsername}>@username</h2>
            <p className={styles.bannerHandle}>/username</p>
          </div>

          {/* Custom Background Color Selection */}
          <div className={styles.backgroundColorPicker}>
            <p>Custom Background Color</p>
            <div className={styles.colorOptions}>
              <button className={styles.colorOption} style={{ backgroundColor: "#3B2F2F" }}></button>
              <button className={styles.colorOption} style={{ backgroundColor: "#F5F5F5" }}></button>
              <button className={styles.colorOption} style={{ backgroundColor: "#000000" }}></button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Link Popup */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <h2>Add New Link</h2>

            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Link Title"
                className={styles.modalInput}
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
              />
              <Pencil className={styles.inputIcon} />
            </div>

            {/* Toggle Button */}
            <label className={styles.toggleSwitch}>
              <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} />
              <span className={styles.slider}></span>
            </label>

            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Link URL"
                className={styles.modalInput}
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <Pencil className={styles.inputIcon} />
            </div>

            {/* Applications Section */}
            <h4 className={styles.applicationsTitle}>Applications</h4>
            <div className={styles.appsGrid}>
              {applications.map((app) => (
                <div key={app.name} className={styles.app}>
                  <img src={app.icon} alt={app.name} />
                  <p>{app.name}</p>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <button className={styles.saveButton} onClick={handleSaveLink}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
