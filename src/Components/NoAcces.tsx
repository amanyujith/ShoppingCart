import Button from "../Utilities/Button"

function NoAcces() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-32">
        <h1 className="text-lg"><b>You Are Not Authorized to Access The Portal page!!</b></h1>
        <p></p>
        <div>
            <Button  onClick={()=>{
            window.location.href='/home'
        }} value="Back To Home" cl="w-40"/>
        </div>
    </div>
  )
}

export default NoAcces