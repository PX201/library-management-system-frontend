import axios from "axios";
import { useState } from "react";

export default function TestMe() {
    const [token1, setToken1] = useState()
    async function fetchBooks() {
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiZXhwIjoxNjk3NDc5ODYwLCJpYXQiOjE2OTczOTM0NjB9.yOMPGwIIbZKma2CRes72h6Q1ktZ9r4l8sAIdy1kKH44ewp9jw9s0un6e0INgc5GG9BS7jIGirjScVd-b5DoCQg'

        await axios.get('http://localhost:8080/api/v1/books', {
            headers: {
              
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => console.log(response))
            .catch((response) => console.log(response));
    }

    async function fetchToken() {
        const username = "test@example.com"
        const password = "test12345678"
        await axios.post('http://localhost:8080/api/v1/auth/login', { email: username, password: password })

            .then((response) => setToken1(response.data.token))
            .catch((response) => console.log(response));
    }

    return (
        <>
            <div>
                <h1>Secured EndPint In Test</h1>
                <button className="btn btn-warning" onClick={() =>fetchBooks()}>Fetch Books Test</button>
            </div>
            <div>
                <h1>Open EndPoint In Test</h1>
                <button className="btn btn-warning" onClick={() =>fetchToken()}>Fetch Books Test</button>
                <div className="alert text-alert">{token1}</div>
            </div>

        </>
    )
}