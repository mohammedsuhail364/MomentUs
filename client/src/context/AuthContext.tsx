import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../lib/appwrite/axios"; // axios instance
import { IUser } from "@/types";

/* ================== TYPES ================== */

export const INITIAL_USER: IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

type AuthContextType = {
  user: IUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  logout: () => void;
};

/* ================== CONTEXT ================== */

const AuthContext = createContext<AuthContextType>({
  user: INITIAL_USER,
  isAuthenticated: false,
  isLoading: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
  logout: () => {},
});

/* ================== PROVIDER ================== */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* -------- CHECK AUTH -------- */
  const checkAuthUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return false;
    }

    try {
      const res = await API.get("/users/me");

      setUser({
        id: res.data._id,
        name: res.data.name,
        username: res.data.username,
        email: res.data.email,
        imageUrl: res.data.imageUrl,
        bio: res.data.bio,
      });

      setIsAuthenticated(true);
      return true;
    } catch (err) {
      // token invalid / expired
      localStorage.removeItem("token");
      setUser(INITIAL_USER);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /* -------- LOGOUT -------- */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(INITIAL_USER);
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  /* -------- INITIAL LOAD -------- */
  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        setUser,
        setIsAuthenticated,
        checkAuthUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ================== HOOK ================== */

export const useUserContext = () => useContext(AuthContext);
