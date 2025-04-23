import { NavLink } from 'react-router-dom';
import { deletePost, fetchPostsRQ, updatePost } from '../api/API';
import { keepPreviousData, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const FetchRQ = () => {

  const [pageNumber, setPageNumber] = useState(0);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', pageNumber], // work like useState
    queryFn: ()=> fetchPostsRQ(pageNumber), // work like useEffect
    placeholderData: keepPreviousData,

    // gcTime: 5000, // Pass in Milli-Second
    // staleTime: 5000, // Pass in Milli-Second
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  }
  )

  //! useMutation hook to delete the post

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id)=>{
      queryClient.setQueryData(['post', pageNumber], (curElem)=>{
        return curElem?.filter((post)=>post.id != id)
      })
    }
  })

  //! useMutation hook to Update the post

  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId)=>{
      queryClient.setQueryData(['post', pageNumber], (postsData)=>{
        return postsData?.map((curPost) => {
          return curPost.id === postId ? {...curPost, title: apiData.data.title} : curPost ;
        })
      })
    }
  })

  if (isLoading) {
    return (<div className="loader"></div>)
  }

  if (isError) {
    return <div><h1>Error: {error.message || "Something goes wrong"}</h1></div>
  }

  return (
    <div>
      <ul className='section-accordion'>
        {
          data?.map((cusElem) => {
            const { id, title, body } = cusElem;
            return (
              <li key={id}>
                <NavLink to={`/infinite-scrolling-with-tanstack/rq/${id}`}>
                  <p>{id}</p>
                  <p>{title}</p>
                  <p>{body}</p>
                </NavLink>
                <button onClick={()=>deleteMutation.mutate(id)}>Delete</button>
                <button onClick={()=>updateMutation.mutate(id)}>Update</button>
              </li>
            )
          }
        )
        }
      </ul>
      <div className='pagination-section container'>
        <button disabled={pageNumber === 0 ? true : false} onClick={()=>{setPageNumber((prev)=>prev - 3)}}>Prev</button>
        <h2>{(pageNumber/3)+1}</h2>
        <button onClick={()=>{setPageNumber((prev)=>prev + 3)}}>Next</button>
      </div>
    </div>
  )
}

export default FetchRQ