// AuthCard component for wrapping authentication forms
export default function AuthCard({ children, title }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-50 to-pink-100 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl shadow-2xl p-6 sm:p-10 transition-all duration-300">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
              {title}
            </h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
