// Cart.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../store/cartSlice';
import Navbar from "./Navbar";
import Button from "../Utilities/Button";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  console.log(cart);
  
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return <div>Loading...</div>; 
  }
  
  return isAuthenticated ? (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-4 pt-5 font-serif">YOUR CART</h1>
      {cart.map((cartItem) => {
        return (
          <div
            key={cartItem.id}
            className="max-w-md mx-auto bg-slate-200 shadow-md rounded-lg overflow-hidden mt-5 sm:max-w-xl md:max-w-2xl lg:max-w-2xl"
          >
            <div className="p-5">
              <img
                src={cartItem.image}
                alt={cartItem.title}
                className="w-full h-40 object-cover rounded-lg sm:h-60 md:h-50"
              />
            </div>
            <div className="px-5 py-2">
              <h3 className="text-lg font-bold text-gray-800">{cartItem.title}</h3>
              <h3 className="text-md font-medium text-gray-600">{cartItem.category}</h3>
              <div className="flex items-center mb-2">
                <h3 className="text-md font-medium text-gray-600">
                  {cartItem.rating ? cartItem.rating.rate : ''}
                </h3>
                <span className="text-sm font-light text-gray-500 ml-2">
                  ({cartItem.rating ? cartItem.rating.count : ''})
                </span>
              </div>
              <h4 className="text-lg font-bold text-gray-800">${(cartItem.price * cartItem.quantity).toFixed(2)}</h4>
              <div className="flex items-center my-2">
                <button
                  onClick={() => dispatch(decrementQuantity(cartItem.id))}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                >
                  -
                </button>
                <span className="mx-2">{cartItem.quantity}</span>
                <button
                  onClick={() => dispatch(incrementQuantity(cartItem.id))}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center gap-10 px-5 pb-5">
              <div >
                <Button onClick={() => window.location.href = '/buy'} value='BUY NOW'/>
              </div>
              <div >
                <Button onClick={() => dispatch(removeFromCart(cartItem.id))} value='REMOVE'/>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div><h1>To Access Cart You Need to Login</h1></div>
  );
};

export default Cart;
