import React, { useState } from "react";
import dayjs from "dayjs";

const MonthlyStreakTracker = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // Example data: Dates where problems are solved
  const streakDates = ["2025-01-01", "2025-01-02", "2025-01-03"];

  const getDaysInMonth = () => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const days = [];

    // Add empty days for the starting offset
    for (let i = 0; i < startOfMonth.day(); i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= endOfMonth.date(); i++) {
      days.push(startOfMonth.date(i));
    }

    return days;
  };

  const isStreakDate = (date) => {
    const dateString = date?.format("YYYY-MM-DD");
    return streakDates.includes(dateString);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const days = getDaysInMonth();

return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="text-xl">
                &lt;
            </button>
            <h2 className="text-lg font-bold">
                {currentMonth.format("MMMM YYYY")}
            </h2>
            <button onClick={handleNextMonth} className="text-xl">
                &gt;
            </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center font-bold">
                    {day}
                </div>
            ))}
            {days.map((date, index) => {
                const isFutureDate = date && date.isAfter(dayjs(), "day");
                return (
                    <div
                        key={index}
                        className={`h-10 w-10 flex items-center justify-center rounded ${
                            date
                                ? isFutureDate
                                    ? "bg-gray-500"
                                    : isStreakDate(date)
                                    ? "bg-green-600"
                                    : "bg-gray-700"
                                : ""
                        }`}
                    >
                        {date?.date() || ""}
                    </div>
                );
            })}
        </div>
    </div>
);
};

export default MonthlyStreakTracker;
