
import home from './home'; 

function main() {
  return (
    // Menggunakan styling Tailwind yang eksplisit untuk tata letak layar penuh
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <header className="bg-blue-700 text-white p-4 shadow-xl">
        <div className="container mx-auto flex items-center">
          <h1 className="text-2xl font-bold">LMS Dashboard</h1>
        </div>
      </header>
      
      {/* Konten Utama Aplikasi: flex-grow agar mengisi ruang sisa */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <home /> 
      </main>
      
      <footer className="bg-gray-800 text-white text-center p-4 text-sm">
        <p>Frontend Development with React & Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default main;