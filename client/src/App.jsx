// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import UserProfile from './components/Profile/UserProfile';
import PlatformCard from './components/Profile/PlatformCard';
import RatingChart from './components/Profile/RatingChart';
import { fetchCodeforcesData, prepareChartData, fetchPlatformRatings } from './components/Profile/CodeforcesAPI';

function App() {
  const [ratingHistory, setRatingHistory] = useState([]);
  const [graphUsername, setGraphUsername] = useState('Chef-KTK');

  const [platforms, setPlatforms] = useState([
    { name: 'LeetCode', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png', username: 'johndoe123', rating: 1500, solved: 250 },
    { name: 'CodeChef', logo: 'https://user-images.githubusercontent.com/63710339/185728318-0b976716-4f78-4a0a-a377-1643cc18a57e.png', username: 'chefmaster99', rating: 1700, solved: 300 },
    { name: 'Codeforces', logo: 'https://img.icons8.com/?size=160&id=jldAN67IAsrW&format=png', username: graphUsername, rating: null, solved: null },
    { name: 'GeeksForGeeks', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/GeeksforGeeks.svg/640px-GeeksforGeeks.svg.png', username: 'geekcoder', rating: 1400, solved: 150 },
  ]);

  const user = {
    pfp: 'https://avatars.githubusercontent.com/u/71320858?v=4',
    name: 'Tanish Bhamare',
    username: 'Tanish2207',
  };

  useEffect(() => {
    fetchCodeforcesData(graphUsername).then(data => setRatingHistory(data));
  }, [graphUsername]);


  const chartData = prepareChartData(ratingHistory, graphUsername);

  return (
    <div>
      <UserProfile user={user} />
      {ratingHistory.length > 0 ? (
        <RatingChart chartData={chartData} />
      ) : (
        <p>Loading data...</p>
      )}
      <div className="platforms-container">
        {platforms.map((platform, index) => (
          <PlatformCard key={index} platform={platform} />
        ))}
      </div>
    </div>
  );
}

export default App;
