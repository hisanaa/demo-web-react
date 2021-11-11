import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Index() {
    useEffect(() => {
        loading()
        // console.log(123)
        GetTerm()

    },[]);

    // state
    const [terms, setTerms] = useState([])
    const [termss, setTermss] = useState([])
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    // get data api term
    const GetTerm = () => {

        axios.get('https://immense-forest-05789.herokuapp.com/api/term')
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
            console.log(res.data)
            setTerms(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const loading = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    // get data post by category
    const GetPost =  (slug) => {
         axios.get(`https://immense-forest-05789.herokuapp.com/api/term/${slug}`)
        .then(res => {
            // console.log(res.data.data.posts)
            setPosts(res.data.data.posts)

        })
        .catch(err => {
            console.log(err)
        })
    }

    const navigate = useNavigate()

    // function preview
    const Preview = (slug) => {
        navigate(`/preview/${slug}`)
    }

    if(isLoading == true){
        return (
            <div className="bg-customBg flex items-center justify-center w-full h-screen fixed">
                <div className="w-5 h-5 bg-sky-600 rounded-full animate-bounce mx-2"></div>
                <div className="w-5 h-5 bg-sky-600 rounded-full animate-bounce mx-2"></div>
                <div className="w-5 h-5 bg-sky-600 rounded-full animate-bounce mx-2"></div>
            </div>
        )
    } else {

    return (        
      <div className="w-full h-screen bg-customBg">
        
        <div className='container mx-auto w-100 '>
            {/* title and description */}
            <h2 className='text-center text-2xl md:text-4xl py-5 font-bold '>WEBSITE DEMO THEME</h2>
            <h4 className='mx-auto pb-2 text-center w-3/4 md:w-2/4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam id, deleniti nostrum eaque sequi atque magnam tempora saepe tempore facere harum, obcaecati quam laudantium error ipsum, libero reprehenderit neque voluptatem?</h4>
            {/* button category */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 py-5 w-3/4 md:w-full lg:3/4 mx-auto'>
                {terms.map(term => {
                    return <button key={term.id} onClick={() => GetPost(term.slug)} className='bg-white rounded h-12 text-black font-bold hover:bg-gray-100'>{term.title}</button> 
                })}
            </div>
            {/* box content */}
            <div className="grid grid-cols-1 md:grid-cols-3 px-5 py-2 md:px-0 gap-3">
                {posts.map(post => { 
                    return <div key={post.id} className='bg-white grid grid-row-1 overflow-hidden rounded-lg h-auto'>
                        {/* box image */}
                        <div className="w-auto border-b overflow-hidden rounded-t-lg bg-red-200">
                            <img className='object-contain ' src={post.thumbnail_url} alt="" />
                        </div>
                        {/* title */}
                        <div className='py-3'>
                            <h5 className='text-center capitalize font-medium text-xl'>{post.title}</h5>
                        </div>
                        {/* button action */}
                        <div className='mx-auto pb-3'>
                            <button onClick={() => Preview(post.slug)} className='bg-sky-600 w-60 rounded h-12 font-semibold hover:bg-sky-700 text-white'>Show Demo</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
      </div>

    )
    }
}

export default Index
