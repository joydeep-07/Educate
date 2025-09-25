import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "../utils/endpoints";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(ENDPOINTS.GET_COURSES);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        Loading courses...
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        No courses found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {course.courseName}
              </h2>
              <p className="text-gray-700 mb-1">
                <strong>Faculty:</strong> {course.facultyName}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Bio:</strong> {course.bio}
              </p>

              {/* Price */}
              <p className="text-gray-700 mb-3">
                <strong>Price:</strong> $
                {course.price ? Number(course.price).toFixed(2) : "0.00"}
              </p>

              <p className="text-gray-700 mb-3">
                <strong>Syllabus:</strong>
                <br />
                {course.syllabus.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                onClick={() => alert(`Joining ${course.courseName}...`)}
              >
                Join Now
              </button>
              <button
                className="flex-1 border border-blue-600 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition"
                onClick={() =>
                  alert(`Viewing details of ${course.courseName}...`)
                }
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
