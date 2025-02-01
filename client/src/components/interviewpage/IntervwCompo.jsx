import React, { useState, useEffect} from "react";
import { Code2, FileEdit, ExternalLink, ChevronDown, User } from "lucide-react";
import { Card, CardContent } from "../problemset/ui-components";
import UserProgressBar from "./ProgressBar";
import {Search, BookmarkPlus, BookOpen, CheckCircle} from 'lucide-react';

const IntervwCompo = () => {
  const [data, setData] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [openStep, setOpenStep] = useState(null);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchInterviewProblems = async () => {
      try{
        const response = await fetch(`${BASE_URL}/api/interview`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        const data = await response.json();
        // console.log(data);
        setData(data);
      }
      catch{
        (err) => console.error(err)
      };
    }
  fetchInterviewProblems()}, []);
  const handleClickOutside = (e, dropdownRef) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      dropdownRef.current.querySelector('.dropdown-menu')?.classList.add('hidden');
    }
  };

  const toggleProblemSolved = (problemId) => {
    if (solvedProblems.includes(problemId)) {
      setSolvedProblems(solvedProblems.filter(id => id !== problemId));
    } else {
      setSolvedProblems([...solvedProblems, problemId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col p-8">
      {/* Header Section */}
      <div className="bg-gray-900 text-gray-200 flex flex-col p-8">
        <div className="w-full max-w-4xl mx-auto">
        {/* Main Header */}
        <div className="flex flex-col items-start space-y-2 mb-6">
          <div className="flex items-center gap-3 text-cyan-400 mb-2">
            <Code2 className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-wider uppercase">DSAfied Interview Prep</span>
          </div>
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            The Coding Interview Playbook
          </h1>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-lg leading-relaxed mb-12 border-l-2 border-cyan-400/30 pl-4">
          The Dsafied platform brings you playbook of interview problems to sharpen your Data Structures and Algorithms (DSA) skills. 
          These problems are tailored for coding interviews at companies like{' '}
          <span className="text-white font-medium">Google, Amazon, Microsoft, Meta, Swiggy, Flipkart</span>, and many more.
          Perfect for all levels, they provide extensive practice for concepts essential to excel in technical interviews.
        </p>

        {/* Key Highlights Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-400/5 rounded-xl blur-xl"></div>
          <div className="relative bg-gray-800/40 rounded-xl p-8 backdrop-blur-sm border border-gray-700">
            <h2 className="flex items-center gap-2 text-xl text-cyan-400 font-semibold mb-6">
              <BookOpen className="h-5 w-5" />
              Key Highlights
            </h2>
            <div className="grid gap-4">
              {[
                'Comprehensive problems for mastering DSA topics crucial for interviews.',
                'Save your own notes for each problem for quick revision.',
                'Personalized progress tracking for efficient learning.'
              ].map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-cyan-400/70" />
                  <span className="leading-tight">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="w-full max-w-4xl mx-auto mb-8">
        <p className="text-lg mb-2">Progress:</p>
        <UserProgressBar totalProblems={191} solvedProblems={solvedProblems.length} />
      </div>

      {/* interview problems dropdown */}
      {(data.length !== 0) ? (
      <div className="w-3/4 mt-2 mx-auto max-w-4xl space-y-2">
      {data.map((step) => (
        <div key={step.step_no} className="rounded-lg overflow-hidden">
          {/* Category Header */}
          <button
            className="w-full flex items-center text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 font-semibold text-white transition-colors"
            onClick={() => setOpenStep(openStep === step.step_no ? null : step.step_no)}
          >
            {step.head_step_no}
            <ChevronDown className={`h-5 w-5 ml-auto transition-transform duration-300 ${openStep === step.step_no ? 'rotate-180' : 'rotate-0'}`} />
          </button>

          {/* Problems List */}
          {openStep === step.step_no && (
            <div className="space-y-2 p-2 bg-gray-800">
              {step.topics.map((problem) => (
                <Card key={problem.id} className="border-gray-700">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-accent"
                          checked={solvedProblems.includes(problem.id)}
                          onChange={() => toggleProblemSolved(problem.id)}
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {problem.title}
                          </h3>
                          <div className="flex gap-2 mt-1">
                            <span
                              className={`text-sm px-2 py-1 rounded ${
                                problem.difficulty === 0
                                  ? 'bg-green-600'
                                  : problem.difficulty === 1
                                  ? 'bg-yellow-600'
                                  : 'bg-red-600'
                              }`}
                            >
                            {['Easy', 'Medium', 'Hard'][problem.difficulty]}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(problem.lc_link, '_blank')}
                          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                          Solve
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
      ): (
        <div className="w-3/4 mt-2 mx-auto max-w-4xl space-y-2">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Search className="h-6 w-6" />
              <span className="text-lg">Loading...</span>
            </div>
          </div>
        </div>)
      }
    </div>

  );
};

export default IntervwCompo;