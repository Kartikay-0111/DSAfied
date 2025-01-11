// src/components/PlatformLogo.js
import React from 'react';

const PlatformLogo = ({ logo }) => {
  return (
    <div className="platform-info center">
      <div className="logo-circle">
        <img className="platform-logo" src={logo} alt="Platform Logo" />
      </div>
    </div>
  );
};

export default PlatformLogo;
