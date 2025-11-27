import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ArrowLeft, Mail, Briefcase, AlertCircle, Loader2, BookOpen } from 'lucide-react';
import { SmallCourseCard } from './subcomponents/interface-course';
import CourseDetailView from './subcomponents/course-detail';

const COURSES_SOURCE_URL = new URL('../temp/courses.json', import.meta.url);

// =======================================================================
// DUMMY DATA (Data Penuh untuk Simulasi)
// =======================================================================

const ALL_AUTHORS = [
    { 
        id: 1, 
        name: 'Adrian Dev', 
        courses: 2, 
        photo: 'https://placehold.co/100x100/334155/ffffff?text=AD', 
        description: 'Pakar pembangunan web & AI dengan pengalaman lebih dari 10 tahun di industri teknologi. Fokus pada teknologi React dan arsitektur serverless.',
        email: 'adrian.dev@example.com',
        expertise: 'Full-stack Development, Artificial Intelligence',
    },
    { 
        id: 2, 
        name: 'Bunga Sari', 
        courses: 1, 
        photo: 'https://placehold.co/100x100/10b981/ffffff?text=BS', 
        description: 'Perunding UX/UI dengan pengalaman lebih 5 tahun. Pemenang penghargaan desain antarmuka terbaik 2023.',
        email: 'bunga.sari@example.com',
        expertise: 'User Experience, Prototyping, Figma',
    },
    { 
        id: 3, 
        name: 'Prof. Candra', 
        courses: 1, 
        photo: 'https://placehold.co/100x100/9333ea/ffffff?text=PC', 
        description: 'Profesor Matematik terkemuka dengan fokus pada Aljabar Linear dan aplikasinya dalam Data Science.',
        email: 'prof.candra@example.com',
        expertise: 'Linear Algebra, Advanced Calculus, Data Science',
    },
];

