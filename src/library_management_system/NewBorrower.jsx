import { useState } from "react"
import { addBorrower } from "../api/borrowerApiServices"
import { Link } from "react-router-dom"

function NewBorrower() {
    const [borrower, setBorrowwer] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            birthDate: '',
            membershipStatus: 'ACTIVE',
        })
    const [address, setAddress] = useState({ line1: '', line2: '', city: '', state: '', zipCode: '' })
    const [isSuccess, setIsSuccess] = useState(false)
    const handleInputChange = e => {
        const { name, value } = e.target
        setBorrowwer({ ...borrower, [name]: value })
    }
    const handleAddressChange = e => {
        const { name, value } = e.target
        setAddress({ ...address, [name]: value })
        setBorrowwer({
            ...borrower,
            address: address.line1 + " " + address.line2 + ", " + address.city + " " + address.state + ", " + address.zipCode
        })
    }
    const handleNewBorrower = async (e) => {
        e.preventDefault();
       
        console.log(address)
        console.log(borrower)
        await addBorrower(borrower).then(clearTheForm)
            .catch(() => setIsSuccess(false))
    }
    const clearTheForm = () => {
        setIsSuccess(true)
        setBorrowwer( {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            birthDate: '',
            membershipStatus: 'ACTIVE',
        })
        setAddress({ line1: '', line2: '', city: '', state: '', zipCode: '' })
    }
    return (
        <>
            <div className="col-md-2 me-auto">
                <Link className="btn btn-primary " to={'/borrowers'} type="button" id="button" >
                    <span >Borrowers</span >
                </Link >
            </div >
            <div className="h5 text-center">New Borrower</div>
            <form className="row g-3 bg-light" onSubmit={handleNewBorrower} >
                {isSuccess && <div className="alert alert-success col-12">Borrower added successfully!</div>}
                <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label bg-body-tertiary">First Name</label>
                    <input type="text" className="form-control" name="firstName" value={borrower.firstName} id="firstName" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={borrower.lastName} onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label for="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" name="email" value={borrower.email} onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label for="mobile" className="form-label">Mobile</label>
                    <input type="phone" className="form-control" id="mobile" name="phone" value={borrower.phone} onChange={handleInputChange} />
                </div>
                 <div className="col-md-6">
                    <label for="mobile" className="form-label">Birth Date</label>
                    <input type="date" className="form-control" id="BD" name="birthDate" value={borrower.birthDate} onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label for="mobile" className="form-label">MemberShip Status</label>
                    <select name="membershipStatus"  className="form-select" aria-label="Large select example" id="" value={borrower.membershipStatus} onChange={handleInputChange} >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="EXPIRED">EXPIRED</option>
                        <option value="SUSPENDED">SUSPENDED</option>
                    </select>
                </div>
                <div className="col-12">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" name="line1" value={address.line1} onChange={handleAddressChange} />
                </div>
                <div className="col-12">
                    <label for="inputAddress2" className="form-label">Address 2</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" name="line2" value={address.line2} onChange={handleAddressChange} />
                </div>
                <div className="col-md-6">
                    <label for="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" id="inputCity" name="city" value={address.city} onChange={handleAddressChange} />
                </div>
                <div className="col-md-4">
                    <label for="inputState" className="form-label">State</label>
                    <select id="inputState" className="form-select" name="state" value={address.state} onChange={handleAddressChange}>
                        <option selected >Choose...</option>
                        <option value="AL">AL</option>
                        <option value="GA">GA</option>
                        <option value="CA">CA</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label for="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="inputZip" name="zipCode" value={address.zipCode} onChange={handleAddressChange} />
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" required />
                        <label className="form-check-label" for="gridCheck">
                            Accept terms
                        </label>
                    </div>
                </div>
                <div className="col-12 ">
                    <div className="d-flex">
                        <button type="submit" className="btn btn-primary  ms-auto">Check-Out</button>
                    </div>
                </div>
            </form>
        </>
    )
}












export default NewBorrower