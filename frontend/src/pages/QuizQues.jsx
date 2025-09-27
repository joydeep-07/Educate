import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";

const QuizQues = () => {
  const { id } = useParams(); // id = subject or quizId
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  // Get logged-in student from Redux
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        // Fetch quiz by subject
        const res = await axios.get(ENDPOINTS.GET_QUIZZES_BY_SUBJECT(id), {
          withCredentials: true,
        });
        // Take the first quiz if multiple
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
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    // Get studentId from Redux user
    const studentId = user?._id || user?.id;
    if (!studentId) {
      console.log("User object:", user);
      alert("You must be logged in as a student to submit the quiz!");
      return;
    }

    // Prepare submission data
    const submissionData = {
      studentId,
      quizId: quiz._id,
      answers: quiz.questions.map((q, qIndex) => ({
        questionId: q._id,
        selectedIndex: answers[qIndex] !== undefined ? answers[qIndex] : null,
      })),
    };

    try {
      const res = await axios.post(ENDPOINTS.SUBMIT_QUIZ, submissionData, {
        withCredentials: true,
      });
      alert(
        `Quiz submitted! You scored: ${res.data.result.obtainedMarks}/${res.data.result.totalMarks}`
      );
      // Optionally reset answers
      setAnswers({});
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert(err.response?.data?.message || "Error submitting quiz");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!quiz) return <div className="text-center mt-5">No quiz found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-5">{quiz.title}</h2>
      <p className="mb-5">{quiz.description}</p>

      {quiz.questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-4 border p-3 rounded">
          <h3 className="font-semibold mb-2">
            {qIndex + 1}. {q.text}
          </h3>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, oIndex) => (
              <label key={oIndex} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  checked={answers[qIndex] === oIndex}
                  onChange={() => handleOptionChange(qIndex, oIndex)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizQues;
