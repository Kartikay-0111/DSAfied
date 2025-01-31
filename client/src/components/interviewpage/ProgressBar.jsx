import React from 'react';

const UserProgressBar = ({ totalProblems, solvedProblems}) => {
  const progress = (solvedProblems / totalProblems) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${progress}%` }}
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default UserProgressBar;