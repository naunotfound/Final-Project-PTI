import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, MessageSquare, BookOpen, Clock, Zap, CornerDownLeft } from 'lucide-react';

// =======================================================================
// KONFIGURASI API GEMINI (Penting!)
// Ganti fungsi ini untuk mendapatkan kecerdasan AI yang sebenarnya.
// =======================================================================

const callAIAssistant = async (prompt) => {
    // URL API Gemini menggunakan model cepat dan serbaguna
    // NOTE: Model ini adalah yang terbaik untuk tugas respons cepat
    const modelName = 'gemini-2.5-flash-preview-09-2025';
    const apiKey = ""; // API key akan otomatis disediakan di lingkungan Canvas
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const systemPrompt = "Anda adalah Asisten Belajar AI yang ramah dan berpengetahuan luas. Jawab pertanyaan pengguna dengan jelas, ringkas, dan dalam bahasa Indonesia. Selalu gunakan penekanan (bold) pada istilah kunci atau ringkasan penting. Jangan memberikan informasi di luar konteks akademis.";

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        // Gunakan Google Search grounding untuk mendapatkan informasi terkini
        tools: [{ "google_search": {} }], 
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    let retries = 0;
    const maxRetries = 3;

    while (retries < maxRetries) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                // Throw error to trigger retry or catch block
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            const candidate = result.candidates?.[0];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                const text = candidate.content.parts[0].text;
                
                // Tambahkan logika sederhana untuk menentukan 'type' pesan (opsional, untuk ikon)
                let type = 'general';
                if (text.toLowerCase().includes('ringkasan') || text.toLowerCase().includes('bab')) {
                    type = 'summary';
                } else if (text.toLowerCase().includes('apa itu') || text.toLowerCase().includes('definisi')) {
                    type = 'explanation';
                } else if (text.toLowerCase().includes('soal') || text.toLowerCase().includes('latihan')) {
                    type = 'question';
                }

                // Ambil sumber (citations) jika ada
                let sources = [];
                const groundingMetadata = candidate.groundingMetadata;
                if (groundingMetadata && groundingMetadata.groundingAttributions) {
                    sources = groundingMetadata.groundingAttributions
                        .map(attribution => ({
                            uri: attribution.web?.uri,
                            title: attribution.web?.title,
                        }))
                        .filter(source => source.uri && source.title);
                }

                return { text, type, sources };
            }
            
            throw new Error("Invalid response structure from AI.");

        } catch (error) {
            console.error(`Attempt ${retries + 1} failed:`, error);
            retries++;
            if (retries < maxRetries) {
                // Implement exponential backoff (1s, 2s, 4s)
                const delay = Math.pow(2, retries) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw new Error("Failed to connect to AI Assistant after multiple retries.");
            }
        }
    }
    // Ini seharusnya tidak tercapai jika loop di atas berfungsi
    throw new Error("Exited retry loop unexpectedly."); 
};

