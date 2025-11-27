import React, { useState, useMemo, useCallback } from 'react';
import coursesData from '../temp/courses.json';
import { SmallCourseCard } from './subcomponents/interface-course';
import CourseDetailView from './subcomponents/course-detail';


const ALL_COURSES = Array.isArray(coursesData) ? coursesData : [];

// =========================
//     MAIN COMPONENT
// =========================

function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = useMemo(() => {
    const lower = searchTerm.trim().toLowerCase();
    const nextCourses = [...ALL_COURSES];

    const filtered = nextCourses.filter(course => {
      if (!lower) return true;
      return (
        course.title?.toLowerCase().includes(lower) ||
        course.author?.toLowerCase().includes(lower) ||
        course.subject?.toLowerCase().includes(lower) ||
        course.subtitle?.toLowerCase().includes(lower)
      );
    });

    filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    return filtered;
  }, [searchTerm]);

  const handleCourseClick = useCallback((course) => {
    setSelectedCourse(course);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  const noResults = filteredCourses.length === 0;


  if (selectedCourse) {
    return (
      <div className="p-4 sm:p-8 max-w-5xl mx-auto font-sans">
        <CourseDetailView course={selectedCourse} onBack={handleBackToList} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto font-sans">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 border-b pb-4">
        Daftar Kursus Saya 🎓
      </h2>

      {/* Control Panel: Search Bar (Tabs are removed) */}
      <div className="flex justify-center mb-10 w-full">
        
        {/* Search Bar centered */}
        <div className="relative flex-1 max-w-xl w-full">
          <input
            type="text"
            placeholder="Cari kursus berdasarkan judul, penulis, atau subjek..."
            className="w-full pl-10 pr-4 py-3 text-gray-700 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Search Icon SVG */}
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>
      
      {/* Course Grid */}
      {noResults ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-xl font-semibold text-gray-700 mb-2">Tidak Ada Kursus Ditemukan</p>
          <p className="text-gray-500">Coba ubah kata kunci pencarian Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <SmallCourseCard key={course.id} course={course} onCourseClick={handleCourseClick} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Courses;