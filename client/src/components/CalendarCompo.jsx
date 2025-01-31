import React, { useState } from "react";

const CalendarCompo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  const previousMonthDays = (year, month) =>
    daysInMonth(year, month - 1) - firstDayOfMonth(year, month) + 1;

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = [];
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    // Previous month's days
    for (let i = 0; i < firstDay; i++) {
      days.push({
        day: previousMonthDays(year, month) + i,
        currentMonth: false,
      });
    }

    // Current month's days
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, currentMonth: true });
    }

    // Next month's days
    const nextMonthDays = 42 - days.length; // Ensure a 6x7 grid
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({ day: i, currentMonth: false });
    }

    return days;
  };

  const days = renderDays();

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-all"
        >
          &larr;
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-all"
        >
          &rarr;
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 mb-2 text-gray-400">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <div
            key={index}
            onClick={() =>
              date.currentMonth &&
              setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), date.day))
            }
            className={`flex justify-center items-center h-12 w-12 rounded-lg transition-all ${
              date.currentMonth
                ? selectedDate.getDate() === date.day &&
                  currentDate.getMonth() === selectedDate.getMonth()
                  ? "bg-blue-500 text-white font-bold"
                  : "text-gray-200 hover:bg-gray-700 hover:scale-105"
                : "text-gray-500"
            }`}
          >
            {date.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarCompo;
