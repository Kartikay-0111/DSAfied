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
  const [maxStreak, setMaxStreak] = useState(0);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const updateStreak = async (mcqsSolved, problemsSolved) => {
    const token = await getAccessTokenSilently();
    const sub = user.sub;
    try {
      await fetch(`${BASE_URL}/api/users/updateStreak`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ sub, mcqsSolved, problemsSolved }),
      });
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const handleSolve = (type) => {
    if (type === 'mcq') {
      updateStreak(1, 0);
    } else if (type === 'problem') {
      updateStreak(0, 1);
    }
  };

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
    
    fetchDailyData();
  }, [getAccessTokenSilently]);

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
            {activeTab === 1 ? <DailyProblems problemIds={problems} onSolve={() => handleSolve('problem')} /> : <MCQs onSolve={() => handleSolve('mcq')} />}
          </div>
        </div>
      </div>
      <div className="divider lg:divider-horizontal lg:divider-primary"></div>
      <div className='basis-1/4 flex flex-col align-center m-2'>
        <div className='mx-auto'>
          <MonthlyStreakTracker />
        </div>
        <div className='flex flex-col items-center'>
          <p>Current Streak: {currentStreak} days</p>
          <p>Longest Streak: {maxStreak} days</p>
        </div>
      </div>
    </div>
  );
};

export default POTD;