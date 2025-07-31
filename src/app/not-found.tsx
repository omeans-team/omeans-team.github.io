import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      {/* Simple Background */}
      <div className={styles.background}></div>

      {/* Moon Animation */}
      <div className={styles.row}>
        <span>4</span>
        <div className={styles.canvas}>
            <div className={styles.moon}></div>
        </div>
        <span>4</span>
      </div>

      {/* Star Animation */}
      <div className={styles.star}></div>

      {/* Meteor Elements */}
      <div className={styles.meteor1}></div>
      <div className={styles.meteor2}></div>
      <div className={styles.meteor3}></div>
      <div className={styles.meteor4}></div>
      <div className={styles.meteor5}></div>
      <div className={styles.meteor6}></div>
      <div className={styles.meteor7}></div>
      <div className={styles.meteor8}></div>
      <div className={styles.meteor9}></div>
      <div className={styles.meteor10}></div>
      <div className={styles.meteor11}></div>
      <div className={styles.meteor12}></div>
      <div className={styles.meteor13}></div>
      <div className={styles.meteor14}></div>
      <div className={styles.meteor15}></div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.content}>

          {/* Error Message */}
          <div className={styles.errorMessage}>
            <h2>Oops! Page Not Found</h2>
            <p>
              The page you&apos;re looking for doesn&apos;t exist or has been moved to another dimension.
              <br />
              <span>Let&apos;s get you back on track.</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <Link href="/" className={styles.homeButton}>
              GO HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 