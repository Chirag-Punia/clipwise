import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ScriptGenerator from './components/ScriptGenerator';
import ScriptLibrary from './components/ScriptLibrary';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

function AuthenticatedApp() {
  const [savedScripts, setSavedScripts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { logout, user } = useAuth();
  
 
  useEffect(() => {
    const fetchSavedScripts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/scripts', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setSavedScripts(response.data);
      } catch (error) {
        console.error('Error fetching scripts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedScripts();
  }, [user.token]);

  const handleSaveScript = async (script) => {
    try {
     
      const response = await axios.post(
        'http://localhost:3000/api/scripts/save',
        {
          prompt: script.prompt,
          script: script.script,
          language: script.language,
          date: script.date,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

     
      if (response.data) {
        setSavedScripts([...savedScripts, { ...script, id: response.data.id }]);
      }
    } catch (error) {
      console.error('Error saving script:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Video Script Generator</h1>
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          <ScriptGenerator onSaveScript={handleSaveScript} />
          
          {/* Display loading state if scripts are being fetched */}
          {isLoading ? (
            <div>Loading saved scripts...</div>
          ) : (
            <ScriptLibrary scripts={savedScripts} />
          )}
        </div>
      </main>
    </div>
  );
}

function UnauthenticatedApp() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { user } = useAuth();

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;
