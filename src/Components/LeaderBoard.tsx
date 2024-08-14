import { useEffect,useState } from "react"
import axios from "axios"
import Button from "../Utilities/Button";
export const LeaderBoard = ()=>{
    const [productsRating,setProductsRating]=useState([]);
    const [productsOrders,setProductsOrders] = useState([]);
    const [category,setCategory]=useState<string>('');
    const [filteredProducts,setFilteredProducts] = useState([]);
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
    

    return <div className="flex flex-col">
        <h1>LeaderBoard</h1>
        <div>
        <select name="Category" id="Category" value={category} className="w-40" onChange={(e)=>{setCategory(e.target.value)}}>
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        </select>
        <div className="w-40">
        <Button value="Rating" onClick={()=>setType('rating')}/>
        </div>
        <div className="w-40">
        <Button value="Orders" onClick={()=>setType('orders')}/>
        </div>
        </div>
        
        {type===''|| type==='rating' ? <div className="flex flex-row justify-center ">
        <table className="border-8 border-gray-400">
            <thead >
                <tr className="border-4">
                    <th className="border-2 p-3">Rank</th>
                    <th className="border-2">Product Name</th>
                    {/* <th>Category</th> */}
                    <th className="p-3">Rating</th>
                </tr>
            </thead>
            <tbody>
               {productsRating.map((product,index)=>(
                <tr key={product.id} className="border-4">
                    <td className="border-2">{index+1}</td>
                    <td className="border-2 w-96">{product.title}</td>
                    {/* <td>{product.category}</td> */}
                    <td className="border-2">{product.rating.rate}</td>
                </tr>
               ))}
            </tbody>
        </table>
        </div>: <div className="flex flex-row justify-center ">
        <table className="border-8 border-gray-400">
            <thead >
                <tr className="border-4">
                    <th className="border-2 p-3">Rank</th>
                    <th className="border-2">Product Name</th>
                    {/* <th>Category</th> */}
                    <th className="p-3">Orders</th>
                </tr>
            </thead>
            <tbody>
               {productsOrders.map((product,index)=>(
                <tr key={product.id} className="border-4">
                    <td className="border-2">{index+1}</td>
                    <td className="border-2 w-96">{product.title}</td>
                    {/* <td>{product.category}</td> */}
                    <td className="border-2">{product.rating.count}</td>
                </tr>
               ))}
            </tbody>
        </table>
        </div>
        }
        
        
       
    </div>
}