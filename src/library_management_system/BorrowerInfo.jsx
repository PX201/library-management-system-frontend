import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import BorroweHistories from "./BorroweHistories"
import { deleteBorrower, updateBorrower } from "../api/borrowerApiServices"

export default function BorrowerInfo() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [borrower, setBorrower] = useState(state && {
        userId: state.borrower.userId,
        borrowerNumber: state.borrower.borrowerNumber,
        firstName: state.borrower.firstName,
        lastName: state.borrower.lastName,
        email: state.borrower.email,
        phone: state.borrower.phone,
        membershipStatus: state.borrower.membershipStatus,
        birthDate: state.borrower.birthDate,
        address: state.borrower.address
    })

    const [isEditMode, setIsEditMode] = useState(false)
    const [isHistoryShown, setIsHistoryShown] = useState(false)

    const [isUpdated, setIsUpdated] = useState(false)
    const [isUpdateFailed, setIsUpdateFailed] = useState(false)

    const fetchData = () => {

    }
    const handleFormSubmit = async () => {
        await updateBorrower(borrower).then(showSuccessMessage).catch(showFailMessage)
    }
    const handleDeleteBorrower = async () => {
        await deleteBorrower(borrower.userId).then(() => navigate("/borrowers"))

    }
    const showHistory = () => {
        setIsHistoryShown(!isHistoryShown)
    }
    const handleEditMoodToggle = () => {
        setIsEditMode(!isEditMode)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBorrower({ ...borrower, [name]: value })

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
                <Link className="text-decoration-none text-dark" to={`/borrowers`}>{"Borrowers/"}</Link>
            </div>
            <div className="mt-4  border border-rounded-1 p-3 pb-5 ">
                {isUpdated && <div className="alert alert-success col-12">Borrower Updated successfully!</div>}
                {isUpdateFailed && <div className="alert alert-danger col-12">Borrower Failed To Update!</div>}
                <h5 className="mb-3 text-center">Borrower # {borrower.borrowerNumber}</h5>
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
                                <button onClick={handleDeleteBorrower} className="btn btn-sm btn-danger">
                                    <span className="d-flex align-items-center">
                                        <i className="bi bi-trash3-fill"></i>
                                    </span>
                                </button>
                            </>}
                    </div>

                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">First Name</span>
                    <input type="text" className="form-control" name="firstName" value={borrower.firstName} aria-label="Username" aria-describedby="basic-addon1" onChange={handleInputChange} readOnly={!isEditMode} />
                    <span className="input-group-text" id="basic-addon2">Last Name</span>
                    <input type="text" className="form-control" name="lastName" value={borrower.lastName} aria-label="Username" aria-describedby="basic-addon2" onChange={handleInputChange} readOnly={!isEditMode} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">Email</span>
                    <input type="text" className="form-control" name="email" value={borrower.email} aria-label="Recipient's username" aria-describedby="basic-addon3" onChange={handleInputChange} readOnly={!isEditMode} />

                    <span className="input-group-text" id="basic-addon4">Phone Number</span>
                    <input type="text" className="form-control" name="phone" value={borrower.phone} aria-label="Recipient's username" aria-describedby="basic-addon4" onChange={handleInputChange} readOnly={!isEditMode} />
                </div>
                <div className="mb-3">
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon5">Birth Date</span>
                        <input type="date" className="form-control" name="birthDate" value={borrower.birthDate} id="basic-url" aria-describedby="basic-addon5" onChange={handleInputChange} readOnly={!isEditMode} />

                        <span className="input-group-text" id="basic-addon5">Membership Status</span>
                        {!isEditMode && <input type="text" className="form-control" name="membershipStatus" value={borrower.membershipStatus} id="basic-url" aria-describedby="basic-addon5" />}
                        {isEditMode &&
                            <>
                                <select name="membershipStatus" className="form-select" aria-label="Large select example" id="" value={borrower.membershipStatus} onChange={handleInputChange} >
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="EXPIRED">EXPIRED</option>
                                    <option value="SUSPENDED">SUSPENDED</option>
                                </select>
                            </>}
                    </div>
                    {/* <div className="form-text" id="basic-addon4">Example help text goes outside the input group.</div> */}
                </div>
                <div className="input-group">
                    <span className="input-group-text">Address</span>
                    <textarea className="form-control" name="address" value={borrower.address} aria-label="With textarea" onChange={handleInputChange} readOnly={!isEditMode} />
                </div>

                {/* <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                    <span className="input-group-text">.00</span>
                </div> */}
            </div>
            <div className="m-3 p-2">
                <button className="btn link-offset-2 link-underline link-underline-opacity-0" onClick={showHistory}>Histories</button>
            </div>
            {isHistoryShown && <BorroweHistories borrowerId={borrower.userId} />}
        </>
    )
}