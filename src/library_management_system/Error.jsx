import { Link, useParams } from "react-router-dom";




export default function Error() {
    const {errorCode} = useParams();
    return (
        <>
            <DisplayError errorCode={errorCode} />
        </>
    )
}



const DisplayError = ({ errorCode }) => {

    switch (errorCode) {
        case '404':
            // Handle 404 error
            return(
                <>
                    <div className="d-flex align-items-center justify-content-center vh-100">
                        <h1>Error 404: Not Found</h1>
                    </div>
                </>
            )
        case '403':
            // Handle 403 error
            return(
                <>
                    <div className="d-flex align-items-center justify-content-center vh-100">
                        <h1>Error 403: Forbiden</h1>
                    </div>
                </>
            )
        case '505':
            // Handle 505 error
            return(
                <>
                    <div className="d-flex align-items-center justify-content-center vh-100 ">
                        <h1>Error 505: Server error</h1>
                    </div>
                </>
            )
        default:
            // Default case
            return(
                <>
                    <div className="d-flex align-items-center justify-content-center vh-100">
                        <h1>Error 505: Unknown error</h1>
                    </div>
                </>
            )
    }

}

export const NotFound = () => {
    return(
        <div className="row">
            <div className="h3 tw-bold">Oops! You seem to be lost.</div>
            <p>Here are some helpful links:</p>
            <Link className="text-link" to='/'>Home</Link>
            <Link className="text-link" to='/contact'>Contact</Link>
        </div>
    )
}
