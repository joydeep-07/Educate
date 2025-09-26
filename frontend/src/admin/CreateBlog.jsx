import React, { useState } from "react";
import { FiFileText, FiLoader } from "react-icons/fi";
import { useForm } from "react-hook-form";
import AuthImagePattern from "../components/AuthImagePattern";
import { toast } from "sonner";

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      imgLink: "",
      category: "",
      summary: "",
      content: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      console.log("Blog Data Submitted:", data);
      toast.success("Blog data logged to console!");
      reset();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-10 mb-8 flex items-center justify-center p-4">
      <div className="w-full max-w-[1400px] overflow-hidden lg:grid lg:grid-cols-2 py-5 min-h-[500px]">
        {/* Left Side - Blog Form */}
        <div className="flex flex-col justify-center items-center p-4 sm:p-8">
          <div className="w-full max-w-md space-y-6">
            {/* Heading */}
            <div className="text-center mb-6">
              <div className="flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <FiFileText className="w-5 h-5 text-blue-600" />
                </div>
                <h1 className="text-xl font-bold mt-1 text-gray-800">
                  Create New Blog
                </h1>
                <p className="text-gray-600 text-sm">
                  Fill in the details to publish your blog
                </p>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="text-gray-700 text-sm font-medium mb-1 block"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className={`block w-full px-2 py-1 border-b ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm`}
                  placeholder="Enter blog title"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Image Link */}
              <div>
                <label
                  htmlFor="imgLink"
                  className="text-gray-700 text-sm font-medium mb-1 block"
                >
                  Image Link
                </label>
                <input
                  id="imgLink"
                  type="url"
                  className={`block w-full px-2 py-1 border-b ${
                    errors.imgLink ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm`}
                  placeholder="Paste image URL"
                  {...register("imgLink", {
                    required: "Image link is required",
                  })}
                />
                {errors.imgLink && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.imgLink.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="text-gray-700 text-sm font-medium mb-1 block"
                >
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  className={`block w-full px-2 py-1 border-b ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm`}
                  placeholder="e.g. Technology, Health, Lifestyle"
                  {...register("category", {
                    required: "Category is required",
                  })}
                />
                {errors.category && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Summary */}
              <div>
                <label
                  htmlFor="summary"
                  className="text-gray-700 text-sm font-medium mb-1 block"
                >
                  Summary
                </label>
                <input
                  id="summary"
                  type="text"
                  className={`block w-full px-2 py-1 border-b ${
                    errors.summary ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm`}
                  placeholder="Write a short summary (max 30 words)"
                  {...register("summary", {
                    required: "Summary is required",
                  })}
                />
                {errors.summary && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.summary.message}
                  </p>
                )}
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="content"
                  className="text-gray-700 text-sm font-medium mb-1 block"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  rows={5}
                  className={`block w-full px-2 py-1 border-b ${
                    errors.content ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-sm`}
                  placeholder="Write your full blog content here..."
                  {...register("content", {
                    required: "Content is required",
                  })}
                />
                {errors.content && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.content.message}
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
                    Publishing...
                  </>
                ) : (
                  "Publish Blog"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Image/Pattern */}
        <AuthImagePattern
          title="Share Your Thoughts "
          subtitle="Fill in the blog details to publish a new post"
        />
      </div>
    </div>
  );
};

export default CreateBlog;
