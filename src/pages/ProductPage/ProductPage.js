import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";
import DialogMenu from "../../components/DialogMenu";

import "./ProductPage.css";

function ProductPage() {
  const [product, setProduct] = useState({});
  const [openMenu, setOpenMenu] = useState(false);

  const menuList = ["Ver todos os produtos"];

  const params = useParams();
  const navigate = useNavigate();

  const handleOpenDialogMenu = () => {
    setOpenMenu(true);
  };

  useEffect(() => {
    axios
      .get(
        `https://ecomarketapi.herokuapp.com/products?_expand=user&id=${params.id}`
      )
      .then((res) => {
        setProduct(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <PageTitle title={product.user?.name}>
        <div>
          <button className="menuLowRes" onClick={handleOpenDialogMenu}>
            +
          </button>
          <button
            className="onlyOnBigScrean btnVerTodosProds"
            onClick={() => navigate("/")}
          >
            Ver produtos
          </button>

          <DialogMenu
            open={openMenu}
            setOpen={setOpenMenu}
            menuList={menuList}
          />
        </div>
      </PageTitle>
      <div className="productPageContainer">
        <h2 className="productPageTitle">{product.name}</h2>
        <figure className="productPageFigure">
          <img src={product.image} alt={product.name} />
          <span>
            {((product.promotionalPrice / product.originalPrice) * 100).toFixed(
              0
            )}
            %
          </span>
        </figure>
        <div className="productPageInfo">
          <h2 className="productPageTitle2">{product.name}</h2>
          <p className="productPageCategory">{product.category}</p>
          <p className="productPageDueDate">Vencimento: {product.dueDate}</p>
          <p className="productPageSeller">Vendido por: {product.user?.name}</p>
          <p className="productPageOriginalPrice">
            R$ {product.originalPrice?.toFixed(2).replace(".", ",")}
          </p>
          <p className="productPagePromotionalPrice">
            R$ {product.promotionalPrice?.toFixed(2).replace(".", ",")}
          </p>
          <p className="productPageDescription">{product.description}</p>
          {product.getDate && (
            <p className="productPageGetDate">
              Buscar em até {product.getDate}
            </p>
          )}
          <p className="productPageQuantity">
            {product.quantity} unidades disponíveis
          </p>
        </div>
      </div>
      <div className="conteinerAdress">
        <h3 className="productPageAdressTitle">Localização</h3>
        <p className="productPageAdress">
          {product.user?.adress?.rua}, {product.user?.adress?.numero} -{" "}
          {product.user?.adress?.bairro}, {product.user?.adress?.cidade} -{" "}
          {product.user?.adress?.estado}
        </p>
      </div>

      <Footer />
    </>
  );
}
export default ProductPage;
