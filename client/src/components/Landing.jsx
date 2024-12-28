import React,{useEffect} from 'react';
import { UserCircle } from 'lucide-react';

import {useAuth0} from '@auth0/auth0-react';
import Login from './login.jsx';
import LogoutBtn from './logout.jsx';

export default function LandingPage() {

  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const {getIdTokenClaims} = useAuth0();
  
  useEffect(()=>{
    const createUser = async () => {
      try{
        const token = await getAccessTokenSilently({
          audience: 'http://localhost/',
          scope: 'openid profile email',
        });

        // const idToken = await getIdTokenClaims();
        // console.log(idToken);

        console.log(token);

        const response = await fetch('http://localhost:3000/api/users',{
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
      }
      catch(e){
        console.log(e);
      }
    }
    if(user){
      createUser();
    }
  }, [user]);

  
  return (
    <div className="min-h-screen bg-[#0D0B1A] bg-gradient-to-br from-[#120f24] via-[#0D0B1A] to-[#1A1A2E]">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="DSAfied Logo"
            className="w-10 h-10 text-cyan-400"
          />
          <span className="text-xl font-bold text-white">DSAfied</span>
        </div>

        {isAuthenticated &&  (                                     //testing authentication
          <div className="flex items-center space-x-4">
          <span className="text-white">{user.name}</span>
          <UserCircle className="h-8 w-8 text-white" />
        </div>
      )}
        {user? <LogoutBtn/> : <Login/>}
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-8 text-center">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-mono text-white">
            You don't have to be Extreme, just Consistent
          </h1>
          <div className="flex justify-center space-x-2 text-white">
            <span className="text-2xl">★</span>
            <span className="text-4xl">★</span>
            <span className="text-2xl">★</span>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">DSAfied</h2>
            <h3 className="text-xl text-gray-300">
              Master DSA with Daily Challenges
            </h3>
          </div>

          <p className="mx-auto max-w-2xl text-gray-300">
            Personalized recommendations to sharpen your problem-solving skills
            and build consistent habits.
          </p>

          <button
            className="bg-white text-black hover:bg-gray-200 px-6 py-3 text-lg rounded-full"
          >
            Get Started - it's free
          </button>
        </div>

        {/* Learning Path */}
        <div>
          <img
            src="/journey.svg"
            alt="Learning Journey"
            className="mx-auto mt-12 w-full "
          />
        </div>
      </main>
    </div>
  )
}

