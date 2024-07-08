import './libraryManagementSystem.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import BookManagement from './BookManagment'
import BorrowerManagement from "./BorrowerManagement";
import Dashboard from './Dashboard'
import Error, { NotFound } from './Error'
import BookInfo from './BookInfo'
import AddBook from './AddBook'
import NewBorrower from './NewBorrower'
import BorrowerInfo from './BorrowerInfo';
import TransactionManagement from './TransactionManagement';
import TransactionInfo from './TransactionInfo';
import BookIssue from './BookIssue';
import BookReturn from './BookReturn'
import Login from './Login';
import { useAuth } from '../security/authContext';
import { UserInfo } from './UserInfo';
import Users from './Users';
import { NewUser } from './NewUser';
import PasswordRecovery from './PasswordRecovery';
import PasswordReset from './PasswordReset';

// Main Offcanvas/(main sidebar)
const Offcanvas = () => {
    return (
        <div className="offcanvas offcanvas-start bg-dark text-white sidebar-nav " tabindex="-1" id="mainOffcanvas" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-body p-0">
                <nav className="navbar-dark">
                    <ul className="navbar-nav">
                        {/* CORE */}
                        <li className='my-3'>
                            <div className='text-white-50  fw-bold small text-uppercase px-3' >
                                CORE
                            </div>
                        </li>
                        {/* DASHBOARD */}
                        <li >
                            <Link to={'/'} className='nav-link px-3'>
                                <span className='me-3'>
                                    <i className="bi bi-speedometer2"></i>
                                </span>
                                <span className='fw-bold text-uppercase'>Dashboard</span>
                            </Link>
                        </li>
                        <li className='my-4'>
                            <hr className="dropdown-devided" />
                        </li>
                        <li>
                            <div className='text-white-50 small  fw-bold  text-uppercase px-3' >
                                INVENTORY
                            </div>
                        </li>
                        {/* BOOKS */}
                        <li>
                            <a className="nav-link px-3 sidebar-link text-white-70  text-uppercase fw-bold" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                <span className='me-3'><i className="bi bi-book"></i></span>
                                <span className=''>Books</span>
                                <span className='right-icon right-icon-1 ms-auto'>
                                    <i className="bi bi-chevron-down"></i>
                                </span>
                            </a>
                            <div className="collapse" id="collapseExample">
                                <div className="card card-body text-dark bg-dark">
                                    <ul className="navbar-nav px-3 text-uppercase fw-bold" aria-labelledby="borrowDropdown">
                                        <li><Link to={'/issueBook'} className="nav-link ">
                                            <span className='me-2'><i class="bi bi-plus-square-fill"></i></span>
                                            <span>Book Issue</span>
                                        </Link></li>
                                        <li><Link to={'/bookReturn'} className="nav-link ">
                                            <span className='me-2'><i className="bi bi-arrow-repeat"></i></span>
                                            <span>Book Return</span>
                                        </Link></li>
                                        <li><Link to={'/books'} className=" nav-link ">
                                            <span className='me-2'><i className="bi bi-binoculars-fill"></i></span>
                                            <span>Books Look-Up</span>
                                        </Link></li>
                                        <li><Link to={'/newBook'} className=" nav-link ">
                                            <span className='me-2'><i className="bi bi-file-earmark-plus-fill"></i></span>
                                            <span>New Book</span>
                                        </Link></li>

                                    </ul>
                                </div>
                            </div>
                        </li>
                        {/* BORROWERS */}
                        <li>
                            <a className="nav-link px-3 sidebar-link text-white-70  text-uppercase fw-bold" data-bs-toggle="collapse" href="#collapseExample-2" role="button" aria-expanded="false" aria-controls="collapseExample-2">
                                <span className='me-3'><i className="bi bi-person"></i></span>
                                <span className=''>Customers</span>
                                <span className='right-icon right-icon-2 ms-auto'>
                                    <i className="bi bi-chevron-down"></i>
                                </span>
                            </a>
                            <div className="collapse" id="collapseExample-2">
                                <div className="card card-body text-dark bg-dark">
                                    <ul className="navbar-nav px-3 text-uppercase fw-bold" aria-labelledby="borrowDropdown">
                                        <li>
                                            <Link to={'/addUser'} className="nav-link ">
                                                <span className='me-2'><i className="bi bi-person-add"></i></span>
                                                <span>New</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/borrowers'} className="nav-link ">
                                                <span className='me-2'><i className="bi bi-person-bounding-box"></i></span>
                                                <span>Look-Up</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        {/* TRANSACTIONS */}
                        <li>
                            <a className="nav-link px-3 sidebar-link text-white-70  text-uppercase fw-bold" data-bs-toggle="collapse" href="#collapseExample-3" role="button" aria-expanded="false" aria-controls="collapseExample-3">
                                <span className='me-3'><i className="bi bi-flag"></i></span>
                                <span className=''>Reports</span>
                                <span className='right-icon right-icon-3 ms-auto'>
                                    <i className="bi bi-chevron-down"></i>
                                </span>
                            </a>
                            <div className="collapse" id="collapseExample-3">
                                <div className="card card-body text-dark bg-dark">
                                    <ul className="navbar-nav px-3 text-uppercase fw-bold" aria-labelledby="borrowDropdown">
                                        <li>
                                            <Link to={'/transactions'} className="nav-link ">
                                                <span className='me-2'><i className="bi bi-binoculars"></i></span>
                                                <span>Look-up</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    )
}

