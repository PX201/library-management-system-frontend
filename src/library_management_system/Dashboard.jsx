import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"


export default function Dashboard() {
    const { state } = useLocation()
    const [receipts, setReceipts] = useState(null)
    useEffect(() => {
        // Set the receipts after the component mounts
        if (state && state.receipts) {
            setReceipts(state.receipts);
        }
    }, [state]);
    return (
        <div className="">
            <div>
                {receipts &&
                    <div className="mb-4">
                        <h2>Receipts</h2>
                        <DisplayReceipts receipts={receipts} />
                        <PrintReceipts receipts={receipts} />
                    </div>
                }
            </div>
            <div className="row">
                    <div className="card card-style bg-secondary m-1" >
                        <Link to={'/issueBook'} className="btn">
                            <img src={require('../issue_Book.png')} className="card-img" alt="not load" />
                            Issue Book</Link>
                    </div>
                    {/* <Link to={'/issueBook'} className="btn btn-secondary me-5">Issue Book</Link> */}
                    <div className="card card-style bg-secondary m-1" >
                        <Link to={'/bookReturn'} className="btn ">
                            <img src={require('../return_Book.png')} className="card-img-top " alt="not load" />
                            Return Book
                        </Link>

                    </div>
                    <div className="card card-style bg-secondary m-1" >
                        <Link to={'/borrowers'} className="btn ">
                            <img src={require('../search_Borrower.png')} className="card-img-top" alt="not load" />
                            Borrowers
                        </Link>
                    </div>
                    <div className="card card-style bg-secondary m-1" >
                        <Link to={'/transactions'} className="btn ">
                            <img src={require('../add-borrower.png')} className="card-img-top" alt="not load" />
                            <span className="">New Borrower</span>
                        </Link>
                    </div>
                    <div className="card card-style bg-secondary m-1" >
                        <Link to={'/newBook'} className="btn ">
                            <img src={require('../add_Book.png')} className="card-img-top" alt="not load" />
                            <span className="">Add Book</span>
                        </Link>
                    </div>
                    <div className="card card-style bg-secondary m-1" >
                        <Link to={'/books'} className="btn ">
                            <img src={require('../book_lookUp.png')} className="card-img-top" alt="not load" />
                            <span>Book Look-Up</span>
                        </Link>
                    </div>
                    <div className="card card-style bg-secondary m-1" >
                        <Link to={'/transactions'} className="btn ">
                            <img src={require('../issue_Book.png')} className="card-img-top" alt="not load" />
                            Reports
                        </Link>
                    </div>
                    
            </div>
            
        </div>
    )
}



//Receipts contains the generated receipt strings
const DisplayReceipts = ({ receipts }) => {
    return (
        <div>
            {receipts.map((receipt, index) => (
                <div key={index}>
                    <pre>{receipt}</pre>
                    <hr />
                </div>
            ))}
        </div>
    );
};



const PrintReceipts = ({ receipts }) => {
    const printReceipts = () => {
        const printContent = receipts.map(receipt => `<pre>${receipt}</pre>`).join('<hr />');
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head><title>Receipts</title></head>
            <body>${printContent}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <button onClick={printReceipts}>Print Receipts</button>
    );
}

