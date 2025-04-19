import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(email, password, { displayName: name });
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-sm">
        <Card className="border border-[#dbdbdb] rounded-sm shadow-none">
          <CardContent className="pt-8 px-8 pb-4">
            <div className="text-center mb-6">
              <h1 className="text-[#262626] text-5xl font-['Instagram Sans Script'] mb-4">
                SaveMe
              </h1>
              <p className="text-[#8e8e8e] font-semibold text-sm">
                Sign up to see updates from your friends.
              </p>
            </div>
            
            <button
              type="button"
              className="w-full flex items-center justify-center bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold text-sm py-1 rounded-lg mb-4"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#FFFFFF" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FFFFFF" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#FFFFFF" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Sign up with Google
            </button>
            
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#dbdbdb]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-4 text-[#8e8e8e] font-semibold">OR</span>
              </div>
            </div>
            
            {error && (
              <div className="mb-4 text-sm text-red-500 text-center">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#fafafa] text-xs h-9 border-[#dbdbdb] rounded-sm px-2 focus:border-[#a8a8a8]"
                />
              </div>
              
              <div>
                <Input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-[#fafafa] text-xs h-9 border-[#dbdbdb] rounded-sm px-2 focus:border-[#a8a8a8]"
                />
              </div>
              
              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#fafafa] text-xs h-9 border-[#dbdbdb] rounded-sm px-2 focus:border-[#a8a8a8]"
                />
              </div>
              
              <div>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-[#fafafa] text-xs h-9 border-[#dbdbdb] rounded-sm px-2 focus:border-[#a8a8a8]"
                />
              </div>
              
              <p className="text-[#8e8e8e] text-xs text-center mt-3 mb-3">
                People who use our service may have uploaded your contact information to SafeMe. 
                By signing up, you agree to our Terms, Privacy Policy and Cookie Policy.
              </p>
              
              <Button 
                type="submit" 
                className="w-full h-8 mt-1 bg-[#0095f6] hover:bg-[#1877f2] text-sm font-semibold rounded-lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  'Sign up'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="border border-[#dbdbdb] rounded-sm shadow-none mt-3">
          <CardContent className="py-5 px-8 text-center">
            <p className="text-sm">
              Have an account?{' '}
              <Link to="/login" className="text-[#0095f6] font-semibold">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}