// =======================================================================
// Komponen Chatbot Utama
// =======================================================================
const App = () => {
    const [messages, setMessages] = useState([
        { 
            id: 1, 
            sender: 'ai', 
            text: 'Halo! Saya Asisten Belajar AI Anda, didukung oleh Gemini. Saya dapat membantu meringkas materi, menjelaskan konsep, atau memberikan soal latihan. Apa yang ingin Anda pelajari hari ini?',
            type: 'greeting'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Otomatis scroll ke pesan terbaru
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // Handler pengiriman pesan
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim() === '' || isLoading) return;

        const userMessage = { id: Date.now(), sender: 'user', text: input.trim(), type: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponse = await callAIAssistant(userMessage.text);
            // Tambahkan sumber ke teks jika ada
            let fullText = aiResponse.text;
            if (aiResponse.sources && aiResponse.sources.length > 0) {
                fullText += "\n\n**Sumber Informasi:**\n" + aiResponse.sources.map((s, index) => 
                    `${index + 1}. [${s.title}](${s.uri})`
                ).join('\n');
            }

            const aiMessage = { 
                id: Date.now() + 1, 
                sender: 'ai', 
                text: fullText, 
                type: aiResponse.type 
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error calling AI Assistant:", error);
            setMessages(prev => [...prev, { 
                id: Date.now() + 1, 
                sender: 'ai', 
                text: "Maaf, Asisten AI gagal merespons. Coba lagi atau periksa koneksi internet Anda.", 
                type: 'error' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Komponen untuk menampilkan pesan
    const ChatMessage = ({ message }) => {
        const isUser = message.sender === 'user';
        
        let icon, colorClass, title;
        if (!isUser) {
            // Tipe pesan berdasarkan respons AI atau fallback ke general
            switch (message.type) {
                case 'explanation':
                    icon = <BookOpen className="w-5 h-5" />;
                    colorClass = 'bg-blue-100 text-blue-800 border-blue-200';
                    title = 'Penjelasan Konsep';
                    break;
                case 'summary':
                    icon = <Zap className="w-5 h-5" />;
                    colorClass = 'bg-green-100 text-green-800 border-green-200';
                    title = 'Ringkasan Cepat';
                    break;
                case 'question':
                    icon = <Clock className="w-5 h-5" />;
                    colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200';
                    title = 'Soal Latihan';
                    break;
                case 'error':
                    icon = <MessageSquare className="w-5 h-5" />;
                    colorClass = 'bg-red-100 text-red-800 border-red-200';
                    title = 'Error';
                    break;
                case 'greeting':
                case 'general':
                default:
                    icon = <Cpu className="w-5 h-5" />;
                    colorClass = 'bg-gray-100 text-gray-800 border-gray-200';
                    title = 'Respons AI';
                    break;
            }
        }
        
        // Fungsi untuk mengonversi markdown sederhana ke JSX
        const renderTextWithFormatting = (text) => {
            if (!text) return null;
            
            // Konversi **bold**
            let parts = text.split(/(\*\*.*?\*\*)/g);
            return parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index}>{part.slice(2, -2)}</strong>;
                }
                
                // Konversi baris baru menjadi <br> dan handle link (untuk sumber)
                if (part.includes('\n') || part.includes('](')) {
                    return part.split('\n').map((line, lineIndex) => {
                        // Regex untuk mendeteksi link Markdown: [title](uri)
                        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
                        const lineParts = line.split(linkRegex).filter(p => p.length > 0);
                        
                        return (
                            <React.Fragment key={`${index}-${lineIndex}`}>
                                {lineParts.map((linkPart, linkIndex) => {
                                    // Jika linkPart adalah judul link
                                    if (linkIndex % 3 === 0 && lineParts[linkIndex + 1]) {
                                        const title = lineParts[linkIndex];
                                        const uri = lineParts[linkIndex + 1];
                                        return (
                                            <a 
                                                key={linkIndex} 
                                                href={uri} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-blue-600 hover:text-blue-800 underline transition duration-150"
                                            >
                                                {title}
                                            </a>
                                        );
                                    }
                                    // Jika linkPart adalah URI, abaikan (sudah digunakan)
                                    if (linkIndex % 3 === 1) return null;
                                    
                                    // Teks biasa
                                    return linkPart;
                                })}
                                {lineIndex < part.split('\n').length - 1 && <br />}
                            </React.Fragment>
                        );
                    });
                }
                
                return part;
            });
        };

        return (
            <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`max-w-4xl p-4 rounded-xl shadow-md ${
                    isUser 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : `${colorClass} rounded-tl-none border`
                }`}>
                    {!isUser && (
                        <div className="flex items-center space-x-2 mb-2 pb-1 border-b border-opacity-30">
                            {icon}
                            <span className="text-sm font-semibold">{title}</span>
                        </div>
                    )}
                    {/* Menggunakan fungsi rendering kustom untuk markdown dan sumber */}
                    <p className={`text-sm font-medium`}>
                        {renderTextWithFormatting(message.text)}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col bg-white p-6 rounded-xl shadow-xl border border-gray-100 h-[calc(100vh-100px)]">
            
            {/* Header Chatbot (Judul) */}
            <div className="mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Cpu className="w-7 h-7 text-blue-600 mr-2" />
                        Asisten Belajar AI
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Didukung oleh <strong className="text-blue-600">Gemini</strong>. Siap membantu Anda dengan materi, ringkasan, dan soal.</p>
                </div>
            </div>

            {/* Area Pesan Chat */}
            <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar mb-4">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            
            {/* Loader */}
            {isLoading && (
                <div className="flex justify-start my-4">
                    <div className="p-3 rounded-xl bg-gray-100 text-gray-600 shadow-sm flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm">Gemini sedang memproses...</span>
                    </div>
                </div>
            )}


            {/* Input Formulir Pesan */}
            <div className="pt-4 border-t border-gray-100">
                <form onSubmit={handleSubmit} className="flex space-x-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Tanyakan konsep, minta ringkasan, atau coba soal latihan..."
                        className="flex-grow px-5 py-3 border border-gray-300 rounded-xl shadow-inner focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={input.trim() === '' || isLoading}
                        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
                <p className="text-xs text-gray-400 mt-2 flex items-center">
                    <CornerDownLeft className="w-3 h-3 mr-1" /> Tekan Enter untuk mengirim.
                </p>
            </div>

             {/* CSS Kustom untuk Scrollbar Estetik (jika diperlukan) */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1; /* gray-300 */
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8; /* gray-400 */
                }
            `}</style>
        </div>
    );
};

export default App;