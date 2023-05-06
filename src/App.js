import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
} from "@mui/material";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "./Login";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import ProtectedRoute from "./compoenent/ProtectedRoute";
import { useSelector } from "react-redux";
import { selectUser } from "./slice/userSlice";
const axios = require("axios");
function App() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(0);

  //add item values
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  //user details
  const user = useSelector(selectUser);

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

  const handleAsc = async () => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products?sort=asc"
      );
      setProduct(response.data);
    } catch (error) {}
  };
  const handleDesc = async () => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products?sort=desc"
      );
      setProduct(response.data);
    } catch (error) {}
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
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
    <div className="w-full">
      <Dialog open={isOpen} onClose={handleModal}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Note Images would be randomly generated by FakeApi Store
          </DialogContentText>
          <form>
            <div className="flex gap-4 flex-col my-2">
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Category"
                variant="outlined"
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal}>Cancel</Button>
          <Button variant="contained" onClick={addProduct}>
            Add product
          </Button>
        </DialogActions>
      </Dialog>
      <div className="flex px-20 pt-20 gap-2 justify-between">
        <div>
          <h1 className="text-slate-700 text-xl font-display font-semibold">
            {`Hi, ${user?.name}`}
          </h1>
          <p className="text-slate-500 font-display">
            Welcome to the Jamsfy Assignment
          </p>
        </div>
        <div>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="flex justify-between px-20 gap-8">
        <div className="total-product w-full my-4 flex flex-col gap-2 px-4 py-4 rounded-md border-solid border-[1px] border-slate-100 ">
          <h1 className="text-slate-400  font-display">Total Product</h1>
          <h2 className="text-slate-700 text-xl  font-semibold font-display">
            {product.length}
          </h2>
        </div>

        <div className="w-full my-4 flex flex-col gap-2 px-4 py-4 rounded-md border-solid border-[1px] border-slate-100 ">
          <h1 className="font-display text-slate-500">Sort By:</h1>
          <div className="flex gap-4">
            <Button variant="outlined" onClick={handleAsc}>
              Ascending
            </Button>
            <Button variant="outlined" onClick={handleDesc}>
              Descending
            </Button>
          </div>
        </div>
        <div className="w-full my-4 flex flex-col gap-2 px-4 py-4 rounded-md border-solid border-[1px] border-slate-100 ">
          <h1 className="font-display text-slate-500">Add more Product</h1>
          <Button variant="contained" onClick={handleModal}>
            Add Product
          </Button>
        </div>
      </div>

      <div className="flex w-full justify-between flex-wrap  px-20 gap-4">
        {product.map((item) => {
          return (
            <div
              className="w-96 h-max bg-white p-8 rounded-md border-solid border-[1px] border-slate-100"
              key={item?.id}
            >
              <div className="my-4">
                <img
                  className="w-40 aspect-square object-contain"
                  src={item?.image}
                  alt=""
                />
              </div>
              <h1 className="font-display text-xl font-semibold text-slate-700">
                {item?.title}
              </h1>

              <h2 className="font-display text-lg font-semibold text-slate-700">
                {item?.price}
              </h2>
              <p className="font-display text-base  text-slate-500">
                {item?.description}
              </p>
              <div className="flex gap-4 my-4">
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => deleteProduct(item?.id)}
                >
                  DELETE
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdate(item?.id)}
                >
                  Update
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",

    element: (
      // <Suspense fallback={<AppShimmer />}>
      <ProtectedRoute>
        <App />
      </ProtectedRoute>

      // </Suspense>
    ),
  },
  {
    path: "/login",

    element: <Login />,
  },
]);
