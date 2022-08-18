import "./style.css";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import {BsFillBasket2Fill} from "react-icons/bs";
import {MdFavorite} from "react-icons/md";
import PageTitle from "../PageTitle";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import FormDialog from "../FormDialog";
import EditConsumerForm from "../EditConsumerForm";

function DashboarUsuario() {

  const [openForm, setOpenForm] = useState(false);

  const navigate = useNavigate();

  const handleOpenDialogForm = () => {
    setOpenForm(true);
  };



  return (
    <div className="container">
      <Header />

      <PageTitle title={"Painel do Usuario"}/>       

      <div className="dashboardConsumidor">
        <div className="controlBtns">
          <button  className="btnNavigate" onClick={handleOpenDialogForm}>
            <div className="icon">
              <FaUser size={'5em'} />
            </div>
            Minha conta
          </button>
          <FormDialog open={openForm} setOpen={setOpenForm}>
            <EditConsumerForm />
          </FormDialog >
          <button  className="btnNavigate" onClick={() => navigate('/wishlist')}>
            <div className="icon">
              <MdFavorite size={'5em'}/>
            </div>
            Lista de desejos
          </button>
          <button  className="btnNavigate" onClick={() => navigate('/consumer/reserved')}>
            <div className="icon">
              <BsFillBasket2Fill size={'5em'}/>
            </div>
            Lista de reservas
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DashboarUsuario;
