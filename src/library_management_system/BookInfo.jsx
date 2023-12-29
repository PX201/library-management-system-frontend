import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBook, getGenres, updateBook } from "../api/booksApiServices";


// export function BookInfo1() {
//     const [book, setBook] = useState({})
//     const { id } = useParams()
//     const fetchData = async () => {
//         try {
//             const response = await getBook(id);  // Assuming this function fetches the books
//             const data = response.data;
//             setBook(data);  // Set the books in the state
//             console.log(book)

//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchData();  // Call the data fetching function when the component mounts
//     }, []);  // The empty dependency array ensures this effect runs once when the component mounts

//     const bookHistory =
//         [{ a: 3, b: 'kcckc', c: 313244, d: '23/12/33' },
//         { a: 3, b: 'kcckc', c: 313244, d: '23/12/33' },
//         { a: 3, b: 'kcckc', c: 313244, d: '23/12/33' },
//         { a: 3, b: 'kcckc', c: 313244, d: '23/12/33' },
//         { a: 3, b: 'kcckc', c: 313244, d: '23/12/33' }];
//     return (
//         <>
//             <div className="row mt-5">
//                 <div className="col-md-9 col-sm-12">
//                     <div className="card">
//                         <div className="card-header d-flex bg-secondary">
//                             <span>About book</span>
//                             <div className="ms-auto">
//                                 <Link to={`/viewBook/${book.id}/update`} className="btn btn-sm btn-success me-3">
//                                     <span className="d-flex align-items-center">
//                                         <i className="bi bi-pencil-square "></i>

//                                     </span>
//                                 </Link>
//                                 <Link to={`/viewBook/${book.id}/delete`} className="btn btn-sm btn-danger ">
//                                     <span className="d-flex align-items-center">
//                                         <i className="bi bi-trash3-fill "></i>
//                                     </span>
//                                 </Link>

//                             </div>

//                         </div>
//                         <div className="card-body ">
//                             <h5 className="card-title">{book.title}</h5>
//                             <h6 className="card-title">{book.author}</h6>
//                             <ul>
//                                 <li><p className="card-text"><label htmlFor="" className="label text-bold"> Description:</label>
//                                     {book.description}
//                                 </p></li>
//                                 <li>{book.isbn}</li>
//                                 <li>{book.bookId}</li>
//                                 <li>{book.shelfAddress}</li>
//                             </ul>

//                             <div className="row g-3">
//                                 <div className="col-3">
//                                     <Link to={`/history?id=${book.id}`} className="btn  btn-info">
//                                         <span className="d-flex align-items-center">
//                                             <i className="bi bi-trash3-fill me-2"></i>
//                                             History
//                                         </span>
//                                     </Link>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

