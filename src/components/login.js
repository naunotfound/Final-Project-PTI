import React from "react";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">

        {/* Bagian Kiri: Ilustrasi */}
        <div className="md:w-1/2 w-full p-8 bg-purple-50 flex items-center justify-center">
          {/* Jika ingin pakai gambar asli, aktifkan ini:
          <img 
            src="/images/brain_illustration.png" 
            alt="Brain Illustration" 
            className="max-w-full h-auto"
          /> 
          */}

          {/* Ikon placeholder */}
          <div className="flex flex-col items-center">
            <svg
              className="w-40 h-40 md:w-48 md:h-48 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 14c-1.657 0-3-1.343-3-3V4a3 3 0 016 0v7c0 1.657-1.343 3-3 3z"
              ></path>
            </svg>

            <span className="text-gray-700 text-lg mt-4">
              Pelajaran Lebih Mudah
            </span>
          </div>
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Login</h2>
          <p className="text-gray-500 mb-8">Please login to continue</p>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Nama"
              className="w-full p-3 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-200"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg 
              focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-200"
            />
          </div>

          <div className="text-right mb-6">
            <button
              className="text-purple-600 hover:underline text-sm font-medium transition duration-200"
            >
              Forgot Password?
            </button>
          </div>

          <button
            className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold 
            hover:bg-purple-700 transition duration-200 mb-4 shadow-md"
          >
            LOGIN
          </button>

          <div className="text-center text-gray-500 mb-4">
            Don't have an account?
          </div>

          <button
            className="w-full bg-purple-500 text-white p-3 rounded-lg font-semibold 
            hover:bg-purple-600 transition duration-200 shadow-md"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
