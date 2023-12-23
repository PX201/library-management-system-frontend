import { useEffect, useState } from "react"
import { searchUsers, updateUserRoles } from "../api/userApiServices"
import { Link } from "react-router-dom"




const UserColumn = ({ user }) => {

    const [editing, setEditing] = useState(false)
    const [roles, setRoles] = useState(user.roles.map(role => role)) // Initialize roles with user roles
    const updateRoles = async () => {
        try {
            await updateUserRoles(user.id, roles)
        } catch (error) {
            console.log(error)
        }
        setEditing(false)
    }
    const deleteUser = (id) => {
        console.log(`Delete user with id=${id}`)
    }


    return (
        <>
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                {!editing ? (
                    <td>{user.roles.join(", ")}</td> // Display user roles as a string
                ) : (
                    <>
                        <select
                            multiple
                            className="form-select form-select-sm"
                            name="roles"
                            value={roles}
                            onChange={(e) => setRoles(
                                Array.from(e.target.selectedOptions, (option) => option.value)
                            )}
                        >
                            <option value="ADMIN">ADMIN</option>
                            <option value="LIBRARIAN">LIBRARIAN</option>
                            <option value="USER">USER</option>
                        </select>
                    </>
                )
                }
                {/* Edit and Save buttons */}
                {!editing ? (
                    <td>
                        <button className="btn text-success" onClick={() => setEditing(true)}>
                            <i className="bi bi-pencil-square"></i>
                        </button>
                    </td>
                ) : (
                    <td>
                        <div>
                            <div>
                                <button className="btn text-success" onClick={updateRoles}>
                                    <   i class="bi bi-floppy2-fill"></i>
                                </button>
                            </div>
                            <div>
                                <button className="btn text-danger" onClick={() => setEditing(false)}>
                                    <i class="bi bi-x-circle"></i>
                                </button>
                            </div>

                        </div>
                    </td>
                )}
                <td>
                    <button className="btn text-danger " onClick={() => deleteUser(user.id)}>
                        <i className="bi bi-trash3"></i>
                    </button>
                </td>
            </tr >
        </>
    )

}

export function UsersList({ users }) {

    return (
        <>

            <table className="table table-bordered table-striped table-rounded-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Username/Email</th>
                        <th scope="col">phone</th>
                        <th scope="col">Roles</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(
                            user => (
                                <UserColumn user={user} />
                            )
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default function Users() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const booksPerPage = 10; // Number of books per page

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const handleSearch = async (e) => {
        if (e)
            e.preventDefault();
        try {
            const response = await searchUsers(searchKeyword);
            console.log("Users is: ", JSON.stringify(response.data, null, 2))
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleSearch(); // Perform the initial search when the component mounts
    }, []);


    function generatePages() {
        const totalPages = Math.ceil(searchResults.length / booksPerPage);
        let elements = [];

        for (let i = 1; i <= totalPages; i++) {
            elements.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        return elements;
    }


    return (
            <>
            <div className="row">
                <div className="col-md-2 me-auto">
                    <Link className="btn btn-primary " to={'/newUser'} type="button" id="button" >
                        <span >
                            <i className="bi bi-journal-plus me-2"></i > New User
                        </span >
                    </Link >
                </div >
                <div className="col-md-4 ms-auto">
                    <form className="d-flex ms-auto my-2 my-lg-0" onSubmit={handleSearch} role="search">
                        <div className="input-group ">
                            <input type="text" className="form-control" placeholder="Find By Email" aria-label="Recipient's username" aria-describedby="button-addon2" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                            <button className="btn btn-primary " type="submit" id="button-addon2">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div >
            <div className="row mt-3 p-0 ms-0">
                <UsersList users={searchResults.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)} />
            </div>
            <div className="row ms-auto">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                            Previous
                            </button>
                        </li>
                        {generatePages()}
                        <li className={`page-item ${currentPage * booksPerPage >= searchResults.length ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

        </>
    )
}


// const handleRolesChange = (e) => {
//     setRoles(e.target.selectedOptions)
//     const selectedGenreObjects = Array.from(e.target.selectedOptions, (option) => {
//         return {
//             genreId: option.value,
//             genreName: option.textContent, // Get the genre name from the option text
//         };
//     });

//     setBook({ ...book, genres: selectedGenreObjects });
// };