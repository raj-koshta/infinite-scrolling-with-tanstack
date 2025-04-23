import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { fetchUsers } from '../api/API';

const InfiniteScroll = () => {

    const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 10 ? allPages.length + 1 : undefined;
        }
    })

    console.log(data);

    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 1;

        if (bottom && hasNextPage) {
            fetchNextPage();
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    if (status === "loading") {
        return (<div className="loader"></div>)
    }

    if (status === "error") {
        return <div><h1>Error: {error.message || "Something goes wrong"}</h1></div>
    }

    return (
        <div>
            <h1>Infinite Scroll with React Query v5</h1>

            {
                data?.pages?.map((page, index) => {
                    return <ul key={index}>
                        {page?.map((user) => {
                            return <li key={user.id}
                                style={{ padding: "10px", border: "1px solid #ccc" }}>

                                <p>{user.login}</p>
                                <img src={user.avatar_url}
                                    alt={user.login}
                                    width={50}
                                    height={50}
                                />
                            </li>
                        })}
                    </ul>
                })
            }
            {
                isFetchingNextPage && <h3>Loading More...</h3>
            }
        </div>
    )
}

export default InfiniteScroll