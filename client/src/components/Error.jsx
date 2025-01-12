import React from 'react'
import { NavLink } from 'react-router-dom'
export const Error = () => {
    return (
        <div className='flex justify-center align-middle'>
        <div className='mt-20 p-5 w-11/12 md:w-7/12 sm:w-7/12 border-white border-4 ring-4 rounded-3xl backdrop-blur-lg'>
            <div className="no-blogs w-full h-max flex flex-col relative align-middle">
                <h1 className=' text-rose-700 font-bold text-4xl mt-4'>404 - Page Not Found</h1>
                <p className=' text-rose-300 font-bold text-2xl mt-4'>We're sorry, the page you are looking for might have been removed or its name changed, or is temporarily unavailable.Please check the URL for any mistakes, or </p>
                <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-500 hover:border-blue-700 rounded mt-4"><NavLink to="/potd" >Return to Home</NavLink></button>
            </div>
        </div>
        </div>
    )
}
