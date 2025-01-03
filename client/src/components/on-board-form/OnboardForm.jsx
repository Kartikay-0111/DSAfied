import "./on-board-form.css";
import React, { useState } from "react";
import { SplitText } from "../SplitText";

const Form1 = ({ form1CB }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const submitUsername = (e) => {
    const username = e.target.value;
    // console.log(e.target.value);
    form1CB({ username });
  };
  const submitName = (e) => {
    const name = e.target.value;
    // console.log(e.target.value);
    form1CB({ name });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log(selectedImage);
  };

  return (
    <div>
      <div className="px-10 py-10 flex justify-between items-end  text-white">
        <SplitText
          text="Get Started"
          className="text-2xl font-bold leading-7"
          delay={10}
        />
      </div>
      <div className="flex justify-center items-center flex-col gap-4 px-4">
        <div
          className="my-3 mx-4 flex gap-3 bg-[#010A14] px-3 py-1  w-full"
          style={{ borderRadius: "5px", border: "1px solid #A8A8A8" }}
        >
          <img src="./user.svg" className="" />
          <input
            type="text"
            placeholder="Enter your username"
            className="text-base w-full bg-transparent focus:outline-none text-white"
            onBlur={submitUsername}
          />
        </div>
        <div
          className="my-3 mx-4 flex gap-3 bg-[#010A14] px-3 py-1  w-full"
          style={{ borderRadius: "5px", border: "1px solid #A8A8A8" }}
        >
          <img src="./name-icon.png" className="md:w-8 w-6" />
          <input
            type="text"
            placeholder="Enter your name"
            className="text-base w-3/4 bg-transparent focus:outline-none text-white"
            onBlur={submitName}
          />
        </div>
        <p className="text-[hsl(0,0%,70%)] self-start">Edit your avatar</p>
        <div
          className="mb-3 mx-4 flex justify-between items-center gap-4 bg-[#010A14] px-3 py-2  w-full "
          style={{ borderRadius: "5px", border: "1px solid #A8A8A8" }}
        >
          {/* <img src="./dummy_user_template.png" /> */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="avatar-upload"
          />
          <label htmlFor="avatar-upload" className="cursor-pointer">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected Avatar"
                className="w-12 h-12 bg-[hsl(212,90%,8%)] rounded-full object-cover"
              />
            ) : (
              <img
                src="./dummy_user_template.png"
                alt="Default Avatar"
                className="w-12 h-12 bg-[hsl(212,90%,8%)] rounded-full object-cover"
              />
            )}
          </label>
          {/* <p className="text-white opacity-50 flex-1">Edit your avatar</p> */}
        </div>
      </div>
    </div>
  );
};
const Form2 = () => {
  const username = "tan4585";
  const platforms = [
    { name: "Leetcode", logo: "leetcode-logo.png" },
    { name: "Geeks for geeks", logo: "gfg-logo.png" },
    { name: "Codechef", logo: "codechef-logo.svg" },
    { name: "Codeforces", logo: "codeforces-logo.png" },
  ];
  return (
    <div>
      <div className="px-10 py-10 flex gap-3 justify-between items-center  text-white">
        <div>
          <SplitText
            text="Other"
            className="text-base md:text-2xl font-bold leading-7 mx-2"
            delay={10}
          />
          <SplitText
            text="Platforms"
            className="text-base md:text-2xl font-bold leading-7"
            delay={10}
          />
        </div>
        <p className="text-sm md:text-base opacity-50">{username}</p>
      </div>
      {platforms.map((platform, index) => (
        <div className="flex justify-center items-center flex-col gap-4 px-4">
          <div
            className="my-3 mx-4 flex gap-3 bg-[#010A14] px-3 py-1  w-full"
            style={{ borderRadius: "5px", border: "1px solid #A8A8A8" }}
          >
            <img src={platform.logo} className="" />
            <input
              type="text"
              placeholder={platform.name}
              className="w-3/4 bg-transparent focus:outline-none text-white"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
const Form3 = () => {
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
      <div className="px-10 py-10 flex justify-between items-center  text-white">
        <div>
          <SplitText
            text="Difficulty "
            className="text-base md:text-2xl font-bold leading-7 mx-2"
            delay={10}
          />
          <SplitText
            text="Preference"
            className="text-base md:text-2xl font-bold leading-7"
            delay={10}
          />
        </div>
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

const OnboardForm = () => {
  const [formData, setFormData] = useState({ username: "", name: "" });

  const form1CB = (data) => {
    // console.log(data);
    setFormData((prevData) => ({ ...prevData, ...data }));
  };
  console.log("formData = ", formData);

  const forms = [<Form1 form1CB={form1CB} />, <Form2 />, <Form3 />];

  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const navigateTo = (index) => {
    setActiveFormIndex(index);
  };
  return (
    <div
      className="h-screen w-full flex justify-center items-center"
      style={{
        background: "url('form-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="w-64 md:w-1/3 relative "
        style={{
          borderRadius: "30px",
          border: "1px solid rgba(255, 255, 255, 0.09)",
          background: "rgba(137, 137, 137, 0.05)",
          backdropFilter: "blur(75px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "1px",
            height: "80px",
            top: "30px",
            left: "-1px",
            opacity: "0.6",
            background:
              "linear-gradient(0deg, rgba(75, 221, 116, 0.00) 0%, rgba(75, 221, 116, 0.60) 50%, rgba(75, 221, 116, 0.00) 100%)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: "193px",
            left: "20px",
            height: "1px",
            opacity: "0.6",
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.60) 50%, rgba(255, 255, 255, 0.00) 100%)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: "1px",
            height: "100px",
            right: "0",
            top: "40px",
            opacity: "0.6",
            background:
              "linear-gradient(0deg, rgba(75, 221, 116, 0.00) 0%, rgba(75, 221, 116, 0.60) 50%, rgba(75, 221, 116, 0.00) 100%)",
          }}
        ></div>

        <div className="flex flex-col items-center">
          {forms[activeFormIndex]}
          {/* carousel */}
          <div className="bg-[#BFBFBF70] h-2 flex items-center justify-center gap-2 px-3 py-4 rounded-full mt-4 mb-10">
            {forms.map((_, index) => (
              <div
                key={index}
                className={`bg-black w-3 h-3 cursor-pointer rounded-full transition-opacity duration-500 ${
                  activeFormIndex === index ? "" : "opacity-30"
                }`}
                onClick={() => navigateTo(index)}
              ></div>
            ))}
          </div>
        </div>
        {
          activeFormIndex === 2 &&
          <div
            className="cursor-pointer text-white w-full text-xl py-4 flex items-center justify-center form-submit-btn"
            style={{
              borderRadius: "0 0 30px 30px",
              boxShadow: "0px 2px 15px 0px rgba(96, 128, 255, 0.40)",
            }}
          >
            Submit
          </div>
        }
      </div>
    </div>
  );
};
export default OnboardForm;
