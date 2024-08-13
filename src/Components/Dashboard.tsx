import  { useEffect, useState } from "react";
import axios from "axios";
import Chart from './Chart'
// import Chart from "./Components/Chart"; 
import BarData from '../Data/BarData.json'
import Button from "../Utilities/Button";
// import { ChartData } from "chart.js";
// import Title from './Data/Title.json'
const Dashboard = () => {
    const [chartData, setChartData] = useState<any>(null); 
    const [selectedCategory,setSelectedCategory]=useState<string>('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('https://fakestoreapi.com/products');
                const filteredData=selectedCategory?
                result.data.filter((product:{category:string})=>product.category===selectedCategory)
                :result.data
                const titles = filteredData.map((product: { title: string }) => product.title);
                // const id = filteredData.map((product:{id:number})=>product.id)
                const prices = filteredData.map((product: { price: number }) => product.price);
                const ratings = filteredData.map((product: { rating: { rate: number } }) => product.rating.rate);
                
                setChartData({
                    
                    barData: {
                        labels: titles,
                        datasets: [
                            {
                                label: 'PRODUCTS',
                                data: prices,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    lineData: {
                        labels:titles ,
                        datasets: [
                            {
                                label: 'PRODUCT RATINGS',
                                data: ratings,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    BarData2:{
                        labels:titles,
                        datasets:[
                            {
                                label:'COUNT',
                                data:BarData.map(product=>product.count),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }
                        ]

                    }
                });
            } catch (err) {
                console.log("Something Went Wrong", err);
            }
        };
        fetchData();
    }, [selectedCategory]);

    return (
        <div className="flex w-full flex-col">
             <div className=" bg-gray-300 flex flex-row justify-between fixed w-full p-5 flex-wrap">
                <h1 className="text-blue-500 font-bold text-2xl">PRODUCTS ANALYSIS</h1>
                <div className="flex gap-4 flex-wrap">
                    <div>
                        <Button   onClick={()=>window.location.href='/home'} value='HOME'/>
                    </div>
                    <div >
                        <Button onClick={()=>window.location.href='/portal'} value='PORTAL'/>
                    </div>
                    <div className="bg-black ">
                        <select className="border-2 border-black bg-gray-300 rounded p-2"
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="electronics">Electronics</option>
                            <option value="jewelery">Jewelery</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="women's clothing">Women's Clothing</option>
                        </select>
                    </div>
                </div>
             </div>
            <div className="pt-20 w-full">
            {chartData && (
                <div className="w-full">
                    <Chart barData={chartData.barData} lineData={chartData.lineData} barData2={chartData.BarData2} />
                </div>
            )}
            </div>
        </div>
    );
};

export default Dashboard;
