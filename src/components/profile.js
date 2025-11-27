import React, { useState } from 'react';

// =======================================================================
// Data Simulasi Course (Diperluas dengan Status Enrollment dan File)
// =======================================================================
const MOCK_COURSES = [
    {
        id: 1,
        title: "Ringkasan Algoritma Greedy",
        subject: "Pemrograman",
        type: "Teks",
        downloads: 45,
        uploadedBy: "Anda",
        isEnrolled: true, // SUDAH ENROLL
        description: "Ringkasan komprehensif tentang prinsip dan implementasi algoritma Greedy, termasuk contoh klasik seperti masalah penukaran uang dan *Activity Selection*.",
        contentDetail: [
            { name: "Pengantar Algoritma Greedy.pdf", type: "pdf", size: "1.2 MB" },
            { name: "Struktur Data dan Kompleksitas Waktu.docx", type: "doc", size: "350 KB" },
            { name: "Studi Kasus Knapsack.txt", type: "txt", size: "5 KB" },
        ],
        source: "https://en.wikipedia.org/wiki/Greedy_algorithm"
    },
    {
        id: 2,
        title: "Kuis Tahun Lalu - Database SQL",
        subject: "Database",
        type: "File",
        downloads: 80,
        uploadedBy: "Anda",
        isEnrolled: false, // BELUM ENROLL
        description: "Kumpulan soal Ujian Tengah Semester (UTS) tahun lalu mata kuliah Basis Data. Mencakup normalisasi, *stored procedures*, dan optimasi *query*.",
        contentDetail: [
            { name: "Soal UTS_BasisData_2024.pdf", type: "pdf", size: "890 KB" },
            { name: "Kunci Jawaban_BasisData.docx", type: "doc", size: "410 KB" },
        ],
        source: "Tidak ada sumber eksternal"
    },
    {
        id: 3,
        title: "Catatan Kuliah Aljabar Linear",
        subject: "Matematika",
        type: "Teks",
        downloads: 15,
        uploadedBy: "Anda",
        isEnrolled: true, // SUDAH ENROLL
        description: "Catatan lengkap dari pertemuan 1 hingga 7 untuk materi Vektor dan Ruang Vektor.",
        contentDetail: [
            { name: "Vektor_dan_Operasi_Dasar.pdf", type: "pdf", size: "2.1 MB" },
            { name: "Latihan_Soal_Aljabar.xlsx", type: "xls", size: "120 KB" },
            { name: "Presentasi_Ruang_Vektor.pptx", type: "ppt", size: "5.5 MB" },
        ],
        source: "Buku Teks Aljabar Linear"
    },
];

// Helper function to get icon based on file type
const getFileIcon = (fileType) => {
    switch (fileType) {
        case 'pdf':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V7a1 1 0 00-1-1H6z" clipRule="evenodd" /><path d="M12 9a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1z" /></svg>;
        case 'doc':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM7 7a1 1 0 000 2h6a1 1 0 100-2H7zM7 11a1 1 0 000 2h6a1 1 0 100-2H7z" /><path fillRule="evenodd" d="M16 4h-4V3a1 1 0 00-1-1H9a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2zm-3 10H7v-2h6v2zm3-4H4V6h12v4z" clipRule="evenodd" /></svg>;
        case 'ppt':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 9a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
        case 'xls':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm10 2a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
        case 'txt':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 3a1 1 0 000 2h8a1 1 0 100-2H6zM6 11a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
        default:
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fillRule="evenodd" d="M3 8a2 2 0 012-2v10a2 2 0 01-2 2V8zm12-2a2 2 0 00-2 2v10a2 2 0 002 2V8zM8 4a2 2 0 100 4h4a2 2 0 100-4H8z" clipRule="evenodd" /></svg>;
    }
};

// =======================================================================
// Komponen Input Umum
// =======================================================================

const InputField = ({ label, id, type = 'text', value, onChange, placeholder, required = false }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        />
    </div>
);

