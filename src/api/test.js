import { apiClient } from "./authenticationApiService";

export const authenticate = async () => {
  try {
    const response = await apiClient.get('/api/v1/test');
    if (response.status === 200) {
      return true; // Authentication successful
    } else {
      return false; // Authentication failed for other status codes
    }
  } catch (error) {
    // Handle errors (e.g., network issues, server errors)
    // console.error('Authentication error:', error);
    return false; // Authentication failed due to error
  }
};