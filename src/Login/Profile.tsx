import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogOutButton";
import Navbar from "../Components/Navbar";
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
      <div >
        <Button onClick={
          isAuthenticated
            ? () => (window.location.href = '/portal'):() => {}
        } value='Portal' />
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