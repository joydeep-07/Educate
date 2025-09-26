import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../utils/endpoints";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";
import AuthImagePattern from "../components/AuthImagePattern";

export const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${ENDPOINTS.GET_COURSES}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch course details");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorC />;

  return (
    <div className="max-w-8xl mx-auto mt-16 flex gap-5 p-6">
      {/* Left side scrollable, scrollbar hidden */}
      <div
        className="w-1/2 overflow-y-auto max-h-[calc(100vh-4rem)]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // for Firefox & IE
      >
        {/* Hide scrollbar for Webkit browsers */}
        <style>
          {`
        div::-webkit-scrollbar {
          display: none;
        }
      `}
        </style>

        <h1 className="text-3xl font-semibold mb-4">{course.courseName}</h1>
        <p className="text-gray-600 mb-2">Faculty: {course.facultyName}</p>
        <p className="text-gray-700 mb-4">{course.bio}</p>
        <p className="text-xl font-medium text-emerald-700 mb-4">
          {course.price && Number(course.price) > 0
            ? `₹${Number(course.price).toFixed(0)}`
            : "Free"}
        </p>
        <p
          className="text-gray-700 text-sm mb-4"
          style={{ whiteSpace: "pre-line" }}
        >
          {course.syllabus || "Syllabus not available."}
        </p>
      </div>

      {/* Right side sticky */}
      <div
        className="w-1/2 sticky"
        style={{ top: "25px", height: "calc(100vh - 4rem)" }}
      >
        <AuthImagePattern />
      </div>
    </div>
  );
};
