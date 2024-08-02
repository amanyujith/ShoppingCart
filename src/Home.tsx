import { useState ,useEffect} from 'react'
import axios from 'axios';
import Product from './Products';
import Navbar from './Navbar';
console.log(localStorage);

interface Props {
    title:string;
    price:number;
    category:string;
    description:string;
    rating: object;

  }
const Home=()=>{
    const [data,setData]=useState<Props[]>([]);
    const [sort,setSort]=useState('');
   const [productCategory,setProductCategory]=useState('');
const [filteredData,setFilteredData] = useState([]);
const [search,setSearch]=useState('');
useEffect(() => {
   
  result();
  // return(()=>{

  // })
}, []);

const result = async() =>{
  await axios.get('https://fakestoreapi.com/products')
  .then(response => setData(response.data))
  .catch(error => console.error('Error fetching products:', error));
if(productCategory===""){
  setFilteredData(data);
}
}
const handleSortChange = (e:any)=>{
        const sortSelected:any=e.target.value
        setSort(sortSelected);
        
       
}
const handleFilteredChange = (e:any)=>{
    e.preventDefault();
        const selectedCategory=e.target.value;
        setProductCategory(selectedCategory);
        // console.log(productCategory);
        
        setFilteredData(data.filter(item=> item.category === selectedCategory))
}

  return (  <>
   <Navbar/>
   <div className="flex-1 mx-4">
          <input onChange={(e)=>{
            setSearch(e.target.value);
          }}
          type="text" className=" text-xl w-full pl-10 mt-10 text-gray-700" placeholder="Search..." />
          
          </div>
          <div>
         
          </div>
         
          
          
    <div>
    <h1 className="text-3xl font-bold text-center text-blue-600 py-8 px-4">
  Happy Shopping!!
</h1>
<div className='flex justify-center mb-4 gap-x-2'>
  <div className='w-full md:w-1/2 xl:w-1/3'>
    <select onChange={handleSortChange} className='bg-gray-300'>
      <option value="random">Sort By</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  </div>
  <div className='w-full md:w-1/2 xl:w-1/3 '>
    <select value={productCategory} onChange={handleFilteredChange} className='bg-gray-300'>
      <option value="">Category</option>
      <option value="men's clothing">Men</option>
      <option value="women's clothing">Ladies</option>
      <option value="electronics">Electronics</option>
      <option value="jewelery">Jewelery</option>
    </select>
  </div>
</div>



      <div className='flex flex-wrap gap-10 '>
      {filteredData.filter((item)=>{
        return search.toLowerCase() === ''? item : item.title.toLowerCase().includes(search)
      }).sort((a,b)=>{
        if(sort === 'asc'){
            return a.price - b.price
        }else if(sort === 'desc'){
            return b.price - a.price
        }

      }).map((datas:object) => {
        return(
          <Product {...datas}/>
        )
      })}
      </div>
    </div>
    </>
  )
}
export default Home;