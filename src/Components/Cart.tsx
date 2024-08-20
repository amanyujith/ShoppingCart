import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity,clearCart } from '../store/cartSlice';
import Navbar from "./Navbar";
import Button from "../Utilities/Button";
import NoAccessToCart from "./NoAccessToCart";
import { useState } from "react";
import { Modal } from "./Modal";
import { RootState } from "@reduxjs/toolkit/query";

interface Cart {
  user: string;
  cart: CartItem[]; // Added cart property here
}

interface CartItem {
  user: string | undefined;
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
} 

const Cart = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetching cartList from Redux state
  const { cartList } = useSelector((store: RootState) => store.cart);
  console.log(cartList, 'aaaaaaaaaaaaaaaaaaaaaa');

  const handleModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loader rounded-full p-5 flex space-x-3">
          <div className="w-5 h-5 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="w-5 h-5 bg-gray-800 rounded-full animate-spin"></div>
          <div className="w-5 h-5 bg-gray-800 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  const userCart = cartList.find((cart: Cart) => cart.user === user?.email);
  const total = userCart?.cart.reduce((sum:number, item:CartItem) => sum + item.price * item.quantity, 0) || 0;
  const netTotal = total > 0 ? total + 2 : total;

  const handleIncrement = (itemId: number) => {
    if (user) {
      dispatch(incrementQuantity({ user: user.email, id: itemId }));
    }
  };

  const handleDecrement = (itemId: number) => {
    if (user) {
      dispatch(decrementQuantity({ user: user.email, id: itemId }));
    }
  };

  const handleRemove = (itemId: number) => {
    if (user) {
      dispatch(removeFromCart({ user: user.email, id: itemId }));
      setIsModalOpen(false);
    }
  };
const handleDelete = ()=>{
  dispatch(clearCart())
}
  return isAuthenticated ? (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-4 pt-5 font-serif">YOUR CART</h1>
      {userCart ? (
        userCart.cart.map((cartItem: CartItem) => (
          <div key={cartItem.id} className="bg-slate-200 shadow-md rounded-lg overflow-hidden mt-5 max-w-md mx-auto">
            <div className="p-4">
              <img src={cartItem.image} alt={cartItem.title} className="w-full h-40 object-contain rounded-lg" />
            </div>
            <div className="px-4 py-2 space-y-2">
              <h3 className="text-lg font-bold text-gray-800">{cartItem.title}</h3>
              <h4 className="text-md font-medium text-gray-600">{cartItem.category}</h4>
              <div className="flex items-center mb-2 space-x-1">
                <h3 className="text-md font-medium text-yellow-500">
                  {cartItem.rating ? cartItem.rating.rate : ''}
                </h3>
                <span className="text-sm font-light text-gray-500">
                  ({cartItem.rating ? cartItem.rating.count : ''})
                </span>
              </div>
              <h4 className="text-lg font-bold text-gray-800">
                ${(cartItem.price * cartItem.quantity).toFixed(2)}
              </h4>
              <div className="flex items-center space-x-2 my-2">
                <button
                  onClick={() => handleDecrement(cartItem.id)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                >
                  -
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  onClick={() => handleIncrement(cartItem.id)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between flex-wrap items-center px-4 pb-4">
              <div className="w-fit"> 
                <Button onClick={() => setIsModalOpen(true)} value='REMOVE' />
              </div>
            </div>
            <Modal
              isOpen={isModalOpen}
              title="Do You Want to Remove"
              cancel="No"
              onCancel={handleModal}
              buttonText="Yes"
              buttonAction={() => handleRemove(cartItem.id)}
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center text-xl font-bold ">No items in cart</div>
      )}
      {userCart && (
       <div className="flex flex-col w-full max-w-md justify-center items-center mx-auto mt-5 mb-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-xl shadow-lg p-6">
       <h1 className="text-gray-900 text-xl font-extrabold mb-3">Total: ${total.toFixed(2)}</h1>
       <h1 className="text-gray-900 text-lg font-semibold mb-3">{total > 0 ? "GST: $2.00" : "$0.00"}</h1>
       <h1 className="text-gray-900 text-xl font-extrabold mb-6">Net Total: ${netTotal.toFixed(2)}</h1>
       {total > 0 && (
         <div className="w-full max-w-xs ">
           <Button 
             onClick={() => window.location.href = '/form'} /*buy*/
             value='BUY NOW' 
             cl="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-lg w-full mb-5"
           />
           <Button 
             onClick={handleDelete} /*buy*/
             value='Clear Cart' 
             cl="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-lg w-full"
           />
         </div>
       )}
     </div>
     
      )}
    </div>
  ) : <NoAccessToCart />;
};

export default Cart;
