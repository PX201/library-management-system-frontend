import { apiClient } from "./authenticationApiService"


export const retrieveBooks = async () => await apiClient.get('/api/v1/books'); // Make the GET request using the client


export const addbook = async (book) =>{console.log('Book to be added:', JSON.stringify(book, null, 2));

  return await apiClient.post('/api/v1/books', book)}; // Make the GET request using the client

export const getBook = async (id) => await apiClient.get(`/api/v1/books/get/${id}`); // Make the GET request using the client
export const searchBooks = async (keyword) => await apiClient.get('/api/v1/books/search', {
  params: { keyword: keyword } // Send the keyword as a query parameter
})
// return books data

export const retrieveBook =  async (isbn) => await apiClient.get(`/api/v1/books/${isbn}`)

export const deleteBook = async (id) => await apiClient.delete(`/api/v1/books/${id}`)
export const updateBook = async (book, id) => await apiClient.put(`/api/v1/books/${id}`,book)

export const getGenres = async  () => await apiClient.get('/api/v1/genres');
export const addGenreApi = async (genre) => await apiClient.post(`/api/v1/genres`, {genreName: genre})
