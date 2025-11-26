import React, { useState, useMemo, useEffect } from 'react';
import { FileText, Download, Folder, ArrowLeft, Lock, Unlock, BookOpen, File, Mail, Briefcase } from 'lucide-react';

// =======================================================================
// DUMMY DATA (Data Penuh untuk Simulasi)
// =======================================================================
const ALL_COURSES = [
    { 
        id: 1, 
        title: 'Tailwind CSS for Modern Web', 
        subtitle: 'Dasar-dasar Tailwind CSS & Utility-First Workflow',
        subject: 'Web Development', 
        semester: 'Genap 2024', 
        author: 'Adrian Dev', 
        rating: 4.8, 
        students: 1500,
        thumbnail: "https://placehold.co/400x220/334155/ffffff?text=Tailwind+CSS", 
        isPopular: true,
        content: "Selamat datang ke kursus Tailwind CSS! Di sini, anda akan belajar bagaimana untuk membina antaramuka pengguna yang cantik dan responsif dengan pantas tanpa perlu menulis sebarang CSS tersuai. \n\nModul termasuk: Utility-First Fundamentals, Responsive Design, State Variants (Hover, Focus), dan Customizing Configuration. Sesi latihan praktikal akan berfokus pada pembinaan kad, navigasi, dan borang.",
        enrollmentCount: 1500, // Data baru
        materials: [ // Data baru
            { name: 'Pengantar Tailwind.pdf', size: '1.5 MB', type: 'pdf' },
            { name: 'Utility-First Cheat Sheet.docx', size: '300 KB', type: 'doc' },
            { name: 'Studi Kasus Responsif.txt', size: '10 KB', type: 'txt' },
        ],
    },
    { 
        id: 2, 
        title: 'Pengantar Desain UX/UI', 
        subtitle: 'UI/UX Design | Genap 2024',
        subject: 'UX/UI Design', 
        semester: 'Genap 2024', 
        author: 'Bunga Sari', 
        rating: 4.5, 
        students: 2200,
        thumbnail: "https://placehold.co/400x220/10b981/ffffff?text=UX/UI+Design", 
        isPopular: true,
        content: "Kursus ini memperkenalkan prinsip-prinsip Asas Reka Bentuk Pengalaman Pengguna (UX) dan Antaramuka Pengguna (UI). Kami akan meneroka proses dari penyelidikan pengguna hingga prototaip akhir. \n\nTopik Utama: Penyelidikan Persona, Peta Perjalanan Pengguna, Wireframing, Prinsip Visual Design, dan Alat Figma.",
        enrollmentCount: 2200, // Data baru
        materials: [ // Data baru
            { name: 'UX Persona Guide.pdf', size: '2.2 MB', type: 'pdf' },
            { name: 'Wireframing Templates.docx', size: '450 KB', type: 'doc' },
        ],
    },
    { 
        id: 3, 
        title: 'Aljabar Linear', 
        subtitle: 'Aljabar Linear untuk Data Science',
        subject: 'Mathematics', 
        semester: 'Genap 2024', 
        author: 'Prof. Candra', 
        rating: 4.9, 
        students: 800,
        thumbnail: "https://placehold.co/400x220/9333ea/ffffff?text=Linear+Algebra", 
        isPopular: true,
        content: "Aljabar Linear adalah tulang belakang kepada bidang Data Science dan Machine Learning. Kursus ini merangkumi Vektor, Matriks, Ruang Vektor, dan Transformasi Linear. \n\nKami akan menekankan aplikasi praktikal seperti Principal Component Analysis (PCA) dan sistem persamaan linear yang digunakan dalam model statistik.",
        enrollmentCount: 800, // Data baru
        materials: [ // Data baru
            { name: 'Matriks dan Vektor.pdf', size: '3.0 MB', type: 'pdf' },
        ],
    },
    { 
        id: 4, 
        title: 'Deep Learning Part I', 
        subtitle: 'Artificial Intelligence | Ganjil 2025',
        subject: 'Artificial Intelligence', 
        semester: 'Ganjil 2025', 
        author: 'Adrian Dev', 
        rating: 4.7, 
        students: 1100,
        thumbnail: "https://placehold.co/400x220/f97316/ffffff?text=Deep+Learning", 
        isPopular: true,
        content: "Kursus ini merangkumi asas Deep Learning, bermula dari jaringan saraf tiruan asas (ANN) hingga Convolutional Neural Networks (CNN) dan Recurrent Neural Networks (RNN). \n\nPrasyarat: Pemahaman asas tentang Aljabar Linear dan Kalkulus. Anda akan bekerja dengan PyTorch/TensorFlow untuk melaksanakan projek klasifikasi imej dan penjanaan teks mudah.",
        enrollmentCount: 1100, // Data baru
        materials: [ // Data baru
            { name: 'Jaringan Saraf Tiruan.pdf', size: '5.5 MB', type: 'pdf' },
            { name: 'Latihan CNN PyTorch.txt', size: '20 KB', type: 'txt' },
        ],
    },
    { 
        id: 5, 
        title: 'Sistem Basis Data (SQL)', 
        subtitle: 'Basis Data Lanjut & Normalisasi',
        subject: 'Database', 
        semester: 'Genap 2024', 
        author: 'Dr. Emilia', 
        rating: 4.6, 
        students: 950,
        thumbnail: "https://placehold.co/400x220/0f172a/ffffff?text=SQL", 
        isPopular: false,
        content: "Fokus pada pengurusan basis data relasional. Kami akan mendalami pengoptimuman kueri, transaksi, dan normalisasi (1NF hingga 3NF). \n\nLatihan: Penulisan kueri kompleks menggunakan JOIN, Subqueries, dan Stored Procedures.",
        enrollmentCount: 950, // Data baru
        materials: [ // Data baru
            { name: 'Optimasi Query.pdf', size: '1.8 MB', type: 'pdf' },
            { name: 'Contoh Prosedur Tersimpan.docx', size: '150 KB', type: 'doc' },
        ],
    }
];

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
// SUB-KOMPONEN ITEM FILE MATERI (TIDAK BERUBAH)
// =======================================================================
const MaterialFileItem = ({ material }) => {
    let icon;
    let iconBgColor;

    switch (material.type) {
        case 'pdf':
            icon = <FileText className="w-5 h-5 text-red-600" />;
            iconBgColor = 'text-red-600';
            break;
        case 'doc':
        case 'docx':
            icon = <File className="w-5 h-5 text-blue-600" />;
            iconBgColor = 'text-blue-600';
            break;
        case 'txt':
            icon = <FileText className="w-5 h-5 text-gray-600" />;
            iconBgColor = 'text-gray-600';
            break;
        default:
            icon = <File className="w-5 h-5 text-gray-600" />;
            iconBgColor = 'text-gray-600';
    }

    const handlePreview = () => {
        // Implementasi logika pratinjau file di sini
        alert(`Simulasi: Membuka pratinjau untuk ${material.name}`);
    };
    
    return (
        <div 
            className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50 transition duration-150 cursor-pointer" 
            onClick={handlePreview}
        >
            <div className="flex items-start space-x-3">
                <div className={`pt-1 ${iconBgColor}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-base font-medium text-gray-800">{material.name}</p>
                    <p className="text-xs text-gray-500">{material.type.toUpperCase()} | {material.size}</p>
                </div>
            </div>
            
            <span className="text-blue-600 hover:text-blue-700 font-medium text-sm transition duration-150 p-2 rounded-lg">
                Pratinjau
            </span>
        </div>
    );
};


// =======================================================================
// SUB-KOMPONEN CARD KURSUS KECIL (Digunakan dalam AuthorDetailView)
// =======================================================================
const SmallCourseCard = ({ course, onCourseClick }) => {
    return (
        <button 
            onClick={() => onCourseClick(course)} 
            className="w-full text-left bg-white rounded-xl shadow-md border border-gray-100 transition duration-300 transform hover:scale-[1.02] overflow-hidden cursor-pointer group p-0"
        >
            <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-28 object-cover rounded-t-xl group-hover:opacity-90 transition duration-300" 
                onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/400x120/cccccc/000000?text=${course.title}`; }} 
            />
            <div className="p-3">
                <p className="text-md font-extrabold text-gray-900 line-clamp-2 mb-1">{course.title}</p>
                <p className="text-xs text-sky-600 font-semibold">{course.subject} | {course.semester}</p>
                <p className="flex items-center text-yellow-500 text-xs mt-1">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.042a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.042a1 1 0 00-1.175 0l-2.817 2.042c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {course.rating}
                </p>
            </div>
        </button>
    );
};


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
// SUB-KOMPONEN DETAIL KURSUS (TIDAK BERUBAH)
// =======================================================================

