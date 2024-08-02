import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogOutButton";
import Navbar from "../Navbar";
import Button from "../Utilities/Button";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0<any>();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
   
    isAuthenticated && (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center space-y-4">
      <img className="pt-8 rounded-full" src={user.picture} alt={user.name} />
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-600">Logged in as {user.email}</p>
      {/* <button
        onClick={
          isAuthenticated
            ? () => (window.location.href = '/portal')
            : () => (window.location.href = '/home')
        }
        className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Portal
      </button> */}
      <div onClick={
          isAuthenticated
            ? () => (window.location.href = '/portal'):''
            // : () => (window.location.href = '/home')
        }>
        <Button value='Portal' />
      </div>
      <div className="">
      <LogoutButton />
      </div>
      
    
    </div>
    </div>
    )
  );
};

export default Profile;