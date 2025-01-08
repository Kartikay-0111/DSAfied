import React from 'react';
import './App.css';
import PlatformCard from './components/PlatformCard';

function App() {
  // Placeholder data for each platform
  const platforms = [
    {
      name: 'LeetCode',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png',
      username: 'johndoe123',
      rating: 1500,
      solved: 250, // Placeholder for solved questions
    },
    {
      name: 'CodeChef',
      logo: 'https://user-images.githubusercontent.com/63710339/185728318-0b976716-4f78-4a0a-a377-1643cc18a57e.png',
      username: 'chefmaster99',
      rating: 1700,
      solved: 300, // Placeholder for solved questions
    },
    {
      name: 'Codeforces',
      logo: 'https://img.icons8.com/?size=160&id=jldAN67IAsrW&format=png',
      username: 'cf_expert',
      rating: 1600,
      solved: 200, // Placeholder for solved questions
    },
    {
      name: 'GeeksForGeeks',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/GeeksforGeeks.svg/640px-GeeksforGeeks.svg.png',
      username: 'geekcoder',
      rating: 1400,
      solved: 150, // Placeholder for solved questions
    },
  ];

  return (
    <div className="platforms-container">
      {platforms.map((platform, index) => (
        <PlatformCard key={index} platform={platform} />
      ))}
    </div>
  );
}

export default App;
