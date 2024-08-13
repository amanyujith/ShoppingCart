import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Navbar from "./Navbar";
import Button from "../Utilities/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { addToCart } from '../store/cartSlice';

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
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [id]);

  const handleAddToCart = () => {
    if (data && user) {
      const updatedData: ProductData = { ...data, user_id: user.sub };
      dispatch(addToCart({ ...updatedData, quantity: 1 }));
      navigate('/cart');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      {data && (
        <div className="flex flex-col justify-center items-center max-w-md mx-auto bg-slate-200 shadow-md rounded-lg overflow-hidden mt-5 sm:max-w-xl md:max-w-2xl lg:max-w-100">
          <div className="p-5 h-80 w-80 overflow-hidden">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-40 object-cover rounded-lg sm:h-60 md:h-80 lg:max-w-1xl"
            />
          </div>
          <div className="px-5 py-2">
            <h3 className="text-lg font-bold text-gray-800">{data.title}</h3>
            <h3 className="text-md font-medium text-gray-600">{data.category}</h3>
            <div className="flex items-center mb-2">
              <h3 className="text-md font-medium text-gray-600">
                {data.rating ? data.rating.rate : ''}
              </h3>
              <span className="text-sm font-light text-gray-500 ml-2">
                ({data.rating ? data.rating.count : ''})
              </span>
            </div>
            <h4 className="text-lg font-bold text-gray-800">${data.price}</h4>
            <p className="text-sm font-light text-gray-600">{data.description}</p>
            <div className="flex justify-center items-center">
              <div className="w-40 flex justify-center items-center">
                <Button onClick={handleAddToCart} value='ADD TO CART' />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Single;