const TextAreaField = ({ label, id, value, onChange, placeholder, rows = 3, required = false }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none"
        />
    </div>
);

// =======================================================================
// Komponen Preview File (Simulasi Google Drive Viewer)
// =======================================================================
const FilePreviewModal = ({ file, onClose }) => {
    // Simulasi konten file berdasarkan tipe
    let content;
    switch (file.type) {
        case 'pdf':
            content = "Ini adalah simulasi Pratinjau Dokumen PDF. Konten PDF biasanya mencakup teks, gambar, dan tata letak yang kompleks. (Format: " + file.type.toUpperCase() + ")";
            break;
        case 'doc':
            content = "Ini adalah simulasi Pratinjau Dokumen Word. Dokumen Word sering digunakan untuk laporan dan esai. (Format: " + file.type.toUpperCase() + ")";
            break;
        case 'xls':
            content = "Ini adalah simulasi Pratinjau Spreadsheet Excel. Data ditampilkan dalam tabel baris dan kolom. (Format: " + file.type.toUpperCase() + ")";
            break;
        case 'ppt':
            content = "Ini adalah simulasi Pratinjau Presentasi PowerPoint. Biasanya berisi slide dan poin-poin. (Format: " + file.type.toUpperCase() + ")";
            break;
        case 'txt':
            content = "Konten Teks Murni:\nAlgoritma Greedy bekerja paling baik ketika pilihan yang optimal secara lokal juga mengarah pada solusi optimal global. (Format: " + file.type.toUpperCase() + ")";
            break;
        default:
            content = "Tidak dapat menampilkan pratinjau. Jenis file tidak didukung.";
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
                {/* Header Modal */}
                <div className="p-4 border-b flex justify-between items-center bg-gray-100 rounded-t-xl">
                    <div className="flex items-center space-x-2">
                        {getFileIcon(file.type)}
                        <h2 className="text-lg font-bold text-gray-800">{file.name}</h2>
                        <span className="text-xs text-gray-500 ml-2">({file.size})</span>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700 transition duration-150 p-2 rounded-full hover:bg-gray-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Body Konten Preview */}
                <div className="p-6 flex-grow overflow-y-auto bg-gray-50">
                    <p className="whitespace-pre-wrap font-mono text-sm text-gray-700 border-2 border-dashed border-gray-300 p-4 rounded-lg bg-white h-full min-h-[500px]">
                        {content}
                    </p>
                    <div className="mt-4 text-center text-sm text-gray-500 italic">
                        --- Akhir Pratinjau Simulasi ---
                    </div>
                </div>

                {/* Footer Modal */}
                <div className="p-4 border-t bg-gray-100 rounded-b-xl flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
                        Unduh File Asli ({file.size})
                    </button>
                </div>
            </div>
        </div>
    );
};


