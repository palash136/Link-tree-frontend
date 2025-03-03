import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/index'; 
import styles from '../styles/login.module.css';

export default function Login() {
    const navigate = useNavigate();
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/login");
        }
    }, [navigate]);

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const loginHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await login(formData);  // ✅ Correct API call

            toast.success("Login successful");
            localStorage.setItem("token", data.token);
            navigate("/yourself");
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error.message || "Something went wrong");
        }

        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <div className={styles.leftContainer}>
                <div className={styles.topLeftContainer}>
                    <img src="/assets/Group.png" alt="Group" className={styles.logo} />
                    <h1 className={styles.sparkText}>SPARK</h1>
                </div>

                <div className={styles.signInContainer}>
                    <h1 className={styles.signInText}>Sign in to your Spark</h1>

                    <form className={styles.signInForm} onSubmit={loginHandler}>
                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                placeholder="Email"
                                className={styles.inputField}
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                placeholder="Password"
                                className={styles.inputField}
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button type="submit" className={styles.signInButton} disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Log in"}
                        </button>

                        <div className={styles.forgotPassword}>
                            <a href="/forgot-password">Forgot password?</a>
                        </div>

                        <p className={styles.signUpPrompt}>
                            Don't have an account?{" "}
                            <span className={styles.signUpLink} onClick={() => navigate('/register')}>
                                Sign up
                            </span>
                        </p>
                    </form>
                </div>
            </div>

            <div className={styles.rightContainer}>
                <img src="/assets/Frame.png" alt="Frame" className={styles.image} />
            </div>
        </div>
    );
}
