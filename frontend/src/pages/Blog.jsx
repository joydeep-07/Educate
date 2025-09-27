import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../utils/endpoints";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import brain from "../assets/animation/brain.json";
import Lottie from "lottie-react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { admin } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await fetch(ENDPOINTS.GET_BLOGS);
      if (!res.ok) throw new Error("Failed to fetch blogs");

      const data = await res.json();
      setBlogs(data.blogs || data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(ENDPOINTS.DELETE_BLOG(id), {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete blog");

      toast.success("Blog deleted successfully");
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Error deleting blog");
    }
  };

  const handleUpdate = (id) => {
    // navigate(`/admin/updateblog/${id}`);
    toast.info("Coming Soon !")
  };

  if (loading) return <Loader />;
  if (error) return <ErrorC message={error} />;

  if (!blogs.length) {
    return (
      <>
        <div className="mt-10 pl-10 flex">
          <div className="md:w-1/2 px-4 pt-15">
            <h1 className="uppercase text-lg font-medium text-amber-500 tracking-widest pl-1">
              Explore Our Blogs
            </h1>
            <h1 className="text-6xl md:text-[3.5rem] font-semibold text-gray-700">
              All Blogs <br /> Available Here
            </h1>
            <p className="max-w-lg pt-5 text-gray-600 leading-relaxed">
              Browse our complete collection of insightful blogs. From industry
              trends to expert opinions, everything you need to stay informed is
              right here.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center items-center">
            <div className="flex h-100 w-100 flex-1 items-center justify-center">
              <Lottie animationData={brain} loop autoplay className="" />
            </div>
          </div>
        </div>
        <div className="py-10 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-600 mb-2">
              No Blogs available right now
            </h2>
            <p className="text-gray-500">Check back later for new blogs!</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="mt-10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          <div className="md:w-1/2 px-4 pt-15">
            <h1 className="uppercase text-lg font-medium text-amber-500 tracking-widest pl-1">
              Explore Our Blogs
            </h1>
            <h1 className="text-6xl md:text-[3.5rem] font-semibold text-gray-700">
              All Blogs <br /> Available Here
            </h1>
            <p className="max-w-lg pt-5 text-gray-600 leading-relaxed">
              Browse our complete collection of insightful blogs. From industry
              trends to expert opinions, everything you need to stay informed is
              right here.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center items-center">
            <div className="flex h-100 w-100 flex-1 items-center justify-center">
              <Lottie animationData={brain} loop autoplay className="" />
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col"
            >
              {/* Blog Header with Image */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                )}
                <h2 className="text-xl font-semibold text-gray-800 mb-1 leading-tight">
                  {blog.title || "Untitled Blog"}
                </h2>
                <p className="text-sm text-gray-600 font-medium">
                  {blog.category || "Uncategorized"}
                </p>
              </div>

              {/* Blog Content */}
              <div className="p-3 flex-1">
                <div className="mb-6">
                  <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
                    Blog Summary
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {blog.summary || "No summary available"}
                  </p>
                </div>
              </div>

              {/* Action Section */}
              <div className="px-6 py-3 border-t border-gray-100 mt-auto">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    {blog.author || "Unknown Author"}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {/* Normal user buttons */}
                    {!admin && (
                      <button
                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                        onClick={() => navigate(`/blog/details/${blog._id}`)}
                      >
                        Read More
                      </button>
                    )}

                    {/* Admin-only buttons */}
                    {admin && (
                      <>
                        <button
                          className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
                          onClick={() => navigate(`/blog/details/${blog._id}`)}
                        >
                          View
                        </button>

                        <button
                          className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors duration-200"
                          onClick={() => handleUpdate(blog._id)}
                        >
                          Update
                        </button>

                        <button
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                          onClick={() => handleDelete(blog._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
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

export default Blog;
