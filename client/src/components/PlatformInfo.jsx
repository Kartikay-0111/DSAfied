// src/components/PlatformInfo.js
import React from 'react';

const PlatformInfo = ({ type, label }) => {
  return (
    <div className={`platform-info ${type}`}>
      <h4>{label}</h4>
    </div>
  );
};

export default PlatformInfo;
