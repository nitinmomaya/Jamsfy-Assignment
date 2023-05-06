import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "@mui/material";
const axios = require("axios");
function App() {
  const [product, setProduct] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(0);
  //add item values
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct();
    setCategory("");
    setDescription("");
    setPrice("");
    setTitle("");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
    console.log("NEW EFEFCT", product);
  }, []);

  const addProduct = async () => {
    try {
      if (isUpdate) {
        console.log("UPDATE RUNED");

        const editProduct = product.find((obj) => obj.id == isUpdate);
        console.log("UPD", editProduct);
        const updatedProduct = product.map((t) =>
          t.id === editProduct.id
            ? (t = {
                title: title,
                price,
                category,
                description,
                image: t.image,
              })
            : {
                title: t.title,
                description: t.description,
                category: t.category,
                price: t.price,
                image: t.image,
              }
        );
        console.log("NEW", updatedProduct);
        setProduct(updatedProduct);
      } else {
        const response = await axios.post("https://fakestoreapi.com/products", {
          title: title,
          price: price,
          description: description,
          image: "https://i.pravatar.cc",
          category: category,
        });
        setProduct((product) => [response.data, ...product]);
        handleModal();
        console.log("USEEFFECT RUN", product.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    console.log(id);
    url = `https://fakestoreapi.com/products/${id}`;
    try {
      const response = await axios.delete(url);
      setProduct((product) =>
        product.filter((item) => item.id !== response?.data?.id)
      );
      console.log("DEL", response);
      console.log("DEL_PROD", product);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id) => {
    console.log("product upd", product);
    const prod = product.filter((item) => item.id === id);
    console.log("handleup", prod, prod[0].category);
    handleModal(prod);
    setTitle(prod[0].title);
    setPrice(prod[0].price);
    setCategory(prod[0].category);
    setDescription(prod[0].description);
    setIsUpdate(id);
  };

  // const updateProduct = async (id) => {
  //   console.log("UPDATE", id);
  //   try {
  //     const response = await axios.put(
  //       `https://fakestoreapi.com/products/${id}`,
  //       {
  //         title: prod[0].title,
  //         price: prod[0].price,
  //         description: prod[0].description,
  //         image: "https://i.pravatar.cc",
  //         category: prod[0].category,
  //       }
  //     );
  //     console.log("UPDATE RES", res);
  //     handleUpdate(res);
  //     // setProduct((product) => product.filter((item) => item.id === id));

  //     console.log("UPDATE RUN", product.length);
  //   } catch (error) {}
  // };

  const handleModal = (id) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-red-50">
      <Modal open={isOpen} close={handleModal}>
        <div className="w-96 bg-white">
          <h1>This is a Modal Heading</h1>
          <form>
            <div>
              <label htmlFor="Title">Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="Enter Description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">price</label>
              <input
                type="text"
                placeholder="Enter price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category">category</label>
              <input
                type="text"
                placeholder="Enter category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Save
            </button>
          </form>
          <button onClick={handleModal}>CLOSE</button>
        </div>
      </Modal>

      <div>
        <Button
          className="bg-white text-slate-500 font-display"
          onClick={() => {
            handleModal();
          }}
        >
          Add Product
        </Button>
      </div>
      <div className="flex flex-wrap mx-20 gap-10">
        {product.map((item) => {
          return (
            <div className="w-80 bg-slate-50" key={item?.id}>
              <div>
                <img
                  className="w-40 aspect-square object-contain"
                  src={item?.image}
                  alt=""
                />
              </div>
              <h1>{item?.title}</h1>
              <h2>{item?.id}</h2>
              <p>{item?.price}</p>
              <p>{item?.description}</p>
              <Button onClick={() => deleteProduct(item?.id)}>DELETE</Button>
              <Button onClick={() => handleUpdate(item?.id)}>Update</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
