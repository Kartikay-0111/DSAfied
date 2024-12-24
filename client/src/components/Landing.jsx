import React from 'react';

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-purple-700 text-white">
      <header className="text-center max-w-xl p-8 bg-black bg-opacity-50 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">DSAfied</h1>
        <p className="text-lg mb-6">
          Master Data Structures and Algorithms with Personalized Learning and Challenges!
        </p>
        <button
          className="px-6 py-3 text-lg font-semibold text-white bg-green-500 hover:bg-green-600 rounded transition duration-300"
          onClick={() => alert('Get Started!')}
        >
          Get Started
        </button>
      </header>
    </div>
  );
};

export default LandingPage;
