import { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { AuthAPIService, setAuthTokenToTheApp  } from '../api/authenticationApiService'
import { useAuth } from '../security/authContext'
import { retrieveUser } from '../api/userApiServices'

function Login() {
    const authContext = useAuth()

    const [username, setUsername] = useState('test@example.com')
    const [password, setPassword] = useState('test12345678')
    const [isDenied, setIsDenied] = useState(false)

    const navigate = useNavigate()
    function usernameHandler({ target: { value } }) {
        // npmconsole.log(value)
        setUsername(value)
    }
    function passwordHandler({ target: { value } }) {
        setPassword(value)
    }

    const fetchUserData = async () => {
        try {
            const response = await retrieveUser()
            const retrievedUser = response.data
            // console.log("User is: ", JSON.stringify(retrievedUser, null, 2))
            authContext.setUser(retrievedUser)
        } catch (error) {
            // console.log(error)
        }
    }

    async function checkCredenrial() {
        try {
            const response = await AuthAPIService(username, password)
            const token = response.data.token
            setAuthTokenToTheApp(token)
            await fetchUserData();
            authContext.setAuthenticated(true)
            console.log('success login')
            navigate(`/dashboard`);
        }
        catch (error) {
            authContext.setAuthenticated(false)
            setIsDenied(true)
            console.log('denied login')
            console.log(error)
        }
    }
  

return (
    <div className='login-background'>
        <div className="container-fluid">
            <div className="row justify-content-center  align-items-center ">
                <div className="col-md-4 col-sm-8 p-4 rounded text-white-50" style={{ backgroundColor: 'rgba(25, 25, 25, 0.7)' }}>
                    <h2 className="text-center mb-4">Login</h2>
                    {isDenied && (
                        <div className="alert alert-warning" role="alert">
                            <span>Wrong Credential! please retry again...</span>
                        </div>
                    )}
                    <form>
                        <div className="mb-3">
                            <label htmlFor="inputEmail3" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail3" placeholder="name@example.com" value={username} onChange={usernameHandler} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword3" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" value={password} onChange={passwordHandler} />
                        </div>
                        <div className="d-flex">
                            <span>Forget password? <a className="link text-info" href="/passwordmissed">Click here.</a></span>
                            <button type="button" className="btn btn-primary ms-auto" name="login" onClick={checkCredenrial}>Login</button>
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


export default Login