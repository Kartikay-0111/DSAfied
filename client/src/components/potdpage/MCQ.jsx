import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const MCQs = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [mcqs, setMcqs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchMcqs = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch("/api/potd/problems", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        const fetchedMcqs = await Promise.all(
          data.mcqs.map(async (mcq) => {
            const res = await fetch(`/api/potd/mcq/${mcq._id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
            return await res.json();
          })
        );

        setMcqs(fetchedMcqs);
        setSelectedOptions(Array(fetchedMcqs.length).fill(null));
        setSubmitted(Array(fetchedMcqs.length).fill(false));
      } catch (error) {
        console.error("Error fetching MCQs:", error);
      }
    };
    
    fetchMcqs();
  }, [getAccessTokenSilently]);

  const handleOptionChange = (index) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentIndex] = index;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleSubmit = () => {
    if (!submitted[currentIndex]) {
      const updatedSubmitted = [...submitted];
      updatedSubmitted[currentIndex] = true;
      setSubmitted(updatedSubmitted);

      if (selectedOptions[currentIndex] === mcqs[currentIndex]?.correctOption) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const calculateScore = async () => {
    const token = await getAccessTokenSilently();
    try {
      await fetch("/api/users/updateStreak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sub: user.sub,
          mcqsSolved: score,
          problemsSolved: 0,
        }),
      });
    } catch (error) {
      console.error("Error updating user streak:", error);
    }
    setShowScore(true);
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Quiz Complete!</h2>
            <p className="text-2xl text-gray-200">Your Score: <span className="text-blue-400 font-bold">{score}</span> / {mcqs.length}</p>
          </div>
        ) : (
          <>
            {mcqs.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-blue-400">
                    Question {currentIndex + 1} of {mcqs.length}
                  </h2>
                  <span className="px-3 py-1 bg-blue-900 rounded-full text-sm text-blue-300">
                    Progress: {Math.round(((currentIndex + 1) / mcqs.length) * 100)}%
                  </span>
                </div>
                <p className="bg-gray-900 p-6 rounded-lg mb-6 text-gray-200 shadow-inner border border-gray-700">
                  {mcqs[currentIndex]?.question}
                </p>
                <h3 className="font-medium text-gray-300 mb-4">Select your answer:</h3>
                <div className="space-y-3">
                  {mcqs[currentIndex]?.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer border transition-all duration-300 ease-in-out hover:border-blue-500
                        ${submitted[currentIndex]
                          ? index === mcqs[currentIndex]?.correctOption
                            ? "bg-green-900/50 text-green-300 border-green-700"
                            : selectedOptions[currentIndex] === index
                              ? "bg-red-900/50 text-red-300 border-red-700"
                              : "bg-gray-900/50 text-gray-300 border-gray-700 hover:border-gray-600"
                          : selectedOptions[currentIndex] === index
                            ? "bg-blue-900/50 text-blue-300 border-blue-700"
                            : "bg-gray-900/50 text-gray-300 border-gray-700 hover:border-gray-600"
                        }`}
                    >
                      <input
                        type="radio"
                        name="option"
                        value={index}
                        disabled={submitted[currentIndex]}
                        checked={selectedOptions[currentIndex] === index}
                        onChange={() => handleOptionChange(index)}
                        className="hidden"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0
                        ${submitted[currentIndex]
                          ? index === mcqs[currentIndex]?.correctOption
                            ? "border-green-500 bg-green-500"
                            : selectedOptions[currentIndex] === index
                              ? "border-red-500 bg-red-500"
                              : "border-gray-500"
                          : selectedOptions[currentIndex] === index
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-500"
                        }`}
                      />
                      <span className="flex-1">{option}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className="btn btn-outline btn-primary gap-2 hover:bg-blue-900/30"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitted[currentIndex]}
                    className="btn btn-primary gap-2"
                  >
                    <CheckCircle size={16} /> Submit Answer
                  </button>
                  <button
                    onClick={() => setCurrentIndex(currentIndex + 1)}
                    disabled={currentIndex === mcqs.length - 1}
                    className="btn btn-outline btn-primary gap-2 hover:bg-blue-900/30"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
                {submitted[currentIndex] && (
                  <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
                    <h3 className="font-medium text-blue-400 mb-2">Explanation:</h3>
                    <p className="text-gray-300">{mcqs[currentIndex]?.explanation}</p>
                  </div>
                )}
                {currentIndex === mcqs.length - 1 && submitted.every((s) => s) && (
                  <div className="flex justify-center mt-8">
                    <button 
                      onClick={calculateScore} 
                      className="btn btn-primary btn-lg gap-2"
                    >
                      Complete Quiz <CheckCircle size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MCQs;
