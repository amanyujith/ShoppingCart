import { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Products";
import Navbar from "./Navbar";
// console.log(localStorage);

interface Props {
  id:number
  title: string;
  price: number;
  category: string;
  description: string;
  rating: object;
}
const Home = () => {
  const [data, setData] = useState<Props[]>([]);
  const [sort, setSort] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [filteredData, setFilteredData] = useState<Props[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    result();
    // return(()=>{

    // })
  }, []);

  const result = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // .then(response => setData(response.data))
  //   .catch(error => console.error('Error fetching products:', error));
  // if(productCategory===""){
  //   setFilteredData(data);
  // }
  // }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortSelected = e.target.value;
    setSort(sortSelected);
  };
  const handleFilteredChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const selectedCategory = e.target.value; 
    setProductCategory(selectedCategory);
     if (selectedCategory === "all") {
      setFilteredData(data);
    }else{
      setFilteredData(data.filter((item) => item.category === selectedCategory));

    }
  };

  return (
    <>
      <Navbar />
      <div className="flex-1 mx-4">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          className=" w-full py-2 px-4 mt-10 text-xl text-gray-700 border border-gray-300 
          rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-transparent"
          placeholder="Search..."
        />
      </div>
      <div></div>

      <div className="flex flex-col justify-center w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 py-8 px-4">
          Happy Shopping!!
        </h1>
        <div className="flex justify-center  mb-4 space-x-2">
          <div className=" ">
            <select onChange={handleSortChange} className="bg-gray-300">
              <option value="random">Sort By</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
          <div className="  ">
            <select
              value={productCategory}
              onChange={handleFilteredChange}
              className="bg-gray-300"
            >
              <option value="all">Category</option>
              <option value="men's clothing">Men</option>
              <option value="women's clothing">Ladies</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-10 ">
          {filteredData &&
            filteredData
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(search);
              })
              .sort((a, b) => {
                if (typeof a.price === 'number' && typeof b.price === 'number') {
                  if (sort === "asc") {
                    return a.price - b.price;
                  } else if (sort === "desc") {
                    return b.price - a.price;
                  }
                }
                return 0; 
              })
              
              .map((datas: Props) => {
                return <Product {...datas} />;
              })}
        </div>
      </div>
    </>
  );
};
export default Home;
