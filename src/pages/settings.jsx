import React, { useState, useEffect } from "react";
import { getUser, updateUserProfile } from "../services/index";
import styles from "../styles/settings.module.css";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",  // ✅ Use a single field for Name
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Fetch user data on component mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser(localStorage.getItem("token"));
        setFormData({
          name: userData.name || "",  
          email: userData.email || "",
          password: "",
          confirmPassword: ""
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.settingsTitle}>Edit Profile</h2>
      <form className={styles.settingsForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name</label>  {/* ✅ Combined First & Last Name */}
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <button type="submit" className={styles.saveButton}>Save</button>
      </form>
    </div>
  );
};

export default Settings;
