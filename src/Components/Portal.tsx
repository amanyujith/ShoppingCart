import { useState,useEffect } from "react"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Utilities/Button.tsx";
import Admin from "./Admin.tsx";
import LogoutButton from "../Login/LogOutButton.tsx";
import NoAcces from "./NoAcces.tsx";
interface Product {
  id: number;
  title: string;
  category: string;
  
}
function Portal() {
    const [data,setData]=useState<Product[]>([]);
    const {user} = useAuth0();
    const [all,setAll] = useState('all')
    const [ismail,setIsMail] = useState(false);
    const [filteredData,setFilteredData] = useState<Product[]>([]);
    const [productCategory,setProductCategory] = useState("");
    useEffect(() => {
        if (user?.email === 'amanyujith4444@gmail.com') {
            setIsMail(true);
        }
        if(productCategory==="" || productCategory==='all'){
            setFilteredData(data);
        }
    }, [user,data,productCategory]);
    const handleEdit = (id:number)=>{
      //  console.log(id);
        
        window.location.href=`/edit/${id}`
    }
    const handleRemove = (id: number) =>{
        fetch(`https://fakestoreapi.com/products/${id}`,{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>{console.log(json);alert('Deleted')})
    }
    const handleFilteredChange = (e:any)=>{
        // setProductCategory(e.target.value);
        const cat = e.target.value;
        setProductCategory(cat)
        setFilteredData(data.filter(item=> item?.category === cat))
    }
    //const [filteredData,setFilteredData] = useState([]);
    useEffect(()=>{
        
        axios.get('https://fakestoreapi.com/products')
        .then(response =>{ setData(response.data);
        })
        .catch(error => console.error('Error fetching products:', error));
    },[])
  return ( <div>{ismail ? 
    <div className="flex flex-col bg-slate-100 min-h-screen">
    <div className="flex md:flex-row flex-col">
      <div className="flex md:fixed md:flex-col flex-wrap gap-5 p-5">
        <div className="w-40">
            <Button  onClick={() => { setAll('all') }} value='All Products'/>
        </div>
        <div className="w-40" >
            <Button onClick={() => { setAll('add');/*window.location.href=('/admin')*/ }} value='Add Product'/>
        </div>
        <div className="w-40" >
            <Button onClick={() => window.location.href = '/home'} value='Home'/>
        </div>
        <div className="w-40">
            <LogoutButton/>
        </div>
        <div className="w-40">
          <Button onClick={()=>window.location.href = '/dashboard'} value='Dashboard'/>
          </div>
      </div>
  
      {/* Main content area */}
      <div className="md:w-5/6 md:ml-56 sm:p-10">
        {/* Category filter */}
        {all === 'all' && (
          <div className="mb-10">
            <select value={productCategory} onChange={handleFilteredChange} className="bg-white p-2 border border-gray-300 rounded-md shadow-sm">
              <option value="all">Category</option>
              <option value="men's clothing">Men</option>
              <option value="women's clothing">Ladies</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
            </select>
          </div>
        )}
  
        {/* Products listing */}
        {all === 'all' ? (
          <div className="grid grid-cols-1 gap-10">
            {filteredData.map((datas: Object) => (
              <div key={datas.id} className="flex sm:flex-row flex-col-reverse justify-between p-5 bg-white rounded-lg shadow-lg">
                <div className="flex sm:flex-row flex-col gap-5">
                  <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
                    <img src={datas.image} className="max-h-full" alt={datas.title} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-lg font-semibold">{datas.title}</div>
                    <div className="text-xl font-bold text-gray-800">${datas.price}</div>
                    {/* <button onClick={() => handleEdit(datas.id)} className="mt-3 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-28">
                      Edit
                    </button> */}
                    <div  className="w-40">
                        <Button onClick={() => handleEdit(datas.id)} value='Edit' cl='mt-3 py-2 px-4 '/>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(datas.id)}
                  className="bg-red-500 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold hover:bg-red-600"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        ) : (
          <Admin />
        )}
      </div>
    </div>
  </div>:<NoAcces/>}</div>
  
)
}

export default Portal