import "./style.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { ReservedContext } from "../../Providers/reserved";
import Product from "../Product";
import { UserContext } from "../../Providers/userProvider";

import emptyListImg from "../../Assets/imgs/emptyImg.svg";

function ReservedProdsConsumer({ type }) {
  const [reservedProducts, setReservedProducts] = useState([]);
  const { userReservedList } = useContext(ReservedContext);
  const userID = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://ecomarketapi.herokuapp.com/reserved?userId=${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setReservedProducts(res.data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <section className="containerReservedProdsConsumerList">
      <ul className="ReservedProdsConsumerList">
        {reservedProducts.length > 0 ? (
          reservedProducts.map((product, index) => (
            <Product key={index} product={product} type={type} />
          ))
        ) : (
          <div className="emptyImg">
            <img src={emptyListImg} alt="Lista vazia" />
            <div className="emptyText">
              Você ainda não reservou nenhum produto, adicione mais produtos!
            </div>
          </div>
        )}
      </ul>
    </section>
  );
}
export default ReservedProdsConsumer;
