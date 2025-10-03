import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "../utils/endpoints";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";

const AnswerScripts = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


  if (loading) return <Loader />;
  if (error) return <ErrorC message={error} />;

  return (
    <div className="mt-15 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Answer Scripts</h1>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-600">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Student</th>
                <th className="px-4 py-2 border">Quiz</th>
                <th className="px-4 py-2 border">Score</th>
                <th className="px-4 py-2 border">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={submission._id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    {submission?.student?.firstname || "Unknown"}{" "}
                    {submission?.student?.lastname || ""}
                  </td>
                  <td className="px-4 py-2 border">
                    {submission?.quiz?.subject || "N/A"}
                  </td>
                  <td className="px-4 py-2 border">
                    {submission?.score ?? "-"}
                  </td>

                  <td className="px-4 py-2 border">
                    {submission?.createdAt
                      ? formatDate(submission.createdAt)
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AnswerScripts;
