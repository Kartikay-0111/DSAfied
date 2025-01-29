import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

const LogoutBtn = () =>{
    const { logout } = useAuth0();
    const handleLogout = () =>{

        localStorage.removeItem('token');
        logout({returnTo: window.location.origin});
    }
    return(
        <button className="items-center justify-center gap-2 btn btn-md btn-primary hidden lg:inline-flex" onClick={handleLogout}>Logout</button>
    )
}
export default LogoutBtn;