// works as the header of the page
const MainNavbar = () => {
    const navigate = useNavigate()
    const authContext = useAuth()

    const user = authContext.user
    const isAdmin = authContext.user.roles.includes('ADMIN');
    
    const logOut = () => {
        authContext.logout()
        navigate(`/login`)
    }



    return (
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark  fixed-top" >
            <div className="container-fluid">
                <button className="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#mainOffcanvas" aria-controls="mainOffcanvas">
                    <span className="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
                </button>
                <a className="navbar-brand fw-bold text-uppercase brand-text me-auto" href="/">Library Management System</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
                        <li className="nav-item dropdown ">
                            <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className=''>{user.firstName} {user.lastName}</span><i className="bi bi-person-circle ms-2"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to={`/myAccount`}>Account</Link></li>
                                {isAdmin && <li><Link className="dropdown-item" to={`/users`}>Users</Link></li>}
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={logOut}>Log-out</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

//Component for rendering different sections based on a provided 'comp' parameter
const Container = ({ comp }) => {
    const setComp = (compName) => {
        switch (compName) {
            case 'dashboard':
                return (
                    <Dashboard />
                )
            case 'error':
                return (
                    <Error />
                )
            case 'bookManagement':
                return (
                    <BookManagement />
                )
            case 'bookIssue':
                return (
                    <BookIssue />
                )
            case 'addBook':
                return (
                    <AddBook />
                )
            case 'bookInfo':
                return (
                    <BookInfo />
                )
            case 'bookReturn':
                return (
                    <BookReturn />
                )
            case 'borrowerManagement':
                return (
                    <BorrowerManagement />
                )
            case 'newBorrower':
                return (
                    <NewBorrower />
                )
            case 'borrowerInfo':
                return (
                    <BorrowerInfo />
                )

            case 'transactionManagement':
                return (
                    <TransactionManagement />
                )
            case 'transactionInfo':
                return (
                    <TransactionInfo />
                )
            case 'userInfo':
                return (<UserInfo />)
            case 'users':
                return (<Users />)
            case 'newUser':
                return (<NewUser />)
            default:
                // Default case
                return (<Dashboard />)
        }
    }
    return (
        <main className="main">
            <container className="container-fluid">
                <div className='row mx-3'>
                    {setComp(comp)}
                </div>
            </container>
        </main>
    )
}

//Component Handling different routes based on authentication status
const MainBody = () => {
    const isAuthenticated = useAuth().isAuthenticated
    return (
        <>
            <Routes>
                {
                    !isAuthenticated &&
                    <>
                        <Route path='*' element={<NotFound />} />
                        <Route path='login' element={<Login />} />
                        <Route path='forgetpassword' element={<PasswordRecovery />} />
                        <Route path='resetpassword/:token/:id' element={<PasswordReset/>} />
                        {/* <Route path='resetpass/:token/:id' element={<PasswordReset />} /> */}
                        <Route path='/' element={<Home/>} />
                        <Route path="/error/:errorCode" element={<Error />} />
                    </>
                }
                {
                    isAuthenticated &&
                    <>
                        <Route path="/error/:errorCode" element={<Error />} />
                        <Route path='/dashboard' element={<Container comp={'dashboard'} />} />
                        <Route path='/' element={<Container comp={'dashboard'} />} />
                        <Route path="*" element={<Error />} />
                        <Route path="issueBook" element={<Container comp={'bookIssue'} />} />
                        <Route path="books" element={<Container comp={'bookManagement'} />} />
                        <Route path="newBook" element={<Container comp={'addBook'} />} />
                        <Route path="viewBook/:id" element={<Container comp={'bookInfo'} />} />
                        <Route path="addUser" element={<Container comp={'newBorrower'} />} />
                        <Route path="borrowers" element={<Container comp={'borrowerManagement'} />} />
                        <Route path='viewBorrower/:id' element={<Container comp={'borrowerInfo'} />} />
                        <Route path="transactions" element={<Container comp={'transactionManagement'} />} />
                        <Route path='viewTransaction/:id' element={<Container comp={'transactionInfo'} />} />
                        <Route path='bookReturn' element={<Container comp={'bookReturn'} />} />
                        <Route path='myAccount' element={<Container comp={'userInfo'} />} />
                        <Route path='/users' element={<Container comp={'users'} />} />
                        <Route path='/newUser' element={<Container comp={'newUser'} />} />
                    </>
                }

            </Routes>
        </>
    )
}

//Default Component for home route
const Home = () => {
    return (
        <>

        </>
    )
}

//The main component managing the entire app flow
export const LibraryManagementSystem = () => {
    // const navigate = useNavigate()
    const authContext = useAuth()
    const authenticated  = authContext.isAuthenticated

    return (
        <>
            {authenticated &&
                <>
                    {/* NAV BAR */}
                    <MainNavbar />

                    {/* OFFCANVAS */}
                    <Offcanvas />
                    
                    {/* Main Body */}
                    <MainBody />
                </>
            }

            {!authenticated &&
                <div className='login-background w-100 h-100 mt-0'>
                    <div className="mb-5"><PublicNavbar /></div>
                    <MainBody />
                </div>
            }


            {/* Main Body */}

            {/* Footer */}

        </>
    )
}

//Component for the public navigation bar
const PublicNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark  fixed-top" >
            <div className="container-fluid">
                <a className="navbar-brand fw-bold text-uppercase brand-text me-auto" href="/">Library Management System</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
                        <li className="nav-item  ">
                            <Link className="nav-link" to={`/books`} role="button"  aria-expanded="false">
                                Books
                            </Link>
                        </li>
                        <li className="nav-item  ">
                            <Link className="nav-link" to={`/pay`} role="button"  aria-expanded="false">
                                Pay
                            </Link>
                        </li>
                        <li className="nav-item  ">
                            <Link className="nav-link" to={`/bookreservation`} role="button"  aria-expanded="false">
                                Reserve A Book
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
                        <li className="nav-item dropdown ">
                            <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-circle"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end opacity-25">
                                <li><Link className="dropdown-item btn-link text-center fw-bold p-0" to={`/login`}>Admin</Link></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}


