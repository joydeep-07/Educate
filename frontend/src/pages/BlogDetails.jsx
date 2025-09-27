import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../utils/endpoints";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = async () => {
    try {
      const res = await fetch(ENDPOINTS.GET_BLOG_BY_ID(id)); 
      if (!res.ok) throw new Error("Failed to fetch blog");
      const data = await res.json();
      setBlog(data.blog || data);
    } catch (err) {
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

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>
      <img src={blog.imgLink} alt="" />
      <p className="text-sm text-gray-500 mb-4">
        {blog.category} • {blog.author || "Unknown Author"}
      </p>
      <p className="text-gray-700 leading-relaxed mb-6">{blog.summary}</p>
      <div className="prose max-w-none text-gray-800">{blog.content}</div>
    </div>
  );
};

export default BlogDetails;
