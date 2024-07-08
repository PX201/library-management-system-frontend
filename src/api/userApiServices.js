import { apiClient, setHeader } from "./authenticationApiService";



export const retrieveUser = async () => await apiClient.get('/api/v1/librarians/librarian'); // Make the GET request using the client
export const searchUsers = async (keyword) => await apiClient.get('/api/v1/librarians/Admin', { params: { keyword: keyword } })
export const updateUserApi = async (editedUser) => await apiClient.put('/api/v1/librarians', editedUser)
export const updatePassword = async (id, currentPassword, newPassword) => await apiClient.put(`/api/v1/librarians/${id}`, null, {
    params: {
        currentPassword: currentPassword,
        newPassword: newPassword
    }
});
export const updateUserRoles = async (id, roles) => await apiClient.put(`/api/v1/librarians/Admin/${id}/Role`, roles)
export const registerUser = async (request) => await apiClient.post(`/api/v1/librarians/Admin`, request)
export const sendResetLink = async (email) =>{
    setHeader('X-Base-URL',  window.location.origin)
    return await apiClient.post(`/api/v1/auth/resetpass/${email}`)
}
export const resetPassword = async (newpassword, id, token ) =>{
    setHeader('Authorization', `Bearer ${token}`)
    return await apiClient.post(`/api/v1/librarians/pass-reset/${id}`, null, {
        params:{
            newpassword:newpassword
        }
    })
}
