import React, { useState, useEffect } from "react";

const MCQs = ({ mcqs, onSolve }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(mcqs.length).fill(null));
  const [submitted, setSubmitted] = useState(Array(mcqs.length).fill(false));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
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
      setShowDescription(true);

      if (selectedOptions[currentIndex] === mcqs[currentIndex].answer) {
        setScore((prevScore) => prevScore + 1);
        onSolve();
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowDescription(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    setShowScore(true);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-4/5 mx-auto flex justify-center">
      {showScore ? (
        <div>
          <h2 className="text-xl font-bold text-white">
            Your Total Score: {score}/{mcqs.length}
          </h2>
        </div>
      ) : (
        <div className="w-4/5">
          <h2 className="text-lg font-bold text-white mb-4">Question {currentIndex + 1}</h2>
          <p className="bg-gray-700 p-4 rounded mb-6 text-white">
            {mcqs[currentIndex].question}
          </p>
          <h3 className="font-medium text-white mb-4">Options:</h3>
          <div className="flex flex-col gap-2">
            {mcqs[currentIndex].options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center gap-2 p-2 rounded text-white cursor-pointer transition-colors duration-200 ease-in-out
                  ${submitted[currentIndex]
                    ? index === mcqs[currentIndex].answer
                      ? "bg-green-500"
                      : selectedOptions[currentIndex] === index
                        ? "bg-red-500"
                        : "bg-gray-700"
                    : selectedOptions[currentIndex] === index
                      ? "bg-gray-600"
                      : "bg-gray-700"
                  }`}
              >
                <input
                  type="radio"
                  name="option"
                  value={index}
                  disabled={submitted[currentIndex]}
                  checked={selectedOptions[currentIndex] === index}
                  onChange={() => handleOptionChange(index)}
                  className="w-4 h-4"
                />
                {option}
              </label>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="bg-blue-500 px-4 py-2 rounded disabled:bg-gray-500 text-white"
            >
              Prev
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitted[currentIndex]}
              className="bg-green-500 px-4 py-2 rounded text-white"
            >
              Submit
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === mcqs.length - 1}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Next
            </button>
          </div>
          {showDescription && (
            <div className="mt-6">
              <h3 className="font-medium text-white mb-4">Description:</h3>
              <p className="bg-gray-700 p-4 rounded text-white">{mcqs[currentIndex].explanation}</p>
            </div>
          )}
          {currentIndex === mcqs.length - 1 && submitted.every((s) => s) && (
            <div className="flex justify-center mt-6">
              <button
                onClick={calculateScore}
                className="bg-green-600 px-6 py-2 rounded text-white"
              >
                Finish Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MCQs;
