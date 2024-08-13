import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);
interface DataSet {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    length:number
}
interface ChartData {
    labels: string[];
    datasets: DataSet[];
}
interface ChartProps {
    barData: ChartData;
    lineData: ChartData;
    barData2:ChartData
}
const Chart: React.FC<ChartProps> = ({ barData, lineData ,barData2})=>{ 
    return (
        <div className='flex flex-col bg-blue-100 rounded-lg w-full'>
          <div className='flex w-full flex-col md:flex-row rounded-lg'>
            <div className=' md:w-1/2  bg-slate-100 m-5 rounded-lg'>
            <h1>PRODUCT PRICES</h1>
            <Bar className=''
                data={barData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: '#000', 
                            }
                        },
                        tooltip: {
                            enabled: true,
                            mode: 'nearest',
                            intersect: false,
                        },
                    },
                    scales: {
                        x: {
                            // title: {
                            //     display: true,
                            //     text: 'PRODUCTS',
                            //     color: '#000',
                            //     font: {
                            //         size: 16
                            //     }
                            // },
                            ticks: {
                                color: '#000',
                                autoSkip: false,
                                maxRotation: 90,
                                minRotation: 90,
                                // callback: function(value) {
                                //     return typeof value === 'string' && value.length > 5 ? value.substring(0, 5) + '...' : value;
                                // }
                            },
                            grid: {
                                display: true,
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price (USD)',
                                color: '#000',
                                font: {
                                    size: 16
                                }
                            },
                            ticks: {
                                color: '#000',
                                
                            },
                            grid: {
                                color: 'rgba(200, 200, 200, 0.2)'
                            }
                        }
                    },
                    layout: {
                        padding: {
                            left: 10,
                            right: 10,
                            top: 20,
                            bottom: 10
                        }
                    },
                    elements: {
                        bar: {
                            borderWidth: 2,
                            borderRadius: 5,
                        }
                    },
                }}
            />
            </div>
            <div className='md:w-1/2 bg-slate-100 m-5 rounded-lg'>
            <h1>PRODUCT RATINGS</h1>
            <Line
                data={lineData}
                options={{
                    
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: '#000'
                            }
                        },
                        tooltip: {
                            enabled: true,
                            mode: 'nearest',
                            intersect: false
                        }
                    },
                    scales: {
                        x: {
                            // title: {
                            //     display: true,
                            //     text: 'PRODUCTS',
                            //     color: '#000',
                            //     font: {
                            //         size: 16
                            //     }
                            // },
                            ticks: {
                                color: '#000',
                                autoSkip: false,
                                maxRotation: 90,
                                minRotation: 90,
                                // callback: function(value) {
                                //     return typeof value === 'string' && value.length > 5 ? value.substring(0, 5) + '...' : value;
                                // }
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Rating',
                                color: '#000',
                                font: {
                                    size: 16
                                }
                            },
                            ticks: {
                                color: '#000',
                                
                            },
                            grid: {
                                color: 'rgba(200, 200, 200, 0.2)'
                            }
                        }
                    },
                    layout: {
                        padding: {
                            left: 10,
                            right: 10,
                            top: 20,
                            bottom: 10
                        }
                    },
                    elements: {
                        line: {
                            borderWidth: 2,
                        }
                    }
                }}
            />
            </div>
            </div>
            <div className='bg-slate-100 m-5 h-5/6 rounded-lg'>
            <h1>PRODUCT QUANTITY</h1>
            <Bar
            className='w-full'
            data={barData2}
          options={{
            indexAxis:'y',
            responsive:true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#000',
                        font: {
                            size: 14,
                            family: 'Arial'
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    mode: 'nearest',
                    intersect: false,
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    bodyColor: '#000',
                    borderColor: '#000',
                    borderWidth: 1
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Quantity',
                        color: '#000',
                        font: {
                            size: 16,
                            
                        }
                    },
                    ticks: {
                        color: '#000',
                    },
                    grid: {
                        color: 'rgba(200, 200, 200, 0.2)',
                    }
                },
                y: {
                    // title: {
                    //     display: true,
                    //     text: 'Product',
                    //     color: '#000',
                    //     font: {
                    //         size: 16,
                            
                    //     }
                    // },
                    ticks: {
                        color: '#000',
                        // callback: function(value) {
                        //     return typeof value === 'string' && value.length > 5 ? value.substring(0, 5) + '...' : value;
                        // }
                    },
                    grid: {
                        color: 'rgba(200, 200, 200, 0.2)',
                                        }
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 20,
                    bottom: 10
                }
            },
            elements: {
                bar: {
                    borderWidth: 2,
                    borderRadius: 5,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)', 
                    borderColor: 'rgba(54, 162, 235, 1)' 
                }
            }
          }}
            />
            </div>
        </div>
    );
};
export default Chart