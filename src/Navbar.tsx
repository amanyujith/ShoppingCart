// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginButton from "./Login/LogInButton";
import { useAuth0 } from "@auth0/auth0-react";
const Navbar = () => {
  //const navigate = useNavigate();
const {isAuthenticated, user} =useAuth0();
// console.log(user.picture);

  return (
    <nav className="bg-slate-100 shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button onClick={() => window.location.href='/home'}
        className="text-blue-600 hover:text-blue-800 font-bold">
          Home
        </button>
       <div className="flex gap-5">
        <button onClick={()=>window.location.href='/cart'}
        className="text-blue-600 hover:text-blue-800 font-bold">
          <svg  className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          
        </button>
<div>
 
  {  isAuthenticated?<div><img 
   onClick = {()=>{
    window.location.href='/profile'
  }}src={user?.picture} alt="No Picture" className=" w-10 rounded-lg"/></div>:<LoginButton/>}

  

</div>
</div>
      </div>
    </nav>
  );
};

export default Navbar;

