import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

const LogoutBtn = () =>{
    const { logout } = useAuth0();
    return(
        <button className="items-center justify-center gap-2 btn btn-md btn-primary hidden lg:inline-flex" onClick={(e) =>{ logout ({ returnTo: window.location.origin })}}>Logout</button>
    )
}
export default LogoutBtn;