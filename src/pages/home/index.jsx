import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Index() {
    useEffect(() => {
        loading()
        // setTimeout(() => setIsLoading(true), 1000)
        // alert(window.localStorage.getItem("category"))

        // check session storage 
        const category = localStorage.getItem("category")
        if(category){
            setIsActive(category)
            GetPost(category)
        }
        // console.log(123)
        GetTerm()

    },[]);

    // state
    const [terms, setTerms] = useState([])
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)
 

    // get data api term
    const GetTerm = () => {

        axios.get('https://immense-forest-05789.herokuapp.com/api/term')
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
            // console.log(res.data)
            setTerms(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const loading = () => {
        // setTimeout(() => {
        //     setIsLoading(true)
        // }, 2000)
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    // get data post by category
    const GetPost =  (slug) => {
         axios.get(`https://immense-forest-05789.herokuapp.com/api/post/${slug}`)
        .then(res => {
            // console.log(res.data.data.posts)
            setPosts(res.data.data)
            // console.log(res.data.data)
            // alert(slug)
            setIsActive(slug)
            localStorage.setItem('category', slug)
            // setTimeout(() => setIsLoading(true), 100)
            // loading()



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

    if(isLoading === true){
        return (
            <div className="bg-customBg flex items-center justify-center w-full h-screen fixed">
                <div className="w-5 h-5 bg-sky-600 rounded-full animate-bounce mx-2"></div>
                <div className="w-5 h-5 bg-sky-600 rounded-full animate-bounce mx-2"></div>
                <div className="w-5 h-5 bg-sky-600 rounded-full animate-bounce mx-2"></div>
            </div>
        )
    } else {

    return (        
      <div className="w-full pb-5 bg-customBg">
        
        <div className='container mx-auto w-100 '>
            {/* title and description */}
            <h2 className='text-center text-2xl md:text-4xl py-5 font-bold '>WEBSITE DEMO THEME</h2>
            <h4 className='mx-auto pb-2 text-center w-3/4 md:w-2/4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam id, deleniti nostrum eaque sequi atque magnam tempora saepe tempore facere harum, obcaecati quam laudantium error ipsum, libero reprehenderit neque voluptatem?</h4>
            {/* button category */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 py-5 w-3/4 md:w-full lg:3/4 mx-auto'>
                {terms.map(term => {
                    return <button key={term.id} onClick={() => GetPost(term.slug)} className={`rounded h-12  font-bold  ${isActive === term.slug ? 'bg-sky-600 text-white' : 'bg-white text-black hover:bg-gray-100'} `}>{term.title}</button> 
                })}
            </div>
            {/* box content */}
            <div className="grid grid-cols-1 md:grid-cols-4 px-5 py-2 md:px-0 gap-4">
                {posts.map(post => { 
                    return <div key={post.id} className='bg-white grid grid-row-1 overflow-hidden rounded-lg'>
                        {/* box image */}
                        <div className="w-auto border-gray-400 rounded-t-lg">
                            <div className="bg-red-500 w-full relative">
                                <div className="absolute w-full h-full bg-gray-800 opacity-10 hover:opacity-75 transition duration-300 ease-in-out">
                               <div className="opacity-0 hover:opacity-100  duration-500 absolute inset-0 z-10 flex justify-center items-center text-sm text-white font-medium">
                                   <button onClick={() => Preview(post.slug)} className='border-2 rounded border-white p-2' href="">Show Demo</button>
                               </div>

                                </div>
                                <img className='object-contain' src={post.thumbnail_url} alt="" />
                            </div>
                        </div>
                        {/* title */}
                        <div className='py-2 flex justify-center'>
                            <button onClick={() => Preview(post.slug)} onLoadCapture={() => alert(123)} className='hover:text-gray-900 text-gray-700 capitalize font-semibold text-lg'>{post.title}</button>
                        </div>
                        {/* tag */}
                        <div className='pb-4 flex items-center justify-center flex-wrap'>
                            {post.tags.map(tag => {
                                return <button className='bg-sky-600 hover:bg-sky-700 text-white py-1 px-2 text-sm font-medium rounded mx-1'>#{tag.title.replace(/\s/g,'')}</button>
                            })}
                        </div>
                        {/* button action */}
                        {/* <div className='mx-auto pb-3'>
                            <button onClick={() => Preview(post.slug)} className='bg-sky-600 w-40 rounded h-10 font-semibold hover:bg-sky-700 text-white'>Show Demo</button>
                        </div> */}
                    </div>
                })}
            </div>
        </div>
      </div>

    )
    }
}

export default Index

