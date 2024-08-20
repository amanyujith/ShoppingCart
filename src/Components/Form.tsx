import { useState } from "react"
import Button from "../Utilities/Button";
import { useDispatch } from "react-redux";
import { addOrderData } from "../store/orderSlice";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const Form = ()=>{
    const {user} = useAuth0();
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [pincode,setPincode] = useState('');
    const [deliveryType,setDeliveryType] = useState('');
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const handleSubmit = ()=>{
        // e:React.ChangeEvent<HTMLInputElement>
            // e.preventDefault();
            if(name.trim()===''||address.trim()===''||phoneNumber.trim()===''||pincode.trim()===''||deliveryType.trim()===''){
                alert("Enter All Fields")
                return;
            }
            dispatch(addOrderData({
                name,
                address,phoneNumber,pincode,user:user?.email
            }))
            navigate('/ordersummary')
    }
    console.log("user",user?.email);
    
    return(
        <div>
            
        <form onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
        <div className="mb-6">
          <input
            type="text"
            maxLength={15}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            value={address}
            maxLength={40}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="number"
            value={phoneNumber}
            maxLength={10}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="number"
            value={pincode}
            maxLength={7}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Pincode"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="radio"
              id="option1"
              name="options"
              value="COD"
              checked={deliveryType==='COD'}
              onChange={(e) => setDeliveryType(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="option1" className="ml-2 text-gray-700">
              COD
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-1">Only Cash On Delivery is available for this product</p>
        </div>
        <Button
        value="Place Your Order"
        onClick={handleSubmit}
        />
      </form>
      </div>
    )
}
export default Form