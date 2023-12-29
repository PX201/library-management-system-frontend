import { useNavigate } from "react-router-dom";

export default function BorrowerList({ borrowers }){

    const navigate = useNavigate()

    const navigateToViewBorrower = (borrower) => {
        // Pass borrower data as state to the next route
        navigate(`/viewBorrower/${borrower.borrowerId}`, {state:{borrower}})
    }
    return (
        <>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Membership Id</th>
                        <th scope="col">Subscription Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        borrowers.map(
                            borrower => (
                                <tr key={borrower.borrowerId}>
                                    <td><button className="btn  text-decoration-none border-0" onClick={()=> navigateToViewBorrower(borrower)} ><i className="bi bi-eye"></i></button></td>
                                    <td>{borrower.firstName}</td>
                                    <td>{borrower.lastName}</td>
                                    <td>{borrower.borrowerNumber}</td>
                                    <td>{borrower.membershipStatus}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </>
    )
}