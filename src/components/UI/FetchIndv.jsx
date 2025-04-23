import React from 'react'
import { fetchPostDeatil } from '../../api/API'
import { NavLink, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';

const FetchIndv = () => {

    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['post', id], // work like useState
        queryFn: () => fetchPostDeatil(id), // work like useEffect
    })

    if (isLoading) {
        return (<div className="loader"></div>)
    }

    if (isError) {
        return <div><h1>Error: {error.message || "Something goes wrong"}</h1></div>
    }

    return (

        <div className='section-accordion'>
        <h1>Post ID Number - {id}</h1>
            <div>
                <p>ID: {data.id}</p>
                <p>Title: {data.title}</p>
                <p>Body: {data.body}</p>
            </div>
            <NavLink to="/infinite-scrolling-with-tanstack/rq">
                <button>Go Back</button>
            </NavLink>
        </div>

    )
}

export default FetchIndv