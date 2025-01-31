// src/components/PlatformCard.js
import React from 'react';
import PlatformLogo from './PlatformLogo';
import PlatformInfo from './PlatformInfo';

const PlatformCard = ({ platform }) => {
  return (
    <div className="platform-card">
      <PlatformInfo type="left" label={`Questions Solved: ${platform.solved}`} />
      {/* <PlatformLogo logo={platform.logo} /> */}
      <PlatformInfo type="right" label={`Rating: ${platform.rating ? platform.rating : platform.currentRating}`} />
    </div>
  );
};

export default PlatformCard;
