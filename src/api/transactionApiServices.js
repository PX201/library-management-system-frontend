import { apiClient } from "./authenticationApiService";


export const searchForTransactions = async (transactionNumber) => await apiClient.get('/api/v1/transactions', { params: { transactionNumber: transactionNumber } })

export const deleteTransaction = async (transactionId) => await apiClient.delete(`/api/v1/transactions/${transactionId}`)

export const updateTransaction = async (transaction) => {
    console.log("in the method ", JSON.stringify(transaction, null, 2))
    return await apiClient.put(`/api/v1/transactions/${transaction.transactionId}`, transaction)
}
export const newTransaction = async (transactionDto) => {
    console.log('TransactionDTO to be added:', JSON.stringify(transactionDto, null, 2));
    return await apiClient.post('/api/v1/transactions', transactionDto)
}

export const getTransactionsByBorrowerId = (borrowerId) => apiClient.get(`/api/v1/transactions/borrowers/${borrowerId}`)
export const retrieveTransaction = (isbnSearch, borrowerNumber) => apiClient.get(`/api/v1/transactions/transactionHistory/${borrowerNumber}/${isbnSearch}`)
export const retrieveTransactionByTransactionNumber = (transactionNumber) => apiClient.get(`/api/v1/transactions/transaction/${transactionNumber}`)
export const transactionCheckIn = (transaction) => apiClient.put(`/api/v1/transactions/checkin`, transaction)