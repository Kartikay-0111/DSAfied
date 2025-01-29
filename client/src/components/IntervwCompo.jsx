import React, { useState } from "react";
import { Code2, FileEdit, ExternalLink, ChevronDown } from "lucide-react";

const IntervwCompo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const questions = [
    {
      id: 1,
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
      leetcodeUrl: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
    },
    {
      id: 2,
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
      difficulty: "Medium",
    },
    {
      id: 3,
      title: "Merge Intervals",
      description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
      leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",
      difficulty: "Hard",
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-400 bg-green-900/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-900/30';
      case 'hard':
        return 'text-red-400 bg-red-900/30';
      default:
        return 'text-gray-400 bg-gray-900/30';
    }
  };
  const handleProgress = (e) => {
    const isChecked = e.target.checked;
    setProgress((prev) => isChecked ? prev + 1 : prev - 1);
  }
  return (
    <div className="p-4">
     <div className="h-[0.7rem] bg-blue-400 rounded-t-lg transition-all duration-300"  
            style={{ width: `${progress/3*100}%` }}
          />
      <div className="relative w-full">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-[#1a1a1a] text-gray-200 rounded-t-lg border border-gray-800"
        >
          <span>Select Question</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full bg-[#1a1a1a] border border-gray-800 rounded-b-lg shadow-xl">
            <table className="w-full">
              <thead className="border-b border-gray-800">
                <tr className="text-gray-400">
                  <th className="p-4"></th>
                  <th className="p-4 text-left">Problem</th>
                  <th className="p-4 text-left">Practice</th>
                  <th className="p-4 text-left">Difficulty</th>
                  <th className="p-4 text-left">Note</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr 
                    key={question.id} 
                    className="border-b border-gray-800 hover:bg-gray-800/30 cursor-pointer"
                  >
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        onClick={handleProgress}
                        className="checkbox checkbox-sm bg-gray-800 border-gray-600"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="font-medium text-blue-400">{question.title}</div>
                        <div className="text-sm text-gray-400">{question.description}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <a 
                        href={question.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Code2 className="w-6 h-6" />
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="btn btn-sm hover:bg-gray-400">
                        <FileEdit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntervwCompo;