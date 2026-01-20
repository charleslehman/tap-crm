import { useState, useEffect } from 'react';

interface PasswordGateProps {
  children: React.ReactNode;
}

const PASSWORD = 'texasspace';
const STORAGE_KEY = 'tap-crm-auth';

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">TAP CRM</h1>
        <p className="text-gray-500 text-center mb-6">Enter password to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            className={`w-full px-4 py-3 border rounded-lg mb-4 outline-none transition-colors ${
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`}
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm mb-4">Incorrect password</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
