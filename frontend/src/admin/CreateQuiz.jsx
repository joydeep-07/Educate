import React, { useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";
import brain from "../assets/animation/brain.json";
import Lottie from "lottie-react";

const CreateQuiz = () => {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctIndex: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correctIndex: 0 },
    ]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value, optionIndex = null) => {
    const updatedQuestions = [...questions];
    if (field === "text") {
      updatedQuestions[index].text = value;
    } else if (field === "option") {
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === "correctIndex") {
      updatedQuestions[index].correctIndex = Number(value);
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const data = { subject, title, description, questions };
      const res = await axios.post(ENDPOINTS.CREATE_QUIZ, data, {
        withCredentials: true,
      });
      setMessage({ type: "success", text: "Quiz created successfully! 🎉" });
      // Reset form
      setSubject("");
      setTitle("");
      setDescription("");
      setQuestions([{ text: "", options: ["", "", "", ""], correctIndex: 0 }]);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Error creating quiz",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className=" mt-10 pl-10 flex ">
          <div className="md:w-1/2 px-4 pt-15">
            <h1 className="uppercase text-lg font-medium text-amber-500 tracking-widest pl-1">
              Explore Our Courses
            </h1>
            <h1 className="text-6xl md:text-[3.5rem] font-semibold text-gray-700">
              Create Question <br /> All Subjects Here
            </h1>
            <p className="max-w-lg pt-5 text-gray-600 leading-relaxed">
              Browse our complete collection of expert-led courses. From
              fundamentals to advanced topics, everything you need to level up
              your skills is right here.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center items-center">
            {/* Banner here --- Comming Soon */}
            <div className="flex h-100 w-100 flex-1 items-center justify-center">
              <Lottie animationData={brain} loop autoplay className="" />
            </div>
          </div>
        </div>

        {/* Quiz Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quiz Basic Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mathematics, Science, History"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter quiz title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe what this quiz is about..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Questions Section */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Questions ({questions.length})
                </h3>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                >
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Question
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {questions.map((q, qIndex) => (
                  <div
                    key={qIndex}
                    className="border border-gray-200 rounded-xl p-5 bg-gray-50 hover:bg-white transition duration-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Question {qIndex + 1}
                        </span>
                      </div>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition duration-200"
                          title="Remove question"
                        >
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Question Text */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Text *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your question here..."
                        value={q.text}
                        onChange={(e) =>
                          updateQuestion(qIndex, "text", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                      />
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Options (Select the correct one) *
                      </label>
                      {q.options.map((opt, oIndex) => (
                        <div
                          key={oIndex}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition duration-200"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm font-medium min-w-[24px] text-center">
                              {String.fromCharCode(65 + oIndex)}
                            </span>
                            <input
                              type="text"
                              placeholder={`Option ${oIndex + 1}`}
                              value={opt}
                              onChange={(e) =>
                                updateQuestion(
                                  qIndex,
                                  "option",
                                  e.target.value,
                                  oIndex
                                )
                              }
                              className="flex-1 p-2 border-none focus:ring-0 focus:outline-none"
                              required
                            />
                          </div>
                          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition duration-200">
                            <input
                              type="radio"
                              name={`correct-${qIndex}`}
                              checked={q.correctIndex === oIndex}
                              onChange={() =>
                                updateQuestion(qIndex, "correctIndex", oIndex)
                              }
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              Correct
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-medium transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Quiz...
                  </>
                ) : (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Create Quiz
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        
      </div>
    </div>
  );
};

export default CreateQuiz;
