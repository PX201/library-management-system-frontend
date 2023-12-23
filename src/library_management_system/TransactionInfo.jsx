import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { deleteTransaction, updateTransaction } from "../api/transactionApiServices"

export default function TransactionInfo() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [transaction, setTransaction] = useState(state && {    //isReturned and isPaid could be changed to returned and paid due to diferent serialization/diserialization
        transactionId: state.transaction.transactionId,
        transactionNumber: state.transaction.transactionNumber,
        borrower: state.transaction.borrower,
        book: state.transaction.book,
        borrowDate: state.transaction.borrowDate,
        returnDate: state.transaction.returnDate,
        actualReturnDate: state.transaction.actualReturnDate,
        returned: state.transaction.returned,
        lateFee: state.transaction.lateFee,
        damageFine: state.transaction.damageFine,
        paid: state.transaction.paid

    })

    const [isEditMode, setIsEditMode] = useState(false)

    const [isUpdated, setIsUpdated] = useState(false)
    const [isUpdateFailed, setIsUpdateFailed] = useState(false)

    const fetchData = () => {

    }
    const handleFormSubmit = async () => {
        console.log("transaction before submit ", JSON.stringify(transaction, null, 2))
        await updateTransaction(transaction).then(showSuccessMessage).catch(showFailMessage)
    }
    const handleDeletetransaction = async () => {
        await deleteTransaction(transaction.transactionId).then(() => navigate("/transactions"))

    }

    const handleEditMoodToggle = () => {
        setIsEditMode(!isEditMode)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTransaction({ ...transaction, [name]: value })

    }
    const showSuccessMessage = () => {
        setIsEditMode(!isEditMode)
        setIsUpdated(true)
        setIsUpdateFailed(false)
    }
    const showFailMessage = () => {
        setIsUpdateFailed(true)
        setIsUpdated(false)
    }
    return (
        <>
            <div className="mb-2"> 
                <Link className="text-decoration-none text-dark" to={`/dashboard`}>{"Home/"}</Link>
                <Link className="text-decoration-none text-dark" to={`/transactions`}>{"Transactions/"}</Link>
                {transaction.transactionNumber}
            </div>

            <div className="border border-rounded-1 p-3 pb-5 ">
                {isUpdated && <div className="alert alert-success col-12">transaction Updated successfully!</div>}
                {isUpdateFailed && <div className="alert alert-danger col-12">transaction Failed To Update!</div>}
                <h5 className="text-center">Transaction # {transaction.transactionNumber}</h5>
                <div className="d-flex">
                    <div className="ms-auto mb-3">
                        {isEditMode &&
                            <>
                                <button
                                    onClick={handleFormSubmit}
                                    className="btn btn-sm btn-success me-3"
                                >
                                    <i class="bi bi-floppy-fill"></i> <span className="me-2">Save</span>
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
                                {/** edit button */}
                                <button
                                    onClick={handleEditMoodToggle}
                                    className="btn btn-sm btn-success me-3"
                                >
                                    <i className="bi bi-pen-fill"></i>
                                </button>
                                {/* Render the "Delete" button */}
                                <button onClick={handleDeletetransaction} className="btn btn-sm btn-danger">
                                    <span className="d-flex align-items-center">
                                        <i className="bi bi-trash3-fill"></i>
                                    </span>
                                </button>
                            </>}
                    </div>

                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon10">Book Title</span>
                    <input type="text" className="form-control" name="title" value={transaction.book.title} aria-label="Username" aria-describedby="basic-addon10"  readOnly />
                    <span className="input-group-text" id="basic-addon9">Book ISBN</span>
                    <input type="text" className="form-control" name="isbn" value={transaction.book.isbn} aria-label="Username" aria-describedby="basic-addon9"  readOnly />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon8">Borrower</span>
                    <input type="text" className="form-control" name="borrower" value={transaction.borrower.firstName + " " + transaction.borrower.lastName} aria-label="Recipient's username" aria-describedby="basic-addon8" readOnly/>

                    <span className="input-group-text" id="basic-addon7">Borrower Number</span>
                    <input type="text" className="form-control" name="borrowerNumber" value={transaction.borrower.borrowerNumber} aria-label="Recipient's username" aria-describedby="basic-addon7"  readOnly />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon0">Borrow Date</span>
                    <input type="date" className="form-control" name="borrowDate" value={transaction.borrowDate} aria-label="Recipient's username" aria-describedby="basic-addon0" onChange={handleInputChange} readOnly={!isEditMode}/>

                    <span className="input-group-text" id="basic-addon1">Return Date</span>
                    <input type="date" className="form-control" name="returnDate" value={transaction.returnDate} aria-label="Recipient's username" aria-describedby="basic-addon1" onChange={handleInputChange} readOnly={!isEditMode}/>

                    <span className="input-group-text" id="basic-addon2">Actual Return Date</span>
                    <input type="date" className="form-control" name="actuslReturnDate" value={transaction.returnDate} aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleInputChange} readOnly={!isEditMode}/>

                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">Is Returned</span>
                    {!isEditMode && <input type="text" className="form-control" name="returned" value={transaction.returned ? 'Yes' : 'No'} aria-label="Recipient's username" aria-describedby="basic-addon3" onChange={handleInputChange} readOnly />}
                    {isEditMode &&
                        <>
                            <select name="returned" className="form-select" aria-label="Large select example" id="" value={transaction.returned ? true : false} onChange={handleInputChange} >
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </>
                    }

                    <span className="input-group-text" id="basic-addon4">Late Fee $</span>
                    <input type="text" className="form-control" name="lateFee" value={transaction.lateFee} aria-label="Recipient's username" aria-describedby="basic-addon4" onChange={handleInputChange} readOnly={!isEditMode} />

                    <span className="input-group-text" id="basic-addon5">Damage Fine $</span>
                    <input type="text" className="form-control" name="damageFine" value={transaction.damageFine} aria-label="Recipient's username" aria-describedby="basic-addon5" onChange={handleInputChange} readOnly={!isEditMode} />

                    <span className="input-group-text" id="basic-addon6">Is Paid</span>
                    {!isEditMode && <input type="text" className="form-control" name="paid" value={transaction.paid ? 'Yes' : 'No'} aria-label="Recipient's username" aria-describedby="basic-addon6" onChange={handleInputChange} readOnly />}
                    {isEditMode &&
                        <>
                            <select name="paid" className="form-select" aria-label="Large select example" id="" value={transaction.paid ? true : false} onChange={handleInputChange} >
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </>
                    }

                </div>

            </div>
        </>
    )
}