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
    category: "",
    duration: "",
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
          category: data.category || "",
          duration: data.duration || "",
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
    <div className="min-h-screen pt-15">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Edit Mode
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      formData.price && Number(formData.price) > 0
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {formData.price && Number(formData.price) > 0
                      ? `Premium - ₹${Number(formData.price).toFixed(0)}`
                      : "Free"}
                  </span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-700 mb-4 leading-tight">
                  Update Course Details
                </h1>

                <p className="text-lg text-gray-700 max-w-2xl leading-relaxed mb-6">
                  Modify your course information below. All changes will be
                  reflected immediately after saving.
                </p>
              </div>

             
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Course Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 text-gray-900"
                    placeholder="Enter course name"
                    required
                  />
                </div>

                {/* Faculty Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Instructor Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="facultyName"
                    value={formData.facultyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 text-gray-900"
                    placeholder="Enter instructor name"
                    required
                  />
                </div>
              </div>

              {/* Category & Duration Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Category */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 text-gray-900"
                    placeholder="e.g., Programming, Design, Business"
                  />
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 text-gray-900"
                    placeholder="e.g., 8 weeks, Self-paced"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-3 max-w-md">
                <label className="block text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">₹</span>
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
                <p className="text-xs text-gray-500">
                  Set to 0 for free course
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Course Description{" "}
                  <span className="text-gray-500 text-sm font-normal">
                    (20 words max)
                  </span>
                </label>
                <div className="relative">
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 text-gray-900 resize-none"
                    placeholder="Brief description about the course"
                    required
                  />
                  <div className="absolute bottom-3 right-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        formData.bio.trim().split(/\s+/).filter(Boolean)
                          .length >= 20
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {formData.bio.trim().split(/\s+/).filter(Boolean).length}
                      /20
                    </span>
                  </div>
                </div>
              </div>

              {/* Syllabus */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Syllabus
                </label>
                <div className="relative">
                  <textarea
                    name="syllabus"
                    value={formData.syllabus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 text-gray-900 font-mono text-sm"
                    rows={12}
                    placeholder="Enter syllabus content. Use line breaks for sections."
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      One topic per line
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Each new line will be treated as a separate syllabus item
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/courses")}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center space-x-2"
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
    </div>
  );
};

export default UpdateCourse;
