import React from 'react';
import { Search } from 'lucide-react';

const SearchSort = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="relative w-full sm:w-64">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow pl-8"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-2" />
        </label>
      </div>

      <div className="flex items-center gap-2">
        <span>Sort by:</span>
        <select
          className="bg-gray-800 rounded p-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="difficulty">Difficulty</option>
          <option value="acceptance">Acceptance Rate</option>
        </select>
      </div>
    </div>
  );
};

export default SearchSort;