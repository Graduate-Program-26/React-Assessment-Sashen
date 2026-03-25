import { create } from "zustand";
import { persist } from "zustand/middleware";

// Shape of a GitHub user object returned from /user endpoint
interface GitHubUser {
  login:        string;
  name:         string | null;
  avatar_url:   string;
  bio:          string | null;
  followers:    number;
  following:    number;
  public_repos: number;
  html_url:     string;
  location:     string | null;
}

interface AuthState {
  token:    string | null;
  user:     GitHubUser | null;
  setToken: (token: string) => void;
  setUser:  (user: GitHubUser) => void;
  logout:   () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      // Called in CallbackPage after token exchange succeeds
      setToken: (token) => set({ token }),

      // Called in CallbackPage after /user API responds
      setUser: (user) => set({ user }),

      // Called in Navbar logout button
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "github-auth", // localStorage key
    }
  )
);