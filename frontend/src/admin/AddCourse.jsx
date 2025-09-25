import React, { useState, useRef, useEffect } from "react";
import AuthImagePattern from "../components/AuthImagePattern";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [bio, setBio] = useState("");
  const [syllabus, setSyllabus] = useState("");

  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(0);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bio.split(" ").length > 20) {
      alert("Bio cannot exceed 20 words");
      return;
    }
    console.log({ courseName, facultyName, bio, syllabus });
  };

  return (
    <>
      <div>
        <h1 className="mt-15 text-5xl text-center font-medium text-gray-700">Add Another Course</h1>
        <div className="flex flex-col lg:flex-row justify-center items-stretch mt-10 gap-10 max-w-7xl mx-auto ">
          {/* Form Card */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex-1 p-8 bg-opacity-20 backdrop-blur-md "
          >
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2">
                Course Name
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full p-3 rounded border-b border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter course name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2">
                Faculty Name
              </label>
              <input
                type="text"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                className="w-full p-3 rounded border-b border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter faculty name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2">
                Bio (20 words max)
              </label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded border-b border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter a short bio"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2">
                Syllabus
              </label>
              <textarea
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
                className="w-full p-3 rounded border-b border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={5}
                placeholder="Enter syllabus details"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
              Add Course
            </button>
          </form>

          {/* Image Pattern */}
          <div
            className="flex-1 hidden lg:flex items-center justify-center"
            style={{ height: formHeight }}
          >
            <AuthImagePattern
              title="Welcome!"
              subtitle="Fill in the course details to get started."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
