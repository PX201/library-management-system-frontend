
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { searchForTransactions } from "../api/transactionApiServices";

function TransactionList({ transactions }) {


    return (
        <>

            <table className="table  table-striped table-bordered rounded-5">
                <thead>
                    <tr>
                        <th scope="col">Transaction Number</th>
                        <th scope="col">Borrower Number</th>
                        <th scope="col">Book ISBN</th>
                        <th scope="col">Borrow Date</th>
                        <th scope="col">Return Date</th>
                        <th scope="col">Actual Return Date</th>
                        <th scope="col">Is Returned</th>
                        <th scope="col">Late Fee</th>
                        <th scope="col">Damage Fine</th>
                        <th scope="col">Is Paid</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map(
                            transaction => (
                                <TransactionRow transaction={transaction} />
                            )

                        )
                    }
                </tbody>
            </table>
        </>
    )
}
function TransactionRow({ transaction }) {
    // console.log("transaction is: " , JSON.stringify(transaction, null, 2))
    const navigate = useNavigate()
    const navigateToViewTransaction = (transaction) => {
        // Pass borrower data as state to the next route
        navigate(`/viewTransaction/${transaction.transactionId}`, { state: { transaction } })
    }
    return (
        <>
            <tr key={transaction.transactionId}>
                <td><button className="btn  text-decoration-none border-0" onClick={() => navigateToViewTransaction(transaction)} >{transaction.transactionNumber}</button></td>
                <td><Link className="btn  text-decoration-none border-0" to={`/viewBorrower/${transaction.borrower.userId}`}>{transaction.borrower.firstName} {transaction.borrower.lastName}</Link></td>
                <td><Link className="btn  text-decoration-none border-0" to={`/viewBook/${transaction.book.bookId}`}>{transaction.book.title}</Link></td>
                <td>{transaction.borrowDate}</td>
                <td>{transaction.returnDate || <span> - </span>}</td>
                <td>{transaction.actualReturnDate || <span className="text-center"> - </span>}</td>
                <td>{transaction.returned ? <span> Yes</span> : <span> No</span>}</td>
                <td>{transaction.lateFee}</td>
                <td>{transaction.damageFine}</td>
                <td>{transaction.paid ? <span> Yes</span> : <span> No</span>} </td>
            </tr>
        </>
    )
}

export default function TransactionManagement() {
    const navigate = useNavigate() 
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]); // retrieved transactions
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const transactionsPerPage = 10; // Number of transactions per page


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const handleSearch = async (e) => {
        if(e)
            e.preventDefault()
        try {
            const response = await searchForTransactions(searchKeyword);
            // console.log("Transactions >>> " , JSON.stringify(response, null, 2))
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
            if(error.response.status == '500')
                navigate('/error/500')
            else{
                navigate('/error')
            }
        }
    }

    useEffect(() => {
        handleSearch(); // Perform the initial search when the component mounts
    }, []);

    function generatePages() {
        const totalPages = Math.ceil(searchResults.length / transactionsPerPage);
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



    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value)
    }
    return (
        <>
            <div className="row pt-3">
                <div className="col-md-4 ms-auto">
                    <form className="d-flex ms-auto my-2 my-lg-0" onSubmit={handleSearch} role="search">
                        <div className="input-group ">
                            <input type="text" className="form-control" placeholder="Find A transaction" aria-label="Recipient's username" aria-describedby="button-addon2" value={searchKeyword} onChange={handleInputChange} />
                            <button className="btn btn-primary " type="submit" id="button-addon2"><i className="bi bi-search"></i></button>
                        </div>
                    </form>
                </div>
            </div >
            <div className="row mt-3 p-0 ms-0">
                <TransactionList transactions={searchResults.slice((currentPage - 1) * transactionsPerPage, currentPage * transactionsPerPage) } />
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
                        <li className={`page-item ${currentPage * transactionsPerPage >= searchResults.length ? 'disabled' : ''}`}>
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

