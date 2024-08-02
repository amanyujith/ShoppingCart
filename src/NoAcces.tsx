import Button from "./Utilities/Button"

function NoAcces() {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
        <h1>You Are Not Authorized to Access This page!!</h1>
        <p></p>
        <div onClick={()=>{
            window.location.href='/home'
        }}
        className="w-40 ">
            <Button value="Back To Home"/>
        </div>
    </div>
  )
}

export default NoAcces