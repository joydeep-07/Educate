import React, { useState, useEffect } from "react";
import {
  FiFile,
  FiUpload,
  FiTrash2,
  FiMessageSquare,
  FiLoader,
} from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

const AddNotes = () => {
  const [formData, setFormData] = useState({
    subjectName: "",
    topic: "",
    contents: [],
    caption: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-quad",
      once: true,
      offset: 50,
      disable: "mobile",
    });
    AOS.refresh();

    return () => {
      formData.contents.forEach((item) => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const maxFileSize = 10 * 1024 * 1024;

    const newFiles = files
      .map((file) => {
        if (file.size > maxFileSize) {
          console.error(
            `File "${file.name}" is too large. Maximum size is 10MB.`
          );
          return null;
        }
        return {
          file,
          id: crypto.randomUUID(),
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null,
          type: file.type.startsWith("image/") ? "image" : "document",
        };
      })
      .filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      contents: [...prev.contents, ...newFiles],
    }));
  };

  const handleRemoveFile = (id) => {
    setFormData((prev) => ({
      ...prev,
      contents: prev.contents.filter((item) => {
        if (item.id === id && item.preview) {
          URL.revokeObjectURL(item.preview);
        }
        return item.id !== id;
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submitted:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        subjectName: "",
        topic: "",
        contents: [],
        caption: "",
      });
    }, 1500);
  };

  const formatSize = (size) => {
    if (size >= 1024 * 1024) return (size / (1024 * 1024)).toFixed(1) + " MB";
    return (size / 1024).toFixed(1) + " KB";
  };

  const getFileIcon = (fileExtension) => {
    switch (fileExtension) {
      case "pdf":
        return <FiFile className="text-red-500" />;
      case "doc":
      case "docx":
        return <FiFile className="text-blue-400" />;
      case "xls":
      case "xlsx":
        return <FiFile className="text-green-500" />;
      default:
        return <FiFile className="text-gray-500" />;
    }
  };

  return (
    <div className="flex justify-center min-h-screen py-10">
      <div
        className="w-full max-w-3xl rounded-xl overflow-hidden"
        data-aos="fade-up"
      >
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full space-y-8">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <FiMessageSquare className="w-6 h-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl font-bold mt-2 text-gray-800">
                  Create New Post
                </h1>
                <p className="text-gray-600">
                  Share your knowledge with others
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject Name */}
              <div>
                <label
                  htmlFor="subjectName"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Subject Name
                </label>
                <input
                  id="subjectName"
                  name="subjectName"
                  type="text"
                  className="block w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Mathematics, Physics, etc."
                  value={formData.subjectName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Topic */}
              <div>
                <label
                  htmlFor="topic"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Topic
                </label>
                <input
                  id="topic"
                  name="topic"
                  type="text"
                  className="block w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Algebra, Thermodynamics, etc."
                  value={formData.topic}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Content (Images, PDFs, Docs)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                      >
                        <span className="flex items-center gap-1">
                          <FiUpload className="h-4 w-4" />
                          Upload files
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          multiple
                          accept=".jpg,.jpeg,.png,.pdf,.docx,.xls,.xlsx"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF, DOCX, XLS up to 10MB
                    </p>
                  </div>
                </div>

                {/* Uploaded files */}
                {formData.contents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.contents.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 border border-gray-200 rounded-md group hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {item.type === "image" ? (
                            <div className="relative w-10 h-10">
                              <img
                                src={item.preview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded">
                              {getFileIcon(item.file.name.split(".").pop())}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatSize(item.file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove file"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Caption */}
              <div>
                <label
                  htmlFor="caption"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Caption
                </label>
                <textarea
                  id="caption"
                  name="caption"
                  rows={3}
                  className="block w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Add a description..."
                  value={formData.caption}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin h-4 w-4 mr-2" />
                      Creating Post...
                    </>
                  ) : (
                    "Create Post"
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

export default AddNotes;
