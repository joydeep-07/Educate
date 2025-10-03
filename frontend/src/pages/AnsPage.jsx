import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../utils/endpoints";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";
import { toast } from "sonner";
import {
  Calendar,
  User,
  BookOpen,
  Award,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const AnsPage = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  useEffect(() => {
    const fetchSubmission = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(ENDPOINTS.GET_SUBMISSION_BY_ID(id), {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch submission");

        const data = await res.json();
        setSubmission(data.submission);

        // Expand all questions by default
        if (data.submission?.answers) {
          setExpandedQuestions(
            new Set(data.submission.answers.map((_, idx) => idx))
          );
        }
      } catch (err) {
        toast.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id]);

  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleAllQuestions = () => {
    if (!submission?.answers) return;

    if (expandedQuestions.size === submission.answers.length) {
      setExpandedQuestions(new Set());
    } else {
      setExpandedQuestions(new Set(submission.answers.map((_, idx) => idx)));
    }
  };

  const calculateScorePercentage = () => {
    if (!submission) return 0;
    return ((submission.obtainedMarks / submission.totalMarks) * 100).toFixed(
      1
    );
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (percentage) => {
    if (percentage >= 80) return "bg-green-50 border-green-200";
    if (percentage >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  if (loading) return <Loader />;
  if (error) return <ErrorC message={error} />;
  if (!submission)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-10">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No submission found
          </h2>
          <p className="text-gray-500">
            The requested submission could not be loaded.
          </p>
        </div>
      </div>
    );

  const scorePercentage = calculateScorePercentage();

  return (
    <div className="min-h-screen py-8 mt-5">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submission Details
          </h1>
          <p className="text-gray-600">
            Review student performance and answers
          </p>
        </div>

        {/* Summary Cards */}

        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student Info */}
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-blue-600 text-xs uppercase font-semibold tracking-wide">
                  Student
                </p>
                <p className="text-lg font-medium text-gray-700 truncate">
                  {submission.student.firstname} {submission.student.lastname}
                </p>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {submission.student.email}
                </p>
              </div>
            </div>

            {/* Quiz Info */}
            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-purple-600 text-xs uppercase font-semibold mb-0 tracking-wide">
                  Quiz
                </p>
                <p className="text-lg font-medium text-gray-700 truncate">
                  {submission.quiz.subject}
                </p>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {submission.quiz.title}
                </p>
              </div>
            </div>

            {/* Submission Date */}
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-green-600 text-xs uppercase font-semibold tracking-wide">
                  Submitted
                </p>
                <p className="text-lg font-medium text-gray-700">
                  {new Date(submission.createdAt)
                    .toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                    .replace(/(\d+)(?= )/, (d) => {
                      // Add ordinal (st, nd, rd, th) to day
                      const day = parseInt(d);
                      if (day === 1 || day === 21 || day === 31)
                        return day + "st";
                      if (day === 2 || day === 22) return day + "nd";
                      if (day === 3 || day === 23) return day + "rd";
                      return day + "th";
                    })}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(submission.createdAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Questions & Answers
              </h2>
              <button
                onClick={toggleAllQuestions}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {expandedQuestions.size === submission.answers.length
                  ? "Collapse All"
                  : "Expand All"}
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-1">
              {submission.answers.length} questions •{" "}
              {submission.answers.filter((a) => a.correct).length} correct
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {submission.answers.map((ans, idx) => {
              const isExpanded = expandedQuestions.has(idx);
              const isCorrect = ans.correct;

              return (
                <div
                  key={ans.questionId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleQuestion(idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCorrect
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <XCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-left">
                          Q{idx + 1}: {ans.questionText}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Marks: {ans.marksObtained} •{" "}
                          {isCorrect ? "Correct" : "Incorrect"}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>

                  {/* Expandable Content */}
                  {isExpanded && (
                    <div className="px-6 pb-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Options:
                        </h4>
                        <ul className="space-y-2">
                          {ans.options?.map((opt, i) => {
                            const isSelected = i === ans.selectedIndex;
                            const isCorrectOption = isSelected && isCorrect;

                            return (
                              <li
                                key={i}
                                className={`p-3 rounded-lg border transition-colors ${
                                  isCorrectOption
                                    ? "bg-green-50 border-green-200 text-green-800"
                                    : isSelected
                                    ? "bg-red-50 border-red-200 text-red-800"
                                    : "bg-white border-gray-200 text-gray-700"
                                }`}
                              >
                                <div className="flex items-center">
                                  <span className="flex-1">{opt}</span>
                                  {isCorrectOption && (
                                    <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
                                  )}
                                  {isSelected && !isCorrect && (
                                    <XCircle className="h-4 w-4 text-red-600 ml-2" />
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {submission.answers.length}
              </p>
              <p className="text-sm text-gray-600">Total Questions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {submission.answers.filter((a) => a.correct).length}
              </p>
              <p className="text-sm text-gray-600">Correct Answers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {submission.answers.filter((a) => !a.correct).length}
              </p>
              <p className="text-sm text-gray-600">Incorrect Answers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {scorePercentage}%
              </p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnsPage;
