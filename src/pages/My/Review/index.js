import { useEffect, useState } from "react";


function MyReview() {
    const [com, setCom] = useState([]);
    const apiURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiURL}/comments`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setCom(data))
    })


    return (
        <>
            <h1>MyReview</h1>
            {com.map((comm, index) => (
                <p>{comm.content}</p>
            ))}
        </>
    )
}

export default MyReview;