import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div style={styles.container}>
      <img src={user.pfp} alt={`${user.name}'s profile`} style={styles.pfp} />
      <div style={styles.textContainer}>
        <h2 style={styles.name}>{user.name}</h2>
        <p style={styles.username}>{user.username}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '20px',  // Added padding from the top
    left: '20px', // Added padding from the left
    padding: '10px',
  },
  pfp: {
    borderRadius: '50%',
    width: '150px', // Increased size for the profile picture
    height: '150px', // Match height to width for a perfect circle
    marginBottom: '10px', // Add space between the image and text
  },
  textContainer: {
    textAlign: 'center', // Center text under the profile picture
  },
  name: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold',
  },
  username: {
    margin: 0,
    fontSize: '16px',
    color: '#888',
  },
};

export default UserProfile;
