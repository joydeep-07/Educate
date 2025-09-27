import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../utils/endpoints";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";
// Removed AuthImagePattern since it wasn't used in the original CourseDetails example

export const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = async () => {
    try {
      // NOTE: Using ENDPOINTS.GET_BLOG_BY_ID(id) assumes this function exists and returns the correct URL
      const res = await fetch(ENDPOINTS.GET_BLOG_BY_ID(id));
      if (!res.ok) throw new Error("Failed to fetch blog");
      const data = await res.json();
      // Added data.blog fallback based on your original logic
      setBlog(data.blog || data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorC message={error} />;
  if (!blog) return <p className="text-center mt-10">Blog not found</p>;

  // Destructure for cleaner access and provide fallbacks
  const {
    title = "Untitled Blog Post",
    category = "General",
    author = "Unknown Author",
    summary = "No summary provided.",
    content = "No content available.",
    image, // Assuming the image URL is here
    imgLink, // Keeping imgLink if it's used as a secondary image source
  } = blog;

  // Function to determine the primary image URL
  const primaryImage = image || imgLink;

  return (
    // Use max-w-7xl for a wider layout, similar to the CourseDetails component
    <div className="min-h-screen pt-15">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section (Styled like the CourseDetails Header) */}
        <div className="overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              {/* Left Column: Title and Metadata */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {/* Category Badge */}
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {category}
                  </span>
                  {/* Optional: Add a 'New' or 'Reading Time' badge here if you have that data */}
                </div>

                {/* Blog Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-700 mb-4 leading-tight">
                  {title}
                </h1>

                {/* Author and Date/Read Time Metadata */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-gray-600 text-sm">Author</p>
                      <p className="font-semibold text-gray-900">{author}</p>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-gray-300"></div>

                  {/* Placeholder for Date/Read Time */}
                  <div>
                    <p className="text-gray-600 text-sm">Published</p>
                    <p className="font-semibold text-gray-900">
                      {blog.date
                        ? new Date(blog.date).toLocaleDateString()
                        : "Recent"}
                    </p>
                  </div>
                </div>

                {/* Summary/Bio */}
                <p className="text-lg text-gray-700 max-w-2xl leading-relaxed mb-6">
                  {summary}
                </p>

                {/* Optional: Add a social share button or similar CTAs */}
              </div>

              {/* Right Column: Featured Image/Thumbnail */}
              <div className="lg:w-120 w-full flex-shrink-0">
                <div className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center">
                  {primaryImage ? (
                    <img
                      src={primaryImage}
                      alt={`Featured image for ${title}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 mx-auto mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-12 5h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      No Featured Image
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section (Replaces the tabbed content area) */}
        <div className="p-8 max-w-8xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
            Article
          </h2>
          {/* Using 'prose' for good readability of the HTML content */}
          <div className="prose max-w-none text-gray-800 text-justify leading-relaxed">
            {/* NOTE: If blog.content is raw HTML, this works. 
              If it's just plain text, you might want to use <p>{content}</p> 
              or a library to safely render HTML.
            */}
            {content}
          </div>
        </div>

        {/* Optional: Add an author box or related posts section here */}
      </div>
    </div>
  );
};

export default BlogDetails;
