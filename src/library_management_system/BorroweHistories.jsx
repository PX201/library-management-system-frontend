import { useEffect, useState } from "react"
import { getTransactionsByBorrowerId } from "../api/transactionApiServices"
import { Link, useNavigate } from "react-router-dom"

export default function BorroweHistories({ borrowerId }) {
    const navigate = useNavigate()

    const [histories, setHistories] = useState([]) // Transactions made bt this Borrower
    const fetchData = async () => {
        try {
            const response = await getTransactionsByBorrowerId(borrowerId)
            setHistories(response.data)
        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with an error status
                window.alert('Something went wrong Try Again')
              } else if (error.request) {
                // The request was made, but no response was received
                navigate('/error/403')
              } else {
                // Something happened in setting up the request that triggered an error
                navigate('/error/500')
              }
        }

    }
    useEffect(() => { fetchData() }, [])

    return (
        <>
            <table className="table table-success table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">Transaction Number</th>
                        <th scope="col">Book title</th>
                        <th scope="col">Book Isbn</th>
                        <th scope="col">Borrowing Date</th>
                        <th scope="col">Returning Date</th>
                        <th scope="col">Actual Returning Date</th>
                        <th scope="col">Late Fee</th>
                        <th scope="col">Damage Fee</th>
                        <th scope="col">Is Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        histories.map(
                            transaction => (
                                <tr key={transaction.transactionId}>
                                    <td><button className="btn  text-decoration-none border-0"  >{transaction.transactionNumber}</button></td>
                                    <td><Link className="btn  text-decoration-none border-0" to={`/viewBook/${transaction.book.bookId}`}>{transaction.book.title}</Link></td>
                                    <td>{transaction.book.isbn}</td>
                                    <td>{transaction.borrowDate}</td>
                                    <td>{transaction.returnDate || <span> - </span>}</td>
                                    <td>{transaction.actualReturnDate || <span className="text-center"> - </span>}</td>
                                    <td>{transaction.lateFee}</td>
                                    <td>{transaction.damageFine}</td>
                                    <td>{transaction.paid ? <span> Yes</span> : <span> No</span>} </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </>
    )
}