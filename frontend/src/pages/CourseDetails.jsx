import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../utils/endpoints";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";
import Lottie from "lottie-react";
import educationAnimation from "../assets/animation/Education.json";

export const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("syllabus");

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

  const formatSyllabus = (syllabus) => {
    if (!syllabus) return [];
    return syllabus.split("\n").filter((item) => item.trim());
  };

  const syllabusItems = formatSyllabus(course.syllabus);

  return (
    <div className="min-h-screen pt-15">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {course.category || "General"}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.price && Number(course.price) > 0
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {course.price && Number(course.price) > 0
                      ? `Premium - ₹${Number(course.price).toFixed(0)}`
                      : "Free"}
                  </span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-700 mb-4 leading-tight">
                  {course.courseName}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-gray-600 text-sm">Instructor</p>
                      <p className="font-semibold text-gray-900">
                        {course.facultyName}
                      </p>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-gray-300"></div>

                  <div>
                    <p className="text-gray-600 text-sm">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {course.duration || "Self-paced"}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-gray-700 max-w-2xl leading-relaxed mb-6">
                  {course.bio}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Enroll Now
                  </button>
                </div>
              </div>

              <div className="lg:w-96 h-[250px] rounded-md w-full">
                <div className="w-64 h-64">
                  <Lottie animationData={educationAnimation} loop autoplay />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div>
          <div>
            <nav className="flex space-x-8 px-8">
              {["syllabus", "reviews"].map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "syllabus" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Course Syllabus
                </h3>
                {syllabusItems.length > 0 ? (
                  <div className="space-y-4">
                    {syllabusItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{item}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Syllabus not available.
                  </p>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Student Reviews
                </h3>
                <div className="text-center py-8 text-gray-500">
                  Reviews feature coming soon...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
