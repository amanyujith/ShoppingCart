import { useEffect,useState } from "react"
import axios from "axios"
import Button from "../Utilities/Button";
import imgs from '../assets/images.jpeg'
interface Product {
    category: string;
    id:number;
    title:string;
    rating: {
      rate: number;
      count: number;
    };
  }
  
export const LeaderBoard = ()=>{
    const [productsRating,setProductsRating]=useState<Product[]>([]);
    const [productsOrders,setProductsOrders] = useState<Product[]>([]);
    const [category,setCategory]=useState<string>('');
    // const [filteredProducts,setFilteredProducts] = useState([]);
    const [top5,setTop5] = useState(false);
    const [loading,setLoading] = useState(true);
    const [type,setType] = useState('');
    useEffect (()=>{
        console.log(type);
        console.log(category);
        
        const fetchProducts = async() =>{
            try{
                const response = await axios.get("https://fakestoreapi.com/products");
                const filteredData = category?
                response.data.filter((product: { category: string; })=>product.category===category):response.data
                const sortedRatingData = [...filteredData].sort((a,b)=>b.rating.rate-a.rating.rate);
                setProductsRating(sortedRatingData);
                const sortedOrderData = [...filteredData].sort((a,b)=>b.rating.count-a.rating.count);
                setProductsOrders(sortedOrderData)
               
                setLoading(false)
            }catch(err){
                console.log("Something went wrong",err);
                setLoading(false)
            }
        };
        fetchProducts(); 
    }, [type, category])
    if(loading){
        <div>Loading.........</div>
    }       
    const displayProductsRating = top5?productsRating.slice(0,5):productsRating;
    const displayProductsOrder = top5?productsOrders.slice(0,5):productsOrders

    return <div className="flex flex-col">
        {/* <h1>LeaderBoard</h1> */}
       
        <nav className="bg-white shadow-lg p-4 flex justify-between items-center mb-5">
        <button onClick={() => window.history.back()} className="text-gray-700 hover:text-gray-900 flex items-center">
          <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex items-center gap-4">
          {/* <img src={imgs} alt="Logo" className="h-10" onClick={() => window.location.href='/portal'} /> */}
          <select
            name="Category"
            id="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
        <div className="flex gap-2">
          <div
            onClick={() => setType('rating')}
            className={`cursor-pointer px-4 py-2 rounded-md text-center ${type === 'rating' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition-colors`}
          >
            Rating
          </div>
          <div
            onClick={() => setType('orders')}
            className={`cursor-pointer px-4 py-2 rounded-md text-center ${type === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition-colors`}
          >
            Orders
          </div>
        </div>
      </nav>
      <div className="flex justify-center gap-4 mb-4">
          <div
            onClick={() => setTop5(true)}
            className={`cursor-pointer px-4 py-2 rounded-md text-center ${top5 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition-colors`}
          >
            Top 5
          </div>
          <div
            onClick={() => setTop5(false)}
            className={`cursor-pointer px-4 py-2 rounded-md text-center ${!top5 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition-colors`}
          >
            All
          </div>
        </div>
        {type===''|| type==='rating' ? <div className="flex flex-row justify-center ">
        <table className="border-8 border-gray-400  mb-10 bg-white">
            <thead >
                <tr className="border-4 ">
                    <th className="border-2 p-3">Rank</th>
                    <th className="border-2 ">Product Name</th>
                    {/* <th>Category</th> */}
                    <th className="p-3">Rating</th>
                </tr>
            </thead>
            <tbody>
               {displayProductsRating.map((product,index)=>(
                <tr key={product.id} className="border-4">
                    <td className="border-2 p-5">{index+1}</td>
                    <td className="border-2 w-96 p-3">{product.title}</td>
                    {/* <td>{product.category}</td> */}
                    <td className="border-2 p-5">{product.rating.rate}</td>
                </tr>
               ))}
            </tbody>
        </table>
        </div>: <div className="flex flex-row justify-center ">
        <table className="border-8 border-gray-400 mb-10 bg-white">
            <thead >
                <tr className="border-4">
                    <th className="border-2 p-3">Rank</th>
                    <th className="border-2">Product Name</th>
                    {/* <th>Category</th> */}
                    <th className="p-3">Orders</th>
                </tr>
            </thead>
            <tbody>
               {displayProductsOrder.map((product,index)=>(
                <tr key={product.id} className="border-4">
                    <td className="border-2 p-5">{index+1}</td>
                    <td className="border-2 w-96 p-3">{product.title}</td>
                    {/* <td>{product.category}</td> */}
                    <td className="border-2 p-3">{product.rating.count}</td>
                </tr>
               ))}
            </tbody>
        </table>
        </div>
        }
        
        
       
    </div>
}