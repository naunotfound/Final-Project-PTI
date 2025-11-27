import React, { useState } from 'react';
import { FileText, Download, Folder, ArrowLeft, Lock, Unlock, BookOpen, File } from 'lucide-react';

const MaterialFileItem = ({ material }) => {
    let icon;
    let iconBgColor;
    const normalizedType = material?.type?.toLowerCase();

    switch (normalizedType) {
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
                    <p className="text-xs text-gray-500">{(material?.type || 'file').toUpperCase()} | {material?.size || '-'}</p>
                </div>
            </div>
            
            <span className="text-blue-600 hover:text-blue-700 font-medium text-sm transition duration-150 p-2 rounded-lg">
                Pratinjau
            </span>
        </div>
    );
};

const CourseDetailView = ({ course, onBack }) => {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const courseMaterials = Array.isArray(course?.materials) ? course.materials : [];

    const handleEnroll = () => {
        alert(`Simulasi: Anda berhasil mendaftar ke kursus ${course.title}!`);
        setIsEnrolled(true); 
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
            <button
                onClick={onBack}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-semibold transition text-sm py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-100"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Dashboard
            </button>

            <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-48 object-cover rounded-xl mb-6 shadow-md" 
                onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x200/cccccc/000000?text=${course.title}`; }} 
            />

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
                    {courseMaterials.length} Materi • 
                    <Download className="w-4 h-4 ml-3 mr-1 text-green-500" />
                    {course.enrollmentCount?.toLocaleString() || course.students.toLocaleString()} Unduhan
                </p>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-xl font-semibold text-gray-700 mb-6">{course.subtitle}</p>

            <div className="prose max-w-none text-gray-800 whitespace-pre-line border-t pt-6 mb-8">
                <p className="text-2xl font-bold mb-4 text-blue-600">Apa yang akan anda pelajari:</p>
                <pre className="p-4 bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto text-base leading-relaxed">
                    {course.content}
                </pre>
            </div>
            
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

            {isEnrolled && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                     <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-700 border border-green-200 flex items-center space-x-3">
                        <Unlock className="w-5 h-5 flex-shrink-0" />
                        <p className="font-semibold text-sm">Akses Penuh: Anda sudah terdaftar dalam course ini. Materi tersedia di bawah.</p>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <Folder className="w-5 h-5 mr-2 text-yellow-600" />
                        File Materi Course (Klik untuk Pratinjau)
                    </h2>
                    {courseMaterials.length > 0 ? (
                        <div className="border rounded-xl divide-y bg-white shadow-md">
                            {courseMaterials.map((material, index) => (
                                <MaterialFileItem key={`${material?.name || 'material'}-${index}`} material={material} />
                            ))}
                        </div>
                    ) : (
                        <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-center text-sm">
                            Materi belum tersedia untuk course ini.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CourseDetailView;
