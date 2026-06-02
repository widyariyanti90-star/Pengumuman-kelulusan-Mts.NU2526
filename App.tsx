import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle2, XCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { students, Student } from './data/students';


const App: React.FC = () => {
  const [token, setToken] = useState('');
  const [result, setResult] = useState<Student | null | 'not_found'>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!token.trim()) {
      setError('Silakan masukkan TOKEN/NISN Anda.');
      alert('Peringatan: Masukkan TOKEN/NISN Anda terlebih dahulu!');
      setResult(null);
      return;
    }

    const found = students.find(
      (s) => s.nisn === token.trim() || s.nama.toLowerCase() === token.trim().toLowerCase()
    );

    if (found) {
      setResult(found);
    } else {
      setResult('not_found');
    }
  };

  const logoUrl = "https://lh3.googleusercontent.com/d/1-3h_KJIYKaDOisS6NAJf_g2Waoigv8JS=s400";

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-green-500 to-white flex flex-col font-sans text-gray-900">
      {/* Header / Hero Section */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white p-4 rounded-full shadow-xl mb-6 inline-block">
            <img 
              src={logoUrl} 
              alt="MTs. NABA'UL ULUM" 
              className="w-32 h-32 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/150?text=Logo+MTs";
              }}
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md mb-2">
            PENGUMUMAN KELULUSAN
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-green-100 mb-2">
            MTs. NABA'UL ULUM
          </h2>
          <p className="text-green-50 text-lg">Tahun Ajaran 2025/2026</p>
        </motion.div>

        {/* Result Area */}
        <div className="w-full max-w-2xl mb-12">
          <AnimatePresence mode="wait">
            {result === 'not_found' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-red-50 border-l-8 border-red-500 p-8 rounded-lg shadow-2xl text-left"
              >
                <div className="flex items-center gap-4 mb-4">
                  <XCircle className="text-red-500 w-12 h-12" />
                  <h3 className="text-2xl font-bold text-red-700">TIDAK DITEMUKAN</h3>
                </div>
                <p className="text-red-600 text-lg">
                  🚫 <strong>{token}</strong> tidak ditemukan.<br />
                  Silakan periksa kembali NISN atau Nama yang Anda masukkan.
                </p>
              </motion.div>
            )}

            {result && result !== 'not_found' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white border-l-8 border-green-600 p-8 rounded-lg shadow-2xl text-left"
              >
                <div className="flex items-center gap-4 mb-6">
                  <CheckCircle2 className="text-green-600 w-12 h-12" />
                  <h3 className="text-2xl md:text-3xl font-bold text-green-800">🎉 SELAMAT!</h3>
                </div>
                
                <p className="text-xl mb-6 text-gray-700">
                  Anda dinyatakan <span className="font-bold text-green-600">LULUS</span>.
                </p>

                <div className="space-y-3 border-t border-gray-100 pt-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="text-gray-500 font-medium w-32">📛 Nama</span>
                    <span className="text-lg font-bold text-gray-800">: {result.nama}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="text-gray-500 font-medium w-32">🆔 NISN</span>
                    <span className="text-lg font-mono text-gray-800">: {result.nisn}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="text-gray-500 font-medium w-32">🏅 Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-sm w-fit">
                      {result.status}
                    </span>
                  </div>
                </div>


              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Input Area (Bottom) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-md bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20"
        >
          <div className="flex items-center gap-2 mb-4 text-green-800 font-semibold">
            <Search className="w-5 h-5" />
            <span>Pengecekan Status</span>
          </div>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Masukkan TOKEN (NISN) Anda..."
                className="w-full px-5 py-4 bg-gray-50 border-2 border-green-100 rounded-xl focus:border-green-500 focus:outline-none transition-all pr-12 text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-green-600 hover:text-green-800 transition-colors"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium border border-red-100"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => handleSearch()}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>PERIKSA STATUS</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-600 bg-white/50 backdrop-blur-sm border-t border-gray-100">
        <p className="font-medium text-green-800 mb-1">MTs. NABA'UL ULUM</p>
        <p className="text-sm">© 2025 Panitia Kelulusan - Semua Hak Dilindungi</p>
      </footer>
    </div>
  );
};

export default App;
