import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/Card";

export default function Home() {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100/60 via-white to-purple-100/60 flex flex-col">
      {/* Modern Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-md backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-indigo-500 flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
                SaveMe
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="#dashboard" 
                className={`font-medium text-sm transition-colors ${activeSection === 'dashboard' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => setActiveSection('dashboard')}
              >
                Dashboard
              </a>
              <a 
                href="#emergency" 
                className={`font-medium text-sm transition-colors ${activeSection === 'emergency' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => setActiveSection('emergency')}
              >
                Emergency
              </a>
              <a 
                href="#settings" 
                className={`font-medium text-sm transition-colors ${activeSection === 'settings' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => setActiveSection('settings')}
              >
                Settings
              </a>
              <a 
                href="#help" 
                className={`font-medium text-sm transition-colors ${activeSection === 'help' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => setActiveSection('help')}
              >
                Help Center
              </a>
            </nav>

            {/* Profile & Logout Button */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-9 h-9 rounded-full border-2 border-primary/30" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
                    <span className="text-sm font-bold text-primary">
                      {userProfile?.displayName?.[0] || user?.email?.[0] || '?'}
                    </span>
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="ml-4 text-sm font-medium text-gray-600 hover:text-primary"
                >
                  Logout
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-600 focus:outline-none"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <a href="#dashboard" className="block py-2 text-gray-600 hover:text-primary font-medium">Dashboard</a>
              <a href="#emergency" className="block py-2 text-gray-600 hover:text-primary font-medium">Emergency</a>
              <a href="#settings" className="block py-2 text-gray-600 hover:text-primary font-medium">Settings</a>
              <a href="#help" className="block py-2 text-gray-600 hover:text-primary font-medium">Help Center</a>
              
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {userProfile?.displayName?.[0] || user?.email?.[0] || '?'}
                      </span>
                    </div>
                  )}
                  <span className="ml-2 text-sm text-gray-700 font-medium">{userProfile?.displayName || user?.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <section className="mb-10" id="dashboard">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-indigo-600">
                Welcome back, {userProfile?.displayName?.split(' ')[0] || 'Friend'}!
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                Your personal safety companion is active and ready to help. Here's your safety dashboard.
              </p>
            </div>

            {/* Status Card */}
            <Card className="backdrop-blur-lg bg-white/80 border border-primary/10 shadow-xl mb-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-400/5 rounded-full -ml-10 -mb-10"></div>
              
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-800">Safety Status</CardTitle>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Active</span>
                </div>
              </CardHeader>
              
              <CardContent className="relative">
                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-6 rounded-xl bg-gradient-to-r from-primary/5 to-indigo-400/5 border border-primary/10">
                  <div className="relative">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-indigo-500 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-3xl font-bold text-white">
                          {userProfile?.displayName?.[0] || user?.email?.[0] || '?'}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">{userProfile?.displayName || 'User'}</h2>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                    <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">Safety Plan Active</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Location Tracking On</span>
                      <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Logout
                </Button>
                    </div>
                  </div>
                  
                  <div className="ml-auto mt-4 sm:mt-0 hidden sm:block">
                    <Button variant="outline" className="rounded-lg border-primary/20 text-primary hover:bg-primary/5">
                      Edit Profile
                    </Button>
                  </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 flex flex-col items-center shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v.01M8 8h.01M12 12h.01M16 16h.01M16 8h.01M8 16h.01M12 20h.01"></path>
                      </svg>
                    </div>
                    <h3 className="text-gray-800 font-medium text-lg">Location Check-ins</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">42</p>
                    <p className="text-gray-500 text-xs mt-1">Last 30 days</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-5 border border-purple-100 flex flex-col items-center shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-gray-800 font-medium text-lg">Emergency Contacts</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">3</p>
                    <p className="text-gray-500 text-xs mt-1">All verified</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-5 border border-green-100 flex flex-col items-center shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <h3 className="text-gray-800 font-medium text-lg">Safety Status</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">100%</p>
                    <p className="text-gray-500 text-xs mt-1">All systems active</p>
                  </div>
                </div>

                {/* Actions Section */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="emergency">
                  {/* Emergency Contacts Card */}
                  <div className="group bg-gradient-to-br from-white to-indigo-50 rounded-xl overflow-hidden border border-primary/10 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-primary flex items-center justify-center shadow-md mb-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">Emergency Contacts</h3>
                          <p className="text-gray-600 mt-1 mb-4">Add and manage trusted contacts who will be notified in case of emergency.</p>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <Button variant="default" className="w-full bg-gradient-to-r from-indigo-500 to-primary hover:from-indigo-600 hover:to-primary shadow-md group-hover:shadow-lg transition-all duration-300">
                          <span className="mr-2">Manage Contacts</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Safety Settings Card */}
                  <div className="group bg-gradient-to-br from-white to-purple-50 rounded-xl overflow-hidden border border-primary/10 shadow-md hover:shadow-lg transition-all duration-300" id="settings">
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-primary flex items-center justify-center shadow-md mb-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">Safety Settings</h3>
                          <p className="text-gray-600 mt-1 mb-4">Configure triggers, emergency responses, and safety features for quick access.</p>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <Button variant="default" className="w-full bg-gradient-to-r from-purple-600 to-primary hover:from-purple-700 hover:to-primary shadow-md group-hover:shadow-lg transition-all duration-300">
                          <span className="mr-2">Configure Settings</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Center Card */}
            <Card className="backdrop-blur-lg bg-white/80 border border-primary/10 shadow-xl overflow-hidden" id="help">
              <div className="bg-gradient-to-r from-indigo-500 to-primary h-3"></div>
              <CardHeader className="relative pt-6">
                <CardTitle className="text-xl font-semibold text-gray-800">Help Center & Resources</CardTitle>
              </CardHeader>
              
              <CardContent className="relative pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-gray-800 font-medium">FAQs</h3>
                    <p className="text-gray-500 text-sm mt-2">Find answers to frequently asked questions about using SaveMe.</p>
                    <a href="#" className="text-primary text-sm font-medium mt-3 inline-block hover:underline">Learn more →</a>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                      </svg>
                    </div>
                    <h3 className="text-gray-800 font-medium">Support</h3>
                    <p className="text-gray-500 text-sm mt-2">Contact our support team for assistance with any issues.</p>
                    <a href="#" className="text-primary text-sm font-medium mt-3 inline-block hover:underline">Contact support →</a>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <h3 className="text-gray-800 font-medium">User Guide</h3>
                    <p className="text-gray-500 text-sm mt-2">Learn how to use all features of SaveMe effectively.</p>
                    <a href="#" className="text-primary text-sm font-medium mt-3 inline-block hover:underline">View guide →</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-10 text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-indigo-500 flex items-center justify-center mr-2 shadow-md">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
                  SaveMe
                </h2>
              </div>
              <p className="text-gray-500 text-sm mt-2">Your personal safety companion</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left mb-6 md:mb-0">
              <div>
                <h3 className="text-gray-800 font-semibold mb-3 text-sm">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">Features</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">Pricing</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">Updates</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-gray-800 font-semibold mb-3 text-sm">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">Help Center</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">Guides</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-gray-800 font-semibold mb-3 text-sm">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">About Us</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">Blog</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-gray-800 font-semibold mb-3 text-sm">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">Privacy</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">Terms</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-primary text-xs">Security</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8">
            <p className="text-gray-500 text-xs">© 2025 SaveMe. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Emergency Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg hover:shadow-xl border-4 border-white transition-all duration-300">
          <span className="sr-only">Emergency</span>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
