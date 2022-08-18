import "./style.css";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function EditSellerForm() {
  const navigate = useNavigate();

  const [sellerData, setSellerData] = useState([]);
  const [sellerAddress, setSellerAddress] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  const base_URL = "https://ecomarketapi.herokuapp.com";

  useEffect(() => {
    axios
      .get(`${base_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSellerData(response.data);
        setSellerAddress(response.data.adress);
      })
      .catch((err) => console.log(err));
  });

  const notifyError = () =>
    toast.error("Usuário não editado. Verifique os dados enviados.");

  const notifySuccess = () => toast.success("Usuário editado com sucesso!");

  const editSellerData = (data) => {
    axios
      .patch(`${base_URL}/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        notifySuccess();
        navigate(0);
      })
      .catch((err) => notifyError());
  };

  const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string(),
    cnpj: yup.string(),
    rua: yup.string(),
    numero: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string(),
    avatarUrl: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleEditSeller = (data) => {
    for (let key in data) {
      if (data[key] === "") {
        delete data[key];
      }
    }
    editSellerData(data);
  };

  return (
    <form className="editSellerForm" onSubmit={handleSubmit(handleEditSeller)}>
      <div className="formTitle">Editar Informações</div>

      <div className="formGroup">
        <label className="editFormLabel">Nome</label>
        <input
          className="editFormInput"
          id="name"
          type="text"
          placeholder="Nome"
          defaultValue={sellerData.name}
          {...register("name")}
        />
        <div className="formErrors">{errors.name?.message}</div>
      </div>

      <div className="formGroup">
        <label className="editFormLabel">E-mail</label>
        <input
          className="editFormInput"
          id="email"
          type="email"
          placeholder="E-mail"
          defaultValue={sellerData.email}
          {...register("email")}
        />
        <div className="formErrors">{errors.email?.message}</div>
      </div>

      <div className="formGroup">
        <label className="editFormLabel">CNPJ</label>
        <input
          className="editFormInput"
          id="cnpj"
          type="number"
          placeholder="CNPJ"
          defaultValue={sellerData.cnpj}
          {...register("cnpj")}
        />
        <div className="formErrors">{errors.cnpj?.message}</div>
      </div>

      <div className="smallInput">
        <div className="formGroup">
          <label className="editFormLabel">Rua</label>
          <input
            className="editFormInputSmall"
            id="rua"
            type="text"
            placeholder="Rua"
            defaultValue={sellerAddress.rua}
            {...register("rua")}
          />
          <div className="formErrors">{errors.rua?.message}</div>
        </div>
        <div className="formGroup">
          <label className="editFormLabel">Número</label>
          <input
            className="editFormInputSmall"
            id="numero"
            type="number"
            placeholder="Número"
            defaultValue={sellerAddress.numero}
            {...register("numero")}
          />
          <div className="formErrors">{errors.numero?.message}</div>
        </div>
      </div>

      <div className="smallInput">
        <div className="formGroup">
          <label className="editFormLabel">Bairro</label>
          <input
            className="editFormInputSmall"
            id="bairro"
            type="text"
            placeholder="Bairro"
            defaultValue={sellerAddress.bairro}
            {...register("bairro")}
          />
          <div className="formErrors">{errors.bairro?.message}</div>
        </div>
        <div className="formGroup">
          <label className="editFormLabel">Cidade</label>
          <input
            className="editFormInputSmall"
            id="cidade"
            type="text"
            placeholder="Cidade"
            defaultValue={sellerAddress.cidade}
            {...register("cidade")}
          />
          <div className="formErrors">{errors.cidade?.message}</div>
        </div>
      </div>

      <div className="formGroup">
        <label className="editFormLabel">Estado</label>
        <input
          className="editFormInput"
          id="estado"
          type="text"
          placeholder="Estado"
          defaultValue={sellerAddress.estado}
          {...register("estado")}
        />
        <div className="formErrors">{errors.estado?.message}</div>
      </div>

      <div className="formGroup">
        <label className="editFormLabel">Avatar</label>
        <input
          className="editFormInput"
          id="avatar"
          type="text"
          placeholder="URL do avatar"
          {...register("avatar")}
        />
        <div className="formErrors">{errors.avatar?.message}</div>
      </div>

      <button className="saveEditBtn">Salvar</button>
    </form>
  );
}

export default EditSellerForm;
