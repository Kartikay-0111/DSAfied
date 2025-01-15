import React, { useState } from "react";
import { Code2, FileEdit, ExternalLink, ChevronDown } from "lucide-react";
import Note from "./notes";
const TopicDropDown =({topic,questions}) =>{
    const [isOpen, setIsOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isNoteOpen, setIsNoteOpen] = useState(false);
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

    const handleNote = (e) => {
      setIsNoteOpen(true);
    }

    return (
      <div className="relative w-full mx-auto mt-4">
        
        <div className="h-[0.5rem] bg-gray-900 rounded-t-lg">
        <div className="h-[0.5rem] bg-green-400 rounded-t-lg" style={{ width: `${(progress / questions.length) * 100}%` }}></div>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-black text-gray-200 border border-gray-800"
        >
          <span>{topic}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="relative z-10 w-full p-2 bg-black border border-gray-800 rounded-b-lg shadow-xl">
            <table className="w-full bg-[#1a1a1a]">
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
                      <button className="bg-gray-400 hover:bg-gray-600 rounded-lg btn-sm transition-colors">
                        <FileEdit onClick={(e)=>handleNote(e)} className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}
        <Note
        isOpen={isNoteOpen}
        onClose={() => setIsNoteOpen(false)}
      />
      </div>
    )
}

export default TopicDropDown;

