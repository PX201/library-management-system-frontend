import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BorrowerList from "./BorrowerList";
import { searchBorrowers } from "../api/borrowerApiServices";


export default function BorrowerManagement() {
    const navigate = useNavigate()

    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const borrowersPerPage = 10; // Number of books per page

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    function generatePages() {
        const totalPages = Math.ceil(searchResults.length / borrowersPerPage);
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

    const handleSearch = async () => {
        try {
            const response = await searchBorrowers(searchKeyword);
            setSearchResults(response.data);
        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with an error status
                navigate('/error/500')
              } else {
                // Something happened in setting up the request that triggered an error
                navigate('/error/404')
              }
        }
    }

    useEffect(() => {
        handleSearch(); // Perform the initial search when the component mounts
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-md-2 me-auto">
                    <Link className="btn btn-primary " to={'/addUser'} type="button" id="button" >
                        <span >
                            <i className="bi bi-journal-plus me-2"></i > New
                        </span >
                    </Link >
                </div >
                <div className="col-md-3 ms-auto">
                    <form className="d-flex ms-auto my-2 my-lg-0" role="search">
                        <div className="input-group ">
                            <input type="text" className="form-control" placeholder="Find Borrower" aria-label="Recipient's username" aria-describedby="button-addon2" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                            <button className="btn btn-primary " type="button" id="button-addon2"
                                onClick={
                                    () => {
                                        // console.log('clicked ' + searchKeyword)
                                        handleSearch()
                                        // console.log(searchResults)
                                    }
                                }
                            ><i className="bi bi-search"></i></button>
                        </div>
                    </form>
                </div>
            </div >
            <div className="row mt-3 p-0 ms-0">
                <BorrowerList borrowers={searchResults.slice((currentPage - 1) * borrowersPerPage, currentPage * borrowersPerPage)} />
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
                        <li className={`page-item ${currentPage * borrowersPerPage >= searchResults.length ? 'disabled' : ''}`}>
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