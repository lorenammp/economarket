import "./style.css";

import { useNavigate } from "react-router-dom";

import { FaHeart, FaTrashAlt, FaRegCheckCircle } from "react-icons/fa";

import { useContext } from "react";
import ReserveButton from "../ReserveButton";
import { WishlistContext } from "../../Providers/wishlist";
import EditProductBtn from "../EditProductButton";
import { ReservedContext } from "../../Providers/reserved";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product({ type, product }) {
  const { addToWishlist, deleteWishList } = useContext(WishlistContext);
  const { handleDeleteReserved } = useContext(ReservedContext);

  const token = localStorage.getItem("token");

  function deleteSuccess() {
    toast.success("Reserva concluida com sucesso!");
  }

  const base_URL = "https://ecomarketapi.herokuapp.com";
  const navigate = useNavigate();

  const consumerType = localStorage.getItem("type");

  const formatedOriginalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.originalPrice);

  const formatedPromotionalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.promotionalPrice);

  const deleteProduct = (id) => {
    axios
      .delete(`${base_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => deleteSuccess())
      .catch((err) => console.log(err));
  };

  const handleAddWishlist = () => {
    addToWishlist(product);
  };

  const handleDeleteWishlist = (id) => {
    deleteWishList(id);
  };

  const navigateProductPage = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <li className="productContainer">
      <div className="productImgContainer" onClick={navigateProductPage}>
        <img className="productImg" src={product.image} alt={product.name} />
      </div>
      <div className="productInfo">
        <h3 className="productTitle" onClick={navigateProductPage}>
          {product.name}
        </h3>
        <div className="productDueDate">Vencimento: {product.dueDate}</div>

        <div className="priceWishlist">
          {type === "reservedSeller" || type === "reservedConsumer" ? (
            <div className="productPricesReserved">
              <div className="pastPrice">{formatedOriginalPrice}</div>
              <div className="currentprice">{formatedPromotionalPrice}</div>
            </div>
          ) : (
            <div className="productPrices">
              <div className="pastPrice">{formatedOriginalPrice}</div>
              <div className="currentprice">{formatedPromotionalPrice}</div>
            </div>
          )}

          <div className="wishlistBtn">
            {product
              ? type === "home" &&
                consumerType !== "seller" && (
                  <FaHeart onClick={handleAddWishlist} />
                )
              : null}
            {product
              ? type === "wishlist" && (
                  <FaTrashAlt
                    onClick={() => handleDeleteWishlist(product.id)}
                  />
                )
              : null}
            {product
              ? type === "reservedSeller" && (
                  <FaRegCheckCircle
                    onClick={() => {
                      handleDeleteReserved(product.id);
                      deleteProduct(product.id);
                    }}
                  />
                )
              : null}
            {product
              ? type === "reservedConsumer" && (
                  <FaTrashAlt
                    onClick={() => handleDeleteReserved(product.id)}
                  />
                )
              : null}
          </div>
        </div>
        {type === "market-dashboard" ? (
          <EditProductBtn product={product} />
        ) : type === "reservedSeller" ||
          type === "reservedConsumer" ||
          (consumerType === "seller" && type === "home") ? null : (
          <ReserveButton type={type} product={product} />
        )}
      </div>
    </li>
  );
}

export default Product;
