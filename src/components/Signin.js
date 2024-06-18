import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    // Example with state
    navigate('/home', { state: { college: 'Some College' } });
    // Uncomment and use the following code for actual sign-in logic
    /*
    try {
      setError(null);
      const response = await axios.post('http://172.20.10.3:9091/signin', {
        username,
        password
      });
      const { college } = response.data;
      navigate('/home', { state: { college } });
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in. Please try again.');
    }
    */
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.signInText}>Sign In</h1>
        <div style={styles.form}>
          <label style={styles.label}>Username</label>
          <input
            style={{ ...styles.input, ...(error ? styles.inputError : null) }}
            placeholder="Enter Your EmailId"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label style={styles.label}>Password</label>
          <div style={{ ...styles.passwordInputContainer, ...(error ? styles.inputError : null) }}>
            <input
              style={{ ...styles.passwordInput, ...(error ? styles.inputError : null) }}
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
            />
            <button onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              {showPassword ? <IoEyeOff size={24} /> : <IoEye size={24} />}
            </button>
          </div>

          {error && <p style={styles.errorMessage}>{error}</p>}
          
          <button onClick={handleSignIn} style={styles.loginButton}>Login</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    backgroundImage: `url(https://mis.skct.edu.in/assets/images/skibudget/singin.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  signInText: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
    marginBottom: '8px',
  },
  input: {
    height: '20px',
    width: '94%',
    border: '1px solid #ccc',
    marginBottom: '20px',
    marginRight: '20px',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  passwordInputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  passwordInput: {
    flex: 1,
    width: '94%',
    height: '20px',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  eyeIcon: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0 10px',
  },
  inputError: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: '12px',
    marginBottom: '20px',
  },
  loginButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
  },
};

export default Signin;
