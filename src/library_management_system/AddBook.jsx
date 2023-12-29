import { useEffect, useState } from "react";
import { addGenreApi, addbook, getGenres } from "../api/booksApiServices";
import { Link, useNavigate } from "react-router-dom";




export function AddBook() {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await getGenres(); // Implement this function to fetch genres
                setGenres(response.data);
            } catch (error) {
                // console.error(error);
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

        fetchGenres();
    }, [newGenre]);

    const [book, setBook] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationYear: '',
        description: '',
        copiesNumber: 0,
        shelfAddress: '',
        genres: [{ genreId: 0, genreName: '' }],
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setBook({ ...book, [name]: value });
    };

    const handleGenreChange = (e) => {
        const selectedGenreObjects = Array.from(e.target.selectedOptions, (option) => {
            return {
                genreId: option.value,
                genreName: option.textContent, // Get the genre name from the option text
            };
        });

        setBook({ ...book, genres: selectedGenreObjects });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the addBook function to send a request to the backend
            await addbook(book);
            // console.log(response)
            setIsSuccess(true); // Set the success state to true upon successful addition
            // Clear the form fields
            setBook({
                title: '',
                author: '',
                isbn: '',
                publicationYear: '',
                description: '',
                copiesNumber: 0,
                shelfAddress: '',
                genres: [{ genreId: 0, genreName: '' }]
            });
        } catch(error) {
            if (error.response) {
              // The request was made, but the server responded with an error status
              console.log(error.response.status);
            } else if (error.request) {
              // The request was made, but no response was received
              navigate('error/403')
            } else {
              // Something happened in setting up the request that triggered an error
              navigate('error')
            }
          }
    };

    const addTheNewGenre = async (e) => {
        if(e)
            e.preventDefault()
        if(newGenre.length > 1)
            await addGenreApi(newGenre)//.then(response => {window.alert(`Genre Successfully Added`) //console.log(response)});
        setNewGenre('');
    }

    return (
        <>
            <div className="col-md-2 me-auto">
                <Link className="btn btn-primary " to={'/Books'} type="button" id="button" >
                    <span >
                        <i className="bi bi-journal"></i> Books
                    </span >
                </Link >
            </div >
            <div className="shadow-lg p-3 mb-2 mt-2 bg-body-tertiary rounded" >
                <div className="h5 text-center">New Book</div>
                <form className="row g-2 m-3 " onSubmit={handleSubmit} >
                    {isSuccess && <div className="alert alert-success col-12">Book added successfully!</div>}
                    <div className="col-12">
                        <div className="row g-2">
                            <div className="col-3 col-sm-6">
                                <input type="text" className="form-control form-control-sm" name="title" value={book.title} onChange={handleInputChange} placeholder="Title" />
                            </div>
                            <div className="col-3 col-sm-6">
                                <input type="text" className="form-control form-control-sm" name="author" value={book.author} onChange={handleInputChange} placeholder="Author" />
                            </div>
                            <div className="col-3 col-sm-6">
                                <input type="text" className="form-control form-control-sm" name="isbn" value={book.isbn} onChange={handleInputChange} placeholder="ISBN" />
                            </div>
                            <div className="col-3 col-sm-6" >
                                <input type="number" className="form-control form-control-sm" name="publicationYear" value={book.publicationYear} onChange={handleInputChange} placeholder="Pulication Year" />
                            </div>
                            <div className="col-3 col-sm-6">
                                <input type="text" className="form-control form-control-sm" name="shelfAddress" value={book.shelfAddress} onChange={handleInputChange} placeholder="ISBN" />
                            </div>
                            <div className="col-3 col-sm-6" >
                                <input type="number" className="form-control form-control-sm" name="copiesNumber" id="inputBookCopies" value={book.bookCopies} onChange={handleInputChange} placeholder="Book Copies" />
                            </div>
                        </div>
                    </div>

                    <div className=" col-md-8 col-sm-12 ">
                        <div class="row g-2">
                            <div className="col-12">
                                <textarea className="form-control form-control-sm" style={{ height: '88px' }} name="description" value={book.description} onChange={handleInputChange} placeholder="Description" id="floatingTextarea2Disabled" ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Add a multi-select dropdown for genres */}
                    <div className="col-md-4 col-sm-12">
                        <div className="row g-2">
                            {/* Other input fields ... */}
                            <div className="col-12">
                                <select
                                    multiple
                                    className="form-select form-select-sm"
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
                        </div>
                    </div>


                    <div className="col-md-3 col-sm-12">
                        <div className="row g-2">
                            <div className="">
                                <button type="submit" className="btn btn-primary btn-sm w-100"><span>Add</span></button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <div className="col-md-6  px-0">
                <form className="d-flex my-3 me-auto">
                        <input type="text" className="form-control" placeholder="Add A New Genre" onChange={(e) => setNewGenre(e.target.value)} value={newGenre} />
                        <button className= "ms-3 btn btn-primary" onClick={(e) => addTheNewGenre(e)}>
                            <span className="">Add</span>
                        </button>
                </form>
            </div>
        </>

    )


}

export default AddBook;