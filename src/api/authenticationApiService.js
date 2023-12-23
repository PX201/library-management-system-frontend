import axios from "axios";


const headers = { common: {} };

// //Deploy Auth
// export const AuthAPIService = (username, password) =>
//   axios.post('http://13.56.114.134:8080/api/v1/auth/login', { email: username, password: password });


//Deployed Api Client
// let apiClient = axios.create({
//   baseURL: 'http://13.56.114.134:8080',
//   headers: headers,
// });
// //Deploy Authentication
// export const setAuthToken = (authToken) => {
//   headers.common['Authorization'] = authToken ? `Bearer ${authToken}` : '';
//   apiClient = axios.create({
//     baseURL: 'http://13.56.114.134:8080',
//     headers: headers,
//   });
// };

//Local Api
export const AuthAPIService = (username, password) =>
  axios.post('http://localhost:8080/api/v1/auth/login', { email: username, password: password });

export const updateAuthentication = async (currentUsername, currentPassword) => {
  try{
    const responce = await AuthAPIService(currentUsername, currentPassword)
    return setAuthTokenToTheApp(responce.data.token)
  }catch{
    return false
  }
    // .then(({ data: { token } }) => setAuthenticationToTheApp(token))
    // .catch(() => false);
}

export const setAuthTokenToTheApp = (authToken) => {
  // Store the token in sessionStorage
  // console.log("authToken is -->> " + authToken)
  try{
    sessionStorage.setItem('authToken', authToken)
    setAuthToken(authToken)
    return true;
  }catch{
    return false;
  }
  

}

//Localhoste Api Client
let apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: headers,
});

export const setAuthToken = (authToken) => {
  headers.common['Authorization'] = authToken ? `Bearer ${authToken}` : '';
  apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: headers,
  });
};




export { apiClient };





// export function createApiClient() {
//   const authToken = sessionStorage.getItem('authToken'); // Fetch the token asynchronously
//   console.log("Token been called >> " + authToken)
//   const headers = authToken
//     ? { 'Authorization': `Bearer ${authToken}` }
//     : {};

//   const apiClient = axios.create({
//     baseURL: 'http://localhost:8080',
//     headers: {
//       common: headers,
//     },
//   });

//   return apiClient;
// };

