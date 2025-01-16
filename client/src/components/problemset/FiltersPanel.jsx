import React from 'react';

const FiltersPanel = ({ 
  selectedTopics, 
  setSelectedTopics, 
  selectedDifficulties, 
  setSelectedDifficulties,
  selectedStatus,
  setSelectedStatus,
  allTopics
}) => {
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          className="text-sm btn btn-sm btn-error"
          onClick={() => {
            setSelectedTopics([]);
            setSelectedDifficulties([]);
            setSelectedStatus('all');
          }}
        >
          Clear All
        </button>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Status</h3>
        <select
          className="w-full bg-gray-800 rounded p-2"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Problems</option>
          <option value="solved">Solved</option>
          <option value="unsolved">Unsolved</option>
        </select>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Difficulty</h3>
        {difficulties.map(difficulty => (
          <div key={difficulty} className="flex items-center mb-2">
            <div className="form-control flex flex-row">
              <input type="checkbox"
                className="checkbox checkbox-accent"
                checked={selectedDifficulties.includes(difficulty)}
                onChange={(e) => {
                  setSelectedDifficulties(prev =>
                    e.target.checked
                      ? [...prev, difficulty]
                      : prev.filter(d => d !== difficulty)
                  );
                }}
              />
              <label className="cursor-pointer ml-2">
                <span className="text-white">{difficulty}</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Topics Filter */}
      <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
        <h3 className="font-semibold mb-2">Topics</h3>
        {allTopics.map(topic => (
          <div key={topic} className="flex items-center mb-2">
            <div className="form-control flex flex-row">
              <input type="checkbox"
                className="checkbox checkbox-accent"
                checked={selectedTopics.includes(topic)}
                onChange={(e) => {
                  setSelectedTopics(prev =>
                    e.target.checked ? [...prev, topic] : prev.filter(t => t !== topic)
                  );
                }}
              />
              <label className="ml-2 cursor-pointer">
                <span className="text-l text-white">{topic}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltersPanel;