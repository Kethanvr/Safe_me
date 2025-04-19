import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
            <div className="text-center mb-8">
              <h1 className="text-[#262626] text-5xl font-['Instagram Sans Script'] mb-4">
                SaveMe
              </h1>
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
                  type="text"
                  placeholder="Phone number, username, or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              
              <Button 
                type="submit" 
                className="w-full h-8 mt-4 bg-[#0095f6] hover:bg-[#1877f2] text-sm font-semibold rounded-lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  'Log in'
                )}
              </Button>
            </form>
            
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#dbdbdb]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-4 text-[#8e8e8e] font-semibold">OR</span>
              </div>
            </div>
            
            <button
              type="button"
              className="w-full flex items-center justify-center text-[#385185] font-semibold text-sm mb-4"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Log in with Google
            </button>
            
            <div className="text-center">
              <Link to="/forgot-password" className="text-xs text-[#00376b]">
                Forgot password?
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-[#dbdbdb] rounded-sm shadow-none mt-3">
          <CardContent className="py-5 px-8 text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#0095f6] font-semibold">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
        
        <div className="text-center mt-4 text-xs text-[#8e8e8e]">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}

export default Login;

