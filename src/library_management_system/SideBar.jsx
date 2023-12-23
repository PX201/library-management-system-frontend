import { Link } from "react-router-dom";

//import "./Sidebar.css"; // Import your custom CSS for styling
export default function Sidebar({isSideBarOpen, toggleSidebar}) {
    return (
        <div class={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark  ${isSideBarOpen} ? 'show' : ''`}>
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <span class="fs-5 d-none d-sm-inline">Menu</span>
              </a>
              <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                  <li class="nav-item">
                      <a href="#" class="nav-link align-middle px-0">
                          <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                      </a>
                  </li>
                  <li>
                      <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                          <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                      <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                          <li class="w-100">
                              <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1 </a>
                          </li>
                          <li>
                              <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2 </a>
                          </li>
                      </ul>
                  </li>
                  <li>
                      <a href="#" class="nav-link px-0 align-middle">
                          <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Orders</span></a>
                  </li>
                
                  <li>
                      <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                          <i class="fa fa-book"></i><i class="fs-4 bi-bootstrap"></i> <span class="ms-1 d-none d-sm-inline">Books Managment</span></a>
                      <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                          <li class="w-100">
                              <Link to={"/return"} class="nav-link px-0"> <span class="d-none d-sm-inline">Retun</span> 1</Link>
                          </li>
                          <li>
                              <Link to={"borrow"} class="nav-link px-0"> <span class="d-none d-sm-inline">Borrow</span> 2</Link>
                          </li>
                      </ul>
                  </li>
                  <li>
                      <Link to={"#submenu3"} data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                          <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Products</span> </Link>
                          <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                          <li class="w-100">
                              <Link to={"/"} class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 1</Link>
                          </li>
                          <li>
                              <Link to={"/"} class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</Link>
                          </li>
                          <li>
                              <Link to={"/"} class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</Link>
                          </li>
                          <li>
                              <Link to={"/"} class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</Link>
                          </li>
                      </ul>
                  </li>
                  <li>
                      <Link href="#" class="nav-link px-0 align-middle">
                          <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Customers</span> </Link>
                  </li>
              </ul>
              <hr/>
                            {/*LIBRARIAN PROFILE BOARD */}
              <div class="dropdown pb-4">
                  <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"/>
                      <span class="d-none d-sm-inline mx-1">Admin</span>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                      <li><Link class="dropdown-item" to={"/"} >New protject...</Link></li>
                      <li><Link class="dropdown-item" to={"/"} >Setings</Link></li>
                      <li><Link class="dropdown-item" to={"/"} >Profiles</Link></li>
                      <li>
                          <hr class="dropdown-divider"/>
                      </li>
                      <li><a class="dropdown-item" href="#">Sign out</a></li>
                  </ul>
              </div>
              <button
                className="btn btn-dark d-md-none"
                type="button"
                onClick={() => toggleSidebar}
              >
                Toggle Sidebar
              </button>
          </div>
        </div>
    );
  }
  
