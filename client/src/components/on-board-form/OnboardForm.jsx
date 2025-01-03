import "./on-board-form.css";
import React, { useState } from "react";
import { SplitText } from "../SplitText";
import { useAuth0 } from "@auth0/auth0-react";
import Form1 from "./form1";
import Form2 from "./form2";
import Form3 from "./form3";


const OnboardForm = () => {
  
  const [activeFormIndex, setActiveFormIndex] = useState(0);

  const [formData, setFormData] = useState({
    form1: {},
    form2: {},
    form3: {},
  })

  const updateFormData = (formKey, data) => {
    setFormData((prev) => ({
      ...prev,
      [formKey]: data,
    }));
  };

  const navigateTo = (index) => {
    setActiveFormIndex(index);
  };

  const forms = [ 
    <Form1 formData={formData.form1} setFormData={(data)=> updateFormData("form1", data)}/>,  //passing the formdata state & a new func to get formdata
    <Form2 formData={formData.form2} setFormData={(data)=> updateFormData("form2", data)}/>,
    <Form3 formData={formData.form3} setFormData={(data)=> updateFormData("form3", data)}/>,
  ]

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

        <div className="main-form-container flex flex-col items-center">
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
            {console.log(formData)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OnboardForm;
