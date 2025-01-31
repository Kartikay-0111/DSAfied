import { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { SiLeetcode, SiCodechef, SiCodeforces, SiGeeksforgeeks } from "react-icons/si";

export default function EditProfile({ user, onUpdate }) {
  const [editedUser, setEditedUser] = useState(user);
  const [loading, setLoading] = useState(false);
const id ="auth0|678d54d11ad12d2198fb54c7";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };
  // const res = fetch(`http://localhost:3000/api/users?id=${id}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // if (res.ok) {
  //   const data = res.json();
  //   console.log(data);
  // }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/users/${user._id}`, editedUser);
      onUpdate(response.data);
    } catch (error) {
      console.error("Error updating profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-4 w-full max-w-sm sm:max-w-md"> 
      <div className="card-body flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <img
            src={editedUser.avatar || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex items-center gap-2 input input-bordered">
          <FaUser />
          <input
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 input input-bordered">
          <FaEnvelope />
          <input
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 input input-bordered bg-gray-200 cursor-not-allowed">
          <FaUser />
          <input
            name="username"
            value={editedUser.username}
            disabled
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 input input-bordered">
          <SiLeetcode />
          <input
            name="leetcode"
            value={editedUser.leetcode}
            onChange={handleChange}
            placeholder="LeetCode Profile Link"
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 input input-bordered">
          <SiCodechef />
          <input
            name="codechef"
            value={editedUser.codechef}
            onChange={handleChange}
            placeholder="CodeChef Profile Link"
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 input input-bordered">
          <SiCodeforces />
          <input
            name="codeforces"
            value={editedUser.codeforces}
            onChange={handleChange}
            placeholder="CodeForces Profile Link"
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 input input-bordered">
          <SiGeeksforgeeks />
          <input
            name="geeksforgeeks"
            value={editedUser.geeksforgeeks}
            onChange={handleChange}
            placeholder="GeeksForGeeks Profile Link"
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
