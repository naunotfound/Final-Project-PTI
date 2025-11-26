import React, { useState, useMemo } from 'react';
// useNavigate is removed as it was not used in the previous code

// --- MOCK DATA ---
const MOCK_COURSES = [
  { 
    id: 1, 
    title: 'Dasar-dasar Pemrograman Python', 
    author: 'Adi Nugroho', 
    subject: 'Programming', 
    status: 'active', 
    chapters: 8,
    thumbnail: 'https://placehold.co/400x220/334155/ffffff?text=Python'
  },
  { 
    id: 2, 
    title: 'Pengenalan Statistika Data', 
    author: 'Bima Sakti', 
    subject: 'Data Science', 
    status: 'completed', 
    chapters: 10,
    thumbnail: 'https://placehold.co/400x220/0f766e/ffffff?text=Statistik'
  },
  { 
    id: 3, 
    title: 'Desain UX untuk Pemula', 
    author: 'Citra Dewi', 
    subject: 'Design', 
    status: 'catalog', // Will be ignored in this view
    chapters: 5,
    thumbnail: 'https://placehold.co/400x220/4f46e5/ffffff?text=UX/UI'
  },
  { 
    id: 4, 
    title: 'Jaringan Komputer Dasar', 
    author: 'Dedy Corbuzier', 
    subject: 'Networking', 
    status: 'active', 
    chapters: 6,
    thumbnail: 'https://placehold.co/400x220/be123c/ffffff?text=Networking'
  },
  { 
    id: 5, 
    title: 'Advanced JavaScript Concepts', 
    author: 'Ella Fitri', 
    subject: 'Programming', 
    status: 'completed', 
    chapters: 12,
    thumbnail: 'https://placehold.co/400x220/ca8a04/ffffff?text=JS'
  },
];


// =========================
//     MAIN COMPONENT
// =========================

function Courses() {
  // Only need state for search term now
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Filter MOCK_COURSES to only include ENROLLED courses (active or completed)
  const ENROLLED_COURSES = useMemo(() => 
    MOCK_COURSES.filter(
      (c) => c.status === 'active' || c.status === 'completed'
    ), []);

  // Filtered courses based on search term only
  const filteredCourses = useMemo(() => {
    let courses = ENROLLED_COURSES.filter(course => {
      // Search filter logic: checks title, author, and subject
      const lower = searchTerm.toLowerCase();
      if (searchTerm && !(
        course.title.toLowerCase().includes(lower) ||
        course.author.toLowerCase().includes(lower) ||
        course.subject.toLowerCase().includes(lower)
      )) return false;
      
      return true;
    });

    // Sorting the list alphabetically by title
    courses.sort((a, b) => a.title.localeCompare(b.title));

    return courses;
  }, [searchTerm, ENROLLED_COURSES]);


  const CourseCard = ({ course }) => {
    // Determine the button text based on status
    const buttonText = course.status === 'completed' ? 'Lihat Detail' : 'Lanjutkan Belajar';

    return (
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-[1.02] transition duration-300 cursor-pointer flex flex-col"
        onClick={() => console.log(`Navigating to course: ${course.title}`)} // Simulate navigation
      >
        <div className="relative h-40">
          <img 
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x220/f1f5f9/94a3b8?text=Course+Image"; }}
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <p className="text-sm font-semibold text-gray-500 mb-1">{course.subject}</p>
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 min-h-[56px]">
            {course.title}
          </h3>

          <p className="text-xs text-gray-500 mt-2 flex-grow">
            Oleh: <span className="font-medium text-gray-600">{course.author}</span>
          </p>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-gray-600">
                <span className="font-semibold">{course.chapters}</span> Bab
            </p>
            <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg active:scale-[0.98]">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  };


  // Check if there are no results
  const noResults = filteredCourses.length === 0;


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
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Courses;