import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAuth0 } from '@auth0/auth0-react';
import { CalendarDays } from "lucide-react";

const MonthlyStreakTracker = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [streakData, setStreakData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
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
        setStreakData(data.potdStreak || []);
      } catch (error) {
        console.error('Error fetching streak data:', error);
      }
    };
    fetchStreakData();
  }, [getAccessTokenSilently]);

  const getDaysInMonth = () => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const days = [];
    
    for (let i = 0; i < startOfMonth.day(); i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= endOfMonth.date(); i++) {
      days.push(startOfMonth.date(i));
    }
    return days;
  };

  const getStreakDataForDate = (date) => {
    if (!date) return null;
    const dateString = date.format("YYYY-MM-DD");
    return streakData.find(entry => 
      dayjs(entry.date).format("YYYY-MM-DD") === dateString
    );
  };

  const getColorIntensity = (streakData) => {
    if (!streakData) return "bg-gray-700";
    const totalSolved = streakData.mcqsSolved + streakData.problemsSolved;
    if (totalSolved === 0) return "bg-gray-700";
    if (totalSolved === 1) return "bg-green-600";
    if (totalSolved === 2) return "bg-green-500";
    return "bg-green-400";
  };

  const days = getDaysInMonth();

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-md w-full max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setCurrentMonth(curr => curr.subtract(1, "month"))}
          className="btn btn-ghost btn-sm"
        >
          ←
        </button>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <CalendarDays size={20} />
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button 
          onClick={() => setCurrentMonth(curr => curr.add(1, "month"))}
          className="btn btn-ghost btn-sm"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold text-sm">
            {day}
          </div>
        ))}
        
        {days.map((date, index) => {
          const data = getStreakDataForDate(date);
          const isFutureDate = date && date.isAfter(dayjs(), "day");
          const isToday = date && date.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
          
          return (
            <div
              key={index}
              className={`
                h-8 w-8 flex items-center justify-center rounded-full
                ${date ? (isFutureDate ? "bg-gray-800" : getColorIntensity(data)) : ""}
                ${isToday ? "ring-2 ring-blue-500" : ""}
                transition-colors duration-200
              `}
              title={data ? 
                `MCQs: ${data.mcqsSolved}, Problems: ${data.problemsSolved}` : 
                "No activity"
              }
            >
              <span className={`text-sm ${isToday ? "font-bold" : ""}`}>
                {date?.date() || ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyStreakTracker;