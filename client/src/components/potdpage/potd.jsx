import React from 'react'
import Countdown from './countdown'
import Problem from '../Problem';
import MCQ from './MCQ';
import MonthlyStreakTracker from './calendar';

const POTD = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  return (
    <div className='flex flex-col justify-center lg:h-screen bg-slate-900 lg:flex-row'>
      <div className='basis-3/4'>
        <div className='flex justify-around max-h-10 p-2'>
          <h1 className='text-3xl '>Problem of the day</h1>
          <div><Countdown /></div>
        </div>
        <div className='flex flex-col justify-center'>
          <div className="flex justify-center gap-6 m-8 lg:w-3/6 sm:w-5/6 rounded-full p-2 mx-auto bg-white">
            <button className={`btn btn-outline rounded-full w-1/3 ${activeTab === 1 ? 'bg-blue-500 text-white' : ''}`} onClick={() => { setActiveTab(1) }}>Code Problems</button>
            <button className={`btn btn-outline rounded-full w-1/3 ${activeTab === 2 ? 'bg-blue-500 text-white' : ''}`} onClick={() => { setActiveTab(2) }}>MCQs</button>
          </div>
          <div className='flex flex-col justify-center'>
            {activeTab==1 ? <Problem /> : <MCQ />}
          </div>
        </div>
      </div>
      <div className="divider lg:divider-horizontal lg:divider-primary"></div>
      <div className='basis-1/4 flex flex-col align-center m-2'>
        <div className='mx-auto'>
          <MonthlyStreakTracker />
        </div>
        <div className='flex flex-col items-center'>
            <p>Current Streak:7 days</p>
            <p>Longest Streak:45 days</p>
            <button className='btn btn-info w-full mt-2'><a href="/concept-of-the-day">Concept of the Day</a></button>
        </div>
      </div>
    </div>
  )
}

export default POTD