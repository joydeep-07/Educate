import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "../utils/endpoints";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(ENDPOINTS.GET_BLOGS);
      if (!res.ok) throw new Error("Failed to fetch blogs");

      const data = await res.json();
      setBlogs(data.blogs || data || []); // support both {blogs:[]} and []
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorC message={error} />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        All Blogs
      </h1>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={blog._id || blog.id || index}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title || "Untitled"}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {blog.category || "Uncategorized"}
              </p>
              <p className="text-gray-600 line-clamp-3">
                {blog.summary || "No summary available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
