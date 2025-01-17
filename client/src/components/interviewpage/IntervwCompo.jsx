import React from "react";
import { Code2, FileEdit, ExternalLink, ChevronDown } from "lucide-react";
import TopicDropDown from "./dropdown";

const IntervwCompo = () => {
  const topics = ['Array', 'String', 'Linked List'];
  const questions = [
    {
      id: 1,
      topic: 'Array',
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
      "title-slug": "two-sum",
      difficulty: "Easy",
    },
    {
      id: 2,
      topic: 'String',
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      "title-slug": "valid-parentheses",
      difficulty: "Medium",
    },
    {
      id: 3,
      topic: 'Linked List',
      title: "Merge Intervals",
      description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
      "title-slug": "merge-intervals",
      difficulty: "Hard",
    }
  ];

  const totalQuestions = 191;
  const completedQuestions = 0;

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 flex flex-col p-8">
      {/* Header Section */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-white">
           Top Coding Interview Problems
          </h1>
        </div>

        <p className="text-gray-300 mb-8">
        The Dsafied platform brings you curated interview problems to sharpen your Data Structures and Algorithms (DSA) skills. 
        These problems are tailored for coding interviews at companies like{' '}
        <span className="text-gray-200">Google, Amazon, Microsoft, Meta, Swiggy, Flipkart</span>, and many more. 
        Perfect for all levels, they provide extensive practice for concepts essential to excel in technical interviews.
        </p>

        {/* Key Highlights Section */}
        <div className="bg-gray-900/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl text-cyan-400 mb-4">Key Highlights</h2>
          <ul className="space-y-3 text-gray-300">
            <li>• Comprehensive problems for mastering DSA topics crucial for interviews.</li>
            <li>• Save your own notes for each problem for quick revision.</li>
            <li>• Personalized progress tracking for efficient learning.</li>
          </ul>
        </div>

        {/* Progress Section */}
        <div className="bg-gray-900/30 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Your Progress: {completedQuestions}/{totalQuestions}</span>
            <span className="text-cyan-500">{((completedQuestions/totalQuestions) * 100).toFixed(1)}% complete</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedQuestions/totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <div className="w-full space-y-2">
          {topics.map((topic, index) => (
            <TopicDropDown 
              key={topic} 
              topic={topic} 
              questions={questions}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntervwCompo;