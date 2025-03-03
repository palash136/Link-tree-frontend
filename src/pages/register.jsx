import styles from '../styles/register.module.css';
import { register } from '../services/index';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Submitting Data:", formData); 

    try {
      const response = await register(formData);
    

      toast.success("Registration successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login"); 
      }, 2500);

    } catch (error) {
      toast.error("Registration failed! Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <ToastContainer /> {/* Toast notifications container */}

      <div className={styles.leftContainer}>
        <div className={styles.topLeftContainer}>
          <img src="/assets/Group.png" alt="Group" className={styles.logo} />
          <h1 className={styles.sparkText}>SPARK</h1>
        </div>

        <div className={styles.signInContainer}>
          <h1 className={styles.signInText}>Sign up for Spark</h1>
          <p>Create an account</p>

          <form className={styles.form} onSubmit={registerHandler}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                value={formData.firstname}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="agree"
                name="agree"
                required
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="agree">
                By creating an account, I agree to the <span>Terms of Use</span> and <span>Privacy Policy</span>.
              </label>
            </div>

            <button className={styles.submitButton} type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create an Account"}
            </button>
          </form>
        </div>
      </div>

      <div className={styles.rightContainer}>
        <img src="/assets/Frame.png" alt="Frame" className={styles.image} />
      </div>
    </div>
  );
}

