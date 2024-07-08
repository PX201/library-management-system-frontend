import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../api/userApiServices";

function PasswordReset() {

    const {token,  id} = useParams();
    const navigate  = useNavigate()

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    function newPasswordHandler({ target: { value } }) {
        // console.log(value)
        setNewPassword(value)
    }

    function confirmPasswordHandler({ target: { value } }) {
        // console.log(value)
        setConfirmPassword(value)
    }
    



    async function resetPassword1() {
        const isPasswordReset = await resetPassword(newPassword, id, token);
        if(isPasswordReset) {
            navigate('/login')
        }else{
            window.alert("Something went wrong please try again!")

        }
    }

    return (
        <div className='login-background'>
            <div className="container-fluid">
                <div className="row justify-content-center  align-items-center ">
                    <div className="col-md-4 col-sm-8 p-4 rounded text-white-50" style={{ backgroundColor: 'rgba(25, 25, 25, 0.7)' }}>
                        <h2 className="text-center mb-4">Password Reset</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="input3" className="form-label">New Password </label>
                                <input type="password" className="form-control" id="input3"  value={newPassword} onChange={newPasswordHandler} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="input4" className="form-label">Confirm Password </label>
                                <input type="password" className="form-control" id="input4"  value={confirmPassword} onChange={confirmPasswordHandler} />
                            </div>
                            <div className="d-flex">
                                <span><a className="link text-info" href="/login">Log in</a></span>
                                <button type="button" className="btn btn-primary ms-auto" name="continue" onClick={resetPassword1}>Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <footer className="footer1 d-flex flex-wrap  align-items-center py-3 px-4 bg-opacity-25 bg-secondary">
                <div className="col-6 d-flex align-items-center ">
                    <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        <i className="bi bi-bug"></i>
                    </a>
                    <span className="mb-3 mb-md-0 text-dark-emphasis text-inline">© 2022 Aiman Lahmamsi</span>
                </div>

                <ul className="nav col-6 justify-content-end  list-unstyled d-flex ">
                    <li className="ms-3 "><a className="text-primary" href="#"><i className="bi bi-facebook"></i></a></li>
                    <li className="ms-3"><a className="text-success" href="#"><i className="bi bi-whatsapp"></i></a></li>
                    <li className="ms-3"><a className=" " href="#"></a><i className="bi bi-linkedin text-secondary"></i></li>
                </ul>
            </footer>

        </div>
    )
}
export default PasswordReset