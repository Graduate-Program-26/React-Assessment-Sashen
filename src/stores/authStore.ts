import { create } from "zustand";
import { persist } from "zustand/middleware";

// Shape of a GitHub user object returned from /user endpoint
interface GitHubUser {
  login:        string;
  name:         string;
  avatar_url:   string;
  bio:          string;
  followers:    number;
  following:    number;
  public_repos: number;
  html_url:     string;
  location:     string;
}

interface AuthState {
  token:           string | null;
  user:            GitHubUser | null;
  isAuthenticated: boolean;
  setToken:        (token: string) => void;
  setUser:         (user: GitHubUser) => void;
  logout:          () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      // Called in CallbackPage after token exchange succeeds
      setToken: (token) => set({ token, isAuthenticated: true }),

      // Called in CallbackPage after /user API responds
      setUser: (user) => set({ user }),

      // Called in Navbar logout button
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: "github-auth", // localStorage key
    }
  )
);