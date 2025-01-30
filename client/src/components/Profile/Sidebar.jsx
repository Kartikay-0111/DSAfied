import React, { useState } from "react";
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";
import "./Sidebar.css";

const Sidebar = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="sidebar">
      <UserProfile user={user} />
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="editButton"
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>
      {isEditing && (
        <EditProfile
          user={user}
          onUpdate={(updatedUser) => {
            if (onUpdate) {
              onUpdate(updatedUser);
            } else {
              console.error("onUpdate function is not provided to Sidebar");
            }
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default Sidebar;
