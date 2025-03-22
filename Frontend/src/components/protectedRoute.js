import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
        try {
          const response = await fetch("http://localhost:5000/verify-session", {
            method: "GET",
            credentials: "include",
          });
  
          if (response.ok) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Session verification failed:", error);
          setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
      };
  
      verifySession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;   // gives time to verify for sessions 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />  // if session exits allow access to home page
};

export default ProtectedRoute;
