const Button = (props:any) =>{
    return <button  className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full ${props.cl}`}>
        {props.value}
    </button>
}
export default Button