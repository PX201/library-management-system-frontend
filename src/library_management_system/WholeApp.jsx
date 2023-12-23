// import './wholeApp.css'
// import { Link, Route, Routes, useNavigate } from 'react-router-dom'
// import BookManagement from './BookManagment'
// import BorrowerManagement from "./BorrowerManagement";
// import Dashboard from './Dashboard'
// import Error, { NotFound } from './Error'
// import BookInfo from './BookInfo'
// import AddBook from './AddBook'
// import NewBorrower from './NewBorrower'
// import BorrowerInfo from './BorrowerInfo';
// import TransactionManagement from './TransactionManagement';
// import TransactionInfo from './TransactionInfo';
// import BookIssue from './BookIssue';
// import BookReturn from './BookReturn'
// import Login from './Login';
// import { useAuth } from '../security/authContext';
// import { setAuthToken } from '../api/authenticationApiService';
// import { UserInfo } from './UserInfo';
// import Users from './Users';
// import { NewUser } from './NewUser';

// // Main Offcanvas/(main sidebar)
// const Offcanvas = () => {
//     return (
//         <div className="offcanvas offcanvas-start bg-dark text-white sidebar-nav " tabindex="-1" id="mainOffcanvas" aria-labelledby="offcanvasExampleLabel">
//             <div className="offcanvas-body p-0">
//                 <nav className="navbar-dark">
//                     <ul className="navbar-nav">
//                         {/* CORE */}
//                         <li className='my-3'>
//                             <div className='text-white-50  fw-bold small text-uppercase px-3' >
//                                 CORE
//                             </div>
//                         </li>
//                         {/* DASHBOARD */}
//                         <li >
//                             <Link to={'/'} className='nav-link px-3'>
//                                 <span className='me-3'>
//                                     <i className="bi bi-speedometer2"></i>
//                                 </span>
//                                 <span className='fw-bold text-uppercase'>Dashboard</span>
//                             </Link>
//                         </li>
//                         <li className='my-4'>
//                             <hr className="dropdown-devided" />
//                         </li>
//                         <li>
//                             <div className='text-white-50 small  fw-bold  text-uppercase px-3' >
//                                 INVENTORY
//                             </div>
//                         </li>
//                         {/* BOOKS */}
//                         <li>
//                             <a className="nav-link px-3 sidebar-link text-white-70  text-uppercase fw-bold" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
//                                 <span className='me-3'><i className="bi bi-book"></i></span>
//                                 <span className=''>Books</span>
//                                 <span className='right-icon right-icon-1 ms-auto'>
//                                     <i className="bi bi-chevron-down"></i>
//                                 </span>
//                             </a>
//                             <div className="collapse" id="collapseExample">
//                                 <div className="card card-body text-dark bg-dark">
//                                     <ul className="navbar-nav px-3 text-uppercase fw-bold" aria-labelledby="borrowDropdown">
//                                         <li><Link to={'/issueBook'} className="nav-link ">
//                                             <span className='me-2'><i class="bi bi-plus-square-fill"></i></span>
//                                             <span>Book Issue</span>
//                                         </Link></li>
//                                         <li><Link to={'/bookReturn'} className="nav-link ">
//                                             <span className='me-2'><i className="bi bi-arrow-repeat"></i></span>
//                                             <span>Book Return</span>
//                                         </Link></li>
//                                         <li><Link to={'/books'} className=" nav-link ">
//                                             <span className='me-2'><i className="bi bi-binoculars-fill"></i></span>
//                                             <span>Books Look-Up</span>
//                                         </Link></li>
//                                         <li><Link to={'/newBook'} className=" nav-link ">
//                                             <span className='me-2'><i className="bi bi-file-earmark-plus-fill"></i></span>
//                                             <span>New Book</span>
//                                         </Link></li>

