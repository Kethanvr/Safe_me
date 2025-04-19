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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with logout */}
        <div className="flex justify-end mb-8">
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
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to SafeMe</h1>
            <p className="text-gray-600">Your discreet safety companion</p>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center mr-4">
                  <span className="text-2xl font-semibold text-purple-700">
                    {userProfile?.displayName?.[0] || user?.email?.[0] || '?'}
                  </span>
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold">{userProfile?.displayName || 'User'}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* App features section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-6 rounded-xl hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold mb-2">Emergency Contacts</h3>
              <p className="text-gray-600 mb-4">Add trusted contacts who will be notified in case of emergency.</p>
              <Button variant="primary">Manage Contacts</Button>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold mb-2">Safety Settings</h3>
              <p className="text-gray-600 mb-4">Configure triggers and safety features for quick access.</p>
              <Button variant="primary">Configure</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
