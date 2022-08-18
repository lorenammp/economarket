import "./style.css";

import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../Providers/products";

import { FaUser, FaBox } from "react-icons/fa";

import Product from "../Product";
import { useNavigate } from "react-router-dom";

import PageTitle from "../PageTitle";
import Header from "../Header";
import Footer from "../Footer";
import SellerDashboardMenu from "../SellerDashboardMenu";
import FormDialog from "../FormDialog";
import EditSellerForm from "../EditSellerForm";
import ProductForm from "../ProductForm";

function DashboardMercado() {
  const { productList } = useContext(ProductContext);

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("id"));

  const [openMenu, setOpenMenu] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openProductForm, setOpenProductForm] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  const filterProducts = () => {
    const myProducts = productList.filter(
      (product) => product.userId === userId
    );
    setFilteredList(myProducts);
  };

  const menuList = ["Cadastrar produto", "Minha Conta", "Produtos reservados"];

  const handleOpenDialogMenu = () => {
    setOpenMenu(true);
  };

  const handleOpenDialogForm = () => {
    setOpenForm(true);
  };

  const handleOpenProductForn = () => {
    setOpenProductForm(true);
  };

  const navigateToReserved = () => {
    navigate("/seller/reserved");
  };

  useEffect(() => {
    filterProducts();
  }, [productList]);

  return (
    <>
      <Header />

      <PageTitle title={"Produtos Cadastrados"}>
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

      <div className="dashboardMarket">
        <div className="controlBtns">
          <button className="accountBtn" onClick={handleOpenDialogForm}>
            <div className="icon">
              <FaUser />
            </div>
            Minha conta
          </button>
          <button className="reservedProductsBtn" onClick={navigateToReserved}>
            <div className="icon">
              <FaBox />
            </div>
            <div className="btnText">Produtos reservados</div>
          </button>
          <FormDialog open={openForm} setOpen={setOpenForm}>
            <EditSellerForm />
          </FormDialog>
        </div>
        <ul className="dashboardProductsContainer">
          {filteredList.length > 0 ? (
            filteredList.map((product, index) => (
              <Product
                key={index}
                type={"market-dashboard"}
                product={product}
              />
            ))
          ) : (
            <h2>Você não possui produtos cadastrados</h2>
          )}
        </ul>
      </div>

      <Footer />
    </>
  );
}

export default DashboardMercado;
