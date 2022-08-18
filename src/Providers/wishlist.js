import { createContext, useContext, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { UserContext } from "./userProvider";

export const WishlistContext = createContext([]);

export const WishlistProvider = ({ children }) => {
  // const { user } = useContext(UserContext)
  // console.log(user)
  const [productsWishlist, setProductsWishList] = useState([]);

  const base_URL = "https://ecomarketapi.herokuapp.com";

  const notifyErrorNoToken = () =>
    toast.error("Você precisa estar logado para favoritar um produto.");

  const notifyError = () => toast.error("Produto já está na lista de desejos.");

  const notifySuccess = () =>
    toast.success("Produto adicionado à lista de desejos!");

  function deleteSuccess() {
    toast.success("Produto removido com sucesso!");
  }

  const addToWishlist = (product) => {
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("id");
    const newObject = {
      id: product.id,
      image: product.image,
      name: product.name,
      dueDate: product.dueDate,
      category: product.category,
      description: product.description,
      originalPrice: product.originalPrice,
      promotionalPrice: product.promotionalPrice,
      quantity: product.quantity,
      sellerId: product.userId,
      userId: parseInt(idUser),
    };

    if (token === null) {
      notifyErrorNoToken();
    } else {
      axios
        .post(`${base_URL}/wishlist`, newObject, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => notifySuccess())
        .catch((err) => {
          if (err.response.status === 500) {
            console.log(err);
            console.log(product.id);
            notifyError();
          }
        });
    }
  };

  const getWishlist = (userId) => {
    const token = localStorage.getItem("token");
    axios
      .get(`${base_URL}/users/${userId}?_embed=wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const deleteWishList = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${base_URL}/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => deleteSuccess())
      .catch((err) => console.log(err));
  };

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        getWishlist,
        deleteWishList,
        productsWishlist,
        setProductsWishList,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
