import { useState } from "react";

interface Course {
  course_title: string;
  course_rating: number;
  course_description: string;
  course_organization: string;
  course_time: string;
  course_skills: string[] | string;
  course_url: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  
  const [expanded, setExpanded] = useState(false);

  const formatSkills = (skills: string[] | string): string => {
    if (Array.isArray(skills)) {
      return skills.join(", ");
    }
    try {
      if (typeof skills === "string") {
        const parsed = JSON.parse(skills.replace(/'/g, '"'));
        return Array.isArray(parsed) && parsed.length > 0 ? parsed.join(", ") : "-- not available --";
      }
      return "-- not available --";
    } catch {
      return "-- not available --";
    }
  };

  return (
    <div className="font-sans bg-white text-slate-700 rounded-xl shadow-md p-6 transition-all ease-in-out duration-200 border border-slate-200 hover:-translate-y-0.5 hover:shadow-xl flex flex-col h-full mb-6">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-100">
        <h3 className="text-xl font-semibold text-slate-800 flex-1 mr-4 leading-snug">
          {course.course_title}
        </h3>
        <div className="flex items-center bg-amber-100 px-2 py-1 rounded-md whitespace-nowrap">
          <span className="text-amber-500 mr-1 text-sm">★</span>
          <span className="font-semibold text-amber-800 text-sm">
            {course.course_rating}
          </span>
        </div>
      </div>

      {/* Card Body & Expander */}
      <div className="flex-grow">
        <p className={`text-slate-600 leading-relaxed text-justify text-base px-4 m-0 transition-all duration-300 ${
            expanded ? "line-clamp-none" : "line-clamp-5"
        }`}>
          {course.course_description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 text-sm font-medium hover:underline mt-2 px-4 mb-4"
        >
          {expanded ? "Read less" : "Read more..."}
        </button>
      </div>

      {/* Card Footer */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
            <span className="font-medium text-slate-500 text-sm">Organization:</span>
            <span className="text-slate-800 font-medium text-sm text-right">
              {course.course_organization}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
            <span className="font-medium text-slate-500 text-sm">Duration:</span>
            <span className="text-slate-800 font-medium text-sm text-right">
              {course.course_time}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md md:col-span-full">
            <span className="font-medium text-slate-500 text-sm">Skills:</span>
            <span className="text-slate-800 font-medium text-sm text-right">
              {formatSkills(course.course_skills)}
            </span>
          </div>
        </div>
        
        <a
          href={course.course_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-br from-blue-500 to-blue-700 text-white no-underline px-6 py-3 rounded-lg font-semibold text-center transition-all ease-in-out duration-200 text-base hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-800 hover:-translate-y-px hover:shadow-lg hover:shadow-blue-500/40"
        >
          View Course
        </a>
      </div>
    </div>
  );
};

export default CourseCard;