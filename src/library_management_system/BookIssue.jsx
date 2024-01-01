import {  useState } from "react"
import { retrieveBorrower } from "../api/borrowerApiServices"
import { retrieveBook } from "../api/booksApiServices"
import { newTransaction} from "../api/transactionApiServices"
import { useNavigate } from "react-router-dom"

const initialGenre = {
    genreId: 0,
    genreName: ''
}

const initialBook = {
    bookId: 0,
    title: '',
    author: '',
    description: '',
    publicationYear: 0,
    isbn: '',
    shelfAddress: '',
    copiesNumber: 0,
    genres: [initialGenre],
    signOutCopies: 0,
    isAllSignedOut: false,

}


const initialTransactionDto = {
    transactionId: 0,
    bookId: 0,
    borrowerId: 0,
    borrowDate: '',
    returnDate: '',

}
const initialBorrower = {
    userId: 0,
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    membershipStatus: '',
    borrowerNumber: '',


}
const initialTransaction = {
    transactionId: 0,
    transactionNumber: '',
    borrower: initialBorrower,
    book: initialBook,
    borrowDate: '',
    returnDate: '',
    isReturned: false,
    actualReturnDate: '',
    lateFee: 0.00,
    damageFine: 0.00,
    isPaid: false,
}



// Generate and return an array of receipts for the Transactions List 
const generateReceipt = (transactionList) => {
    if (transactionList && transactionList.length > 0) {
        const receipts = transactionList.map((transaction, index) => {
            const {
                borrower,
                book,
                borrowDate,
                returnDate,
                transactionNumber,
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
            `;




            return receiptInfo;
        });
        console.log("reciept >>>" + receipts)
        return receipts;
    }
    return ['No transactions found'];
};

export function BookIssue() {
    const navigate = useNavigate()

    const [id, setId] = useState(1)
    const [borrower, setBorrower] = useState()
    const [books, setBooks] = useState([])
    const [transactionsDto, setTransactionsDto] = useState([])
    const [isbnSearch, setIsbnSearch] = useState('')
    const [borrowerNumberSearch, setBorrowerNumberSearch] = useState('')

    const updateBooksAndTransactionsDto = (book) => {
        if (borrower && book && typeof book === 'object' && !books.some(b => b.bookId === book.bookId)) {
            setBooks(prevBooks => [...prevBooks, book]);
            const newTransactionDto = {
                transactionId: id,
                bookId: book.bookId,
                borrowerId: borrower.borrowerId,
                borrowDate: '',
                returnDate: '',
            }
            setTransactionsDto(prevTransactions => [...prevTransactions, newTransactionDto]);
            setId(id + 1);
            console.log("inside => updateBooksAndTransactionsDto")

        }
    };


    const getBorrower = async (borrowerNumber) => {
        await retrieveBorrower(borrowerNumber)
            .then(response => {
                setBorrower(response.data)
            })
            .catch((error) => {
                console.log(error)
                if(error.pesponse){
                    navigate('error/404')
                }else{
                    navigate('error/505')
                }
            })
        setBorrowerNumberSearch('')
    }
    const getBookAndUpdateTheBooksList = async (isbn) => {
        try {
            const response = await retrieveBook(isbn)
            const returnedBook = response.data
            if (returnedBook.allSignedOut) {
                window.alert(`All copies of the book ${returnedBook.title} are signed out, please update this information before issuing a copy`);
            }
            else {
                updateBooksAndTransactionsDto(returnedBook)
                setIsbnSearch('')
            }
        } catch (error) {
            navigate(`/error/505`)
        }
    }

    const removeAllBooks = () => setBooks([])

    const removeBorrower = () => setBorrower()



    const cancelAllTransactions = () => {
        setBooks([])
        setBorrower()
        setTransactionsDto([])
    }

    // const removeBook = (bookId) => {
    //     setBooks(books.map(book => book.bookId !== bookId))
    // }
    // const removeTransactionDto = (bookId) => {
    //     setTransactionsDto(transactionsDto.map(transactionDto => transactionDto.bookId !== bookId))
    //     removeBook(bookId)
    // }

    const removeTransactionDto = (bookId) => {
        setTransactionsDto(prevTransactionsDto => prevTransactionsDto.filter(transactionDto => transactionDto.bookId !== bookId))
        const bookIndex = books.findIndex(book => book.bookId === bookId)
        if (bookIndex !== -1) {
            setBooks(prevBooks => {
                const updateBooks = [...prevBooks]
                updateBooks.splice(bookIndex, 1)
                return updateBooks
            })
        }
    }

    const getBookById = (bookId) => books.find(book => book.bookId === bookId)

    const getBookTitle = (bookId) => {
        const returnrdBook = getBookById(bookId)
        // console.log("book>>" + returnrdBook)
        return returnrdBook ? returnrdBook.title : 'void'
    }
    
    const handleInputChange = (e, transactionId) => {
        const { name, value } = e.target
        const updatedTransactionsDTO = transactionsDto.map(
            transactionDto => {
                if (transactionDto.transactionId === transactionId) {
                    return { ...transactionDto, [name]: value }
                }
                return transactionDto
            }
        )
        setTransactionsDto(updatedTransactionsDTO)
    }

    const [errors, setErrors] = useState([])

    const handleTransaction = async (transactionDto) => {
        try {
            const response = await newTransaction(transactionDto);
            const returnedTransaction = response.data;

            // Generate receipt here directly if needed
            const receipt = generateReceipt([returnedTransaction]); // Pass as an array for single transaction

            // Do something with the receipt if required
            console.log('Generated Receipt:', receipt);

        } catch (error) {
            console.log('error is >>', error);
            setErrors([...errors, error]);
        }
    };

    // Function to handle transactions submission
    const handleTransactions = async (e) => {
        e.preventDefault();
        setErrors([]);
        const receipts = [];
        let errorOccurred = false;
        for (const transactionDto of transactionsDto) {
            try {
                const response = await newTransaction(transactionDto);
                const returnedTransaction = response.data;
                receipts.push(...generateReceipt([returnedTransaction])); // Push receipts for each transaction

            } catch (error) {
                window.alert(`Can't be done something went wrong. Please try again!`)
                errorOccurred = true;
                cancelAllTransactions();
                console.log("to Erro Page")
                break;
            }
        }

        // Do something with the collected receipts
        console.log('All receipts:', receipts);
        if (!errorOccurred)
            navigateToDashboardWithReceipt(receipts);
    };
    // const handleTransactions = async (e) => {
    //     e.preventDefault();
    //     setErrors([])
    //     for (const transactionDto of transactionsDto) {
    //         await handleTransaction(transactionDto)
    //     }
    //     console.log("see Transactions in handle Transactions " , JSON.stringify(transactionList, null, 2))

    //     const receipts = generateReceipt()
    //     console.log("receipts Generated " + receipts)
    //     navigateToDashboardWithReceipt(receipts)
    // }
    const navigateToDashboardWithReceipt = (receipts) => {
        // Pass borrower data as state to the next route
        navigate(`/`, { state: { receipts } })
    }
    const handleBooksearch = (e) => {
        e.preventDefault()
        getBookAndUpdateTheBooksList(isbnSearch)
    }
    const handleBorrowerSearch = (e) => {
        e.preventDefault()
        getBorrower(borrowerNumberSearch)
    }
    return (
        <>

            <div className="d-flex">
                <div className="me-auto">
                    <BookSearchForm submit={handleBooksearch} setIsbnSearch={setIsbnSearch} isbnSearch={isbnSearch} />
                </div>
                {!borrower &&
                    <div className="ms-auto">
                        <BorrowerSearchForm submit={handleBorrowerSearch} borrowerNumberSearch={borrowerNumberSearch} setBorrowerNumberSearch={setBorrowerNumberSearch} />
                    </div>
                }
                {borrower &&
                    <BorrowerInfoASide cancelAllTransactions={cancelAllTransactions} borrower={borrower} />
                }
            </div>

            <div> <hr /></div>
            <div>
                <TableOfOngoingTransactions transactionsDto={transactionsDto} getBookTitle={getBookTitle} removeTransactionDto={removeTransactionDto} handleInputChange={handleInputChange} />
                <CheckoutForm submit={handleTransactions} borrower={borrower} cancelAllTransactions={cancelAllTransactions} />
            </div>
        </>
    )
}
const BorrowerInfoASide = ({ cancelAllTransactions, borrower }) => (
    <div className="border rounded bg-light-subtle px-4 py-1 d-flex">
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

const CheckoutForm = ({ submit, borrower, cancelAllTransactions }) => (
    <form className="" onSubmit={submit}>
        <div className="d-flex ">
            {borrower &&
                <>
                    <button className="btn btn-success me-auto" type="submit">Check-Out</button>
                    <button className="btn btn-primary ms-auto" onClick={cancelAllTransactions}>Delete All</button>
                </>
            }
        </div>
    </form>
)

const TableOfOngoingTransactions = ({ transactionsDto, getBookTitle, removeTransactionDto, handleInputChange }) => {

    const getTitle = (bookId) => {
        console.log("DTO =>>>>> " + bookId)
        return getBookTitle(bookId)
    }
    // const print = (transaction) => console.log("the Transaction is >> ", JSON.stringify(transaction, null, 2))
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Book Title</th>
                        <th>BorrowDate</th>
                        <th>Return Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactionsDto.map(
                            transactionDTO =>
                                <tr key={transactionDTO.transactionId}>
                                    <td>{transactionDTO.transactionId}</td>
                                    <td>{getTitle(transactionDTO.bookId)}</td>
                                    <td><input className="form-control" type="date" name="borrowDate" value={transactionDTO.borrowDate} onChange={(e) => handleInputChange(e, transactionDTO.transactionId)} /></td>
                                    <td><input className="form-control" type="date" name="returnDate" value={transactionDTO.returnDate} onChange={(e) => handleInputChange(e, transactionDTO.transactionId)} /></td>
                                    <td><button className="btn btn-danger" onClick={() => removeTransactionDto(transactionDTO.bookId)}>Delete</button></td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}


export default BookIssue