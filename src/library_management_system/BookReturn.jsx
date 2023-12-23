import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveTransaction, retrieveTransactionByTransactionNumber, transactionCheckIn } from "../api/transactionApiServices";
import { retrieveBorrower } from "../api/borrowerApiServices";


const BorrowerInfoASide = ({ cancelAllTransactions, borrower }) => (
    <div className="border rounded bg-light-subtle py-2 px-5 d-flex">
        <div className="me-4 text"><span>{borrower.firstName} {borrower.lastName}</span></div>
        <div className="me-4  text">{borrower.membershipStatus}</div>
        <div className="ms-3">
            <button onClick={cancelAllTransactions} className="btn btn-sm btn-danger">
                <span className="d-flex align-items-center">
                    <i className="bi bi-trash3-fill"></i>
                </span>
            </button>
        </div>
    </div>
)
const BorrowerSearchForm = ({ submit, setBorrowerNumberSearch, borrowerNumberSearch }) => (
    <form className="d-flex  my-2 my-lg-0" onSubmit={submit} role="search">
        <div className="input-group ">
            <input type="text" className="form-control" name="borrowerNumberSearch" value={borrowerNumberSearch} onChange={(e) => setBorrowerNumberSearch(e.target.value)} placeholder="Borrower Number" aria-label="Recipient's username" aria-describedby="button-addon3" />
            <button className="btn btn-primary " type="submit" id="button-addon3"><i className="bi bi-search"></i></button>
        </div>
    </form>
)

const BookSearchForm = ({ submit, setIsbnSearch, isbnSearch }) => (
    <form className="d-flex my-2 my-lg-0" onSubmit={submit} role="search">
        <div className="input-group ">
            <input type="text" className="form-control" name="isbnSearch" value={isbnSearch} onChange={(e) => setIsbnSearch(e.target.value)} placeholder="Book ISBN" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button className="btn btn-primary" type="submit" id="button-addon2" ><i className="bi bi-search"></i></button>
        </div>
    </form>
)


const generateReturnReceipt = (transactionList) => {
    if (transactionList && transactionList.length > 0) {
        const receipts = transactionList.map((transaction, index) => {
            const {
                borrower,
                book,
                borrowDate,
                returnDate,
                transactionNumber,
                actualReturnDate,
                lateFee,
                damageFine
            } = { ...transaction };
            // Create a string for each transaction's receipt information
            const receiptInfo = `
                Receipt ${index + 1}
                Transaction Number: ${transactionNumber}
                Borrower Name: ${borrower.firstName} ${borrower.lastName}
                Book Title: ${book.title}
                Book ISBN: ${book.isbn}
                Borrow Date: ${borrowDate}
                Return Date: ${returnDate}
                Actual Return Date: ${actualReturnDate}
                Late Fee: ${lateFee}
                Damage FIne: ${damageFine}
            `;




            return receiptInfo;
        });
        console.log("reciept >>>" + receipts)
        return receipts;
    }
    return ['No transactions found'];
};



