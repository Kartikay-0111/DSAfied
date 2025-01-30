import React from 'react';
// import './UserProfile.css';

const UserProfile = ({ user }) => {
  return (
    <div className="container">
      <img src={user.pfp} alt={`${user.name}'s profile`} className="pfp" />
      <div className="textContainer">
        <h2 className="name">{user.name}</h2>
        <p className="username">{user.username}</p>
      </div>
    </div>
  );
};

export default UserProfile;
