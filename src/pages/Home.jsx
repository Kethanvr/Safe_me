// Home Page
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

export default function Home() {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-50 to-pink-100 flex flex-col">
      <header className="w-full py-6 bg-transparent flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight mb-1 animate-fade-in">
          SafeMe
        </h1>
        <p className="text-base sm:text-lg text-gray-700 font-medium tracking-wide animate-fade-in-slow">
          Your discreet safety companion
        </p>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-2 w-full">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header with logout */}
          <div className="flex justify-end mb-4">
            <Button 
              variant="secondary" 
              onClick={handleLogout}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              }
            >
              Logout
            </Button>
          </div>

          {/* Main content */}
          <div className="backdrop-blur-lg bg-white/80 border border-white/40 rounded-3xl shadow-2xl p-6 sm:p-10 max-w-2xl mx-auto transition-all duration-300">
            {/* Profile Card */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 p-4 sm:p-6 rounded-2xl bg-white/70 border border-purple-100 shadow-md">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-purple-200 shadow" />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-300 to-indigo-200 flex items-center justify-center border-4 border-purple-200 shadow">
                  <span className="text-2xl sm:text-3xl font-bold text-purple-700">
                    {userProfile?.displayName?.[0] || user?.email?.[0] || '?'}
                  </span>
                </div>
              )}
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{userProfile?.displayName || 'User'}</h2>
                <p className="text-gray-600 text-sm sm:text-base">{user?.email}</p>
              </div>
            </div>

            {/* App features section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-50 p-6 rounded-2xl hover:shadow-xl transition-all border border-indigo-100 flex flex-col items-start">
                <div className="mb-3 flex items-center justify-center w-10 h-10 rounded-full bg-purple-200">
                  <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1 text-gray-800">Emergency Contacts</h3>
                <p className="text-gray-600 mb-2 text-sm">Add trusted contacts who will be notified in case of emergency.</p>
                <Button variant="primary" fullWidth>Manage Contacts</Button>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-indigo-50 p-6 rounded-2xl hover:shadow-xl transition-all border border-purple-100 flex flex-col items-start">
                <div className="mb-3 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-200">
                  <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1 text-gray-800">Safety Settings</h3>
                <p className="text-gray-600 mb-2 text-sm">Configure triggers and safety features for quick access.</p>
                <Button variant="primary" fullWidth>Configure</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
