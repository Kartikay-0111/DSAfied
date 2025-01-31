import React from 'react';
import { BookmarkPlus } from 'lucide-react';
import { Card, CardContent } from './ui-components';

const ProblemsTable = ({ 
  filteredProblems, 
  handleSolvedToggle, 
  handleAddNote 
}) => {
  return (
    <div className="space-y-4 w-full lg:w-5/6 mx-auto">
      {filteredProblems.map(problem => (
        <Card key={problem._id} className="bg-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <input type="checkbox" 
                  className="checkbox checkbox-accent"
                  checked={problem.isSolved}
                  onChange={() => handleSolvedToggle(problem._id)}
                />
                <div>
                  <h3 className="text-lg font-semibold">{problem.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className={`text-sm px-2 py-1 rounded ${
                      problem.difficulty === 'Easy' ? 'bg-green-600' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-sm text-gray-400">
                      Acceptance Rate: {problem.acRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className='flex flex-row gap-4 justify-end items-center w-full sm:w-auto'>
                <div className="flex gap-4">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleAddNote(problem._id)}
                  >
                    <BookmarkPlus />
                  </button>
                  <button
                    className='btn btn-primary btn-sm'
                    onClick={() => window.open(`https://leetcode.com/problems/${problem.titleSlug}/description/`, '_blank')}
                  >
                    Solve
                  </button>
                </div>
                <div className="dropdown dropdown-down">
                  <div tabIndex={0} role="button" className="btn btn-sm">More</div>
                  <ul tabIndex={0} className="dropdown-content menu bg-black rounded-box z-[1] w-32 p-2 shadow">
                    <li><a>Challenge</a></li>
                    <li><a>Ask Doubt</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProblemsTable;