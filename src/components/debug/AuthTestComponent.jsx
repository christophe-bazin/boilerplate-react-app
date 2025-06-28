/**
 * Simple test component to debug authentication errors
 */

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export function AuthTestComponent() {
  const { signIn } = useAuth();
  const [result, setResult] = useState(null);

  const testLogin = async () => {
    console.log('Testing login with wrong credentials...');
    
    try {
      const result = await signIn({ 
        email: 'wrong@email.com', 
        password: 'wrongpassword' 
      });
      
      console.log('SignIn result:', result);
      setResult(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('SignIn error:', error);
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Authentication Test</h3>
      <button 
        onClick={testLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Wrong Login
      </button>
      
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold">Result:</h4>
          <pre className="text-sm overflow-auto">{result}</pre>
        </div>
      )}
    </div>
  );
}
