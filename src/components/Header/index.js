import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSearch, IoMdPerson, IoIosHeart } from "react-icons/io";
import { ProductContext } from "../../Providers/products";
import { UserContext } from "../../Providers/userProvider";

import "./style.css";

function Header({ type }) {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const { productList, setFilteredProducts } = useContext(ProductContext);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  function handleSearch(search) {
    const filterOnProducts = productList.filter((product) => {
      return (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredProducts(filterOnProducts);

    setSearch("");
  }

  function logout() {
    localStorage.clear();
    setUser({});
    navigate("/");
  }

  return (
    <>
      <header>
        <img
          src="https://i.ibb.co/F05Rdfr/economarket-logo.png"
          alt="logo"
          onClick={() => navigate("/")}
        />
        <div className="containerUtilities">
          {type === "home" && (
            <div className="containerSearch">
              <input
                placeholder="Buscar"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button onClick={() => handleSearch(search)}>
                <IoMdSearch className="iconSearch" />
              </button>
            </div>
          )}

          {localStorage.getItem("type") === "consumer" && (
            <div className="containerPerson">
              <button
                className="iconPersonBtn"
                onClick={() => navigate("/wishlist")}
              >
                <IoIosHeart className="iconPerson" />
              </button>
            </div>
          )}

          <div className="containerPerson">
            <button
              className="iconPersonBtn"
              onClick={() => setShowModal(!showModal)}
            >
              <IoMdPerson className="iconPerson" />
            </button>
            {showModal && (
              <div className="modalMenu">
                {localStorage.getItem("id") ? (
                  <>
                    {localStorage.getItem("type") === "consumer" ? (
                      <>
                        <button onClick={() => navigate("/consumer/dashboard")}>
                          Dashboard
                        </button>
                        <button onClick={logout}>Logout</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => navigate("/seller/dashboard")}>
                          Dashboard
                        </button>
                        <button onClick={logout}>Logout</button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate("/login")}>Login</button>
                    <button onClick={() => navigate("consumer/register")}>
                      Cadastro
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
