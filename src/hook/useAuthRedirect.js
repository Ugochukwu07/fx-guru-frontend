import { request } from "../service/base";
import { useNavigate } from "react-router-dom";

export async function useAuthRedirect() {
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const jsonData = JSON.parse(localStorage.getItem("state"));
      const token = jsonData?.login?.token;

      console.log(token);
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await request.get("/authenticated", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.authenticated;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        throw error;
      }
    }
  };

  const isAuthenticated = await checkAuth();

  return isAuthenticated;
}
