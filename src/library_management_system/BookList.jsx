import { Link } from "react-router-dom";
import { retrieveBooks } from "../api/booksApiServices";
import { useEffect, useState } from "react";


export default function BookList1() {
    const [books, setBooks] = useState([])
    


    const fetchData = async () => {
        try {
             const response = await retrieveBooks();  // Assuming this function fetches the books
             const data = response.data;
             setBooks(data);  // Set the books in the state
             console.log(books)

        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with an error status
                navigate('/error/500')
            } else if (error.request) {
                // The request was made, but no response was received
                navigate('/error/403')
            } else {
                // Something happened in setting up the request that triggered an error
                navigate('/error/500')
            }
        }
    };




    useEffect(() => {
        fetchData();  // Call the data fetching function when the component mounts
    }, []);  // The empty dependency array ensures this effect runs once when the component mounts

    return (
        <>

            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">description</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Publication Year</th>
                        <th scope="col">Shelf</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(
                            book => (
                                <tr key={book.bookId}>
                                    <td>{book.bookId}</td>
                                    <td><Link className="btn  text-decoration-none border-0" to={`/viewBook/${book.bookId}`}>{book.title}</Link></td>
                                    <td>{book.author}</td>
                                    <td>{book.description}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.publicationYear}</td>
                                    <td>{book.shelfAddress}</td>
                                </tr>
                            )

                        )
                    }
                </tbody>
            </table>
        </>
    )
}