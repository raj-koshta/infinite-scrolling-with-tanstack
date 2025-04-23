import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../api/API';

const FetchOld = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPostsData = async ()=>{

    try{
      const res = await fetchPosts();
  
      if(res.status === 200){
        setPosts(res.data) 
        setLoading(false)
      }
    }catch(error){
      console.log(error.message)
      setError(error)
    }
  }

  useEffect(()=>{
    getPostsData()
  },[])

  if (loading) {
    return (<div className="loader"></div>)
}

if(error){
    return <div><h1>{error.message}</h1></div>
}

  return (
    <div>
      <ul className='section-accordion'>
        {
          posts?.map((cusElem)=>{
            const {id, title, body} = cusElem;
            return(
              <li key={id}>
                <p>{title}</p>
                <p>{body}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default FetchOld