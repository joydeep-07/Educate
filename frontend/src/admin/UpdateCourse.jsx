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
    syllabus: "", // added syllabus
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
          syllabus: data.syllabus || "", // initialize syllabus
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
      if (words.length > 20) return; // limit bio to 20 words
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
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Update Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Course Name
          </label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Faculty Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Faculty Name
          </label>
          <input
            type="text"
            name="facultyName"
            value={formData.facultyName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Bio (20 words max)
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Words: {formData.bio.trim().split(/\s+/).filter(Boolean).length}/20
          </p>
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min="0"
          />
        </div>

        {/* Syllabus */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Syllabus
          </label>
          <textarea
            name="syllabus"
            value={formData.syllabus}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 font-mono whitespace-pre-line"
            rows={10}
            placeholder="Enter syllabus. Use line breaks for sections."
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
