import { useNavigate } from "react-router-dom";
import styles from "../styles/landingpage.module.css";

function landingpage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span>
            <img src="/assets/Group.png" alt="logopng" />
          </span>
          <span className={styles.entryTitle}>SPARK™|</span>
          <span className={styles.marketplace}>Marketplace</span>
        </div>
        <button className={styles.signupBtn} onClick={() => navigate("/login")}>
          Sign up free
        </button>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            The easiest place to <br /> update and share your {" "}
            <span>Connection</span>
          </h1>
          <p>
            Help your followers discover everything you’re sharing all over the
            internet, in one simple place.
          </p>
          <button className={styles.ctaBtn} onClick={() => navigate("/login")}>
            Get your free Spark
          </button>
        </div>
        <div className={styles.heroImg}>
          <img src="/assetes/Analytics 1.png" alt="Analytics" />
        </div>
      </section>

      {/* Analytics Section */}
      <section className={styles.analytics}>
        <div className={styles.analyticsImg}>
          <img src="/assets/Analytics 2.png" alt="Analytics" />
        </div>
        <div className={styles.analyticsCard}>
          <h3>Analyze your audience and keep your followers engaged</h3>
          <p>
            Track your engagement over time, monitor revenue and learn what's
            converting your audience. Make informed updates on the fly to keep
            them coming back.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.content}>
        <div className={styles.contentText}>
          <h2>Share limitless content in limitless ways</h2>
          <p>
            Connect your content in all its forms and help followers find more
            of what they're looking for. Your TikToks, Tweets, YouTube videos,
            music, articles, recipes, podcasts, and more... It all comes
            together in one powerful place.
          </p>
        </div>
        <div className={styles.contentCard}>
          <img src="/assets/contentimg.png" alt="Contentimg" />
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerUpper}>
          <div className={styles.footerButtons}>
            <button className={styles.loginBtn} onClick={() => navigate("/login")}>
              Log in
            </button>
            <button className={styles.signupBtn} onClick={() => navigate("/login")}>
              Sign up free
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default landingpage;