export default function BookInfo() {
    // Define state for edit mode and modified book details
    const navigate = useNavigate()
    const [book, setBook] = useState({
        bookId: 0,
        title: '',
        author: '',
        isbn: '',
        publicationYear: '',
        description: '',
        copiesNumber: 0,
        shelfAddress: '',
        genres: [{ genreId: 0, genreName: '' }],
        signedOutCopies: 0,
        isAllSignedOut: false
    })
    const { id } = useParams()
    const [isEditMode, setIsEditMode] = useState(false);
    const [genres, setGenres] = useState([]);
    const [showHistory, setShowHistory] = useState(false)
    
    const fetchGenres = async () => {
        try {
            const response = await getGenres(); // Implement this function to fetch genres
            setGenres(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await getBook(id);  // Assuming this function fetches the books
            const data = response.data;
            setBook(data); // Set the books in the state
            // console.log(book)
            // console.log(book.isAllSignedOut)

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchGenres();
        fetchData();  // Call the data fetching function when the component mounts
    }, []);  // The empty dependency array ensures this effect runs once when the component mounts


    // Function to handle form submit
    const handleFormSubmit = async () => {
        // book.preventDefault();
        // Call the API to update the book with modifiedBook
        // You'll need to implement this updateBook function
        updateBook(book, book.bookId);
        setIsEditMode(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBook({ ...book, [name]: value })
    }
    const handleGenreChange = (e) => {
        const selectedGenreObjects = Array.from(e.target.selectedOptions, (option) => {
            return {
                genreId: option.value,
                genreName: option.textContent, // Get the genre name from the option text
            };
        });

        setBook({ ...book, genres: selectedGenreObjects });
    };


    const handleDeleteBook = async () => {
        await deleteBook(id)
            .then(navigate('/books'))
            .catch((error) => console.log(error))
    }
    const toggleHistory = () => {
        setShowHistory(!showHistory)
    }

    // Render the form based on edit mode
    return (
        <>
            <div className="mb-2"> 
                <Link className="text-decoration-none text-dark" to={`/dashboard`}>{"Home/"}</Link>
                <Link className="text-decoration-none text-dark" to={`/books`}>{"Books/"}</Link>
                {book.title}
            </div>
            <div className="card mt-4 w-50 ms-auto me-auto" style={{ padding: 0 }}>
                <div className="card-header d-flex " >
                    <span>About book</span>
                    <div className="ms-auto">
                        {isEditMode &&
                            <>
                                <button
                                    onClick={handleFormSubmit}
                                    className="btn btn-sm btn-success me-3"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditMode(false)
                                        fetchData()
                                    }}
                                    className="btn btn-sm btn-secondary me-3"
                                >
                                    Cancel
                                </button>
                            </>
                        }
                        {!isEditMode &&
                            <>
                                <button
                                    onClick={() => setIsEditMode(true)}
                                    className="btn btn-sm btn-success me-3"
                                >
                                    Edit
                                </button>
                                {/* Render the "Delete" button */}
                                <button onClick={handleDeleteBook} className="btn btn-sm btn-danger">
                                    <span className="d-flex align-items-center">
                                        <i className="bi bi-trash3-fill"></i>
                                    </span>
                                </button>
                            </>}

                    </div>
                </div>
                {!isEditMode &&
                    <div className="card-body">

                        <h5 className="card-title mb-3">{book.title}</h5>
                        <h6 className="card-subtitle  mb-3"> <span className="text-secondary">Author: </span>{book.author}</h6>
                        <p className="card-text"><span className="text-secondary">Description: </span>{book.description} jbojcwe vwoejv wev wjvw vw vor wvo  bjoboir bo bor oib re </p>
                        <div className="row">

                            <p className="card-text col-6"><span className="text-secondary">Publication Year: </span>{book.publicationYear}</p>
                            <p className="card-text col-6"><span className="text-secondary">ISBN: </span>{book.isbn}</p>
                            <p className="card-text col-6"><span className="text-secondary">Genre: </span>{book.genres.map(genre => genre.genreName + " ")}</p>
                            <p className="card-text col-6"><span className="text-secondary">Copies Number: </span>{book.copiesNumber}</p>
                            <p className="card-text col-6"><span className="text-secondary">Shelf Address: </span>{book.shelfAddress}</p>
                            <p className="card-text col-6"><span className="text-secondary">Signed Out Copies: </span>{book.signedOutCopies}</p>
                            <p className="card-text col-6"><span className="text-secondary">Is All Signed Out: </span>{book.isAllSignedOut ? 'Yes' : 'No'}</p>
                            <div className="col-12">
                                <div className="d-flex">
                                    <button onClick={toggleHistory} className="btn  btn-info ms-auto">
                                        <span className="">
                                            History
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                }
                {isEditMode &&
                    <div className="card-body">
                        <form className="row" onSubmit={handleFormSubmit}>
                            <div className="col-12">
                                <div className="row g-2">


                                    <div className="col-6">
                                        <label htmlFor="title" className="form-label"> Title</label>
                                        <input
                                            type="text"
                                            className={`form-control ${isEditMode ? "" : "read-only"}`}
                                            id="title"
                                            name="title"
                                            value={book.title}
                                            onChange={(e) => handleInputChange(e)}
                                            readOnly={!isEditMode}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="author" className="form-label">
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${isEditMode ? "" : "read-only"}`}
                                            id="author"
                                            name="author"
                                            value={book.author}
                                            onChange={(e) => handleInputChange(e)}
                                            readOnly={!isEditMode}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="isbn" className="form-label">
                                            ISBN
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${isEditMode ? "" : "read-only"}`}
                                            id="isbn"
                                            name="isbn"
                                            value={book.isbn}
                                            onChange={(e) => handleInputChange(e)}
                                            readOnly={!isEditMode}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="publicationYear" className="form-label">
                                            Publication Year
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${isEditMode ? "" : "read-only"}`}
                                            id="publicationYear"
                                            name="publicationYear"
                                            value={book.publicationYear}
                                            onChange={(e) => handleInputChange(e)}
                                            readOnly={!isEditMode}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="shelfAddress" className="form-label">
                                            Shelf Address
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${isEditMode ? "" : "read-only"}`}
                                            id="shelfAddress"
                                            name="shelfAddress"
                                            value={book.shelfAddress}
                                            onChange={(e) => handleInputChange(e)}
                                            readOnly={!isEditMode}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="copiesNumber" className="form-label">
                                            Copies Number
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${isEditMode ? "" : "read-only"}`}
                                            id="copiesNumber"
                                            name="copiesNumber"
                                            value={book.copiesNumber}
                                            onChange={(e) => handleInputChange(e)}
                                            readOnly={!isEditMode}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-8 g-2">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className={`form-control ${isEditMode ? "" : "read-only"}`}
                                    id="description"
                                    name="description"
                                    value={book.description}
                                    onChange={(e) => handleInputChange(e)}
                                    readOnly={!isEditMode}
                                />
                            </div>

                            <div className="col-4 g-2">
                                <label htmlFor="genres">Genres</label>
                                <select
                                    multiple
                                    className="form-select form-select-sm mt-2"
                                    name="genreIds"
                                    value={book.genres.map((genre) => genre.genreId)}
                                    onChange={handleGenreChange}
                                >
                                    {genres.map((genre) => (
                                        <option key={genre.genreId} value={genre.genreId}>
                                            {genre.genreName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 ">
                                <label className="form-label me-4">All Copies Signed Out :</label>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="allCopiesSignedOutYes"
                                        name="isAllSignedOut"
                                        value="true"
                                        checked={book.isAllSignedOut === true}
                                        onChange={() => setBook({ ...book, isAllSignedOut: true })}
                                        disabled={!isEditMode}
                                    />
                                    <label className="form-check-label" htmlFor="allCopiesSignedOutYes">
                                        Yes
                                    </label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="allCopiesSignedOutNo"
                                        name="isAllSignedOut"
                                        value="false"
                                        checked={book.isAllSignedOut === false}
                                        onChange={() => setBook({ ...book, isAllSignedOut: false })}
                                        disabled={!isEditMode}
                                    />
                                    <label className="form-check-label" htmlFor="allCopiesSignedOutNo">
                                        No
                                    </label>
                                </div>

                            </div>
                        </form>
                    </div>
                }

            </div>
            {showHistory && <BookTransactionHistory id={id} />}
        </>
    );
}


const BookTransactionHistory = (id) => {

    return(
        <>
        
        </>
    )
}
