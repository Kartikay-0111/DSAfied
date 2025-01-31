import React from 'react'
import { NavLink } from 'react-router-dom'
const Error = () => {
    return (
        <div className='flex min-h-[calc(100vh-180px)] justify-center items-center bg-slate-900'>
            <div className='mt-20 p-5 w-11/12 md:w-7/12 sm:w-7/12 border-white border-4 ring-4 rounded-3xl backdrop-blur-lg'>
                <div className="no-blogs w-full h-max flex flex-col relative align-middle">
                    <h1 className=' text-rose-700 font-bold text-4xl mt-4'>Oops! Page Not Found 🙄</h1>
                    <p className=' text-blue-300 font-bold text-2xl mt-4'>We're sorry, the page you are looking for might have been removed or its name changed, or is temporarily unavailable.Please check the URL for any mistakes, or </p>
                    <button className="btn btn-primary min-w-max mx-auto"><NavLink to="/" >Return to Home</NavLink></button>
                </div>
            </div>
        </div>
    )
}
export default Error;
