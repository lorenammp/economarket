import "./style.css";

import { useState, useContext, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { FaUser, FaShoppingBasket } from "react-icons/fa";

import PageTitle from "../PageTitle";
import FormDialog from "../FormDialog";
import ProductForm from "../ProductForm";
import EditSellerForm from "../EditSellerForm";
import SellerReservedItem from "../SellerReservedItem";
import { ReservedContext } from "../../Providers/reserved";
import SellerDashboardMenu from "../SellerDashboardMenu";

function ReservedListSeller({ type }) {
  const base_URL = "https://ecomarketapi.herokuapp.com";

  const { sellerReservedList, setSellerReservedList } =
    useContext(ReservedContext);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`${base_URL}/reserved?_expand=user&sellerId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setSellerReservedList(response.data))
      .catch((err) => console.log(err));
  }, []);

  const userOrders = [];

  if (sellerReservedList.length > 0) {
    const userArr = [];
    sellerReservedList.forEach((product) => {
      userArr.push(product.user.id);
    });

    const uniqueIds = [...new Set(userArr)];

    uniqueIds.forEach((user) => {
      const userList = [];
      sellerReservedList.forEach((product) => {
        if (product.user.id === user) {
          userList.push(product);
        }
      });

      userOrders.push(userList);
    });
  }

  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openProductForm, setOpenProductForm] = useState(false);

  const menuList = ["Cadastrar produto", "Minha Conta", "Meus Produtos"];

  const handleOpenDialogMenu = () => {
    setOpenMenu(true);
  };

  const handleOpenDialogForm = () => {
    setOpenForm(true);
  };

  const handleOpenProductForn = () => {
    setOpenProductForm(true);
  };

  const navigateToDashboard = () => {
    navigate("/seller/dashboard");
  };

  return (
    <>
      <PageTitle title={"Produtos Reservados"}>
        <div>
          <button className="menuLowRes" onClick={handleOpenDialogMenu}>
            +
          </button>

          <SellerDashboardMenu
            open={openMenu}
            setOpen={setOpenMenu}
            menuList={menuList}
          />
        </div>
        <button className="addProducts" onClick={handleOpenProductForn}>
          Cadastrar produtos
        </button>
        <FormDialog open={openProductForm} setOpen={setOpenProductForm}>
          <ProductForm />
        </FormDialog>
      </PageTitle>

      <div className="reservedSellerContainer">
        <div className="controlBtns">
          <button className="accountBtn" onClick={handleOpenDialogForm}>
            <div className="icon">
              <FaUser />
            </div>
            Minha conta
          </button>
          <button className="reservedProductsBtn" onClick={navigateToDashboard}>
            <div className="icon">
              <FaShoppingBasket />
            </div>
            <div className="btnText">Meus produtos</div>
          </button>
          <FormDialog open={openForm} setOpen={setOpenForm}>
            <EditSellerForm />
          </FormDialog>
        </div>
        <div className="listTitles">
          <div className="listTitlesClient">Cliente</div>
          <div className="listTitlesReservedDate">Data da reserva</div>
          <div className="listTitlesOrderPrice">Valor da reserva</div>
          <div className="listTitlesOrderGetDate">Retirada</div>
          <div className="listTitlesOrderTotal">Total de itens</div>
          <div className="iconPlaceholder"></div>
        </div>
        <ul className="sellerReservedProductsContainer">
          {userOrders.length > 0 &&
            userOrders.map((userOrder, index) => (
              <SellerReservedItem key={index} client={userOrder} type={type} />
            ))}
        </ul>
      </div>
    </>
  );
}

export default ReservedListSeller;
