import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom';


export default function Preview() {
    // define navigate
    const Navigate = useNavigate()

    const {slug} = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])

    // get post 
    const getPost = () => {
        axios.get(`https://immense-forest-05789.herokuapp.com/api/post/${slug}`)
        .then(res => {
            setData(res.data.data[0])
            // console.log(res.data.data)
        })
    }

    const loading = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        // get data by id 
        loading()
        getPost()
        // console.log(slug)
    },[])

    // state
    // const [sizeScreen , setSizeScreen] = useState('w-3/4')
    const [styleFrame, setStyleFrame] = useState('w-4/5 bg-red-200 mx-auto h-4/5 border-4 border-gray-800 overflow-hidden')

    // function set frame screen 
    const FrameScreen = (param) => {
        if (param === 'desktop'){
            setStyleFrame('w-4/5 bg-red-200 mx-auto h-3/4 border-4 border-gray-800 overflow-hidden')
        } else if (param === 'tablet'){
            setStyleFrame('w-2/5 bg-red-200 mx-auto h-3/4 border-4 border-gray-800 overflow-hidden')
        } else {
            setStyleFrame('w-96 bg-red-200 mx-auto h-3/4 border-4 border-gray-800 overflow-hidden')
        }
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
<div className='w-full overflow-hidden bg-customBg fixed'>
                <div className="container mx-auto py-2 ">
                    <div className="grid grid-cols-3  my-2 gap-4 bg-customBg">
                        <div className='h-14 py-3 px-3'>
                            <h2 className='text-2xl font-semibold capitalize'>{data.title}</h2>
                        </div>
                        <div className='h-14 flex justify-center'>
                            <button className='w-14 h-3/4 my-auto mx-2'>
                                <i className='flex justify-center content-center' onClick={() => FrameScreen('desktop')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                </i>
                            </button>
                            <button className='w-14 h-3/4 my-auto mx-2'>
                            <i className='flex justify-center content-center' onClick={() => FrameScreen('tablet')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            </i>

                            </button>
                            <button className='w-14 h-3/4 my-auto mx-2'>
                            <i className='flex justify-center content-center' onClick={() => FrameScreen('mobile')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            </i>

                            </button>
                        </div>
                        <div className='flex items-center justify-end px-2'>
                            <a href={data.data_url} target='_blank' className='bg-gray-50 mx-1 h-3/4 w-1/4 rounded flex items-center justify-center font-semibold text-center' rel="noreferrer">
                                Demo
                            </a>
                            <button onClick={() => Navigate('/')} className='bg-sky-600 mx-1 h-3/4 w-1/4 rounded font-semibold text-center text-white'>
                                Back
                            </button>
                        </div>
                    </div>
                </div>

                {/* iframe */}
                <div className='bg-customBg mx-auto flex items-start mt-8 h-screen z-10'>
    
                    <div className={styleFrame}>
                        <div className='h-8 bg-gray-700'>
                            <div className='h-full flex px-2 flex-wrap content-center'>
                                <div className='bg-gray-50 w-3 h-3 mx-1 rounded-full'></div>
                                <div className='bg-gray-50 w-3 h-3 mx-1 rounded-full'></div>
                                <div className='bg-gray-50 w-3 h-3 mx-1 rounded-full'></div>
                            </div>
                        </div>
                        <iframe title={data.id} className='w-full h-full' src={data.data_url} frameBorder="1"></iframe>
                    </div>
                    {/* asd */}
                </div>
            </div>
    )
}

}


// https://library.elementor.com/health-and-mindfulness-blog/