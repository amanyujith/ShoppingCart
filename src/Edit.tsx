import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "./Utilities/Button";

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setData(response.data);
        setTitle(response.data.title);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setProductCategory(response.data.category);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
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
  const edit = () => {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        image: selectedFile,
        category: productCategory,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        alert("Edited Data Succesfully");
      });
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-slate-300 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Edit</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name=""
            value={price}
            id=""
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name=""
            value={description}
            id=""
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          ></textarea>
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
        <div className="mb-4">
          <select
            name=""
            value={productCategory}
            id=""
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Category</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Ladies</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>
      </form>
      <div>
        <button
          onClick={edit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit Change
        </button>
      </div>
    </div>
  );
}

export default Edit;
