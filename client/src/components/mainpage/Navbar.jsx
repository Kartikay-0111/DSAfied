import React, { useState } from 'react'
import Login from '../login';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutBtn from '../logout';
const Navbar = () => {
    const {user, isAuthenticated} = useAuth0();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <div>
            <header className="bg-black sticky top-0 z-50 flex justify-center items-center">
                <div className="container flex h-[70px] items-center justify-between gap-10 w-full lg:w-4/5 px-4 ">
                    <a href="/">
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold">$</span>
                            <span className="font-heading text-xl font-semibold">DSAfied</span>
                        </div>
                    </a>
                    <div className="flex items-center gap-4 duration-300 animate-in fade-in">
                        {/* Desktop Nav */}
                        <nav className="mr-5 hidden items-center justify-end gap-10 md:flex">
                            <a
                                className="flex cursor-pointer items-center text-lg font-medium sm:text-sm"
                                href="/features"
                            >
                                Features
                            </a>
                            <a
                                className="flex cursor-pointer items-center text-lg font-medium sm:text-sm"
                                href="/community"
                            >
                                Community
                            </a>
                            <a
                                className="flex cursor-pointer items-center text-lg font-medium sm:text-sm"
                                href="/roadmap"
                            >
                                Roadmap
                            </a>
                            <a
                                className="flex cursor-pointer items-center text-lg font-medium sm:text-sm"
                                href="/pricing"
                            >
                                Pricing
                            </a>
                        </nav>
                        <div className="items-center gap-2 md:flex">
                            {/* <a
                                className="items-center justify-center gap-2 btn btn-md btn-primary hidden lg:inline-flex"
                                href="/login"
                            >
                                Log In
                            </a> */}
                            {!isAuthenticated? (
                            <>
                            <Login/>
                            <a
                                className="inline-flex items-center justify-center gap-2 btn btn-outline btn-primary"
                                href="/login"
                            >
                                Get Started
                            </a>
                            </>):(
                            <>
                            <h3 className="text-pink">{user.name}</h3>
                            <LogoutBtn/>
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
                            <a
                                className="flex w-full cursor-pointer justify-center rounded-md p-2 font-medium"
                                href="/features"
                            >
                                Features
                            </a>
                            <a
                                href="/community"
                                className="flex w-full cursor-pointer justify-center rounded-md p-2 font-medium"
                            >
                                Community
                            </a>
                            <a
                                href="/roadmap"
                                className="flex w-full cursor-pointer justify-center rounded-md p-2 font-medium"
                            >
                                Roadmap
                            </a>
                            <a
                                className="flex w-full cursor-pointer justify-center rounded-md p-2 font-medium"
                                href="/pricing"
                            >
                                Pricing
                            </a>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar