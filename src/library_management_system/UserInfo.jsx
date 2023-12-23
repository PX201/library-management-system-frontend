import { useState } from "react";
import { useAuth } from "../security/authContext";
import { updatePassword, updateUserApi } from "../api/userApiServices";
import { Link } from "react-router-dom";


export const UserInfo = () => {
    const user = useAuth().user
    const [editing, setEditing] = useState(false)
    const [editedUser, setEditedUser] = useState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Call the updateUser function with editedUser
        updateUser(editedUser);
        setEditing(false);
    };

    const updateUser = async (editedUser) => {
        try {
            await updateUserApi(editedUser);
            setEditedUser({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber
            })
            window.alert(`User Info Updated`)
        } catch (error) {
            window.alert(`Something went wrong`)
        }
    }

    return (
        <>
            <div className="mb-2">
                <Link className="text-decoration-none text-dark" to={`/dashboard`}>{"Home/"}</Link>
                User
            </div>
            <div className="col-md-12 col-sm-12 ">
                <div className="card mb-3">
                    <div className="card-header bg-secondary text-white d-flex">
                        <span>{editing ? 'Edit User Information' : 'User Information'}</span>

                        <div className="ms-auto">
                            {editing ?
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="btn btn-sm btn-success me-3"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditing(false)}
                                        className="btn btn-sm btn-secondary me-3"
                                    >
                                        Cancel
                                    </button>
                                </> :
                                <button
                                    onClick={() => setEditing(true)}
                                    className="btn btn-sm btn-success me-3"
                                >
                                    Edit
                                </button>
                            }
                        </div>

                    </div>
                    <div className="card-body">
                        {editing ? (
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">First Name:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="firstName"
                                                value={editedUser.firstName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Last Name:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="lastName"
                                                value={editedUser.lastName}
                                                onChange={handleInputChange}
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
                                                value={editedUser.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Phone Number:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="phoneNumber"
                                                value={editedUser.phoneNumber}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <strong>First Name:</strong> {user.firstName}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Last Name:</strong> {user.lastName}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <strong>Email:</strong> {user.email}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Phone Number:</strong> {user.phoneNumber}
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='col-md-12 col-sm-12'>
                {/* <button className='btn-link ms-auto' onClick={() => setChangingPassword(true)}>Change Passwoord:</button> */}

                <p class="d-inline-flex mb-0">
                    <a class="btn btn-link text-decoration-none text-reset" data-bs-toggle="collapse" href="#collapse-password-changing" role="button" aria-expanded="false" aria-controls="collapse-password-changing">
                        Change Password :
                    </a>
                </p>
                <div class="collapse" id="collapse-password-changing">
                    <ChangePassword />
                </div>
            </div>
        </>
    )
}

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const authContext = useAuth()

    const handlePasswordChange = async () => {
        if (newPassword == confirmPassword) {
            try {
                // Call the updatePassword function with currentPassword and newPassword
                await updatePassword(authContext.user.id, currentPassword, newPassword);
                // Redirect to UserInfo on successful password change
                window.alert("Password changed successfully, please use the new password to login");
                authContext.setAuthenticated(false)
            } catch (error) {
                console.log(error)
                setError('Failed to change password');
            }

        }
        else
            setError('Passwords do not match');
    };

    return (
        <>
            <div className="card">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label className="form-label">Current Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm New Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-success me-auto" onClick={handlePasswordChange}>
                            Save
                        </button>
                        <a className="btn btn-danger ms-auto" data-bs-toggle="collapse" href="#collapse-password-changing" role="button" aria-expanded="false" aria-controls="collapse-password-changing">
                            Cancel
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}