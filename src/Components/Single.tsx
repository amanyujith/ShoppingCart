import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Navbar from "./Navbar";
import Button from "../Utilities/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { addToCart } from '../store/cartSlice';
// import LoginButton from "../Login/LogInButton";
import { Modal } from "./Modal";
import Product from "./Products";

interface ProductData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  user_id?: string;
}


const Single = () => {
  
  const [data, setData] = useState<ProductData | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen,setIsModalOpen] = useState(false)
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(typeof(user?.sub));

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
  
    if (data && user ) {
      dispatch(addToCart({ user:user.email, product:data  }));
      navigate('/cart');
    }
  };
  
const handleModal =()=>{
  setIsModalOpen(false)
}
const { loginWithRedirect } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      {data && (
       <div className="flex flex-col lg:flex-row items-center max-w-md lg:max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5">
       <div className="lg:w-1/2 p-5">
         <img
           src={data.image}
           alt={data.title}
           className="w-full h-64 object-contain rounded-lg lg:h-80"
         />
       </div>
       <div className="lg:w-1/2 px-6 py-4">
         <h3 className="text-2xl font-semibold text-gray-900 mb-2">{data.title}</h3>
         <h4 className="text-xl font-medium text-gray-700 mb-2">{data.category}</h4>
         <div className="flex items-center mb-4">
           <h3 className="text-lg font-medium text-yellow-500">
             {data.rating ? data.rating.rate : ''}
           </h3>
           <span className="text-sm font-light text-gray-500 ml-2">
             ({data.rating ? data.rating.count : ''})
           </span>
         </div>
         <h4 className="text-xl font-bold text-gray-800 mb-4">${data.price}</h4>
         <p className="text-sm text-gray-600 mb-6">{data.description}</p>
         <div className="flex justify-center lg:justify-start">
           <Button onClick={handleAddToCart} value="ADD TO CART" />
         </div>
       </div>
     </div>
     
      )}
    {/* {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">You need to log in</h2>
            <p className="mb-4">Please log in to add items to your cart.</p>
            <div className="flex justify-end gap-4">
              <Button onClick={handleModal} value="Cancel" cl="w-20"/>
            <div className="w-20">
            <LoginButton/>
            </div>
            </div>
          </div>
        </div>
      )} */}
      <Modal
      isOpen={isModalOpen}
      title="You Need To Login"
      content="Please Login To Add Items To Your Cart"
      onCancel={handleModal}
      buttonAction={loginWithRedirect}
      cancel="Cancel"
      buttonText="Login"
      />
    </>
  );
};

export default Single;




///  {}