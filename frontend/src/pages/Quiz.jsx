import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";

const Quiz = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(ENDPOINTS.GET_SUBJECTS, {
          withCredentials: true,
        });
        setSubjects(res.data.subjects || []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError("Failed to load subjects. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const handleClick = (subject) => {
    navigate(`/quiz/question/${subject}`);
  };

  // Color palette for subject cards
  const colorPalettes = [
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600",
    "from-purple-500 to-purple-600",
    "from-red-500 to-red-600",
    "from-orange-500 to-orange-600",
    "from-teal-500 to-teal-600",
    "from-pink-500 to-pink-600",
    "from-indigo-500 to-indigo-600",
  ];

  const getRandomColor = (index) => {
    return colorPalettes[index % colorPalettes.length];
  };

  const getSubjectIcon = (subject) => {
    const icons = {
      mathematics: "🧮",
      science: "🔬",
      history: "📜",
      geography: "🌍",
      english: "📚",
      physics: "⚛️",
      chemistry: "🧪",
      biology: "🧬",
      computer: "💻",
      art: "🎨",
      music: "🎵",
      sports: "⚽",
    };

    const subjectLower = subject.toLowerCase();
    for (const [key, icon] of Object.entries(icons)) {
      if (subjectLower.includes(key)) return icon;
    }

    // Default icons based on subject length or other criteria
    const defaultIcons = ["📖", "🎯", "🧠", "💡", "🌟"];
    return defaultIcons[subject.length % defaultIcons.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading subjects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Quiz Subjects
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose a subject to start testing your knowledge. Each quiz contains
            carefully crafted questions to challenge your understanding.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Subjects Grid */}
        {subjects.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-lg p-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Subjects Available
            </h3>
            <p className="text-gray-600 mb-6">
              It looks like there are no quiz subjects available at the moment.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-200"
            >
              Check Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(subject)}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div
                    className={`bg-gradient-to-br ${getRandomColor(
                      index
                    )} rounded-2xl shadow-lg overflow-hidden h-48 relative`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                      <div>
                        <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                          {getSubjectIcon(subject)}
                        </div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">
                          {subject}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-blue-100 text-sm font-medium">
                          Start Quiz
                        </span>
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>

            
          </>
        )}

        {/* Footer Info */}
       
      </div>
    </div>
  );
};

export default Quiz;