//                                     </ul>
//                                 </div>
//                             </div>
//                         </li>
//                         {/* BORROWERS */}
//                         <li>
//                             <a className="nav-link px-3 sidebar-link text-white-70  text-uppercase fw-bold" data-bs-toggle="collapse" href="#collapseExample-2" role="button" aria-expanded="false" aria-controls="collapseExample-2">
//                                 <span className='me-3'><i className="bi bi-person"></i></span>
//                                 <span className=''>Customers</span>
//                                 <span className='right-icon right-icon-2 ms-auto'>
//                                     <i className="bi bi-chevron-down"></i>
//                                 </span>
//                             </a>
//                             <div className="collapse" id="collapseExample-2">
//                                 <div className="card card-body text-dark bg-dark">
//                                     <ul className="navbar-nav px-3 text-uppercase fw-bold" aria-labelledby="borrowDropdown">
//                                         <li>
//                                             <Link to={'/addUser'} className="nav-link ">
//                                                 <span className='me-2'><i className="bi bi-person-add"></i></span>
//                                                 <span>New</span>
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link to={'/borrowers'} className="nav-link ">
//                                                 <span className='me-2'><i className="bi bi-person-bounding-box"></i></span>
//                                                 <span>Look-Up</span>
//                                             </Link>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </li>
//                         {/* TRANSACTIONS */}
//                         <li>
//                             <a className="nav-link px-3 sidebar-link text-white-70  text-uppercase fw-bold" data-bs-toggle="collapse" href="#collapseExample-3" role="button" aria-expanded="false" aria-controls="collapseExample-3">
//                                 <span className='me-3'><i className="bi bi-flag"></i></span>
//                                 <span className=''>Reports</span>
//                                 <span className='right-icon right-icon-3 ms-auto'>
//                                     <i className="bi bi-chevron-down"></i>
//                                 </span>
//                             </a>
//                             <div className="collapse" id="collapseExample-3">
//                                 <div className="card card-body text-dark bg-dark">
//                                     <ul className="navbar-nav px-3 text-uppercase fw-bold" aria-labelledby="borrowDropdown">
//                                         <li>
//                                             <Link to={'/transactions'} className="nav-link ">
//                                                 <span className='me-2'><i className="bi bi-binoculars"></i></span>
//                                                 <span>Look-up</span>
//                                             </Link>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//         </div>

//     )
// }
// // works as the header of the page
// const MainNavbar = () => {
//     const navigate = useNavigate()
//     const authContext = useAuth()
//     const logOut = () => {
//         const authToken = ''
//         console.log("authToken is -->> " + authToken)
//         sessionStorage.setItem('authToken', authToken)
//         setAuthToken(authToken)
//         authContext.setAuthenticated(false)
//         authContext.setUser({});
//         navigate(`/login`)
//     }

   
    
//     // useEffect(() => { fetchUserData() }, [])

//     const user = authContext.user
//     const isAdmin = authContext.user.roles.includes('ADMIN');
    

//     return (
//         <nav className="navbar navbar-expand-lg  navbar-dark bg-dark  fixed-top" >
//             <div className="container-fluid">
//                 <button className="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#mainOffcanvas" aria-controls="mainOffcanvas">
//                     <span className="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
//                 </button>
//                 <a className="navbar-brand fw-bold text-uppercase brand-text me-auto" href="/">Library Management System</a>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse " id="navbarSupportedContent">
//                     <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
//                         <li className="nav-item dropdown ">
//                             <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                 <span className=''>{user.firstName} {user.lastName}</span><i className="bi bi-person-circle ms-2"></i>
//                             </a>
//                             <ul className="dropdown-menu dropdown-menu-end">
//                                 <li><Link className="dropdown-item" to={`/myAccount`}>Account</Link></li>
//                                 {isAdmin && <li><Link className="dropdown-item" to={`/users`}>Users</Link></li>}
//                                 <li><hr className="dropdown-divider" /></li>
//                                 <li><button className="dropdown-item" onClick={logOut}>Log-out</button></li>
//                             </ul>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// const Container = ({ comp }) => {
//     const setComp = (compName) => {
//         switch (compName) {
//             case 'dashboard':
//                 return (
//                     <Dashboard />
//                 )
//             case 'error':
//                 return (
//                     <Error />
//                 )
//             case 'bookManagement':
//                 return (
//                     <BookManagement />
//                 )
//             case 'bookIssue':
//                 return (
//                     <BookIssue />
//                 )
//             case 'addBook':
//                 return (
//                     <AddBook />
//                 )
//             case 'bookInfo':
//                 return (
//                     <BookInfo />
//                 )
//             case 'bookReturn':
//                 return (
//                     <BookReturn />
//                 )
//             case 'borrowerManagement':
//                 return (
//                     <BorrowerManagement />
//                 )
//             case 'newBorrower':
//                 return (
//                     <NewBorrower />
//                 )
//             case 'borrowerInfo':
//                 return (
//                     <BorrowerInfo />
//                 )

//             case 'transactionManagement':
//                 return (
//                     <TransactionManagement />
//                 )
//             case 'transactionInfo':
//                 return (
//                     <TransactionInfo />
//                 )
//             case 'userInfo':
//                 return(<UserInfo />)
//             case 'users':
//                 return(<Users />)
//             case 'newUser':
//                 return(<NewUser />)
//             default:
//                 // Default case
//                 return (<Dashboard />)
//         }
//     }
//     return (
//         <main className="main">
//             <container className="container-fluid">
//                 <div className='row mx-3'>
//                     {setComp(comp)}
//                 </div>
//             </container>
//         </main>
//     )
// }
// //main body hat contain the main container and all Routes basically the only changing place in the page 
// const MainBody = () => {
//     const isAuthenticated = useAuth().isAuthenticated

