import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "@/stores/authStore";

beforeEach(() => {
  useAuthStore.setState({
    token: null,
    user: null,
  });
});

describe("authStore", () => {
  it("starts unauthenticated with no token or user", () => {
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(!!state.token).toBe(false);
  });

  it("setToken sets the token — isAuthenticated derived as true", () => {
    useAuthStore.getState().setToken("test-token-123");
    const state = useAuthStore.getState();
    expect(state.token).toBe("test-token-123");
    expect(!!state.token).toBe(true);
  });

  it("setUser stores the user object", () => {
    const mockUser = {
      login: "sashen",
      name: "Sashen",
      avatar_url: "https://example.com/avatar.png",
      bio: "Developer",
      followers: 10,
      following: 5,
      public_repos: 20,
      html_url: "https://github.com/sashen",
      location: "Cape Town",
    };
    useAuthStore.getState().setUser(mockUser);
    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it("logout clears token and user — isAuthenticated derived as false", () => {
    useAuthStore.setState({ token: "abc" });
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(!!state.token).toBe(false);
  });
});
