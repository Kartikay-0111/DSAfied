import React, { useState,useEffect } from "react";
// import { use } from "react";

const mcqs = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
  },
  {
    question: "Which programming language is used for web apps?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: 3,
  },
  {
    question: "What is the square root of 16?",
    options: ["2", "4", "8", "16"],
    answer: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: 1,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: 2,
  },
];

const MCQs = () => {
  // const [mcqs, setMcqs] = useState([]);
  // let date = new Date();
  // date =  date.toISOString().split('T')[0];
  // console.log(date);
  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/daily/${date}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     }
  //     );
  // }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(mcqs.length).fill(null));
  const [submitted, setSubmitted] = useState(Array(mcqs.length).fill(false));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

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

      if (selectedOptions[currentIndex] === mcqs[currentIndex].answer) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1);
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
            <h2 className="text-xl font-bold">
              Your Total Score: {score}/{mcqs.length}
            </h2>
          </div>
        ) : (
          <div className="w-4/5">
            <h2 className="text-lg font-bold mb-4">Question</h2>
            <p className="bg-gray-700 p-4 rounded mb-6">{mcqs[currentIndex].question}</p>
            <h3 className="font-medium mb-4">Options:</h3>
            <div className="flex flex-col gap-2">
              {mcqs[currentIndex].options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-2 p-2 rounded ${
                    submitted[currentIndex]
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
                className="bg-blue-500 px-4 py-2 rounded disabled:bg-gray-500"
              >
                Prev
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitted[currentIndex]}
                className="bg-green-500 px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === mcqs.length - 1}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
            {currentIndex === mcqs.length - 1 && submitted.every((s) => s) && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={calculateScore}
                  className="bg-green-600 px-6 py-2 rounded"
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
