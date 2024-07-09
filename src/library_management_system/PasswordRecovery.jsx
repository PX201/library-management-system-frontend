import { useState } from 'react'
import './login.css'
import { sendResetLink } from '../api/userApiServices'

function PasswordRecovery() {
    //test@example.com
    //test12345678

    const [email, setEmail] = useState('')
    const [isResetLinkSent, setResetLinkSent] = useState(false)

    function usernameHandler({ target: { value } }) {
        // console.log(value)
        setEmail(value)
    }




    async function sendLink() {
        const isTrue = await sendResetLink(email);
        setResetLinkSent(isTrue)
        if(isResetLinkSent === false) {
            console.log('Error While Trying to send reset link')
        }
    }

    return (
        <div className='login-background'>
            <div className="container-fluid">
                <div className="row justify-content-center  align-items-center ">
                    <div className="col-md-4 col-sm-8 p-4 rounded text-white-50" style={{ backgroundColor: 'rgba(25, 25, 25, 0.7)' }}>
                        <h2 className="text-center mb-4">Forget Password</h2>
                        {isResetLinkSent && (
                            <div className="alert alert-success" role="alert">
                                <span>Reset link is send successfully, please check your email!</span>
                            </div>
                        )}
                        {!isResetLinkSent &&

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail3" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="inputEmail3" placeholder="name@example.com" value={email} onChange={usernameHandler} />
                                </div>
                                <div className="d-flex">
                                    <span><a className="link text-info" href="/login">Log in</a></span>
                                    <button type="button" className="btn btn-primary ms-auto" name="continue" onClick={sendLink}>Continue</button>
                                </div>
                            </form>
                        }
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


export default PasswordRecovery