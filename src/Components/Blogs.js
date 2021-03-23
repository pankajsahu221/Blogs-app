import React, { useEffect, useState } from 'react'
import './Blogs.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInput, setBlogData } from '../features/userSlice';

function Blogs() {

    const searchInput = useSelector(selectUserInput);
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=2c316826de9acde3508f55efe3bbe21a` 

    const dispatch = useDispatch()
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
          let response = await axios.get(blog_url);

          console.log(response.data);

          setBlogs(response?.data);
          setLoading(false);
          dispatch(setBlogData(response?.data));
    
          return response;
        }
        fetchData();
      }, [searchInput]);

    return (
      <>
        <div className="blog__page">
        <h1 className="blog__page__header">Blogs</h1>
        {loading && <h1 className="loading">Loading...</h1>}

        <div className="blogs">    
            { blogs?.articles?.map(( blog ) => {
               return ( 
               <a className="blog" target="_blank" href={ blog?.url }>
                  <img src={ blog?.image }/>
                  <div>
                    <h3 className="sourceName">
                      <span>{ blog?.source?.name }</span>
                      <p>{ blog?.publishedAt }</p>
                    </h3>
                    <h1>{ blog?.title }</h1>
                    <p>{ blog?.description }</p>
                  </div>
               </a>
              )
            })}

            </div>

            { blogs?.totalArticles == 0 && (
                <h1 className="no__blogs">
                    No blogs matching the search input.
                </h1>
            ) }

        </div>
        </>
    )
}

export default Blogs
