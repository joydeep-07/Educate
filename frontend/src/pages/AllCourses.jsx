import React, { useEffect, useState } from "react";
// Import useNavigate for navigation
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../utils/endpoints";
import { toast } from "sonner";
import Loader from "../components/Loader";
import ErrorC from "../components/Error";
import { useSelector } from "react-redux";
import brain from '../assets/animation/brain.json'
import Lottie from "lottie-react";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize navigation hook
  const navigate = useNavigate();

  // Ge Admin from redux
  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(ENDPOINTS.GET_COURSES);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = (course) => {
    const isFree = !course.price || Number(course.price) <= 0;

    if (isFree) {
      navigate("/enroll", { state: { courseId: course._id } });
    } else {
      navigate("/payment", {
        state: { courseId: course._id, price: course.price },
      });
    }
  };
 


 const handleDelete = async (id) => {
   if (!window.confirm("Are you sure you want to delete this course?")) return;

   try {
     const res = await fetch(ENDPOINTS.DELETE_COURSE(id), {
       method: "DELETE",
     });

     if (!res.ok) {
       throw new Error("Failed to delete course");
     }

     toast.success("Course deleted successfully");

     // Remove the deleted course from state instantly (no need to refetch all)
     setCourses((prev) => prev.filter((course) => course._id !== id));
   } catch (err) {
     console.error(err);
     toast.error("Error deleting course");
   }
 };


  const handleUpdate = (id) => {
    navigate(`/admin/updatecourse/${id}`);
  };


  if (loading) return <Loader />;
  if (error) return <ErrorC />;
  if (!courses.length) {
    return (
      <>
        <div className=" mt-10 pl-10 flex ">
          <div className="md:w-1/2 px-4 pt-15">
            <h1 className="uppercase text-lg font-medium text-amber-500 tracking-widest pl-1">
              Explore Our Courses
            </h1>
            <h1 className="text-6xl md:text-[3.5rem] font-semibold text-gray-700">
              All Courses <br /> Available Here
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

        
        <div className="py-10 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-600 mb-2">
              No Courses available right now
            </h2>
            <p className="text-gray-500">Check back later for new courses!</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="mt-10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex ">
          <div className="md:w-1/2 px-4 pt-15">
            <h1 className="uppercase text-lg font-medium text-amber-500 tracking-widest pl-1">
              Explore Our Courses
            </h1>
            <h1 className="text-6xl md:text-[3.5rem] font-semibold text-gray-700">
              All Courses <br /> Available Here
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

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col"
            >
              {/* Course Header */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 leading-tight">
                  {course.courseName}
                </h2>
                <p className="text-sm text-gray-600 font-medium">
                  {course.facultyName}
                </p>
              </div>

              {/* Course Content */}
              <div className="p-3 flex-1">
                <div className="mb-6">
                  <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
                    About Course
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {course.bio || "About Course not Defined"}
                  </p>
                </div>
              </div>

              {/* Action Section with Price - pushed to bottom */}
              <div className="px-6 py-3 border-t border-gray-100 mt-auto">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium text-emerald-700">
                    {course.price && Number(course.price) > 0
                      ? `₹${Number(course.price).toFixed(0)}`
                      : "Free"}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {/* Normal user buttons */}
                    {!admin && (
                      <>
                        <button
                          className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
                          onClick={() => navigate(`/details/${course._id}`)}
                        >
                          Details
                        </button>

                        {/* <button
                          className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                          onClick={() => handleEnroll(course)}
                        >
                          Enroll
                        </button> */}
                      </>
                    )}

                    {/* Admin-only buttons */}
                    {admin && (
                      <>
                        <button
                          className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
                          onClick={() => navigate(`/details/${course._id}`)}
                        >
                          Details
                        </button>

                        <button
                          className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors duration-200"
                          onClick={() => handleUpdate(course._id)}
                        >
                          Update
                        </button>
                        <button
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                          onClick={() => handleDelete(course._id)}
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

export default AllCourses;
