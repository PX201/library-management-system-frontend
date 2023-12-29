
import { Link, useNavigate } from "react-router-dom"
import { searchBooks } from "../api/booksApiServices";
import { useEffect, useState } from "react";


export function BookList({ books }) {

    return (
        <>

            <table className="table table-bordered table-striped table-rounded-5">
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

export default function BookManagement() {
    const navigate = useNavigate()
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const [isNewBookVisible, setIsNewBookVisible] = useState(toAddBook)
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const booksPerPage = 10; // Number of books per page

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const handleSearch = async (e) => {
        if (e)
            e.preventDefault();
        try {
            const response = await searchBooks(searchKeyword);
            setSearchResults(response.data);
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
    }

    useEffect(() => {
        handleSearch(); // Perform the initial search when the component mounts
    }, []);


    function generatePages() {
        const totalPages = Math.ceil(searchResults.length / booksPerPage);
        let elements = [];

        for (let i = 1; i <= totalPages; i++) {
            elements.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        return elements;
    }


    return (
        <>

            <div className="row">
                <div className="col-md-2 me-auto">
                    <Link className="btn btn-primary " to={'/newBook'} type="button" id="button" >
                        <span >
                            <i className="bi bi-journal-plus me-2"></i > New Book
                        </span >

                    </Link >
                </div >
                <div className="col-md-4 ms-auto">
                    <form className="d-flex ms-auto my-2 my-lg-0" onSubmit={handleSearch} role="search">
                        <div className="input-group ">
                            <input type="text" className="form-control" placeholder="Find A Book" aria-label="Recipient's username" aria-describedby="button-addon2" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                            <button className="btn btn-primary " type="submit" id="button-addon2">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div >
            <div className="row mt-3 p-0 ms-0">
                <BookList books={searchResults.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)} />
            </div>
            <div className="row ms-auto">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </button>
                        </li>
                        {generatePages()}
                        <li className={`page-item ${currentPage * booksPerPage >= searchResults.length ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

        </>
    )
}

// How Parameter default works
// BookManagement({toAddBook})
// BookManagement.defaultProps = {
//     toAddBook: false
// }