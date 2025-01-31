import "./on-board-form.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form1 from "./form1";
import Form2 from "./form2";
import Form3 from "./form3";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const OnboardForm = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  console.log(user);
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    form1: {
      username: user?.name || "",
      Name: "",
      email: user?.email || "",
      avatar: null,
    },
    form2: {
      Leetcode: "",
      "Geeks for geeks": "",
      Codechef: "",
      Codeforces: ""
    },
    form3: {
      difficulty: "",
    },
  });

  const updateFormData = (formKey, data) => {
    setFormData((prev) => ({
      ...prev,
      [formKey]: data,
    }));
  };

  const navigateTo = (index) => {
    setActiveFormIndex(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must login first");
      return;
    }
    if (!formData.form1.username || !formData.form1.Name || !formData.form1.avatar || !formData.form2.Leetcode || !formData.form2["Geeks for geeks"] || !formData.form2.Codechef || !formData.form2.Codeforces || !formData.form3.difficulty) {
      alert("Please fill in all required fields.");
      return;
    }

    const userFormData = { ...formData.form1, platform: JSON.stringify(formData.form2), ...formData.form3 };
    const data = new FormData();
    for (const key in userFormData) {
      if (userFormData.hasOwnProperty(key))
        data.append(key, userFormData[key]); // Append each form field to the FormData object
    }

    try {
      const token = await getAccessTokenSilently({
        audience: 'http://localhost/',
        scope: 'openid profile email',
      });
      const response = await axios.post("http://localhost:3000/api/users", data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(user);
        if (response.status === 200 || response.status === 201) {
        setFormData({
          form1: {
            username: user?.name || "",
            Name: "",
            email: user?.email || "",
            avatar: null,
          },
          form2: {
            Leetcode: "",
            "Geeks for geeks": "",
            Codechef: "",
            Codeforces: ""
          },
          form3: {
            difficulty: "",
          },
        });
        setActiveFormIndex(0);
        alert("Form submitted successfully");
        navigate("/potd"); // redirect to home page
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const forms = [
    <Form1 formData={formData.form1} setFormData={(data) => updateFormData("form1", data)} />,  // passing the formdata state & a new func to get formdata
    <Form2 formData={formData.form2} setFormData={(data) => updateFormData("form2", data)} />,
    <Form3 formData={formData.form3} setFormData={(data) => updateFormData("form3", data)} />,
  ];

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
                className={`bg-black w-3 h-3 cursor-pointer rounded-full transition-opacity duration-500 ${activeFormIndex === index ? "" : "opacity-30"}`}
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
            onClick={handleSubmit}
          >
            Submit
          </div>
        }
      </div>
    </div>
  );
};

export default OnboardForm;
