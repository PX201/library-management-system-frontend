import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApiServices";


export const NewUser = () => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    const [confimedPassword, setConfimedPassword] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const [isSuccess, setIsSuccess] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSubmit = async (e) => {
        if(e)
            e.preventDefault()
        try {
            await registerUser(newUser)
            setIsSuccess(true)
            navigate('/users')
        } catch (error) {
            // console.log(error)
            if (error.response) {
                // The request was made, but the server responded with an error status
                window.alert('Something went wrong Try Again')
              } else if (error.request) {
                // The request was made, but no response was received
                navigate('/error/403')
              } else {
                // Something happened in setting up the request that triggered an error
                navigate('/error/404')
              }
        }
    }
    const checkConfirmation = (e) => {
        setConfimedPassword(e.target.value)
        if (newUser.password === e.target.value) {
            setPasswordsMatch(true)
        } else {
            setPasswordsMatch(false)
        }
    }

    return (
        <>
            <div className="mb-2">
                <Link className="text-decoration-none text-dark" to={`/dashboard`}>{"Home/"}</Link>
                New-User
            </div>
            <div className="shadow-lg p-3 mb-2 mt-2 bg-body-tertiary rounded" >
                <div className="h5 text-center"><span>New User</span></div>
                <form className="row g-2 m-3 " onSubmit={handleSubmit} >
                    {isSuccess && <div className="alert alert-success col-12">Book added successfully!</div>}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">First Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={newUser.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Last Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={newUser.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={newUser.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={newUser.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phoneNumber"
                                    value={newUser.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirm-password"
                                    value={confimedPassword}
                                    onChange={checkConfirmation}
                                    required
                                />
                                {!passwordsMatch && (
                                    <p className="text-danger">Passwords do not match!</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-primary  ms-auto" onClick={handleSubmit}>Add</button>
                    </div>
                </form >
            </div >

        </>
    )
}