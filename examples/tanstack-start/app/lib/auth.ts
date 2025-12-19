// Mock auth service for demonstration
export const auth = {
  isAuthenticated: async () => {
    // Simulate async check (e.g., checking a cookie or API)
    await new Promise((resolve) => setTimeout(resolve, 100))
    return false // Change to true to simulate logged-in state
  },
  login: async () => {
    // Logic to set session
    console.log("Logged in")
  },
  logout: async () => {
    // Logic to clear session
    console.log("Logged out")
  }
}
