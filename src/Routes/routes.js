import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Home from "../pages/Home";
import ReservedSeller from "../pages/ReservedSeller";
import RegisterConsumer from "../components/RegisterConsumer";
import RegisterSeller from "../components/RegisterSeller";
import DashboardMercado from "../components/DashboardMercado";
import WishList from "../components/WishList";
import EditConsumerForm from "../components/EditConsumerForm";
import ReservedConsumer from "../pages/ReservedConsumer";
import DashboarUsuario from "../components/DashboardConsumidor";
import ProductPage from "../pages/ProductPage/ProductPage";

function Ways() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="seller/dashboard" element={<DashboardMercado />} />
        <Route exact path="consumer/register" element={<RegisterConsumer />} />
        <Route exact path="consumer/dashboard" element={<DashboarUsuario />} />
        <Route exact path="seller/register" element={<RegisterSeller />} />
        <Route exact path="/wishlist" element={<WishList />} />
        <Route exact path="/editarform" element={<EditConsumerForm />} />
        <Route exact path="seller/reserved" element={<ReservedSeller />} />
        <Route exact path="consumer/reserved" element={<ReservedConsumer />} />
        <Route exact path="/wishlist" element={<WishList />} />
        <Route exact path="/products/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default Ways;
