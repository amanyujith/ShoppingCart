import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Utilities/Button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
    value="Log Out"
    onClick={()=>logout({ logoutParams: { returnTo: window.location.origin } })}
    />
    // <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    // className=" w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
    //   Log Out
    // </button>

  );
};

export default LogoutButton;