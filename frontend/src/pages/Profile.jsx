// src/pages/Profile.jsx
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  const { user, token } = useSelector((state) => state.auth);
  const [freshUser, setFreshUser] = useState(user);
  // Profile state
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [degree, setDegree] = useState("");
  const [institute, setInstitute] = useState("");
  const [skills, setSkills] = useState("");

  // Temp state for editing
  const [tempProfileImage, setTempProfileImage] = useState(null);
  const [tempBio, setTempBio] = useState("");
  const [tempDegree, setTempDegree] = useState("");
  const [tempInstitute, setTempInstitute] = useState("");
  const [tempSkills, setTempSkills] = useState("");

  const handleEdit = () => {
    setTempProfileImage(profileImage);
    setTempBio(bio);
    setTempDegree(degree);
    setTempInstitute(institute);
    setTempSkills(skills);
    setEditMode(true);
  };

  const handleSave = () => {
    setProfileImage(tempProfileImage);
    setBio(tempBio);
    setDegree(tempDegree);
    setInstitute(tempInstitute);
    setSkills(tempSkills);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setTempProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">
      <div className="flex items-start gap-12">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100">
            {editMode ? (
              tempProfileImage ? (
                <img
                  src={tempProfileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-gray-400 text-7xl" />
              )
            ) : profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-400 text-7xl" />
            )}
          </div>

          {editMode && (
            <div>
              <label
                htmlFor="imageUpload"
                className="absolute bottom-2 right-2 bg-white border rounded-full px-2 py-1 text-xs cursor-pointer shadow-md"
              >
                Upload
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          {/* Username & Edit Button */}
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">
              {" "}
              {freshUser?.firstname} {freshUser?.lastname}
            </h2>
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-1 bg-gray-200 rounded-md text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="px-4 py-1 bg-gray-100 rounded-md text-sm font-medium"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-4 text-sm">
            <span>
              <b>0</b> posts
            </span>
            <span>
              <b>0</b> followers
            </span>
            <span>
              <b>0</b> following
            </span>
          </div>

          {/* Bio Section */}
          <div className="text-sm mb-4">
            {editMode ? (
              <textarea
                value={tempBio}
                onChange={(e) => {
                  const words = e.target.value.split(" ");
                  if (words.length <= 50) setTempBio(e.target.value);
                }}
                placeholder="Write your bio (max 50 words)..."
                className="w-full max-w-md mt-2 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="3"
              />
            ) : (
              <p>{bio || "No bio added yet."}</p>
            )}
          </div>

          {/* Degree & Institute */}
          <div className="mb-4 text-sm">
            {editMode ? (
              <>
                <input
                  type="text"
                  placeholder="Degree"
                  value={tempDegree}
                  onChange={(e) => setTempDegree(e.target.value)}
                  className="block w-full max-w-md p-2 border rounded-md text-sm mb-2"
                />
                <input
                  type="text"
                  placeholder="Institute"
                  value={tempInstitute}
                  onChange={(e) => setTempInstitute(e.target.value)}
                  className="block w-full max-w-md p-2 border rounded-md text-sm mb-2"
                />
                <input
                  type="text"
                  placeholder="Skills (comma separated)"
                  value={tempSkills}
                  onChange={(e) => setTempSkills(e.target.value)}
                  className="block w-full max-w-md p-2 border rounded-md text-sm mb-2"
                />
              </>
            ) : (
              <>
                {degree && (
                  <p className="mb-1">
                    <b>Degree:</b> {degree}
                  </p>
                )}
                {institute && (
                  <p className="mb-1">
                    <b>Institute:</b> {institute}
                  </p>
                )}
                {skills && (
                  <p>
                    <b>Skills:</b> {skills}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Action Buttons (Follow & Message) - Now placed after bio and details */}
          {!editMode && (
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm">
                Follow
              </button>
              <button className="px-4 py-1 bg-gray-200 rounded-md text-sm">
                Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
