import React, { useState } from "react";
import { FiBookOpen, FiLoader } from "react-icons/fi";
import { useForm } from "react-hook-form";
import AuthImagePattern from "../components/AuthImagePattern";
import { ENDPOINTS } from "../utils/endpoints";
import { toast } from "sonner";
const AddCourse = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseName: "",
      facultyName: "",
      bio: "",
      syllabus: "",
      price: "",
      duration: "",
      category: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    if (data.bio.trim().split(/\s+/).filter(Boolean).length > 20) {
      alert("Bio cannot exceed 20 words");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(ENDPOINTS.ADD_COURSE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      toast.success(result.message);
      reset();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-20 mb-8 flex items-center justify-center p-4">
      <div className="w-full max-w-[1300px] bg-white rounded-lg shadow-lg overflow-hidden lg:grid lg:grid-cols-2 py-5 min-h-[500px]">
        {/* Left Side - Add Course Form */}
        <div className="flex flex-col justify-center items-center p-4 sm:p-8">
          <div className="w-full max-w-md space-y-6">
            {/* Heading */}
            <div className="text-center mb-6">
              <div className="flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <FiBookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <h1 className="text-xl font-bold mt-1 text-gray-800">
                  Add New Course
                </h1>
                <p className="text-gray-600 text-sm">
                  Fill in the details to add a course
                </p>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Course Name */}
              <div>
                <label
                  htmlFor="courseName"
                  className="flex items-center text-gray-700 text-sm font-medium mb-1 gap-2"
                >
                  Course Name
                </label>
                <input
                  id="courseName"
                  type="text"
                  className={`block w-full px-2 py-1 border-b ${
                    errors.courseName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm rounded-md`}
                  placeholder="Enter course name"
                  {...register("courseName", {
                    required: "Course Name is required",
                  })}
                />
                {errors.courseName && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.courseName.message}
                  </p>
                )}
              </div>

              {/* Faculty Name */}
              <div>
                <label
                  htmlFor="facultyName"
                  className="flex items-center text-gray-700 text-sm font-medium mb-1 gap-2"
                >
                  Faculty Name
                </label>
                <input
                  id="facultyName"
                  type="text"
                  className={`block w-full px-2 py-1 border-b ${
                    errors.facultyName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm rounded-md`}
                  placeholder="Enter faculty name"
                  {...register("facultyName", {
                    required: "Faculty Name is required",
                  })}
                />
                {errors.facultyName && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.facultyName.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="flex items-center text-gray-700 text-sm font-medium mb-1 gap-2"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  className={`block w-full px-2 py-1 border-b ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm rounded-md`}
                  placeholder="Enter Price or Leave black if Free"
                  {...register("price", {
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="flex items-center text-gray-700 text-sm font-medium mb-1 gap-2"
                >
                  Bio (20 words max)
                </label>
                <input
                  id="bio"
                  type="text"
                  className={`block w-full px-2 py-1 border-b ${
                    errors.bio ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm rounded-md`}
                  placeholder="Enter a short bio"
                  {...register("bio", {
                    required: "Bio is required",
                  })}
                />
                {errors.bio && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor="duration"
                  className="flex items-center text-gray-700 text-sm font-medium mb-1 gap-2"
                >
                  Duration
                </label>
                <input
                  id="duration"
                  type="text"
                  className={`block w-full px-2 py-1 border-b ${
                    errors.duration ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm rounded-md`}
                  placeholder="e.g. 6 weeks / 3 months"
                  {...register("duration", {
                    required: "Duration is required",
                  })}
                />
                {errors.duration && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="flex items-center text-gray-700 text-sm font-medium mb-1 gap-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  className={`block w-full px-2 py-1 border-b ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm rounded-md`}
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option value="">Select category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Design">Design</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Syllabus */}
              <div>
                <label
                  htmlFor="syllabus"
                  className="flex items-center text-gray-700 text-sm font-medium mb-1 gap-2"
                >
                  Syllabus
                </label>
                <textarea
                  id="syllabus"
                  rows={4}
                  className={`block w-full px-2 py-1 border-b ${
                    errors.syllabus ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm rounded-md`}
                  placeholder="Enter syllabus details"
                  {...register("syllabus", {
                    required: "Syllabus is required",
                  })}
                />
                {errors.syllabus && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.syllabus.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="h-4 w-4 animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  "Add Course"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Image/Pattern */}
        <AuthImagePattern
          title="Namaste Sir ji !"
          subtitle="Fill in the course details to add a new course"
        />
      </div>
    </div>
  );
};

export default AddCourse;