// =======================================================================
// Komponen Tampilan Course Publik (BELUM ENROLL)
// =======================================================================
const CoursePublicView = ({ course, onBack, onEnroll }) => {
    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 space-y-6">
            <button 
                onClick={onBack}
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition duration-150 mb-4"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Daftar Course
            </button>

            <div className="border border-blue-200 p-6 rounded-xl bg-blue-50 shadow-inner">
                <h1 className="text-3xl font-extrabold text-blue-800">{course.title}</h1>
                <p className="text-xl text-gray-600 mt-1 mb-4">{course.subject}</p>
                <div className="flex items-center text-sm text-gray-500">
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border bg-blue-100 text-blue-700 border-blue-300 mr-2`}>
                        {course.type}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    {course.downloads} Unduhan
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Deskripsi Singkat Course</h2>
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            {/* Tombol Aksi Enrollment */}
            <div className="pt-4 border-t border-gray-200 text-center">
                <p className="text-red-600 font-semibold mb-3">Anda belum terdaftar dalam course ini.</p>
                <button 
                    onClick={() => onEnroll(course.id)}
                    className="py-3 px-8 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition duration-300 text-lg flex items-center justify-center mx-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M12 20.354a4 4 0 010-5.292m0 0v-4" /></svg>
                    Daftar Sekarang (Enroll)
                </button>
            </div>
        </div>
    );
};

// =======================================================================
// Komponen Tampilan Course Terdaftar (SUDAH ENROLL)
// =======================================================================
const CourseEnrolledView = ({ course, onBack, onFileClick }) => {
    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 space-y-8">
            <button 
                onClick={onBack}
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition duration-150 mb-4"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Daftar Course
            </button>
            
            <div className="border border-blue-200 p-6 rounded-xl bg-blue-50 shadow-inner">
                <h1 className="text-3xl font-extrabold text-blue-800">{course.title}</h1>
                <p className="text-xl text-gray-600 mt-1 mb-4">{course.subject}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            {/* Bagian File Materi (Mirip Dashboard/Drive) */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v2H2V6z" /><path d="M6 10a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5a2 2 0 012-2h2zm10 0a2 2 0 012 2v5a2 2 0 01-2 2h-2a2 2 0 01-2-2v-5a2 2 0 012-2h2z" /></svg>
                    File Materi Course (Klik untuk Pratinjau)
                </h2>
                
                <div className="space-y-3">
                    {course.contentDetail.map((file, index) => (
                        <div 
                            key={index} 
                            onClick={() => onFileClick(file)}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150 cursor-pointer shadow-sm"
                        >
                            <div className="flex items-center space-x-3">
                                {getFileIcon(file.type)}
                                <div>
                                    <p className="font-medium text-gray-800">{file.name}</p>
                                    <p className="text-xs text-gray-500 uppercase">{file.type} | {file.size}</p>
                                </div>
                            </div>
                            <span className="text-blue-500 text-sm font-semibold hover:text-blue-700">
                                Pratinjau
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bagian Teks Tambahan (Simulasi) */}
            <div className="pt-4 border-t border-gray-200 space-y-4">
                 <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 pt-4">Teks Materi Tambahan (Simulasi)</h2>
                 <p className="text-gray-700 italic">
                     *Di sini akan muncul bagian "Upload Teks Materi Tambahan" (Rekomendasi Sumber & Tips Belajar) jika diimplementasikan pada data aslinya.
                     Saat ini, kita hanya menampilkan deskripsi singkat di bagian atas.
                 </p>
                 <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    <p className="font-semibold">Rekomendasi Sumber:</p>
                    <p>Buku: Introduction to Algorithms (CLRS), Website: GeeksforGeeks.</p>
                 </div>
            </div>
        </div>
    );
};


// =======================================================================
// Komponen Daftar Course (List View)
// =======================================================================
const CourseItem = ({ course, onSelectCourse }) => {
    const isFile = course.type === 'File';
    const typeColor = isFile ? 'bg-green-100 text-green-700 border-green-300' : 'bg-blue-100 text-blue-700 border-blue-300';
    const enrollStatus = course.isEnrolled 
        ? <span className="text-xs font-bold text-green-600 bg-green-100 p-1 rounded-full">TERDAFTAR</span>
        : <span className="text-xs font-bold text-red-600 bg-red-100 p-1 rounded-full">PUBLIK</span>;
    
    const handleDelete = (id) => {
        console.log(`Menghapus Course ID: ${id}`);
        window.alert(`Course "${course.title}" (ID: ${id}) berhasil dihapus.`);
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 border border-gray-100">
            <div className="flex-grow cursor-pointer" onClick={() => onSelectCourse(course.id)}>
                {/* Tipe Konten dan Status */}
                <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full border ${typeColor}`}>
                        {course.type}
                    </span>
                    {enrollStatus}
                </div>

                {/* Judul dan Subjek */}
                <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition duration-150">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{course.subject}</p>

                {/* Statistik */}
                <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {course.downloads} Unduhan
                </div>
            </div>

            {/* Tombol Hapus */}
            <button 
                onClick={() => handleDelete(course.id)} 
                className="text-gray-400 hover:text-red-500 transition duration-150 p-2 rounded-full hover:bg-red-50 ml-4 flex-shrink-0"
                aria-label="Hapus Course"
            >
                {/* SVG Icon Trash */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
};

