import React, { useState, useEffect } from 'react';
import './App.css';
import UserProfile from './components/Profile/UserProfile';
import PlatformCard from './components/Profile/PlatformCard';
import RatingChart from './components/Profile/RatingChart';

function App() {
  // **** GRID ****
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
  // **** END GRID ****
  
  // **** LEFT PANE ****
  const user = {
    pfp: 'https://avatars.githubusercontent.com/u/71320858?v=4',
    name: 'Tanish Bhamare',
    username: 'Tanish2207',
  };
  // **** END LEFT PANE ****

  // **** Codeforces API ****
  const [ratingHistory, setRatingHistory] = useState([]);
  const [username, setUsername] = useState('Chef-KTK'); // Replace with the desired username

  // Function to format timestamp to a readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString(); // Use default locale to format the date
  };

  // Fetch data from Codeforces API
  useEffect(() => {
      const fetchUserData = async () => {
        const response = await fetch(`https://codeforces.com/api/user.rating?handle=${username}`);
        const data = await response.json();
        
        if (data.status === 'OK') {
            setRatingHistory(data.result);
        } else {
            console.error('Error fetching data:', data);
        }
      };
        
        fetchUserData();
    }, [username]); // Run only when the username changes

  // Prepare the data for the chart
  const chartData = {
      title: `${username}'s Rating Progress`,
      labels: ratingHistory.map(entry => formatDate(entry.ratingUpdateTimeSeconds)), // Convert contest timestamp to readable date
      datasets: [
          {
              label: 'Rating',
              data: ratingHistory.map(entry => entry.newRating), // Ratings for each contest
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.4
          }
      ]
  };
  // **** END Codeforces API ****

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
