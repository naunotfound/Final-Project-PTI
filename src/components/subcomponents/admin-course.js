import React from 'react';
import adminCourses from '../../temp/admin_courses.json';

const safeCourses = Array.isArray(adminCourses) ? adminCourses : [];

const CourseSummaryCard = ({ course, onSelectCourse }) => {
    const ratingLabel = typeof course.rating === 'number' ? course.rating.toFixed(1) : course.rating || '-';
    const studentLabel = typeof course.students === 'number' ? course.students.toLocaleString() : course.students || '0';

    return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition duration-200">
        <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => onSelectCourse?.(course.id)}
        >
            <img
                src={course.thumbnail}
                alt={course.title}
                className="w-20 h-16 object-cover rounded-lg border border-gray-100"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/160x120/f1f5f9/94a3b8?text=Course';
                }}
            />
            <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    {course.subject} • {course.semester}
                </p>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{course.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{course.subtitle}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                    <span>Rating {ratingLabel}</span>
                    <span>{studentLabel} pelajar</span>
                </div>
            </div>
        </div>
        <button
            type="button"
            onClick={() => onSelectCourse?.(course.id)}
            className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
        >
            Kelola
        </button>
    </div>
    );
};

const AdminCourseList = ({ onSelectCourse }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Course yang Anda Buat</h2>
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {safeCourses.length} Course
            </span>
        </div>

        <div className="space-y-4">
            {safeCourses.map((course) => (
                <CourseSummaryCard key={course.id} course={course} onSelectCourse={onSelectCourse} />
            ))}
        </div>

        {safeCourses.length === 0 && (
            <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
                Belum ada course yang Anda unggah.
            </p>
        )}
    </div>
);

export default AdminCourseList;