const SharedCoursesList = ({ courses, onSelectCourse }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Course ({courses.length})</h2>
            <div className="space-y-4">
                {courses.map(course => (
                    <CourseItem key={course.id} course={course} onSelectCourse={onSelectCourse} />
                ))}
            </div>
            {courses.length === 0 && (
                <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg text-center">
                    Anda belum membagikan course apapun. Mulai unggah course baru sekarang!
                </p>
            )}
        </div>
    );
};


// =======================================================================
// Komponen Formulir Unggah Course
// =======================================================================
const UploadCourseForm = () => {
    const FILE_COMPONENTS = [
        { key: 'quiz', label: 'File Kuis' },
        { key: 'ppt', label: 'File PPT (Materi Presentasi)' },
        { key: 'lab', label: 'File Lab (Panduan Praktikum)' },
        { key: 'uts', label: 'File UTS (Ujian Tengah Semester)' },
        { key: 'uas', label: 'File UAS (Ujian Akhir Semester)' },
        { key: 'ebook', label: 'File E-Book / Referensi' },
        { key: 'asistensi', label: 'File Asistensi / Tutorial' },
        { key: 'silabus', label: 'File Silabus' },
    ];

    const [courseData, setCourseData] = useState({
        title: '',
        subject: '',
        year: new Date().getFullYear().toString(),
        lecturer: '',
        shortDescription: '',
        whatYouWillLearn: '',
        recommendedSources: '',
        studyTips: '',
        fileComponents: FILE_COMPONENTS.reduce((acc, comp) => ({ ...acc, [comp.key]: false }), {}),
        files: {},
        isSubmitting: false,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCourseData(prev => ({ ...prev, [id]: value }));
    };

    const handleComponentToggle = (key) => {
        setCourseData(prev => ({
            ...prev,
            fileComponents: {
                ...prev.fileComponents,
                [key]: !prev.fileComponents[key]
            }
        }));
    };
    
    const handleFileChange = (key, e) => {
        const file = e.target.files[0];
        setCourseData(prev => ({
            ...prev,
            files: {
                ...prev.files,
                [key]: file ? file.name : null
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCourseData(prev => ({ ...prev, isSubmitting: true }));
        
        const dataToSend = {
            identitasCourse: {
                materi: courseData.title,
                matkul: courseData.subject,
                tahun: courseData.year,
                dosen: courseData.lecturer,
                deskripsiSingkat: courseData.shortDescription,
                apaYangDipelaajari: courseData.whatYouWillLearn.split('\n').filter(l => l.trim() !== ''),
            },
            textMateriTambahan: {
                rekomendasiSumber: courseData.recommendedSources,
                tipsBelajar: courseData.studyTips,
            },
            fileMateri: Object.keys(courseData.fileComponents).filter(key => courseData.fileComponents[key]).map(key => ({
                jenis: FILE_COMPONENTS.find(c => c.key === key).label,
                namaFile: courseData.files[key] || 'Belum di-upload'
            })),
        };

        console.log("--- DATA KELAS BARU DIKIRIM ---");
        console.log(JSON.stringify(dataToSend, null, 2));
        
        setTimeout(() => {
            window.alert(`Kelas "${courseData.title}" berhasil dibuat! Lihat di console untuk data yang dikirim.`); 
            setCourseData(prev => ({ ...prev, isSubmitting: false }));
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bagian 1: Identitas Course */}
            <div className="border border-blue-200 p-6 rounded-xl bg-blue-50 shadow-inner">
                <h2 className="text-xl font-bold text-blue-700 mb-4 border-b pb-2">1. Identitas Kelas (Course)</h2>
                <InputField label="Materi (Judul Course)" id="title" value={courseData.title} onChange={handleChange} placeholder="Contoh: Optimasi Query Database SQL Lanjut" required/>
                <InputField label="Mata Kuliah" id="subject" value={courseData.subject} onChange={handleChange} placeholder="Contoh: Basis Data, Pemrograman Web" required/>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Tahun/Semester" id="year" value={courseData.year} onChange={handleChange} placeholder="Contoh: Genap 2025" required/>
                    <InputField label="Dosen Pengajar Matkul" id="lecturer" value={courseData.lecturer} onChange={handleChange} placeholder="Contoh: Prof. Dr. Bunga Sari" required/>
                </div>

                <TextAreaField label="Deskripsi Singkat Materi (Max 2 Kalimat)" id="shortDescription" value={courseData.shortDescription} onChange={handleChange} placeholder="Jelaskan secara ringkas tentang materi ini." rows={2} required/>
                <TextAreaField label="Apa yang akan Anda pelajari (Poin-poin/List)" id="whatYouWillLearn" value={courseData.whatYouWillLearn} onChange={handleChange} placeholder="Masukkan setiap poin pada baris baru.\nContoh:\n- Menguasai teknik JOIN lanjutan\n- Memahami Normalisasi 3NF" rows={5} required/>
            </div>

            {/* Bagian 2: Teks Materi Tambahan */}
            <div className="border border-green-200 p-6 rounded-xl bg-green-50 shadow-inner">
                <h2 className="text-xl font-bold text-green-700 mb-4 border-b pb-2">2. Upload Teks Materi Tambahan</h2>
                <TextAreaField label="Rekomendasi Sumber Belajar (Buku, Website, Video)" id="recommendedSources" value={courseData.recommendedSources} onChange={handleChange} placeholder="Sertakan link atau judul buku yang relevan." rows={4}/>
                <TextAreaField label="Tips Belajar untuk Materi Ini" id="studyTips" value={courseData.studyTips} onChange={handleChange} placeholder="Berikan saran atau strategi agar pelajar sukses." rows={4}/>
            </div>

            {/* Bagian 3: File Materi */}
            <div className="border border-amber-200 p-6 rounded-xl bg-amber-50 shadow-inner">
                <h2 className="text-xl font-bold text-amber-700 mb-4 border-b pb-2">3. Upload File Materi (Komponen Kelas)</h2>
                <p className="text-sm text-gray-600 mb-4">Pilih jenis file komponen apa saja yang akan Anda unggah untuk kelas ini.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {FILE_COMPONENTS.map(comp => (
                        <div key={comp.key} className="flex items-center">
                            <input
                                id={`check-${comp.key}`}
                                type="checkbox"
                                checked={courseData.fileComponents[comp.key]}
                                onChange={() => handleComponentToggle(comp.key)}
                                className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                            />
                            <label htmlFor={`check-${comp.key}`} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                                {comp.label}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-amber-200">
                    <h3 className="text-lg font-semibold text-gray-800">Unggah File:</h3>
                    {FILE_COMPONENTS.map(comp => courseData.fileComponents[comp.key] && (
                        <div key={`upload-${comp.key}`} className="flex items-center space-x-3 bg-white p-3 border border-amber-300 rounded-lg">
                            <label htmlFor={`file-${comp.key}`} className="min-w-[150px] text-sm font-medium text-amber-700">
                                {comp.label}:
                            </label>
                            <input
                                type="file"
                                id={`file-${comp.key}`}
                                onChange={(e) => handleFileChange(comp.key, e)}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
                            />
                            {courseData.files[comp.key] && (
                                <span className="text-xs text-green-600 italic">({courseData.files[comp.key]} siap diunggah)</span>
                            )}
                        </div>
                    ))}
                    
                    {!Object.values(courseData.fileComponents).some(v => v) && (
                        <p className="text-sm text-gray-500 italic p-3 bg-amber-100 rounded-lg">
                            Pilih setidaknya satu komponen file di atas untuk mulai mengunggah.
                        </p>
                    )}
                </div>
            </div>

            {/* Tombol Submit */}
            <div className="pt-6 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={courseData.isSubmitting || !courseData.title || !courseData.subject || !courseData.lecturer}
                    className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg flex items-center justify-center"
                >
                    {courseData.isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Membuat Kelas...
                        </>
                    ) : (
                        "Buat Kelas & Unggah Materi"
                    )}
                </button>
            </div>
        </form>
    );
};


// =======================================================================
// Komponen Navigasi Tab
// =======================================================================
const TabButton = ({ tab, label, count, isActive, onClick }) => (
    <button
        onClick={() => onClick(tab)}
        className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors duration-200 flex items-center ${
            isActive 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
    >
        {label}
        {count > 0 && (
            <span className="ml-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {count}
            </span>
        )}
    </button>
);


// =======================================================================
// Komponen Utama Aplikasi (App)
// =======================================================================
const App = () => {
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [activeTab, setActiveTab] = useState('list'); 
    // State baru untuk file yang sedang di-preview
    const [previewFile, setPreviewFile] = useState(null); 
    // State untuk manajemen enrollment, mengubah status di MOCK data secara sementara
    const [enrollmentStatus, setEnrollmentStatus] = useState(MOCK_COURSES.reduce((acc, c) => ({...acc, [c.id]: c.isEnrolled}), {}));

    // Cari data course yang dipilih
    const selectedCourse = MOCK_COURSES.find(c => c.id === selectedCourseId);

    // Handler untuk kembali ke tampilan manajemen
    const handleBack = () => {
        setSelectedCourseId(null);
        setPreviewFile(null); // Tutup preview jika ada
    };

    // Handler untuk memilih course dari daftar
    const handleSelectCourse = (id) => {
        setSelectedCourseId(id);
        setPreviewFile(null); // Pastikan preview tertutup
    };
    
    // Handler untuk enroll course (simulasi)
    const handleEnroll = (id) => {
        setEnrollmentStatus(prev => ({ ...prev, [id]: true }));
        window.alert("Anda berhasil terdaftar di course ini! Silakan lihat materi lengkapnya.");
    };

    // Cek status enrollment course yang sedang dilihat
    const isCurrentlyEnrolled = selectedCourse && enrollmentStatus[selectedCourse.id];

    // Cek apakah mode preview file aktif
    if (previewFile) {
        return <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />;
    }

    // 1. TAMPILAN DETAIL COURSE (Public atau Enrolled)
    if (selectedCourseId !== null && selectedCourse) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
                <div className="max-w-6xl mx-auto">
                    {isCurrentlyEnrolled ? (
                        <CourseEnrolledView 
                            course={selectedCourse} 
                            onBack={handleBack} 
                            onFileClick={setPreviewFile} // Buka modal preview
                        />
                    ) : (
                        <CoursePublicView 
                            course={selectedCourse} 
                            onBack={handleBack} 
                            onEnroll={handleEnroll} 
                        />
                    )}
                </div>
            </div>
        );
    }
    
    // 2. TAMPILAN MANAJEMEN COURSE (DEFAULT)
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Manajemen Course & Materi</h1>
                
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-xl shadow-sm">
                    <TabButton 
                        tab="upload" 
                        label="Unggah Course Baru" 
                        isActive={activeTab === 'upload'}
                        onClick={setActiveTab}
                    />
                    <TabButton 
                        tab="list" 
                        label="Course yang Sudah Dibagikan" 
                        count={MOCK_COURSES.length} 
                        isActive={activeTab === 'list'}
                        onClick={setActiveTab}
                    />
                </div>

                {/* Content based on active tab */}
                <div className="pb-8">
                    {activeTab === 'upload' && (
                        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8">
                            <p className="text-gray-600 mb-8">Isi semua informasi yang diperlukan untuk membuat kelas atau kursus yang komprehensif.</p>
                            <UploadCourseForm />
                        </div>
                    )}

                    {activeTab === 'list' && (
                        <SharedCoursesList courses={MOCK_COURSES} onSelectCourse={handleSelectCourse} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
