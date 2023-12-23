import axios from "axios";

// Add a response interceptor for handling errors globally
axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Handle server error responses
        console.log('Server error:', error.response.status);
        if (error.response.status === 500) {
          // Handle specific server errors
          // Show a generic error message to the user
          window.alert('Something went wrong. Please try again.');
        }
        // You might handle different status codes differently here
      } else if (error.request) {
        // Handle network errors or no response
        console.log('Network error:', error.request);
        // Redirect or perform actions for network errors
        window.location.href = '/error/403'; // Redirects to '/error/403'
      } else {
        // Handle other errors
        console.log('Other error:', error.message);
        // Perform actions for other types of errors
        // For example: window.location.href = '/error/404';
      }
      return Promise.reject(error);
    }
  );
  
  export default axios;  