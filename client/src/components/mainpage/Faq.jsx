import React, { useState } from "react";

const faqData = [
  {
    question: "Will my rating increase using this website?",
    answer: "Yes, you can improve your rating by practicing problems on DSAfied.",
  },
  {
    question: "How is DSAfied different from Leetcode and other coding platforms?",
    answer:
      "DSAfied is a platform that helps you learn and practice data structures and algorithms. It is designed to help you understand concepts and solve problems in a structured manner",
  },
  {
    question: "What is the learning curve for DSAfied?",
    answer: "DSAfied is designed for beginners and intermediate level programmers. You can start with the basics and gradually move to more advanced topics.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="text-white p-6 rounded-lg shadow-lg lg:w-3/5 mx-auto">
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`bg-slate-800 rounded-md mb-4 overflow-hidden ${
            activeIndex === index ? "bg-gray-800" : ""
          }`}
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center p-4 focus:outline-none"
          >
            <span className="text-left text-xl">{item.question}</span>
            <span
              className={`text-2xl border rounded-full pl-2 pr-2 pb-1 bg-indigo-700 transition-transform duration-300 ${
                activeIndex === index ? "rotate-180" : ""
              }`}
            >
              {activeIndex === index ? "−" : "+"}
            </span>
          </button>
          <div
            className={`transition-all duration-300 ease-in-out ${
              activeIndex === index ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ overflow: "hidden" }}
          >
            <div className="p-4 text-gray-300">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
