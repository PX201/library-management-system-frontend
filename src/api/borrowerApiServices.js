import { apiClient } from "./authenticationApiService";

export const searchBorrowers = async (keyword) => await apiClient.get(`/api/v1/borrowers/search`, {params:{keyword:keyword}})
export const addBorrower = async (borrower) => await apiClient.post('/api/v1/borrowers', borrower)
export const updateBorrower = async (borrower) => await apiClient.put(`/api/v1/borrowers/${borrower.userId}`, borrower)
export const deleteBorrower = async (id) => await apiClient.delete(`/api/v1/borrowers/${id}`)
export const retrieveBorrower = async  (borrowerNumber) => await apiClient.get(`/api/v1/borrowers/borrower/${borrowerNumber}`)