import React from 'react';

function Register({ setCurrentPage }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-100 p-4">
      <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full">

        {/* Bagian Kiri */}
        <div className="w-1/2 p-10 bg-pink-50 flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <svg className="w-56 h-56 text-pink-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3h8z"></path>
            </svg>
            <h3 className="text-2xl font-bold text-pink-700">Daftar Sekarang!</h3>
            <p className="text-gray-600 mt-2">Akses semua fitur SCele Next Generation.</p>
          </div>
        </div>

        {/* Bagian Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h2>
          <p className="text-gray-500 mb-8">Buat akun baru Anda</p>

          <input type="text" placeholder="Nama Lengkap" className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400" />
          <input type="email" placeholder="Email" className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400" />
          <input type="password" placeholder="Password" className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400" />
          <input type="password" placeholder="Konfirmasi Password" className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400" />

          <button className="w-full bg-pink-600 text-white p-3 rounded-lg font-semibold hover:bg-pink-700 transition mb-4">
            DAFTAR
          </button>

          <div className="text-center text-gray-500 mt-4">
            Sudah punya akun? 
            <button
              onClick={() => setCurrentPage("Login")}
              className="text-pink-600 hover:underline font-medium ml-1"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
