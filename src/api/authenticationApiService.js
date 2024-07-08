import axios from "axios";
import { removeAuthTokenFromLocalStorage, setAuthTokenToLocalStorage } from "../security/tokenServices";


const BaseURL = 'http://localhost:8080'; // The backend URL
const headers = { common: {} };


//Local Api
export const AuthAPIService = (username, password) =>
  axios.post(BaseURL + '/api/v1/auth/login', { email: username, password: password });

export const updateAuthentication = async (currentUsername, currentPassword) => {
  try {
    const responce = await AuthAPIService(currentUsername, currentPassword)
    return setAuthTokenToTheApp(responce.data.token)
  } catch {
    return false
  }
}

export const setAuthTokenToTheApp = (authToken) => {
  // Store the token in localStorage
  try {
    setAuthTokenToLocalStorage(authToken)
    setAuthToken(authToken)
    return true;
  } catch {
    console.log("problem in setAuthTokenToTheApp")
    return false;
  }
}

export const removeAuthTokenFromTheApp = () => {
  // remove token from localStorage and header
  try {
    removeAuthTokenFromLocalStorage()
    setAuthToken('')
    return true;
  } catch {
    return false;
  }
}


//Localhoste Api Client
let apiClient = axios.create({
  baseURL: BaseURL,
  headers: headers,
});

export const setAuthToken = (authToken) => {
  headers.common['Authorization'] = authToken ? `Bearer ${authToken}` : '';
  apiClient = axios.create({
    baseURL: BaseURL,
    headers: headers,
  });
};

export const setHeader = (headerName, headerVal) => {
  headers.common[headerName] = headerVal
  apiClient = axios.create({
    baseURL: BaseURL,
    headers: headers,
  })
}


export { apiClient };
