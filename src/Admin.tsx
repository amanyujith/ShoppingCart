import { useState } from "react";

function Admin() {
    const [data,setData] = useState([]);
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [productCategory,setProductCategory] = useState('');
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Get the selected file
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
    
        if (file) {
          // Generate a URL for the selected image
          const filePreview = URL.createObjectURL(file);
          setPreview(filePreview);
        }
      };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title: title,
                    price: price,
                    description: description,
                    image: selectedFile,
                    category: productCategory
                }
            )
        }).then(res=>res.json())
                
            
            .then(json=>{console.log(json);alert('Edited')
            })
            .catch((err)=>{
                
                console.log('errrrrrrrrrrrro',err);
                
            })
    }
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mb-10 mt-5">
    <h1 className="text-2xl font-bold mb-4">Admin</h1>
    <form>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          value={price}
          placeholder="0$"
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        ></textarea>
      </div>
      <div className="mb-4">
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="all">Category</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Ladies Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
      </div>
      <div className="flex flex-col items-center mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        {preview && (
          <div>
            <img
              src={preview}
              alt="Selected"
              className="h-40 object-contain rounded-lg"
            />
          </div>
        )}
        {selectedFile && <p>File name: {selectedFile.name}</p>}
      </div>
      <div>
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  
  )
}

export default Admin