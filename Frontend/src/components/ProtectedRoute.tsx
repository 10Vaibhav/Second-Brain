import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            authorization: token
          }
        });
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full gradient-bg flex justify-center items-center">
        <div className="glass-effect rounded-3xl p-8 flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mb-4" 
               style={{borderColor: '#3B9797', borderTopColor: 'transparent'}}></div>
          <p className="text-lg font-medium" style={{color: '#132440'}}>
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}