/**
 * Komponen untuk Tampilan Detail Course
 */
const CourseDetailView = ({ course, onBack }) => {
    const [isEnrolled, setIsEnrolled] = useState(false); 

    const handleEnroll = () => {
        alert(`Simulasi: Anda berhasil mendaftar ke kursus ${course.title}!`);
        setIsEnrolled(true); 
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
            {/* Tombol Kembali */}
            <button
                onClick={onBack}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-semibold transition text-sm py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-100"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Dashboard
            </button>

            {/* Gambar Thumbnail */}
            <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-48 object-cover rounded-xl mb-6 shadow-md" 
                onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x200/cccccc/000000?text=${course.title}`; }} 
            />

            {/* Info Course & Metadata */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 border-b pb-4 mb-6">
                <span className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mr-4 mb-2 ${course.subject === 'Web Development' ? 'bg-sky-100 text-sky-600' : course.subject === 'UX/UI Design' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                    {course.subject} • {course.semester}
                </span>
                <p className="mr-4 mb-2">Oleh: <span className="font-medium text-gray-700">{course.author}</span></p>
                <p className="flex items-center text-yellow-500 mb-2">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.042a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.042a1 1 0 00-1.175 0l-2.817 2.042c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {course.rating} ({course.students.toLocaleString()} pelajar)
                </p>
                <p className="flex items-center text-gray-500 ml-4 mb-2">
                    <BookOpen className="w-4 h-4 mr-1 text-blue-500" />
                    {course.materials?.length || 0} Materi • 
                    <Download className="w-4 h-4 ml-3 mr-1 text-green-500" />
                    {course.enrollmentCount?.toLocaleString() || course.students.toLocaleString()} Unduhan
                </p>
            </div>


            {/* Judul dan Subtitle */}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-xl font-semibold text-gray-700 mb-6">{course.subtitle}</p>


            {/* Konten Utama Course (Apa yang akan dipelajari) */}
            <div className="prose max-w-none text-gray-800 whitespace-pre-line border-t pt-6 mb-8">
                <p className="text-2xl font-bold mb-4 text-blue-600">Apa yang akan anda pelajari:</p>
                <pre className="p-4 bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto text-base leading-relaxed">
                    {course.content}
                </pre>
            </div>
            
            {/* ========================================================= */}
            {/* KONDISI 1: BELUM TERDAFTAR (Locked View) */}
            {/* ========================================================= */}
            {!isEnrolled && (
                <div className="mt-8 pt-6 border-t">
                    <div className="p-8 rounded-xl text-center border-2 border-dashed border-red-300 bg-red-50">
                        <Lock className="w-10 h-10 mx-auto text-red-500 mb-4" />
                        <p className="text-red-700 font-bold text-lg mb-4">Anda belum terdaftar dalam course ini.</p>
                        <button
                            onClick={handleEnroll}
                            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-[1.02] text-lg"
                        >
                            Daftar Kursus Ini
                        </button>
                    </div>
                </div>
            )}

            {/* ======================================================= */}
            {/* KONDISI 2: SUDAH TERDAFTAR (Materi View) */}
            {/* ======================================================= */}
            {isEnrolled && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                     <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-700 border border-green-200 flex items-center space-x-3">
                        <Unlock className="w-5 h-5 flex-shrink-0" />
                        <p className="font-semibold text-sm">Akses Penuh: Anda sudah terdaftar dalam course ini. Materi tersedia di bawah.</p>
                    </div>

                    {/* Daftar File Materi */}
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <Folder className="w-5 h-5 mr-2 text-yellow-600" />
                        File Materi Course (Klik untuk Pratinjau)
                    </h2>
                    <div className="border rounded-xl divide-y bg-white shadow-md">
                        {course.materials.map((material, index) => (
                            <MaterialFileItem key={index} material={material} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


// =======================================================================
// KOMPONEN UTAMA DASHBOARD
// =======================================================================

const DashboardContent = () => {
    // State untuk menguruskan pencarian dan tampilan
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    // STATE BARU: Untuk menyimpan author yang dipilih
    const [selectedAuthor, setSelectedAuthor] = useState(null); 

    // Mengira senarai kursus berdasarkan ALL_COURSES
    const latestCourses = ALL_COURSES.slice(0, 5); // 5 kursus terbaharu
    const popularCourses = ALL_COURSES.filter(c => c.isPopular);

    // Fungsi penapisan (Filter)
    const filterItems = (items, term) => {
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
    const noCourseResults = filteredLatestCourses.length === 0 && filteredPopularCourses.length === 0 && searchTerm;
    const noAuthorResults = filteredPopularAuthors.length === 0 && searchTerm;
    const noResultsAtAll = noCourseResults && noAuthorResults;

    // --- KONDISIONAL RENDER UTAMA ---

    // 1. JIKA Pengajar dipilih, paparkan Author Detail View
    if (selectedAuthor) {
        return (
            <AuthorDetailView 
                author={selectedAuthor} 
                allCourses={ALL_COURSES} 
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