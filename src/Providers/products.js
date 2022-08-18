import { createContext, useState, useEffect } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

export const ProductContext = createContext([]);

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const base_URL = "https://ecomarketapi.herokuapp.com";

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbnN1bWlkb3JAZ21haWwuY29tIiwiaWF0IjoxNjU3NDgyNTY2LCJleHAiOjE2NTc0ODYxNjYsInN1YiI6IjEifQ.a0kPcfMLVfH3OagjxOAr2z8cvXZz0baNgDoKTay_pI0";

  const token = localStorage.getItem("token");

  const notifyErrorNoToken = () =>
    toast.error("Você precisa estar logado para reservar um produto.");

  const notifySuccess = () => toast.success("Produto reservado com sucesso!");

  const notifyRemoved = () =>
    toast.warning("Produto removido da lista de reservados.");

  const notifyReserved = () => toast.warning("O produto já foi reservado.");

  const productsRequest = () => {
    axios
      .get(`${base_URL}/products`)
      .then((response) => setProductList(response.data))
      .catch((err) => console.log(err));
  };

  const addToReserved = (product) => {
    const idUser = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const todayDate = new Date();

    const date = `${todayDate.getDate()}/${todayDate.getMonth()}/${todayDate.getFullYear()}`;

    const newObject = {
      image: product.image,
      name: product.name,
      dueDate: product.dueDate,
      reservedDate: date,
      getDate: product.getDate || "24 horas",
      category: product.category,
      description: product.description,
      originalPrice: product.originalPrice,
      promotionalPrice: product.promotionalPrice,
      quantity: product.quantity,
      sellerId: product.userId,
      userId: parseInt(idUser),
      id: product.id,
    };

    if (token === null) {
      notifyErrorNoToken();
    } else {
      axios
        .post(`${base_URL}/reserved`, newObject, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          notifySuccess();
          return response;
        })
        .catch((err) => {
          console.log(err);
          notifyReserved();
        });
    }
  };

  const removeFromReserved = (productId) => {
    axios
      .delete(`${base_URL}/reserved/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        notifyRemoved();
        return response;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    productsRequest();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productList,
        productsRequest,
        addToReserved,
        removeFromReserved,
        setProductList,
        filteredProducts,
        setFilteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
