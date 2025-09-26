import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "../utils/endpoints";
import { toast } from "sonner";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useSelector } from "react-redux";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ get admin from redux
  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(ENDPOINTS.GET_COURSES);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    toast.info(`Coming Soon`);
  };

  const handleUpdate = (id) => {
    toast.info(`Coming Soon`);
    // navigate(`/courses/update/${id}`) <-- if you have update page
  };

  if (loading) return <Loader />;
  if (error) return <Error />;
  if (!courses.length) {
    return (
      <div className="mt-35 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-600 mb-2">
            No Courses available right now
          </h2>
          <p className="text-gray-500">Check back later for new courses!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-medium text-gray-800 mb-4 tracking-tight">
            Our Courses
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Curated collection of expert-led courses designed for mastery
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              {/* Course Header */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 leading-tight">
                  {course.courseName}
                </h2>
                <p className="text-sm text-gray-600 font-medium">
                  {course.facultyName}
                </p>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
                    About Course
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {course.bio || "About Course not Defined"}
                  </p>
                </div>

                {/* Action Section with Price */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-medium text-emerald-700">
                      {course.price && Number(course.price) > 0
                        ? `₹${Number(course.price).toFixed(0)}`
                        : "Free"}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {/* Normal user buttons - ONLY SHOW IF NOT ADMIN */}
                      {!admin && (
                        <>
                          <button
                            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
                            onClick={() =>
                              toast.info("Details page coming soon")
                            }
                          >
                            Details
                          </button>
                          <button
                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                            onClick={() => toast.info("Enrollment coming soon")}
                          >
                            Enroll
                          </button>
                        </>
                      )}

                      {/* Admin-only buttons */}
                      {admin && (
                        <>
                          <button
                            className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors duration-200"
                            onClick={() => handleUpdate(course._id)}
                          >
                            Update
                          </button>
                          <button
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                            onClick={() => handleDelete(course._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
