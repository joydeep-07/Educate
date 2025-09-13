import React, { useEffect, useState } from "react";
import { FiFile } from "react-icons/fi";

const DashBoard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
   const fetchNotes = async () => {
     try {
       const res = await fetch("http://localhost:3000/api/notes", {
         method: "GET",
         credentials: "include",
         headers: {
           "Content-Type": "application/json",
         },
       });

       if (!res.ok) throw new Error("Failed to fetch notes");

       const data = await res.json();
       setNotes(data);

       // Log ImageKit URLs to console
       data.forEach((note) => {
         if (note.contents && note.contents.length > 0) {
           note.contents.forEach((file) => {
             console.log("ImageKit File URL:", file.fileUrl);
           });
         }
       });
     } catch (error) {
       console.error("Error fetching notes:", error);
     } finally {
       setLoading(false);
     }
   };

   fetchNotes();
 }, []);


  const getFileIcon = (extension) => {
    switch (extension.toLowerCase()) {
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

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading notes...</div>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">All Notes</h1>

      {notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes found.</p>
      ) : (
        <div className="space-y-5">
          {notes.map((note) => (
            <div
              key={note._id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              {/* Author */}
              <p className="text-sm text-gray-500 mb-2">
                Created by:{" "}
                <span className="font-semibold">
                  {note.author?.name || note.author?.email || "Unknown"}
                </span>
              </p>

              {/* Subject & Topic */}
              <h2 className="text-xl font-semibold">
                {note.subjectName} - {note.topic}
              </h2>

              {/* Caption */}
              {note.caption && (
                <p className="text-gray-700 mt-2">{note.caption}</p>
              )}

              {/* Uploaded Files */}
              {note.contents && note.contents.length > 0 && (
                <div className="mt-3 space-y-2">
                  {note.contents.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border border-gray-200 rounded-md group hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {file.fileType === "image" ? (
                          <div className="relative w-20 h-20">
                            <img
                              src={file.url}
                              alt={file.fileName}
                              loading="lazy"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded">
                            {getFileIcon(file.fileName.split(".").pop())}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <a
                            href={file.fileUrl} // <-- ImageKit URL
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-900 truncate hover:underline"
                          >
                            {file.fileName}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Created Date */}
              <p className="text-sm text-gray-400 mt-2">
                Created: {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashBoard;
