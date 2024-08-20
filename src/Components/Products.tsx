import { useNavigate } from "react-router-dom"
import Button from "../Utilities/Button";

const Product=({...props})=>{
    const navigate=useNavigate();
    // console.log(props)
    const handleView=()=>{
        // e.preventDefault();
        navigate(`/view/${props.id}`);
    }
    
    return<div className="max-w-md mx-auto bg-slate-100 shadow-md rounded-lg overflow-hidden h-80">
    <div className="px-4 py-4 w-80 flex flex-col h-full justify-between">
        <div>
            <div className="flex justify-center">
                <img src={props.image} alt="" className="w-32 h-32 object-contain" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 ">{props.title}</h3>
            <h4 className="text-md font-medium text-gray-600">${props.price}</h4>
        </div>
        {/* <div>
            <button onClick={handleView}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                View
            </button>
        </div> */}
        <div >
            <Button onClick={handleView} value='View'/>
        </div>
     </div>
  </div>
  
}

export default Product