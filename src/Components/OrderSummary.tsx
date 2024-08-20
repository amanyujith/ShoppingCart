import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {deleteOrderData} from '../store/orderSlice'
import {clearCart} from '../store/cartSlice'
import Button from '../Utilities/Button';
import { useNavigate } from 'react-router-dom';
const OrderSummary = () => {
  const {order} = useSelector((state:RootState) => state.order);
console.log("orderData",order);
const dispatch = useDispatch();
const navigate = useNavigate();

const handleSubmit = ()=>{
    if(order.length>0){
        dispatch(deleteOrderData());
        dispatch(clearCart());
    navigate('/buy')
    }
    else{
        alert("noo data")
    }
}
  return (
    <div>
      <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Order Summary</h2>
      {/* {order.map((order, index) => ( */}
        <div
        //   key={index}
          className="border-b border-gray-300 pb-4 mb-4 last:mb-0 last:pb-0 last:border-b-0"
        >
          <p className="text-lg font-semibold">Name: <span className="font-normal">{order[order.length-1].name}</span></p>
          <p className="text-lg font-semibold">Address: <span className="font-normal">{order[order.length-1].address}</span></p>
          <p className="text-lg font-semibold">Phone Number: <span className="font-normal">{order[order.length-1].phoneNumber}</span></p>
          <p className="text-lg font-semibold">Pincode: <span className="font-normal">{order[order.length-1].pincode}</span></p>
        </div>
      {/* ))} */}
       <div className='w-28 '>
    <Button
     value="Place Your Order"
     onClick={handleSubmit}
     />
    </div>
    </div>
   
    </div>
  );
};

export default OrderSummary;
