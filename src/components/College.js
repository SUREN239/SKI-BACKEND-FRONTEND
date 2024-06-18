import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import CustomDrawerAdmin from './CustomDrawerAdmin';
import logo from '../assets/logo.png';
import pgImage from '../assets/pg.jpeg';
import { useParams, useNavigate } from 'react-router-dom';

const College = () => {
  const { college } = useParams();
  const navigate = useNavigate(); // Use navigate hook from react-router-dom
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={toggleDrawer} style={styles.drawerIcon}>
            <MdMenu size={24} style={{ color: 'white' }} />
          </button>
          <img src="https://mis.skct.edu.in/assets/images/skibudget/logo.png" alt="Logo" style={styles.logo} />
          <h1 style={styles.title}>SRI KRISHNA INSTITUTIONS</h1>
        </div>
        <div style={styles.body}>
          <h2 style={{ ...styles.heading, fontWeight: "bold", fontSize: 24 }}>
            Welcome to {college}
          </h2>
          <div style={styles.centerbox}>
            <button
              style={styles.button}
              onClick={() => navigate('/status', { state: { college } })}
            >
              <span style={styles.buttonText}>Click Here to View Status</span>
            </button>
            <button
              style={styles.button}
              onClick={() => navigate('/consolidate', { state: { college } })}
            >
              <span style={styles.buttonText}>Click Here to View Consolidate</span>
            </button>
          </div>
          {showDrawer && (
            <div style={styles.drawer}>
              <CustomDrawerAdmin onClose={handleCloseDrawer} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(https://mis.skct.edu.in/assets/images/skibudget/pg.jpeg)`,
    backgroundSize: 'cover',
    maxWidth: '100%',
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    padding: '0 20px',
    backgroundColor: 'blue',
  },
  drawerIcon: {
    position: 'absolute',
    left: 20,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: 'white',
    zIndex: 1,
  },
  logo: {
    height: 50,
    width: 50,
    marginTop: 5,
    marginRight: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    margin: 0,
  },
  body: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    maxWidth: '100%',
    minHeight: 'calc(100vh - 80px)',
  },
  centerbox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
    padding: 30,
    width: 300,
    maxWidth: "90%",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: '10px 20px',
    marginBottom: 20,
    cursor: 'pointer',
    width: '100%',
    border: 'none',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default College;
