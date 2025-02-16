import React, { useState, useEffect } from 'react'
import Login from '../login';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import LogoutBtn from '../logout';
const Navbar = () => {
    const { user, isAuthenticated } = useAuth0();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // useEffect(() =>{
    //     console.log(user);
    // },[isAuthenticated, user])
    return (
        <div>
            <header className="bg-black sticky top-0 z-50 flex justify-center items-center">
                <div className="container flex h-[70px] items-center justify-between gap-10 w-full lg:w-4/5 px-4 ">
                    <NavLink to="/">
                        <div className="flex items-center gap-1">
                            {/* <span className="text-lg font-bold">$</span> */}
                            <img src='./infinity.png' className='h-8 w-12' />
                            <span className="font-heading text-xl font-semibold">DSAfied</span>
                        </div>
                    </NavLink>
                    <div className="flex items-center gap-4 duration-300 animate-in fade-in">
                        {/* Desktop Nav */}
                        <nav className="mr-5 hidden items-center justify-end gap-10 md:flex">
                            <NavLink
                                className="flex cursor-pointer items-center text-lg font-medium sm:text-sm"
                                to="/problemset"
                            >
                                Problemset
                            </NavLink>
                            <NavLink
                                className="flex cursor-pointer items-center text-lg font-medium sm:text-sm"
                                to="/potd"
                            >
                                POTD
                            </NavLink>
                            <NavLink
                                className="flex cursor-pointer items-center text-lg font-medium sm:text-sm"
                                to="/IntervwCompo"
                            >
                                Interview Prep
                            </NavLink>
                            <NavLink
                                className="flex cursor-pointer items-center text-lg font-medium sm:text-sm"
                                to="/concept-of-the-day"
                            >
                                Today's Concept
                            </NavLink>
                        </nav>
                        <div className="items-center gap-2 md:flex">
                            {/* <a
                                className="items-center justify-center gap-2 btn btn-md btn-primary hidden lg:inline-flex"
                                href="/login"
                            >
                                Log In
                            </a> */}
                            {!isAuthenticated ? (
                                <>
                                    <Login />
                                    <NavLink
                                        className="inline-flex items-center justify-center gap-2 btn btn-outline btn-primary"
                                        to="/login"
                                    >
                                        Get Started
                                    </NavLink>
                                </>) : (
                                <>
                                     <div className="dropdown dropdown-end">
                                        <div tabIndex={0} className="btn btn-info m-1">{user.name}
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                            <li><NavLink to="/profile">Profile</NavLink></li>
                                            <li><LogoutBtn /></li>
                                        </ul>
                                    </div>
                                </>)}
                        </div>
                        {/* Mobile Menu Toggle */}
                        <button
                            className="flex items-center space-x-2 md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-x"
                                >
                                    <line x1="18" x2="6" y1="6" y2="18"></line>
                                    <line x1="6" x2="18" y1="6" y2="18"></line>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-menu"
                                >
                                    <line x1="4" x2="20" y1="12" y2="12"></line>
                                    <line x1="4" x2="20" y1="6" y2="6"></line>
                                    <line x1="4" x2="20" y1="18" y2="18"></line>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-[70px] z-50 h-[calc(100vh-70px)] w-full overflow-auto md:hidden">
                    <div className="container rounded-b-lg bg-background bg-black text-foreground shadow-xl">
                        <nav className="flex flex-col gap-1 pt-2 ">
                            <NavLink
                                className="flex w-full cursor-pointer justify-center rounded-md p-2 font-medium"
                                to="/features"
                            >
                                Features
                            </NavLink>
                            <NavLink
                                to="/community"
                                className="flex w-full cursor-pointer justify-center rounded-md p-2 font-medium"
                            >
                                Community
                            </NavLink>
                            <NavLink
                                to="/roadmap"
                                className="flex w-full cursor-pointer justify-center rounded-md p-2 font-medium"
                            >
                                Roadmap
                            </NavLink>
                            <NavLink
                                className="flex w-full cursor-pointer justify-center rounded-md p-2 font-medium"
                                to="/pricing"
                            >
                                Pricing
                            </NavLink>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar