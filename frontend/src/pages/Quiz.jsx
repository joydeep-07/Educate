import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import { toast } from "sonner";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";
import { useSelector } from "react-redux";
import brain from "../assets/animation/brain.json";
import Lottie from "lottie-react";

const Quiz = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get Admin from redux
  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get(ENDPOINTS.GET_SUBJECTS, {
          withCredentials: true,
        });
        setSubjects(res.data.subjects || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const handleStartQuiz = (subject) => {
    navigate(`/quiz/question/${subject}`);
  };

  const handleDeleteSubject = async (subject) => {
    if (!window.confirm(`Are you sure you want to delete the ${subject} quiz?`))
      return;

    try {
      const res = await fetch(ENDPOINTS.DELETE_SUBJECT(subject), {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete subject");
      }

      toast.success("Quiz subject deleted successfully");
      setSubjects((prev) => prev.filter((s) => s !== subject));
    } catch (err) {
      console.error(err);
      toast.error("Error deleting quiz subject");
    }
  };

  const handleCreateQuiz = () => {
    navigate("/admin/create-quiz");
  };

  const handleUpdateQuiz = (subject) => {
    navigate(`/admin/update-quiz/${subject}`);
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

    const defaultIcons = ["📖", "🎯", "🧠", "💡", "🌟"];
    return defaultIcons[subject.length % defaultIcons.length];
  };

  if (loading) return <Loader />;
  if (error) return <ErrorC />;

  if (!subjects.length) {
    return (
      <>
        <div className="mt-10 pl-10 flex">
          <div className="md:w-1/2 px-4 pt-15">
            <h1 className="uppercase text-lg font-medium text-amber-500 tracking-widest pl-1">
              Explore Our Quizzes
            </h1>
            <h1 className="text-6xl md:text-[3.5rem] font-semibold text-gray-700">
              All Quizzes <br /> Available Here
            </h1>
            <p className="max-w-lg pt-5 text-gray-600 leading-relaxed">
              Test your knowledge with our interactive quizzes. From mathematics
              to science, challenge yourself and track your progress across
              various subjects.
            </p>
            {admin && (
              <button
                onClick={handleCreateQuiz}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Create New Quiz
              </button>
            )}
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
              No quizzes available right now.
            </h2>
            <p className="text-gray-500">Check back later for new quizzes!</p>
            {admin && (
              <button
                onClick={handleCreateQuiz}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Create First Quiz
              </button>
            )}
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
              Explore Our Quizzes
            </h1>
            <h1 className="text-6xl md:text-[3.5rem] font-semibold text-gray-700">
              All Quizzes <br /> Available Here
            </h1>
            <p className="max-w-lg pt-5 text-gray-600 leading-relaxed">
              Test your knowledge with our interactive quizzes. From mathematics
              to science, challenge yourself and track your progress across
              various subjects.
            </p>
            {admin && (
              <button
                onClick={handleCreateQuiz}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Create New Quiz
              </button>
            )}
          </div>

          <div className="md:w-1/2 flex justify-center items-center">
            <div className="flex h-100 w-100 flex-1 items-center justify-center">
              <Lottie animationData={brain} loop autoplay className="" />
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col"
            >
              {/* Quiz Header with Gradient */}
              <div className={`p-6 bg-gradient-to-br ${getRandomColor(index)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1 leading-tight">
                      {subject}
                    </h2>
                    <p className="text-sm text-blue-100 font-medium">
                      Interactive Quiz
                    </p>
                  </div>
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                    {getSubjectIcon(subject)}
                  </div>
                </div>
              </div>

              {/* Quiz Content */}
              <div className="p-6 flex-1">
                <div className="mb-4">
                  <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
                    About This Quiz
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Test your knowledge in {subject.toLowerCase()} with
                    carefully crafted questions designed to challenge your
                    understanding and help you learn.
                  </p>
                </div>

                <div className="flex items-center text-sm text-gray-500 mt-4">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>10-15 minutes</span>
                </div>
              </div>

              {/* Action Section */}
              <div className="px-6 py-4 border-t border-gray-100 mt-auto">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Multiple Choice
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {/* Normal user button */}
                    {!admin && (
                      <button
                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                        onClick={() => handleStartQuiz(subject)}
                      >
                        Start Quiz
                      </button>
                    )}

                    {/* Admin-only buttons */}
                    {admin && (
                      <>
                        <button
                          className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                          onClick={() => handleStartQuiz(subject)}
                        >
                          Take Quiz
                        </button>
                        <button
                          className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors duration-200"
                          onClick={() => handleUpdateQuiz(subject)}
                        >
                          Update
                        </button>
                        <button
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                          onClick={() => handleDeleteSubject(subject)}
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

export default Quiz;
