import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Utilities/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button 
      value="Log In" 
      onClick={() => loginWithRedirect()} 
    />
  );
};

export default LoginButton;
