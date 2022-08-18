import "./style.css";

import { useContext, useState } from "react";
import { ProductContext } from "../../Providers/products";
import { ReservedContext } from "../../Providers/reserved";
import { useEffect } from "react";

function ReserveButton({ product, type }) {
  const [btnClass, setBtnClass] = useState("btnAdd");
  const [btnName, setBtnName] = useState("Reservar");
  const { addToReserved } = useContext(ProductContext);
  const { userReservedList, userReservedListRequest } =
    useContext(ReservedContext);

  useEffect(() => {
    userReservedListRequest();
  }, []);

  const checkReservedList = () => {
    const filterReservedProduct = userReservedList.filter(
      (reservedProduct) => reservedProduct.id === product.id
    );

    if (filterReservedProduct.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const changeBtnClass = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setBtnClass("btnDisable");
      setBtnName("Já reservado");
    }
    addToReserved(product);
  };

  return (
    <div className="reserveBtn">
      {type === "market-dashboard" && (
        <>
          <div className="editBtn">Editar</div>
        </>
      )}
      {type === "home" && (
        <>
          {checkReservedList() ? (
            <button className={btnClass} onClick={changeBtnClass}>
              {btnName}
            </button>
          ) : (
            <button className="btnDisable" disabled>
              Já reservado
            </button>
          )}
        </>
      )}
      {type === "wishlist" && (
        <>
          {checkReservedList() ? (
            <button
              className={btnClass}
              onClick={() => {
                setBtnClass("btnDisable");
                setBtnName("Já reservado");
                addToReserved(product);
              }}
            >
              {btnName}
            </button>
          ) : (
            <button className="btnDisable" disabled>
              Já reservado
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ReserveButton;
