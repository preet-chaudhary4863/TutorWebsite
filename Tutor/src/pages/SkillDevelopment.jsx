import { useState } from "react";
import { PrimaryButton } from "../components/ui/Button";

const courses = [
  {
    title: "MERN Stack",
    description: "Learn to build full-stack web applications using MongoDB, Express, React, and Node.js.",
  },
  {
    title: "Data Analytics",
    description: "Master data analysis techniques and tools to make data-driven decisions.",
  },
  {
    title: "Frontend React",
    description: "Develop modern, responsive web interfaces using React and related tools.",
  },
];

export default function SkillDevelopment() {
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  const handleEnroll = (courseTitle) => {
    setEnrolledCourse(courseTitle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
        Skill Development Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {course.title}
            </h2>
            <p className="text-gray-600 mb-6">{course.description}</p>
            <PrimaryButton onClick={() => handleEnroll(course.title)}>
              Enroll Now
            </PrimaryButton>
          </div>
        ))}
      </div>
      {enrolledCourse && (
        <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-md">
          <h3 className="text-xl font-semibold text-green-800">
            Successfully Enrolled!
          </h3>
          <p className="text-green-700">
            You have enrolled in the <strong>{enrolledCourse}</strong> course.
          </p>
        </div>
      )}
    </div>
  );
}