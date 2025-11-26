// src/data.js

export const MOCK_ASSIGNMENTS = [
  { id: 1, title: 'Assignment 1', course: 'React Hooks', dueDate: '2025-01-10', status: 'Pending' },
  { id: 2, title: 'Assignment 2', course: 'Django Fullstack', dueDate: '2025-01-12', status: 'Completed' },
  { id: 3, title: 'Assignment 3', course: 'Linear Algebra', dueDate: '2025-01-15', status: 'Pending' },
];

export const ALL_LATEST_COURSES = [
  { id: 1, title: 'Dasar-dasar Tailwind CSS', subject: 'Web Development', semester: 'Genap 2024', author: 'Adrian Dev', thumbnail: 'https://placehold.co/400x220/293a80/ffffff?text=Tailwind+CSS' },
  { id: 2, title: 'Pengantar Desain UX', subject: 'UI/UX Design', semester: 'Genap 2024', author: 'Bunga Sari', thumbnail: 'https://placehold.co/400x220/0d9488/ffffff?text=UX/UI+Design' },
  { id: 3, title: 'Aljabar Linear', subject: 'Mathematics', semester: 'Genap 2024', author: 'Prof. Candra', thumbnail: 'https://placehold.co/400x220/9333ea/ffffff?text=Linear+Algebra' },
  { id: 4, title: 'Deep Learning Part I', subject: 'Artificial Intelligence', semester: 'Ganjil 2025', author: 'Adrian Dev', thumbnail: 'https://placehold.co/400x220/f97316/ffffff?text=Deep+Learning' },
];

export const ALL_POPULAR_COURSES = [
  { id: 101, title: 'React Hooks Mastery', author: 'Adrian D.', students: 2500, rating: 4.9, thumbnail: 'https://placehold.co/400x220/003366/ffffff?text=React+Hooks' },
  { id: 102, title: 'Fullstack Django', author: 'Bunga S.', students: 1800, rating: 4.7, thumbnail: 'https://placehold.co/400x220/0f766e/ffffff?text=Fullstack+Django' },
  { id: 103, title: 'Prinsip Koding Bersih', author: 'Candra M.', students: 1500, rating: 4.8, thumbnail: 'https://placehold.co/400x220/8b5cf6/ffffff?text=Clean+Code' },
  { id: 104, title: 'Data Science dengan Python', author: 'Dian R.', students: 2100, rating: 4.6, thumbnail: 'https://placehold.co/400x220/3b82f6/ffffff?text=Python+DS' },
];

export const ALL_POPULAR_AUTHORS = [
  { id: 1, name: 'Adrian Dev', courses: 12, photo: 'https://placehold.co/100x100/1e3a8a/ffffff?text=AD', description: 'Expert dalam Web Modern & AI.' },
  { id: 2, name: 'Bunga Sari', courses: 8, photo: 'https://placehold.co/100x100/065f46/ffffff?text=BS', description: 'Mentor UI/UX dengan 5+ tahun pengalaman.' },
  { id: 3, name: 'Prof. Candra', courses: 20, photo: 'https://placehold.co/100x100/7c3aed/ffffff?text=PC', description: 'Dosen Matematika Lanjut di universitas terkemuka.' },
  { id: 4, name: 'Dian Ratih', courses: 15, photo: 'https://placehold.co/100x100/991b1f/ffffff?text=DR', description: 'Spesialis Data Science dan Machine Learning.' },
  { id: 5, name: 'Elang Perkasa', courses: 5, photo: 'https://placehold.co/100x100/ca8a04/ffffff?text=EP', description: 'Pengembang Backend dengan fokus pada keamanan.' },
];
