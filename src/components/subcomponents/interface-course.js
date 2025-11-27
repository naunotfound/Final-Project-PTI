export const SmallCourseCard = ({ course, onCourseClick }) => {
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