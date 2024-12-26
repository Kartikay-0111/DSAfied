import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

const LogoutBtn = () =>{
    const { logout } = useAuth0();
    return(
        <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 text-lg rounded" onClick={(e) =>{ logout ({ returnTo: window.location.origin })}}>Logout</button>
    )
}
export default LogoutBtn;