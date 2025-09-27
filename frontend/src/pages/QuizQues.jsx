import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";

const QuizQues = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await axios.get(ENDPOINTS.GET_QUIZZES_BY_SUBJECT(id), {
          withCredentials: true,
        });

        if (res.data.quizzes && res.data.quizzes.length > 0) {
          setQuiz(res.data.quizzes[0]);
        } else {
          setQuiz(null);
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    const studentId = user?._id || user?.id;
    if (!studentId) {
      alert("You must be logged in as a student to submit the quiz!");
      return;
    }

    // Check if all questions are answered
    const unansweredQuestions = quiz.questions.filter(
      (_, index) => answers[index] === undefined
    ).length;

    if (
      unansweredQuestions > 0 &&
      !window.confirm(
        `You have ${unansweredQuestions} unanswered question(s). Submit anyway?`
      )
    ) {
      return;
    }

    const submissionData = {
      studentId,
      quizId: quiz._id,
      answers: quiz.questions.map((q, qIndex) => ({
        questionId: q._id,
        selectedIndex: answers[qIndex] !== undefined ? answers[qIndex] : null,
      })),
    };

    try {
      setSubmitting(true);
      const res = await axios.post(ENDPOINTS.SUBMIT_QUIZ, submissionData, {
        withCredentials: true,
      });
      setResult(res.data.result);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert(err.response?.data?.message || "Error submitting quiz");
    } finally {
      setSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setResult(null);
  };

  const calculateProgress = () => {
    if (!quiz) return 0;
    const answered = Object.keys(answers).length;
    return Math.round((answered / quiz.questions.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center mt-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md mx-auto">
          No quiz found for this subject.
        </div>
      </div>
    );
  }

  if (result) {
    const percentage = Math.round(
      (result.obtainedMarks / result.totalMarks) * 100
    );
    const isPass = percentage >= 70; // Assuming 70% is passing

    return (
      <div className="max-w-2xl mt-15 mx-auto p-6">
        <div
          className={`text-center p-8 rounded-lg border-2 ${
            isPass ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          }`}
        >
          <div
            className={`text-6xl font-bold mb-4 ${
              isPass ? "text-green-600" : "text-red-600"
            }`}
          >
            {percentage}%
          </div>
          <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
          <p className="text-lg mb-4">
            You scored: <strong>{result.obtainedMarks}</strong> out of{" "}
            <strong>{result.totalMarks}</strong>
          </p>
          <p
            className={`font-semibold ${
              isPass ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPass
              ? "Congratulations! You passed!"
              : "Keep practicing! You can try again."}
          </p>
          <button
            onClick={resetQuiz}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="max-w-4xl mt-10 mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
        <p className="text-gray-600 mb-4">{quiz.description}</p>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>
              Progress: {Object.keys(answers).length}/{quiz.questions.length}{" "}
              questions
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {quiz.questions.map((q, qIndex) => (
          <div
            key={q._id}
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start mb-4">
              <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-sm mr-3">
                {qIndex + 1}
              </span>
              <h3 className="text-lg font-semibold text-gray-800 flex-1">
                {q.text}
              </h3>
            </div>

            <div className="space-y-3 ml-9">
              {q.options.map((opt, oIndex) => (
                <label
                  key={oIndex}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    answers[qIndex] === oIndex
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={answers[qIndex] === oIndex}
                    onChange={() => handleOptionChange(qIndex, oIndex)}
                    className="hidden"
                  />
                  <div
                    className={`flex items-center justify-center w-5 h-5 rounded-full border mr-3 ${
                      answers[qIndex] === oIndex
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {answers[qIndex] === oIndex && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          disabled={submitting || Object.keys(answers).length === 0}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition duration-200 ${
            submitting || Object.keys(answers).length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 transform hover:scale-105"
          }`}
        >
          {submitting ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </span>
          ) : (
            "Submit Quiz"
          )}
        </button>
      </div>
    </div>
  );
};

export default QuizQues;
