import { useState } from "react";
import Button from "../Utilities/Button";
import { Modal } from "./Modal";

function Admin() {
    const [data,setData] = useState([]);
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File|null>(null);
    const [isFieldsEmpty, setIsFieldsEmpty] = useState(false);
  const [preview, setPreview] = useState<string>('');
    const [productCategory,setProductCategory] = useState('');
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
    
        if (file) {
         
          const filePreview = URL.createObjectURL(file);
          setPreview(filePreview);
        }
      };
      const handleModal = ()=>{
        setIsModalOpen(false)
      }
    const handleSubmit =  (e: { preventDefault: () => void; })=>{
        e.preventDefault();
       if(title.trim()==="" && price.trim()==="" && description.trim()==="" && productCategory.trim()==="" ){
            setIsModalOpen(true)
            setIsFieldsEmpty(true);
       }
       else {
        setIsFieldsEmpty(false);
        setIsModalOpen(true); 
      }
      
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
                
            
            .then(json=>{console.log(json);/*alert('Edited')*/
            })
            .catch((err)=>{
                
                console.log('errrrrrrrrrrrro',err);
                
            })
       
    }
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mb-10 mt-5">
    <h1 className="text-2xl font-bold mb-4">Admin</h1>
    <form onSubmit={handleSubmit}>
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
          {/* <option value="all">Category</option> */}
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
          className="mb-4 w-full justify-center items-center"
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
        {/* <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit
        </button> */}
        <Button 
        value="Submit" onClick={()=>{}}
        />
      </div>
    </form>
      <Modal
      isOpen={isModalOpen}
      title={isFieldsEmpty ? "Field's Can't Be Empty" : "Item Added"}
      content={isFieldsEmpty ? "Please Fill All The Fields" : "Your item has been added successfully."}
      onCancel={handleModal}
      cancel="OK"
      />
  </div>
  
  )
}

export default Admin