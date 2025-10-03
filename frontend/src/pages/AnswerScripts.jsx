import React, { useEffect, useState, useMemo, useCallback } from "react";
// Import Lucide icons
import {
  FileText, // Used for 'No Submissions Found'
  Search, // Used for the Search Input
  ArrowDown, // Used for Sort Indicator
  FileDigit, // Used for Table Count
  Download, // Used for Export
  User, // Fallback for student initial (optional, kept the original initial logic)
} from "lucide-react";

import { ENDPOINTS } from "../utils/endpoints";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";
import { toast } from "sonner";

// --- Helper Functions (moved outside the component for clarity/reusability) ---

/**
 * Formats a date string into a readable format like "1st October 2025".
 * Uses Intl.DateTimeFormat for a cleaner month/year format.
 * @param {string} dateString
 * @returns {string} Formatted date string
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();

  // Simple and concise day suffix logic
  const daySuffix = (d) => {
    if (d > 3 && d < 21) return "th";
    const lastDigit = d % 10;
    if (lastDigit === 1) return "st";
    if (lastDigit === 2) return "nd";
    if (lastDigit === 3) return "rd";
    return "th";
  };

  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);

  return `${day}${daySuffix(day)} ${monthYear}`;
};

// Functions to extract sortable values from a submission object
const getStudentName = (submission) =>
  `${submission?.student?.firstname || ""} ${
    submission?.student?.lastname || ""
  }`.toLowerCase();
const getQuizSubject = (submission) =>
  submission?.quiz?.subject?.toLowerCase() || "";
const getScoreRatio = (submission) =>
  (submission?.obtainedMarks || 0) / (submission?.totalMarks || 1);
const getCreatedAt = (submission) => new Date(submission?.createdAt);

// Mapping sort keys to their respective value getters
const sortValueGetters = {
  student: getStudentName,
  quiz: getQuizSubject,
  score: getScoreRatio,
  date: getCreatedAt,
  index: (s, i) => i,
};

// --- React Component ---

const AnswerScripts = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");

  // Data Fetching
  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(ENDPOINTS.GET_SUBMISSIONS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch submissions");
        }

        const data = await res.json();
        const submissionData = Array.isArray(data)
          ? data
          : data.submissions || [];
        setSubmissions(submissionData);
      } catch (err) {
        toast.error(`Error fetching data: ${err.message}`);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Handles the sorting state change
  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  // Simplified and consolidated score logic
  const getScorePercentage = (submission) => {
    const obtained = submission?.obtainedMarks;
    const total = submission?.totalMarks;
    if (obtained === undefined || total === undefined || total === 0) return 0;
    return (obtained / total) * 100;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600 bg-green-50";
    if (percentage >= 60) return "text-blue-600 bg-blue-50";
    if (percentage >= 40) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  // Data Filtering (Optimized with useMemo)
  const filteredData = useMemo(() => {
    if (!searchTerm) return submissions;
    const lowerCaseSearch = searchTerm.toLowerCase();

    return submissions.filter((submission) => {
      const studentName = getStudentName(submission);
      const quizSubject = getQuizSubject(submission);

      return (
        studentName.includes(lowerCaseSearch) ||
        quizSubject.includes(lowerCaseSearch)
      );
    });
  }, [submissions, searchTerm]);

  // Data Sorting (Optimized with useMemo)
  const sortedData = useMemo(() => {
    const { key, direction } = sortConfig;
    if (!key) return filteredData;

    const valueGetter = sortValueGetters[key];

    return [...filteredData].sort((a, b, indexA, indexB) => {
      const aValue = valueGetter(a, indexA);
      const bValue = valueGetter(b, indexB);

      let comparison = 0;

      // Type-aware comparison for strings, numbers, and dates
      if (aValue < bValue) comparison = -1;
      else if (aValue > bValue) comparison = 1;

      return direction === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortConfig]);

  // --- Render Logic ---

  if (loading) return <Loader />;
  if (error) return <ErrorC message={error} />;

  const SortIndicator = ({ sortKey }) =>
    sortConfig.key === sortKey ? (
      <ArrowDown
        size={16}
        className={
          sortConfig.direction === "desc"
            ? "transform rotate-0"
            : "transform rotate-180"
        }
      />
    ) : null;

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

        {/* No Submissions State */}
        {submissions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-12 h-12 text-gray-400" />{" "}
              {/* Lucide Icon */}
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
          /* Submissions Table */
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Table Header with Search */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-75">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-2">
                  <FileDigit className="w-5 h-5 text-gray-400" />{" "}
                  {/* Lucide Icon */}
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
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />{" "}
                  {/* Lucide Icon */}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-75 border-b border-gray-200">
                  <tr>
                    {/* Simplified Column Headers */}
                    {[
                      { key: "index", label: "#" },
                      { key: "student", label: "Student" },
                      { key: "quiz", label: "Quiz" },
                      { key: "score", label: "Score" },
                      { key: "date", label: "Submitted" },
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                        onClick={() => handleSort(key)}
                      >
                        <div className="flex items-center space-x-1">
                          <span>{label}</span>
                          <SortIndicator sortKey={key} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedData.map((submission, index) => {
                    const scorePercentage = getScorePercentage(submission);
                    const scoreColor = getScoreColor(scorePercentage);
                    const studentInitial =
                      submission?.student?.firstname?.charAt(0) || "U";
                    const studentName = `${
                      submission?.student?.firstname || "Unknown"
                    } ${submission?.student?.lastname || ""}`.trim();

                    return (
                      <tr
                        key={submission._id || index}
                        className="hover:bg-indigo-200/10 transition-all duration-200 group cursor-pointer"
                        onClick={() => toast.info("Feature coming soon!")}
                      >
                        {/* # Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-white transition-colors duration-200">
                              <span className="text-sm font-medium text-gray-700">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                        </td>
                        {/* Student Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {/* Retained original initial-based avatar logic */}
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 shadow-sm">
                              {studentInitial}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {studentName}
                              </div>
                              <div className="text-xs text-gray-500">
                                Student
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* Quiz Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {submission?.quiz?.subject || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {submission?.quiz?.topic || "Quiz"}
                          </div>
                        </td>
                        {/* Score Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {submission?.totalMarks !== undefined ? (
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
                                  Scored {submission.obtainedMarks ?? "-"} / Out
                                  of {submission.totalMarks ?? "-"}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        {/* Submitted Date Column */}
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
                      <Download className="w-4 h-4" /> {/* Lucide Icon */}
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
