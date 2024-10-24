import React from 'react';
import { FaGithub, FaLinkedin, FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  // Define styles as an object
  const styles = {
    formContainer: {
      backgroundColor: '#222',
      borderRadius: '15px',
      padding: '40px',
      width: '350px',
      margin: '0 auto',
      color: '#fff',
      textAlign: 'center',
    },
    input: {
      display: 'block',
      width: '100%',
      marginBottom: '15px',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      outline: 'none',
      fontSize: '14px',
    },
    submitBtn: {
      backgroundColor: '#6B92A4',
      color: '#fff',
      border: 'none',
      padding: '15px',
      width: '100%',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center', // Center alignment
      alignItems: 'center',
      marginTop: '20px',
      gap: '20px', // Increased gap for better spacing
    },
    iconWrapper: {
      display: 'inline-block',
      width: '40px', // Consistent width for each icon
      height: '40px',
      textAlign: 'center', // Center icon within the wrapper
    },
    icon: {
      color: '#fff',
      fontSize: '24px',
      cursor: 'pointer',
      transition: 'color 0.3s',
      width: '100%', // Ensure the icon fills the wrapper
    },
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #1a6ef4 0%, #080808 100%)' }}>
      <div style={styles.formContainer}>
        <h2>Log in</h2>
        <div>
          <input type="email" style={styles.input} placeholder="Email" />
          <input type="password" style={styles.input} placeholder="Password" />
        </div>
        <button
          style={styles.submitBtn}
        >
          Log in
        </button>

        {/* Icons Section */}
        <div style={styles.iconContainer}>
          <div style={styles.iconWrapper}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub style={styles.icon} />
            </a>
          </div>
          <div style={styles.iconWrapper}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin style={styles.icon} />
            </a>
          </div>
          <div style={styles.iconWrapper}>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
              <FaGoogle style={styles.icon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;