//     return (
//         <>
//             <Routes>
//                 <Route path='*' element={<NotFound />} />
//                 {
//                     !isAuthenticated &&
//                     <>
//                         <Route path='*' element={<NotFound />} />
//                         <Route path='/' element={<Home />} />
//                         <Route path='login' element={<Login />} />
//                     </>
//                 }
//                 {
//                     isAuthenticated &&
//                     <>
//                         <Route path="/error/:errorCode" element={<Container comp={'error'} />} />
//                         <Route path='/dashboard' element={<Container comp={'dashboard'} />} />
//                         <Route path='/' element={<Container comp={'dashboard'} />} />
//                         <Route path="*" element={<Container comp={'notFound'} />} />
//                         <Route path="issueBook" element={<Container comp={'bookIssue'} />} />
//                         <Route path="books" element={<Container comp={'bookManagement'} />} />
//                         <Route path="newBook" element={<Container comp={'addBook'} />} />
//                         <Route path="viewBook/:id" element={<Container comp={'bookInfo'} />} />
//                         <Route path="addUser" element={<Container comp={'newBorrower'} />} />
//                         <Route path="borrowers" element={<Container comp={'borrowerManagement'} />} />
//                         <Route path='viewBorrower/:id' element={<Container comp={'borrowerInfo'} />} />
//                         <Route path="transactions" element={<Container comp={'transactionManagement'} />} />
//                         <Route path='viewTransaction/:id' element={<Container comp={'transactionInfo'} />} />
//                         <Route path='bookReturn' element={<Container comp={'bookReturn'} />} />
//                         <Route path='myAccount' element={<Container comp={'userInfo'} />} />
//                         <Route path='/users' element={<Container comp={'users'} />} />
//                         <Route path='/newUser' element={<Container comp={'newUser'} />} />
//                     </>
//                 }

//             </Routes>
//         </>
//     )
// }





// const WholeApp = () => {
//     const isAuthenticated = useAuth().isAuthenticated

//     return (
//         <>
//             {isAuthenticated &&
//                 <>
//                     {/* NAV BAR */}
//                     <MainNavbar />

//                     {/* OFFCANVAS */}
//                     <Offcanvas />
//                     {/* Main Body */}
//                     <MainBody />
//                 </>
//             }

//             {!isAuthenticated &&
//                 <div className='login-background w-100 h-100 mt-0'>
//                     <PublicNavbar />
//                     <MainBody />
//                 </div>
//             }

//             {/* Main Body */}

//             {/* Footer */}

//         </>
//     )
// }
// export default WholeApp
// const PublicNavbar = () => {
//     return (
//         <nav className="navbar navbar-expand-lg  navbar-dark bg-dark  fixed-top" >
//             <div className="container-fluid">
//                 <button className="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#mainOffcanvas" aria-controls="mainOffcanvas">
//                     <span className="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
//                 </button>
//                 <a className="navbar-brand fw-bold text-uppercase brand-text me-auto" href="/">Library Management System</a>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse " id="navbarSupportedContent">
//                     <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
//                         <li className="nav-item  ">
//                             <Link className="nav-link" to={`/`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                 Books
//                             </Link>
//                         </li>
//                         <li className="nav-item  ">
//                             <Link className="nav-link" to={`/`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                 Pay
//                             </Link>
//                         </li>
//                         <li className="nav-item  ">
//                             <Link className="nav-link" to={`/`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                 Reserve A Book
//                             </Link>
//                         </li>
//                     </ul>
//                     <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto">
//                         <li className="nav-item dropdown ">
//                             <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                 <i className="bi bi-person-circle"></i>
//                             </a>
//                             <ul className="dropdown-menu dropdown-menu-end bg-secondary">
//                                 <li><Link className="dropdown-item btn-link bg-secondary fw-bold" to={`/login`}>Admin SignIn</Link></li>
//                             </ul>
//                         </li>
//                     </ul>

//                 </div>
//             </div>
//         </nav>
//     )
// }

// const Home = () => {

//     return (
//         <>
//         </>
//     )
// }
// const Footer = () => {
//     <div className="container footer">
//         <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
//             <div class="col-md-4 d-flex align-items-center">
//                 <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
//                     <i class="bi bi-bug"></i>
//                 </a>
//                 <span class="mb-3 mb-md-0 text-muted text-inline">© 2022 Aiman Lahmamsi</span>
//             </div>

//             <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
//                 <li class="ms-3"><a class="text-muted" href="#"><i class="bi bi-facebook"></i></a></li>
//                 <li class="ms-3"><a class="text-muted" href="#"><i class="bi bi-whatsapp"></i></a></li>
//                 <li class="ms-3"><a class="text-muted" href="#"></a><i class="bi bi-linkedin"></i></li>
//             </ul>
//         </footer>
//     </div>
// }


//Add Book Form 
/* <form className="d-flex ms-auto my-2 my-lg-0" role="search">
                       <div className="input-group ">
                           <input type="text" className="form-control" placeholder="Find A Book" aria-label="Recipient's username" aria-describedby="button-addon2" />
                           <button className="btn btn-primary " type="button" id="button-addon2"><i className="bi bi-search"></i></button>
                       </div>
</form> */