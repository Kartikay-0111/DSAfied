import "./on-board-form.css";
import React, { useState } from "react";
import { SplitText } from "../SplitText";
import { useAuth0 } from "@auth0/auth0-react";

const Form2 = ({formData, setFormData}) => {
    const { user } = useAuth0();
    const username =  "tan4585";            //store user.name which will be from auth0
 
    const platforms = [
      { name: "Leetcode", logo: "leetcode-logo.png" },
      { name: "Geeks for geeks", logo: "gfg-logo.png" },
      { name: "Codechef", logo: "codechef-logo.svg" },
      { name: "Codeforces", logo: "codeforces-logo.png" },
    ];
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value,
    })
    }   
    return (
      <div>
        <div className="px-10 py-10 flex gap-3 justify-between items-end  text-white">
          <SplitText text="Other Platforms" className="text-base md:text-2xl font-bold leading-7" delay={10} />
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
                name = {platform.name}
                placeholder={platform.name}
                onChange={handleInputChange}
                className="w-3/4 bg-transparent focus:outline-none text-white"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };
export default Form2;