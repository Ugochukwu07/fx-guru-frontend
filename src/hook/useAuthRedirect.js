import { request } from "../service/base";
import { useNavigate } from 'react-router-dom';

export async function useAuthRedirect() {
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('state')?.login?.token;
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await request.get("/authenticated", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.authenticated; // Assuming response contains "authenticated" property
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        throw error;
      }
    }
  };

  // Call the checkAuth function inside the hook
  const isAuthenticated = await checkAuth();

  // No need for the original `if` check, use the returned value
  return isAuthenticated;
}
