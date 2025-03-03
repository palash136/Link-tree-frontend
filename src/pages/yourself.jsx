import styles from '../styles/yourself.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Yourself() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { icon: '💼', label: 'Business' },
    { icon: '🎨', label: 'Creative' },
    { icon: '📚', label: 'Education' },
    { icon: '🎮', label: 'Entertainment' },
    { icon: '💄', label: 'Fashion & Beauty' },
    { icon: '🍽️', label: 'Food & Beverage' },
    { icon: '🏛️', label: 'Government & Politics' },
    { icon: '❤️', label: 'Health & Wellness' },
    { icon: '🤝', label: 'Non-Profit' },
    { icon: '💻', label: 'Tech' },
    { icon: '✈️', label: 'Travel & Tourism' },
    { icon: '✨', label: 'Other' }
  ];

  const handleCategorySelect = (label) => {
    setSelectedCategory(label);
  };

  const handleContinue = () => {
    if (selectedCategory) {
      alert(`You selected: ${selectedCategory}`);
      navigate('/dashboard'); 
    } else {
      alert('Please select a category.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.topLeftContainer}>
          <img src="/assets/Group.png" alt="Group" className={styles.logo} />
          <h1 className={styles.sparkText}>SPARK</h1>
        </div>

        <div className={styles.formContainer}>
          <h1 className={styles.title}>Tell us about yourself</h1>
          <p className={styles.subtitle}>For a personalized Spark experience</p>

          <input
            type="text"
            placeholder="Tell us your username"
            className={styles.input}
          />

          <p className={styles.categoryLabel}>Select one category that best describes your LinkTree:</p>
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <button
                key={category.label}
                className={`${styles.categoryButton} ${selectedCategory === category.label ? styles.selected : ''}`}
                onClick={() => handleCategorySelect(category.label)}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryText}>{category.label}</span>
              </button>
            ))}
          </div>

          <button className={styles.continueButton} onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>

      <div className={styles.rightContainer}>
        <img src="/assets/Frame.png" alt="Frame" className={styles.image} />
      </div>
    </div>
  );
}