export  const BookReturn = () => {
    const handleTransactionSearch = async (e) => {
        e.preventDefault()
        try {
            const response = await retrieveTransactionByTransactionNumber(transactionNumberSearch)//.then(response =>  console.log(response))
            addResponseToTransactions(response.data)
            
            console.log("Transactions ==>>", JSON.stringify(transactions, null, 2))
        } catch (error) {
            console.log(error)
        }

    }
    const handleTransactionsearchByBookIsbn = async (e) => {
        e.preventDefault()
        if (borrower) {
            // await retrieveTransaction(isbnSearch, borrower.borrowerNumber).then(response => console.log(response)).catch(error => console.log(error))
            try {
                const response = await retrieveTransaction(isbnSearch, borrower.borrowerNumber) //Because Of Some serializations/deserialisation mechanisme paid and returned changed to paid and returned when recieving data from the API
                console.log("Response == ", JSON.stringify(response, null,2))
                addResponseToTransactions(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        setIsbnSearch('')
    }
    const addResponseToTransactions = (data) => {
        const newTransaction = {//response.data == the transaction setting field by field to make sure of the naming
            transactionId: data.transactionId,
            transactionNumber: data.transactionNumber,
            borrower: data.borrower,
            book: data.book,
            borrowDate: data.borrowDate,
            returnDate: data.returnDate,
            returned: data.returned,
            actualReturnDate: data.actualReturnDate,
            lateFee: data.lateFee,
            damageFine: data.damageFine,
            paid: data.paid,
        }
        console.log("newTransaction == ", JSON.stringify(newTransaction, null,2))

        //newTransaction === 'object' &
        if (!newTransaction.returned & !transactions.some(t => t === newTransaction)) {
            setTransactions(prevTansactions => [...prevTansactions, newTransaction])
        }
    }
    const handleBorrowerSearch = (e) => {
        e.preventDefault()
        getBorrower(borrowerNumberSearch)
    }
    const getBorrower = async (borrowerNumber) => {
        await retrieveBorrower(borrowerNumber)
            .then(response => {
                setBorrower(response.data)
            })
            .catch((error) => console.log(error))
        setBorrowerNumberSearch('')
    }

 



    const [borrower, setBorrower] = useState()
    const [transactions, setTransactions] = useState([])

    const [isbnSearch, setIsbnSearch] = useState()
    const [borrowerNumberSearch, setBorrowerNumberSearch] = useState()
    const [transactionNumberSearch, setTransactionNumberSearch] = useState()

    const [isByTransactionNum, setIsByTransactionNum] = useState()

    const cancelAllTransactions = () => {
        setBorrower('')
        setTransactions([])
    }

    const updateTransactionFields = (e, transactionId) => {
        const { name, value } = e.target
        const updatedTransactions = transactions.map(
            transaction => {
                if (transaction.transactionId === transactionId) {
                    return { ...transaction, [name]: value }
                }
                return transaction
            }
        )
        setTransactions(updatedTransactions)

    }

    return (
        <>
            <div className="d-flex">
                <div class="btn-group me-auto ms-auto" role="group" aria-label="Default button group">
                    <button type="button" onClick={() => setIsByTransactionNum(false)} class="btn btn-outline-primary">By Borrower</button>
                    <button type="button" onClick={() => setIsByTransactionNum(true)} class="btn btn-outline-primary">By Transaction</button>
                </div>
            </div>
            <div className="mt-1 mb-2">
                {!isByTransactionNum &&
                    <div className="d-flex">
                        <div className="me-auto">
                            <BookSearchForm submit={handleTransactionsearchByBookIsbn} setIsbnSearch={setIsbnSearch} isbnSearch={isbnSearch} />
                        </div>
                        {!borrower &&
                            <div className="ms-auto">
                                <BorrowerSearchForm submit={handleBorrowerSearch} borrowerNumberSearch={borrowerNumberSearch} setBorrowerNumberSearch={setBorrowerNumberSearch} />
                            </div>
                        }
                        {borrower &&
                            <BorrowerInfoASide cancelAllTransactions={cancelAllTransactions} borrower={borrower} />
                        }
                    </div>}

                {isByTransactionNum &&
                    <div className="d-flex ">
                        <div className="ms-auto">
                            <SearchByTransactionForm submit={handleTransactionSearch} setTransactionNumberSearch={setTransactionNumberSearch} transactionNumberSearch={transactionNumberSearch} />
                        </div>
                    </div>
                }
            </div>
            <div></div>
            <div> <hr /></div>
            <TransactionsTable transactions={transactions} handleInputeChangesForTransactions={updateTransactionFields} />
            {transactions && <CheckInForm transactions={transactions} setTransactions={setTransactions} />}
        </>
    )
}
const CheckInForm = ({ transactions , setTransactions}) => {
    const navigate = useNavigate()

    //change returned status for all transactions before check-in
    const returnedTransactions = transactions.map(transaction => {
        transaction.returned = true
        return transaction
    })
    const checkIn = async (e) => {
        e.preventDefault()
        
        const receipts =  generateReturnReceipt(returnedTransactions)
        for (const transaction of returnedTransactions) {
            try {
                const response = await transactionCheckIn(transaction)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        navigate(`/`, { state: { receipts } })
    }

    return (
        <>
            <div className="d-flex">
                <div className="me-auto">
                    <button className="btn btn-danger" onClick={() => setTransactions([])}>Cancel All</button>
                </div>
                <form onSubmit={checkIn} className="ms-auto">
                    <button className="btn btn-primary">CheckIn</button>
                </form>
            </div>
        </>
    )
}

const TransactionsTable = ({ transactions, handleInputeChangesForTransactions }) => {

    return (
        <>
            <div className="">
                <table className="table table-striped-columns">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>BookIsbn</th>
                            <th>Return Date</th>
                            <th>Actual Return Date</th>
                            <th>Late Fee</th>
                            <th>Damage Fine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction =>
                            <tr key={transaction.transactionId}>
                                <td>{transaction.transactionNumber}</td>
                                <td>{transaction.book.isbn}</td>
                                <td>{transaction.returnDate}</td>
                                <td><input type="date" name="actualReturnDate" value={transaction.actualReturnDate} onChange={(e) => handleInputeChangesForTransactions(e, transaction.transactionId)} /></td>
                                <td><input type="number" name="lateFee" value={transaction.lateFee} onChange={(e) => handleInputeChangesForTransactions(e, transaction.transactionId)} /></td>
                                <td><input type="number" name="damageFine" value={transaction.damageFine} onChange={(e) => handleInputeChangesForTransactions(e, transaction.transactionId)} /></td>
                                <td></td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>
        </>
    )
}

const SearchByTransactionForm = ({ submit, setTransactionNumberSearch, transactionNumberSearch }) => {
    return (
        <>
            <form className="d-flex  me-auto my-2 my-lg-0" onSubmit={submit} role="search">
                <div className="input-group ">
                    <input type="text" className="form-control" name="transactionNumberSearch" value={transactionNumberSearch} onChange={(e) => setTransactionNumberSearch(e.target.value)} placeholder="Transaction Number" aria-label="Recipient's username" aria-describedby="button-addon4" />
                    <button className="btn btn-primary " type="submit" id="button-addon4"><i className="bi bi-search"></i></button>
                </div>
            </form>
        </>
    )
}



export default BookReturn



// CheckInForm.propTypes = {
//     transactions: PropTypes.array.isRequired,
// };