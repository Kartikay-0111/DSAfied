import "./on-board-form.css";
import React, { useState } from "react";
import { SplitText } from "../SplitText";
import { useAuth0 } from "@auth0/auth0-react";

const Form3 = ({formData, setFormData}) => {

  const username = "tan4585";
  const [selectedDiff, setSelectedDiff] = useState(null);
  const difficulties = [
    {
      level: "Easy",
    },
    { level: "Medium" },
    {
      level: "Hard",
    },
  ];

  return (
    <div>
      <div className="px-10 py-10 flex justify-between items-end  text-white">
        <SplitText text="Difficulty preference" className="text-base md:text-2xl font-bold leading-7" delay={10} />
        <p className="text-sm md:text-base opacity-50">{username}</p>
      </div>
      <h2 className="text-white text-center w-full opacity-80 px-8">
        What difficulty level questions are you comfortable with?
      </h2>

      <div className="flex justify-center my-4 gap-2">
      {difficulties.map((difficulty, index) => (
          <div
            onClick={() => {
              setSelectedDiff(index);
              setFormData({difficulty: difficulty.level});
            }}
            key={index}
            className={`cursor-pointer opacity-80 rounded-lg px-5 py-2 transition-all  ${
              selectedDiff != index && "hover:bg-[#171e41]"
            } ${
              selectedDiff === index
                ? "bg-[#67BBFF] text-black"
                : "bg-[#010A14] text-white"
            } `}
            style={{ border: "1px solid #A8A8A8" }}
          >
            {difficulty.level}
          </div>
        ))}

      </div>
    </div>
  );
};

export default Form3;