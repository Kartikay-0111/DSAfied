import React, { useEffect, useState } from 'react';
import Countdown from './countdown';
import MCQs from './MCQ';
import MonthlyStreakTracker from './calendar';
import { useAuth0 } from '@auth0/auth0-react';
import DailyProblems from './Problem';

const POTD = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [problems, setProblems] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [streakData, setStreakData] = useState([]);
  const [maxStreak, setMaxStreak] = useState(0);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchDailyData = async () => {
      const token = await getAccessTokenSilently();
      try {
        const response = await fetch(`${BASE_URL}/api/potd/problems`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = await response.json();
        setProblems(data.problems || []);
      } catch (error) {
        console.error('Error fetching daily data:', error);
      }
    };
    const fetchStreakData = async () => {
      const token = await getAccessTokenSilently();
      try {
        const response = await fetch(`${BASE_URL}/api/users/streak`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = await response.json();
        // console.log(data);
        setStreakData(data.streak || []);
        setMaxStreak(data.maxStreak || 0);
        setCurrentStreak(data.currentStreak || 0);
      } catch (error) {
        console.error('Error fetching streak data:', error);
      }
    };
    fetchStreakData();
    fetchDailyData();
  }, [getAccessTokenSilently]);
  // console.log(streakData);
  return (
    <div className='flex flex-col justify-center min-h-screen bg-slate-900 lg:flex-row'>
      <div className='basis-3/4'>
        <div className='flex justify-around max-h-10 p-2'>
          <h1 className='text-3xl '>Problem of the Day</h1>
          <div><Countdown /></div>
        </div>
        <div className='flex flex-col justify-center'>
          <div className="flex justify-center gap-6 m-8 lg:w-3/6 sm:w-5/6 rounded-full p-2 mx-auto bg-white">
            <button className={`btn btn-outline rounded-full w-1/3 ${activeTab === 1 ? 'bg-blue-800 text-white' : 'text-black'}`} onClick={() => setActiveTab(1)}>Code Problems</button>
            <button className={`btn btn-outline rounded-full w-1/3 ${activeTab === 2 ? 'bg-blue-800 text-white' : 'text-black'}`} onClick={() => setActiveTab(2)}>MCQs</button>
          </div>
          <div className='flex flex-col justify-center'>
            {activeTab === 1 ? <DailyProblems problemIds={problems} /> : <MCQs />}
          </div>
        </div>
      </div>
      <div className="divider lg:divider-horizontal lg:divider-primary"></div>
      <div className='basis-1/4 flex flex-col align-center m-2'>
        <div className='mx-auto'>
          <MonthlyStreakTracker streakData={streakData} />
        </div>
        <div className="flex mt-3 flex-col items-center bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-lg shadow-lg text-white">
          <p className="text-xl font-semibold">🔥 Current Streak: <span className="font-bold text-yellow-300">{currentStreak}</span> days</p>
          <p className="text-xl font-semibold mt-2">🏆 Longest Streak: <span className="font-bold text-green-300">{maxStreak}</span> days</p>
        </div>

      </div>
    </div>
  );
};

export default POTD;