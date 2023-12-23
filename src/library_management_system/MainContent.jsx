import Login from "./Login"
import Dashboard from "./Dashboard"
import Error from "./Error"
import BookList from "./BookList"
import { Route, Routes } from "react-router-dom"

const MainContent = () => {
    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/dashboard/:username" element={<Dashboard />}></Route>
                    <Route path="*" element={<Error />}></Route>
                    <Route path="/books" element={<BookList />}></Route>
                </Routes>
            </main>
        </>
    )
}
export default MainContent