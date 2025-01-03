import "./on-board-form.css";
import React, { useState } from "react";
import { SplitText } from "../SplitText";
import { useAuth0 } from "@auth0/auth0-react";

const Form1 = ({formData, setFormData}) => {

  const handleInputChange = (e) =>{
    const {name, value, type, files} = e.target;
    setFormData({
        ...formData,
        [name] : type === "file"? files[0] : value,
    })
  }
    const [selectedImage, setSelectedImage] = useState(null);
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//     console.log(selectedImage);
    
//   };

  return (
    <div>
      <div className="px-10 py-10 flex justify-between items-end  text-white">
        <SplitText text="Get Started" className="text-2xl font-bold leading-7" delay={10} />
      </div>
      <div className="flex justify-center items-center flex-col gap-4 px-4">
        <div
          className="my-3 mx-4 flex gap-3 bg-[#010A14] px-3 py-1  w-full"
          style={{ borderRadius: "5px", border: "1px solid #A8A8A8" }}
        >
          <img src="./user.svg" className="" />
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handleInputChange}
            className="text-base w-full bg-transparent focus:outline-none text-white"
          />
        </div>
        <div
          className="my-3 mx-4 flex gap-3 bg-[#010A14] px-3 py-1  w-full"
          style={{ borderRadius: "5px", border: "1px solid #A8A8A8" }}
        >
          <img src="./name-icon.png" className="md:w-8 w-6" />
          <input
            type="text"
            name="Name"
            placeholder="Enter your name"
            onChange={handleInputChange}
            className="text-base w-3/4 bg-transparent focus:outline-none text-white"
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
            name="avatar"
            onChange={handleInputChange}
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

export default Form1;