import LoginButton from "../Login/LogInButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CartItem } from "../Types/productTypes";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  
  const totalItems = useSelector((state: RootState) => {
    const userCart = state.cart.cartList.find((cart: { user: string | undefined }) => cart.user === user?.email);
    return userCart ? userCart.cart.reduce((total: number, item: CartItem) => total + item.quantity, 0) : 0;
  });

  return (
    <nav className="bg-slate-100 shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center flex-wrap">
        <button
          onClick={() => window.location.href = '/home'}
          className="text-blue-600 hover:text-blue-800 font-bold mb-4 sm:mb-0"
        >
          Home
        </button>
        <div className="flex gap-5 items-center">
          <div className="relative">
            <button
              onClick={() => window.location.href = '/cart'}
              className="text-blue-600 hover:text-blue-800 font-bold"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 left-0 bg-blue-500 text-white rounded-full text-xs font-bold px-2 py-1 transform -translate-x-1/2 -translate-y-1/2">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
          <div>
            {isAuthenticated ? (
              <img
                onClick={() => window.location.href = '/profile'}
                src={user?.picture}
                alt="No Picture"
                className="w-10 rounded-lg cursor-pointer"
              />
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
