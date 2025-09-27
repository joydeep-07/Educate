import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";

const Quiz = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(ENDPOINTS.GET_SUBJECTS, {
          withCredentials: true,
        });
        setSubjects(res.data.subjects || []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, []);

  const handleClick = (subject) => {
    // Navigate to quiz questions for the first quiz under this subject
    // Or you can implement a page that lists quizzes for this subject
    navigate(`/quiz/question/${subject}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-5 text-center">Quiz Subjects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="p-5 bg-blue-100 rounded cursor-pointer hover:bg-blue-200 text-center"
            onClick={() => handleClick(subject)}
          >
            {subject}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
