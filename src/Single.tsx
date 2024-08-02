import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate} from "react-router-dom";
import { useCart } from "./Context/ShoppingCartContext";
import Navbar from "./Navbar";
import Button from "./Utilities/Button";

const Single=()=>{
    const [data,setData]=useState<any[]>([]);
    // const [items,setItem] = useState([]);
    const { id } = useParams()
    const navigate = useNavigate()
    const {addToCart} =useCart()
    

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
          .then(response => setData(response.data))
          .catch(error => console.error('Error fetching products:', error));
      }, []);
    //   console.log(data?.rating.rate)
      //console.log(data.rating?data.rating.rate:'hi')
      const handleAddToCart=()=>{
        addToCart({...data, quantity:1})
        navigate('/cart')
      }

    return<>
     <Navbar/>
   {data && (
  <div className=" flex flex-col justify-center items-center max-w-md mx-auto bg-slate-200 shadow-md rounded-lg overflow-hidden mt-5 sm:max-w-xl md:max-w-2xl lg:max-w-100  ">
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
      {/* <button
        onClick={handleAddToCart}
        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
      >
        ADD TO CART
      </button> */}
      <div onClick={handleAddToCart} className="w-40">
        <Button value='ADD TO CART'/>
      </div>
    </div>
</div>



   )}
</>
}
export default Single;