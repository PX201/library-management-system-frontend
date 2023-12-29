
export const setAuthTokenToLocalStorage = (authToken) => {
    localStorage.setItem('authToken', authToken);
}

export const getAuthTokenFromLocalStorage = () => localStorage.getItem('authToken');

export const removeAuthTokenFromLocalStorage = () => {
    localStorage.removeItem('authToken');
}