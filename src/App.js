import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
const axios = require("axios");
function App() {
  const [product, setProduct] = useState([]);
  const addProduct = async () => {
    try {
      const response = await axios.post("https://fakestoreapi.com/products", {
        title: "test Nitin",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      });
      setProduct(...product, response.data);
      console.log("POSt", product);
    } catch (error) {
      console.error(error);
    }
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
  }, [product]);

  return (
    <div className="bg-red-500">
      <div>
        <Button
          className="bg-white text-slate-500 font-display"
          onClick={() => {
            addProduct();
          }}
        >
          Add Product
        </Button>
      </div>
      <div className="flex flex-wrap mx-20 gap-10">
        {product.map((item) => {
          return (
            <div className="w-96 bg-slate-50" key={item?.id}>
              <div>
                <img
                  className="w-40 aspect-square object-contain"
                  src={item?.image}
                  alt=""
                />
              </div>
              <h1>{item?.title}</h1>
              <p>{item?.price}</p>
              <p>{item?.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
