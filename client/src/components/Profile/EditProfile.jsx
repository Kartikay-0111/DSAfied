import { useState } from "react";

export default function EditProfile({ user, onUpdate }) {
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser((prev) => ({ ...prev, pfp: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-4 w-full max-w-sm sm:max-w-md">
      <div className="card-body flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <img
            src={editedUser.pfp || "https://via.placeholder.com/100"}
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
        <input
          name="name"
          value={editedUser.name}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered w-full"
        />
        <input
          name="username"
          value={editedUser.username}
          onChange={handleChange}
          placeholder="Username"
          className="input input-bordered w-full"
        />
        <button
          onClick={() => onUpdate(editedUser)}
          className="btn btn-primary w-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
