import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../utils/endpoints";
import { toast } from "sonner";
import Loader from "../components/Loader";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    courseName: "",
    facultyName: "",
    bio: "",
    price: "",
    syllabus: "",
  });

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(ENDPOINTS.GET_COURSE_BY_ID(id));
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourse(data);
        setFormData({
          courseName: data.courseName || "",
          facultyName: data.facultyName || "",
          bio: data.bio || "",
          price: data.price || "",
          syllabus: data.syllabus || "",
        });
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "bio") {
      const words = e.target.value.split(/\s+/);
      if (words.length > 20) return;
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit updated course
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      price: formData.price ? Number(formData.price) : 0,
    };

    try {
      const res = await fetch(ENDPOINTS.UPDATE_COURSE(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update course");

      toast.success("Course updated successfully");
      navigate("/courses");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen py-8 mt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
      

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-xl font-semibold text-gray-800">
              Course Information
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Update your course details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-8">
            {/* Course Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Course Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 text-gray-900"
                  placeholder="Enter course name"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Faculty Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Faculty Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="facultyName"
                  value={formData.facultyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 text-gray-900"
                  placeholder="Enter faculty name"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Bio{" "}
                <span className="text-gray-500 text-sm font-normal">
                  (20 words max)
                </span>
              </label>
              <div className="relative">
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 text-gray-900 resize-none"
                  placeholder="Brief description about the course"
                  required
                />
                <div className="absolute bottom-3 right-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      formData.bio.trim().split(/\s+/).filter(Boolean).length >=
                      20
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {formData.bio.trim().split(/\s+/).filter(Boolean).length}/20
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price (₹)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 text-gray-900"
                  placeholder="0.00"
                  min="0"
                />
              </div>
            </div>

            {/* Syllabus */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Syllabus
              </label>
              <div className="relative">
                <textarea
                  name="syllabus"
                  value={formData.syllabus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 text-gray-900 font-mono text-sm"
                  rows={10}
                  placeholder="Enter syllabus content. Use line breaks for sections."
                />
               
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate("/courses")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center space-x-2"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Updating Course...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Update Course</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
