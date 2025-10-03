import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "../utils/endpoints";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";
import { toast } from "sonner";

const AnswerScripts = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(ENDPOINTS.GET_SUBMISSIONS, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch submissions");

        const data = await res.json();
        console.log("Fetched submissions:", data);

        // handle array or object with submissions key
        setSubmissions(Array.isArray(data) ? data : data.submissions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const daySuffix = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const options = { month: "long", year: "numeric" };
    const monthYear = new Intl.DateTimeFormat("en-US", options).format(date);

    return `${day}${daySuffix(day)} ${monthYear}`;
  }

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aValue, bValue;

      switch (sortConfig.key) {
        case "student":
          aValue = `${a?.student?.firstname || ""} ${
            a?.student?.lastname || ""
          }`.toLowerCase();
          bValue = `${b?.student?.firstname || ""} ${
            b?.student?.lastname || ""
          }`.toLowerCase();
          break;
        case "quiz":
          aValue = a?.quiz?.subject?.toLowerCase() || "";
          bValue = b?.quiz?.subject?.toLowerCase() || "";
          break;
        case "score":
          aValue = a?.obtainedMarks / a?.totalMarks || 0;
          bValue = b?.obtainedMarks / b?.totalMarks || 0;
          break;
        case "date":
          aValue = new Date(a?.createdAt);
          bValue = new Date(b?.createdAt);
          break;
        default:
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredData = submissions.filter((submission) => {
    const studentName = `${submission?.student?.firstname || ""} ${
      submission?.student?.lastname || ""
    }`.toLowerCase();
    const quizName = submission?.quiz?.subject?.toLowerCase() || "";
    return (
      studentName.includes(searchTerm.toLowerCase()) ||
      quizName.includes(searchTerm.toLowerCase())
    );
  });

  const sortedData = getSortedData();

  const getScorePercentage = (submission) => {
    if (!submission?.obtainedMarks || !submission?.totalMarks) return 0;
    return (submission.obtainedMarks / submission.totalMarks) * 100;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600 bg-green-50";
    if (percentage >= 60) return "text-blue-600 bg-blue-50";
    if (percentage >= 40) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  if (loading) return <Loader />;
  if (error) return <ErrorC message={error} />;

  return (
    <div className="min-h-screen mt-10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 ">
            Answer Scripts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review and manage student submissions with detailed performance
            insights
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Submissions Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              There are no answer scripts available at the moment. Submissions
              will appear here once students complete their quizzes.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Table Header with Search */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-75">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {filteredData.length} submission
                    {filteredData.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search students or quizzes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none "
                  />
                  <svg
                    className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r  from-gray-50 to-gray-75 border-b border-gray-200">
                  <tr>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      onClick={() => handleSort("index")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>#</span>
                        {sortConfig.key === "index" && (
                          <svg
                            className={`w-4 h-4 ${
                              sortConfig.direction === "desc"
                                ? "transform rotate-180"
                                : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      onClick={() => handleSort("student")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Student</span>
                        {sortConfig.key === "student" && (
                          <svg
                            className={`w-4 h-4 ${
                              sortConfig.direction === "desc"
                                ? "transform rotate-180"
                                : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      onClick={() => handleSort("quiz")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Quiz</span>
                        {sortConfig.key === "quiz" && (
                          <svg
                            className={`w-4 h-4 ${
                              sortConfig.direction === "desc"
                                ? "transform rotate-180"
                                : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      onClick={() => handleSort("score")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Score</span>
                        {sortConfig.key === "score" && (
                          <svg
                            className={`w-4 h-4 ${
                              sortConfig.direction === "desc"
                                ? "transform rotate-180"
                                : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Submitted</span>
                        {sortConfig.key === "date" && (
                          <svg
                            className={`w-4 h-4 ${
                              sortConfig.direction === "desc"
                                ? "transform rotate-180"
                                : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedData.map((submission, index) => {
                    const scorePercentage = getScorePercentage(submission);
                    const scoreColor = getScoreColor(scorePercentage);

                    return (
                      <tr
                        key={submission._id || index}
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group cursor-pointer"
                        onClick={() => toast.info("Feature coming soon!")}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-white transition-colors duration-200">
                              <span className="text-sm font-medium text-gray-700">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 shadow-sm">
                              {submission?.student?.firstname?.charAt(0) || "U"}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {submission?.student?.firstname || "Unknown"}{" "}
                                {submission?.student?.lastname || ""}
                              </div>
                              <div className="text-xs text-gray-500">
                                Student
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {submission?.quiz?.subject || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {submission?.quiz?.topic || "Quiz"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {submission?.obtainedMarks !== undefined &&
                          submission?.totalMarks !== undefined ? (
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-700">
                                    Performance
                                  </span>
                                  <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${scoreColor}`}
                                  >
                                    {scorePercentage.toFixed(1)}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-[4px]">
                                  <div
                                    className={`h-[4px] rounded-full transition-all duration-500 ${
                                      scorePercentage >= 80
                                        ? "bg-green-500"
                                        : scorePercentage >= 60
                                        ? "bg-blue-500"
                                        : scorePercentage >= 40
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{
                                      width: `${Math.max(5, scorePercentage)}%`,
                                    }}
                                  ></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                Scored  {submission.obtainedMarks} /{" "}
                                Out of  {submission.totalMarks} 
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">
                            {submission?.createdAt
                              ? formatDate(submission.createdAt)
                              : "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {submission?.createdAt
                              ? new Date(
                                  submission.createdAt
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : ""}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            {sortedData.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-75">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>
                    Showing {sortedData.length} of {submissions.length}{" "}
                    submissions
                  </span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toast.info("Export Feature coming soon!")}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Export</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerScripts;
