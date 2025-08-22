import React, { useState, useEffect } from 'react';
import styles from './RocketAnimation.module.css';

const RocketAnimation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Handle rocket click - make it fly to top
  const handleRocketClick = () => {
    if (isFlying) return; // Prevent multiple clicks
    
    setIsFlying(true);
    
    // Use a more direct scroll method that won't conflict with video scrubbing
    const scrollToTop = () => {
      const startPosition = window.pageYOffset;
      const startTime = performance.now();
      const duration = 1000; // Match the CSS animation duration (1s)
      
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use ease-in-out function for smooth animation
        const easeProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        const newPosition = startPosition * (1 - easeProgress);
        window.scrollTo(0, newPosition);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          // Scroll complete, hide rocket after animation
          setTimeout(() => {
            setIsFlying(false);
            setIsVisible(false);
          }, 100);
        }
      };
      
      requestAnimationFrame(animateScroll);
    };
    
    scrollToTop();
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className={`${styles.backToTop} ${isFlying ? styles.flying : ''}`}>
          <div className={styles.rocketContainer}>
            <div className={styles.window}>
              <div className={`${styles.burn} ${isFlying ? styles.burnFlying : ''}`}></div>
              {isFlying && (
                <>
                  <div className={styles.longExhaust}></div>
                  <div className={styles.exhaustTrail1}></div>
                  <div className={styles.exhaustTrail2}></div>
                  <div className={styles.exhaustTrail3}></div>
                  <div className={styles.exhaustParticle1}></div>
                  <div className={styles.exhaustParticle2}></div>
                  <div className={styles.exhaustParticle3}></div>
                  <div className={styles.exhaustParticle4}></div>
                  <div className={styles.exhaustParticle5}></div>
                </>
              )}
              <div className={styles.spaceShuttle}>
                <div 
                  className={styles.orbiter}
                  onClick={handleRocketClick}
                >
                  <div className={styles.orbiterWindow}></div>
                  <div className={`${styles.orbiterWing} ${styles.orbiterWingLeft}`}></div>
                  <div className={`${styles.orbiterWing} ${styles.orbiterWingRight}`}></div>
                  <div className={`${styles.orbiterFin} ${styles.orbiterFinLeft}`}></div>
                  <div className={`${styles.orbiterFin} ${styles.orbiterFinRight}`}></div>
                </div>
                <div 
                  className={styles.rocket}
                  onClick={handleRocketClick}
                >
                  <div className={`${styles.rocketBooster} ${styles.rocketBoosterLeft}`}></div>
                  <div className={`${styles.rocketBooster} ${styles.rocketBoosterRight}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RocketAnimation;
