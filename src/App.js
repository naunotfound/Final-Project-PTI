import React, { useState, useMemo, useRef, useEffect } from 'react';
import SidebarItem from './components/sidebar';
import DashboardContent from './components/home';
import CoursesView from './components/courses';
import AssignmentsView from './components/assignments';
import ProfileView from './components/profile';
import LoginPage from './components/login';
import Register from './components/register';
import { Bell, User, LogOut, Settings, ChevronDown, CheckCircle, Clock, Sun, Moon } from 'lucide-react';

import { ALL_LATEST_COURSES, ALL_POPULAR_COURSES, ALL_POPULAR_AUTHORS } from './data';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('scele-theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard'); // Halaman default adalah Dashboard
  const [searchTerm, setSearchTerm] = useState(''); 
  const [theme, setTheme] = useState(getInitialTheme);

  const navItems = [
    { name: 'Dashboard', page: 'Dashboard', iconPath: 'M3 12L12 3l9 9H3z' },
    { name: 'Courses', page: 'Courses', iconPath: 'M12 6.253v13M3.25 10.25h17.5M12 17.75l-4.75-4.75' },
    { name: 'PandaAI', page: 'Assignments', iconPath: 'M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z' },
    { name: 'Profile', page: 'Profile', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0z' },
  ];
  
  const mockUser = {
    name: 'Bima Satria',
    email: 'bima.satria@mahasiswa.ac.id',
    npm: '1906234567',
    major: 'Teknik Komputer',
    batch: 2019,
    profilePic: 'https://placehold.co/100x100/4c4b69/FFFFFF?text=BS',
  };

  const mockNotifications = [
    { id: 1, type: 'info', message: 'Tugas Kalkulus I baru telah ditambahkan.', time: '2 menit lalu' },
    { id: 2, type: 'success', message: 'Anda telah berhasil mengumpulkan laporan Akhir Semester.', time: '1 jam lalu' },
    { id: 3, type: 'warning', message: 'Materi baru tersedia: Keamanan Siber.', time: 'Kemarin' },
  ];

  // Filter logic
  const lowerCaseSearch = searchTerm.toLowerCase();
  const filteredLatestCourses = useMemo(() => {
    if (currentPage !== 'Dashboard') return ALL_LATEST_COURSES;
    if (!searchTerm) return ALL_LATEST_COURSES;
    return ALL_LATEST_COURSES.filter(course =>
      course.title.toLowerCase().includes(lowerCaseSearch) ||
      course.subject.toLowerCase().includes(lowerCaseSearch) ||
      course.author.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchTerm, currentPage]);

  const filteredPopularCourses = useMemo(() => {
    if (currentPage !== 'Dashboard') return ALL_POPULAR_COURSES;
    if (!searchTerm) return ALL_POPULAR_COURSES;
    return ALL_POPULAR_COURSES.filter(course =>
      course.title.toLowerCase().includes(lowerCaseSearch) ||
      course.author.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchTerm, currentPage]);
  
  const filteredPopularAuthors = useMemo(() => {
    if (currentPage !== 'Dashboard') return ALL_POPULAR_AUTHORS;
    if (!searchTerm) return ALL_POPULAR_AUTHORS;
    return ALL_POPULAR_AUTHORS.filter(author =>
      author.name.toLowerCase().includes(lowerCaseSearch) ||
      author.description.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchTerm, currentPage]);

  // Header dropdown state + refs
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('scele-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleProfile = (e) => {
    e.stopPropagation();
    setIsProfileOpen(prev => !prev);
    setIsNotificationOpen(false);
  };

  const toggleNotification = (e) => {
    e.stopPropagation();
    setIsNotificationOpen(prev => !prev);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    console.log('User logged out');
    // reset app to login page
    setIsProfileOpen(false);
    setCurrentPage('Login');
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'info':
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Courses':
        return <CoursesView setCurrentPage={setCurrentPage} />;
      case 'Assignments':
        return <AssignmentsView setCurrentPage={setCurrentPage} />;
      case 'Profile':
        return <ProfileView setCurrentPage={setCurrentPage} />;
      case 'Dashboard':
      default:
        return (
          <DashboardContent 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            filteredLatestCourses={filteredLatestCourses}
            filteredPopularCourses={filteredPopularCourses}
            filteredPopularAuthors={filteredPopularAuthors}
          />
        );
    }
  };

  // If user is on Login or Register page, render fullscreen pages (no header/sidebar)
  if (currentPage === 'Login') {
    return <LoginPage setCurrentPage={setCurrentPage} />;
  }
  if (currentPage === 'Register') {
    return <Register setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className={`flex flex-col min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'theme-dark bg-slate-900 text-gray-100' : 'theme-light bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-3xl font-serif text-blue-600 mr-1 transform rotate-6">📚</span>
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
              <span className="text-blue-600 font-black">SCele</span>-NG
            </h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-200 ${theme === 'dark' ? 'bg-slate-800 text-amber-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <button 
                onClick={toggleNotification}
                className={`p-2 rounded-full transition-all duration-200 ${isNotificationOpen ? 'bg-blue-100 text-blue-600 shadow-inner' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}`}
                aria-label="Notifikasi"
                aria-expanded={isNotificationOpen}
              >
                <Bell className="w-6 h-6" />
                {mockNotifications.length > 0 && <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-xl shadow-2xl ring-1 ring-gray-200 overflow-hidden origin-top-right animate-fade-in-down">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">Notifikasi Terbaru ({mockNotifications.length})</h3>
                  </div>
                  {mockNotifications.length > 0 ? (
                    <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                      {mockNotifications.map(notif => (
                        <li key={notif.id} className="flex items-start p-4 hover:bg-blue-50 transition duration-150 cursor-pointer">
                          <div className="flex-shrink-0 mr-3 mt-1">{getNotificationIcon(notif.type)}</div>
                          <div className="flex-grow">
                            <p className="text-sm font-medium text-gray-700">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="p-4 text-sm text-gray-500 text-center">Tidak ada notifikasi baru.</p>
                  )}
                  <div className="p-3 text-center border-t">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Lihat Semua Notifikasi</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <button 
                onClick={toggleProfile}
                className="flex items-center space-x-2 p-1.5 rounded-full bg-gray-50 hover:bg-gray-100 transition duration-150"
                aria-label="Menu Profil"
                aria-expanded={isProfileOpen}
              >
                <img className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" src={mockUser.profilePic} alt="Foto Profil" />
                <span className="hidden md:block text-sm font-medium text-gray-700 mr-1">{mockUser.name.split(' ')[0]}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl ring-1 ring-gray-200 overflow-hidden origin-top-right animate-fade-in-down">
                  <div className="p-4 flex items-center border-b">
                    <img className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-500" src={mockUser.profilePic} alt="Foto Profil Besar" />
                    <div>
                      <p className="text-base font-semibold text-gray-900">{mockUser.name}</p>
                      <p className="text-sm text-blue-600">{mockUser.email}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 border-b bg-gray-50">
                    <p className="text-xs text-gray-700"><span className="font-semibold text-gray-500 block">NPM / Angkatan:</span>{mockUser.npm} / {mockUser.batch}</p>
                    <p className="text-xs text-gray-700"><span className="font-semibold text-gray-500 block">Jurusan:</span>{mockUser.major}</p>
                  </div>

                  <nav className="p-2 space-y-1">
                    <a href="#" className="flex items-center p-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-150">
                      <User className="w-4 h-4 mr-3" />
                      Lihat Profil Lengkap
                    </a>
                    <a href="#" className="flex items-center p-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-150">
                      <Settings className="w-4 h-4 mr-3" />
                      Pengaturan Akun
                    </a>
                    <button onClick={handleLogout} className="flex items-center w-full p-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition duration-150">
                      <LogOut className="w-4 h-4 mr-3" />
                      Keluar
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Animasi keyframes & helper class */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.18s ease-out; }
      `}</style>

      {/* Main */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <nav className="w-64 flex-shrink-0 bg-white shadow-xl p-4 border-r border-gray-100 hidden md:block">
          <ul className="space-y-2">
            {navItems.map(item => (
              <SidebarItem
                key={item.page}
                name={item.name}
                iconPath={item.iconPath}
                onClick={() => {
                  setCurrentPage(item.page);
                  if (item.page !== 'Dashboard') setSearchTerm('');
                }}
                isActive={currentPage === item.page}
              />
            ))}

            <li className="pt-4 border-t border-gray-200">
              <button
                onClick={() => setCurrentPage('Login')}
                className="w-full flex items-center space-x-3 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around md:hidden z-10 shadow-2xl">
          {navItems.map(item => (
            <button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              className={`flex flex-col items-center p-1 rounded-lg transition duration-150 ${currentPage === item.page ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.iconPath} /></svg>
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-grow overflow-y-auto pb-20 md:pb-0">
          {renderPage()}
        </div>
      </div>

      {/* scrollbar helper */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default App;
