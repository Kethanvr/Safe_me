// AuthCard component for wrapping authentication forms
export default function AuthCard({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-50 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600 mt-2">SafeMe - Your Discreet Safety Companion</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
