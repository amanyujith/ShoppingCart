import Button from "../Utilities/Button"
import { useAuth0 } from "@auth0/auth0-react"
function NoAcces() {
    const {loginWithRedirect} = useAuth0();
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-32">
        <h1 className="text-lg"><b>You Need To Login To Access Cart</b></h1>
        <p></p>
        <div>
            <Button  onClick={()=>{
            window.location.href='/home'
        }} value="Back To Home" cl="w-40"/>
        </div>
        <div>
            <Button onClick={loginWithRedirect} value="login"/>
        </div>
    </div>
  )
}

export default NoAcces