// =======================================================================
// SUB-KOMPONEN DETAIL PENGAJAR (BARU)
// =======================================================================
const AuthorDetailView = ({ author, allCourses, onBack, onCourseClick }) => {
    // Mencari semua kursus yang dibuat oleh pengajar ini
    const authorCourses = useMemo(() => {
        return allCourses.filter(course => course.author === author.name);
    }, [author.name, allCourses]);

    const totalStudents = authorCourses.reduce((sum, course) => sum + course.students, 0);

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
            {/* Tombol Kembali */}
            <button
                onClick={onBack}
                className="mb-8 flex items-center text-blue-600 hover:text-blue-800 font-semibold transition text-sm py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-100"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Dashboard
            </button>

            {/* Header Profil */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-6 pb-6 border-b mb-6">
                <img 
                    src={author.photo} 
                    alt={author.name} 
                    className="w-28 h-28 rounded-full object-cover mb-4 sm:mb-0 border-4 border-blue-100 shadow-lg flex-shrink-0" 
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/334155/ffffff?text=A"; }} 
                />
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-1">{author.name}</h1>
                    <p className="text-xl font-semibold text-blue-600 mb-3">{author.expertise}</p>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center font-medium">
                            <BookOpen className="w-4 h-4 mr-1 text-gray-400" />
                            {authorCourses.length} Kursus
                        </span>
                        <span className="flex items-center font-medium">
                            <Briefcase className="w-4 h-4 mr-1 text-gray-400" />
                            Total {totalStudents.toLocaleString()} Pelajar
                        </span>
                        <a href={`mailto:${author.email}`} className="flex items-center text-blue-500 hover:text-blue-700">
                            <Mail className="w-4 h-4 mr-1" />
                            Kontak
                        </a>
                    </div>
                </div>
            </div>

            {/* Biodata / Deskripsi */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Tentang Pengajar</h2>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">{author.description}</p>
            </div>

            {/* Daftar Kursus */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Semua Kursus oleh {author.name}</h2>
                {authorCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {authorCourses.map(course => (
                            <SmallCourseCard 
                                key={course.id} 
                                course={course} 
                                onCourseClick={onCourseClick} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center bg-yellow-50 rounded-xl border border-yellow-200 text-yellow-700">
                        Pengajar ini belum memiliki kursus yang terdaftar saat ini.
                    </div>
                )}
            </div>
        </div>
    );
};



// =======================================================================
// KOMPONEN UTAMA DASHBOARD
// =======================================================================

const DashboardContent = () => {
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [coursesError, setCoursesError] = useState(null);
    // State untuk menguruskan pencarian dan tampilan
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    const loadCourses = useCallback(async () => {
        setLoadingCourses(true);
        setCoursesError(null);

        try {
            const response = await fetch(COURSES_SOURCE_URL);
            if (!response.ok) {
                throw new Error('Gagal memuat courses.json dari server.');
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('Struktur data courses.json tidak valid.');
            }

            setCourses(data);
            return;
        } catch (fetchError) {
            try {
                const fallbackModule = await import('../temp/courses.json');
                if (!Array.isArray(fallbackModule.default)) {
                    throw fetchError;
                }
                setCourses(fallbackModule.default);
                console.warn('Menggunakan fallback bundle courses.json karena fetch gagal:', fetchError);
                return;
            } catch (fallbackError) {
                const finalMessage = fallbackError?.message || fetchError?.message || 'Gagal memuat data kursus.';
                setCoursesError(finalMessage);
            }
        } finally {
            setLoadingCourses(false);
        }
    }, []);

    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    const latestCourses = useMemo(() => courses.slice(0, 5), [courses]);
    const popularCourses = useMemo(() => courses.filter(c => c.isPopular), [courses]);

    // Fungsi penapisan (Filter)
    const filterItems = (items, term) => {
        if (!Array.isArray(items)) return [];
        if (!term) return items;
        const lowerTerm = term.toLowerCase();
        return items.filter(item =>
            item.title?.toLowerCase().includes(lowerTerm) ||
            item.subject?.toLowerCase().includes(lowerTerm) ||
            item.author?.toLowerCase().includes(lowerTerm) ||
            item.description?.toLowerCase().includes(lowerTerm) // Untuk Authors
        );
    };

    // Senarai yang ditapis menggunakan useMemo
    const filteredLatestCourses = useMemo(() => filterItems(latestCourses, searchTerm), [searchTerm, latestCourses]);
    const filteredPopularCourses = useMemo(() => filterItems(popularCourses, searchTerm), [searchTerm, popularCourses]);
    const filteredPopularAuthors = useMemo(() => filterItems(ALL_AUTHORS, searchTerm), [searchTerm]);

    // Handler klik kursus (untuk membuka DetailView)
    const handleCourseClick = (course) => {
        setSelectedAuthor(null); // Tutup view author
        setSelectedCourse(course);
    };
    
    // HANDLER BARU: Klik Author
    const handleAuthorClick = (author) => {
        setSelectedCourse(null); // Tutup view kursus
        setSelectedAuthor(author);
    };

    // Handler kembali ke dashboard
    const handleBackToDashboard = () => {
        setSelectedCourse(null);
        setSelectedAuthor(null);
    };


    // Logik untuk ralat
    const hasSearchTerm = Boolean(searchTerm.trim());
    const noCourseResults = hasSearchTerm && filteredLatestCourses.length === 0 && filteredPopularCourses.length === 0;
    const noAuthorResults = hasSearchTerm && filteredPopularAuthors.length === 0;
    const noResultsAtAll = noCourseResults && noAuthorResults;

    // --- KONDISIONAL RENDER UTAMA ---

    // 1. JIKA Pengajar dipilih, paparkan Author Detail View
    if (selectedAuthor) {
        return (
            <AuthorDetailView 
                author={selectedAuthor} 
                allCourses={courses} 
                onBack={handleBackToDashboard} 
                onCourseClick={handleCourseClick} // Memungkinkan klik kursus dari halaman Author
            />
        );
    }
    
    // 2. JIKA Kursus dipilih, paparkan Course Detail View
    if (selectedCourse) {
        return <CourseDetailView course={selectedCourse} onBack={handleBackToDashboard} />;
    }

    // 3. JIKA TIADA yang dipilih, paparkan Dashboard
    return (
        <main className="flex-grow p-4 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                Selamat Datang, Adrian!
                <span className="ml-3 text-4xl" role="img" aria-label="Panda Emoji">🐼</span>
            </h2>

            {coursesError && (
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <div className="flex items-start space-x-3">
                        <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                        <div>
                            <p className="font-semibold">Gagal memuat data kursus</p>
                            <p className="text-sm text-red-600">{coursesError}</p>
                        </div>
                    </div>
                    <button
                        onClick={loadCourses}
                        className="self-start sm:self-auto px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
                    >
                        Coba Muat Ulang
                    </button>
                </div>
            )}

            {loadingCourses && !coursesError && (
                <div className="mb-6 flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sedang memuat daftar kursus...</span>
                </div>
            )}

            {/* Search Bar */}
            <div className="mb-8 relative">
                <input
                    type="text"
                    placeholder="Cari kursus, mata kuliah, atau pengajar..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-inner transition duration-150"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* Search Icon */}
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          
            {/* UTILITY CARDS (Hanya ditampilkan jika tidak ada pencarian aktif) */}
            {!searchTerm && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-b-4 border-blue-600 hover:shadow-xl transition duration-300">
                        <p className="text-xs sm:text-sm text-gray-500">Kursus Aktif</p>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mt-1">12</h3>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-b-4 border-amber-600 hover:shadow-xl transition duration-300">
                        <p className="text-xs sm:text-sm text-gray-500">Tugasan Tertunda</p>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-amber-600 mt-1">4</h3>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-b-4 border-green-600 hover:shadow-xl transition duration-300">
                        <p className="text-xs sm:text-sm text-gray-500">Kemajuan Keseluruhan</p>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-green-600 mt-1">85%</h3>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-b-4 border-purple-600 hover:shadow-xl transition duration-300">
                        <p className="text-xs sm:text-sm text-gray-500">Skor Total</p>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-purple-600 mt-1">92.5</h3>
                    </div>
                </div>
            )}

            
            {/* Tampilan jika tidak ada hasil pencarian */}
            {noResultsAtAll && (
                <div className="text-center p-10 bg-white rounded-xl shadow-lg mb-10 border border-gray-200">
                    <p className="text-xl font-semibold text-gray-700">Tidak ada hasil yang ditemukan. 😔</p>
                    <p className="text-gray-500 mt-2">Coba kata kunci lain, misalnya "React" atau "Prof. Candra".</p>
                </div>
            )}

            
            {/* LATEST COURSES */}
            {filteredLatestCourses.length > 0 && (
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-sky-500 pb-2">Kursus Terbaru {searchTerm ? `(Filter: "${searchTerm}")` : ''}</h3>
                    <div className="flex space-x-4 overflow-x-scroll pb-4 scrollbar-hide">
                        {filteredLatestCourses.map(course => (
                            <button 
                                key={course.id} 
                                onClick={() => handleCourseClick(course)} // Memanggil handler klik
                                className="min-w-[280px] w-[280px] text-left bg-white rounded-xl shadow-lg border border-gray-100 transition duration-300 transform hover:scale-[1.02] overflow-hidden cursor-pointer group p-0"
                            >
                                <img 
                                    src={course.thumbnail} 
                                    alt={course.title} 
                                    className="w-full h-36 object-cover rounded-t-xl group-hover:opacity-90 transition duration-300" 
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x220/334155/ffffff?text=LATEST"; }} 
                                />
                                <div className="p-4">
                                    <p className="text-md font-extrabold text-gray-900 line-clamp-2 mb-1" title={course.title}>{course.title}</p>
                                    <p className="text-xs text-sky-600 font-semibold">{course.subject} | {course.semester}</p>
                                    <p className="text-xs text-gray-500 mt-2">Oleh: <span className="font-medium text-gray-700">{course.author}</span></p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {/* POPULAR COURSES */}
            {filteredPopularCourses.length > 0 && (
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-green-600 pb-2">Kursus Popular {searchTerm ? `(Filter: "${searchTerm}")` : ''}</h3>
                    <div className="flex space-x-4 overflow-x-scroll pb-4 scrollbar-hide">
                        {filteredPopularCourses.map(course => (
                            <button 
                                key={course.id} 
                                onClick={() => handleCourseClick(course)} // Memanggil handler klik
                                className="min-w-[250px] w-[250px] text-left bg-white rounded-xl shadow-lg border border-gray-200 p-0 hover:border-green-600 hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-300 group"
                            >
                                <img 
                                    src={course.thumbnail} 
                                    alt={course.title} 
                                    className="w-full h-32 object-cover rounded-t-xl mb-0 group-hover:opacity-90 transition duration-300" 
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x220/334155/ffffff?text=POPULAR"; }} 
                                />
                                <div className="p-3">
                                    <p className="text-md font-bold text-gray-800 line-clamp-1">{course.title}</p>
                                    <div className="flex justify-between items-center text-sm mt-1">
                                        <span className="text-gray-600">Oleh: {course.author}</span>
                                        <span className="flex items-center text-yellow-500">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.042a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.042a1 1 0 00-1.175 0l-2.817 2.042c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            {course.rating}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{course.students.toLocaleString()} pelajar</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* POPULAR AUTHORS - Sekarang bisa di klik */}
            {filteredPopularAuthors.length > 0 && (
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-amber-500 pb-2">Pengajar Popular {searchTerm ? `(Filter: "${searchTerm}")` : ''}</h3>
                    <div className="flex space-x-4 overflow-x-scroll pb-4 scrollbar-hide">
                        {filteredPopularAuthors.map(author => (
                            <button 
                                key={author.id} 
                                onClick={() => handleAuthorClick(author)} // MENGAKTIFKAN KLIK
                                className="min-w-[180px] w-[180px] text-center bg-white rounded-xl shadow-lg p-4 border border-gray-100 transition duration-300 transform hover:scale-[1.02] hover:shadow-xl cursor-pointer"
                            >
                                <img 
                                    src={author.photo} 
                                    alt={author.name} 
                                    className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-amber-100" 
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/334155/ffffff?text=A"; }} 
                                />
                                <p className="text-md font-bold text-gray-800 line-clamp-1">{author.name}</p>
                                <p className="text-sm text-amber-600 font-semibold">{author.courses} Kursus</p>
                                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{author.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Activity Section (Hanya ditampilkan jika tidak ada filter pencarian aktif) */}
            {!searchTerm && (
                <div className="mt-6 bg-white p-6 rounded-xl shadow-lg border-t-2 border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Aktiviti Terkini</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-700">Selesai: Kuiz - Pembangunan Web</span>
                            <span className="text-xs text-green-600 font-semibold">Hari Ini</span>
                        </li>
                        <li className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-700">Tugasan Baru: Kalkulus I</span>
                            <span className="text-xs text-amber-600 font-semibold">Semalam</span>
                        </li>
                        <li className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-700">Kemajuan Kursus: Basis Data (75%)</span>
                            <span className="text-xs text-blue-600 font-semibold">2 hari yang lalu</span>
                        </li>
                    </ul>
                </div>
            )}
        </main>
    );
};

// Tambahkan beberapa komponen navigasi asal anda untuk mengelakkan ralat eksport jika ia diperlukan di tempat lain
const SidebarItem = ({ name, iconPath, onClick, isActive }) => (
    <li>
        <button
            onClick={onClick}
            className={`flex items-center space-x-3 p-3 text-lg font-medium rounded-lg transition duration-150 w-full text-left
                ${isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={"M4 6h16M4 12h16M4 18h16"} />
            </svg>
            <span>{name}</span>
        </button>
    </li>
);

// Eksport komponen utama
export default DashboardContent;