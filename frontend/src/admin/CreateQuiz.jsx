import React, { useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";

const CreateQuiz = () => {
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctIndex: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Add new empty question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correctIndex: 0 },
    ]);
  };

  // Remove question
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Update question field
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

  // Submit quiz
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const data = { subject, title, description, questions };
      const res = await axios.post(ENDPOINTS.CREATE_QUIZ, data, {
        withCredentials: true,
      });
      setMessage("Quiz created successfully!");
      // Reset form
      setSubject("");
      setTitle("");
      setDescription("");
      setQuestions([{ text: "", options: ["", "", "", ""], correctIndex: 0 }]);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error creating quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-5 text-center">Create Quiz</h2>
      {message && <div className="mb-4 text-center">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Quiz info */}
        <div>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
        </div>

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border p-4 rounded mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Question {qIndex + 1}</h3>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Question text"
              value={q.text}
              onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />

            {/* Options */}
            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="flex items-center mb-1">
                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) =>
                    updateQuestion(qIndex, "option", e.target.value, oIndex)
                  }
                  className="flex-1 p-2 border rounded mr-2"
                  required
                />
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctIndex === oIndex}
                    onChange={() =>
                      updateQuestion(qIndex, "correctIndex", oIndex)
                    }
                  />
                  Correct
                </label>
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Question
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
