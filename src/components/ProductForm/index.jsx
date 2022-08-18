import "./style.css";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductContext } from "../../Providers/products";

function ProductForm() {
  const navigate = useNavigate();

  const { productsRequest } = useContext(ProductContext);

  const base_URL = "https://ecomarketapi.herokuapp.com";

  const token = localStorage.getItem("token");

  const notifyError = () =>
    toast.error("Produto não cadastrado. Tente novamente.");

  const notifySuccess = () => toast.success("Produto cadastrado com sucesso!");

  const addProduct = (product) => {
    axios
      .post(`${base_URL}/products`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        notifySuccess();
        productsRequest();
      })
      .catch((err) => notifyError());
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Digite um nome para o produto")
      .min(3, "Mínimo de 3 caracteres!")
      .max(30, "Máximo de 30 caracteres!"),
    image: yup.string().required("Insira a url da imagem do produto"),
    description: yup.string().required("Insira a descrição do produto"),
    originalPrice: yup.number().required("Digite um valor inicial"),
    promotionalPrice: yup.number().required("Digite um valor atual"),
    quantity: yup.number().required("Digite a quantidade"),
    dueDate: yup
      .string()
      .required("Digite a data de vencimento do produto")
      .matches("[0-9]{1,2}(/|-)[0-9]{1,2}(/|-)[0-9]{4}", "dd/mm/aaaa"),
    category: yup.string().required("Digite uma categoria"),
    getDate: yup.string().required("Digite uma data de retirada"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleRegisterProduct = (data) => {
    const id = localStorage.getItem("id");
    const sellerId = parseInt(id);

    data.userId = sellerId;

    addProduct(data);

    reset({
      name: "",
      image: "",
      description: "",
      originalPrice: "",
      promotionalPrice: "",
      quantity: "",
      dueDate: "",
      category: "",
      getDate: "",
    });
  };

  return (
    <form
      className="editSellerForm"
      onSubmit={handleSubmit(handleRegisterProduct)}
    >
      <div className="formTitle">Cadastrar Produto</div>

      <div className="formGroup">
        <label className="editFormLabel">Nome do produto</label>
        <input
          className="editFormInput"
          id="name"
          type="text"
          {...register("name")}
        />
        <div className="formErrors">{errors.name?.message}</div>
      </div>

      <div className="formGroup">
        <label className="editFormLabel">URL da imagem</label>
        <input
          className="editFormInput"
          id="url"
          type="text"
          {...register("image")}
        />
        <div className="formErrors">{errors.image?.message}</div>
      </div>

      <div className="formGroup">
        <label className="editFormLabel">Descrição</label>
        <input
          className="editFormInput"
          id="descricao"
          type="text"
          {...register("description")}
        />
        <div className="formErrors">{errors.description?.message}</div>
      </div>

      <div className="smallInput">
        <div className="formGroup">
          <label className="editFormLabel">Preço original</label>
          <input
            className="editFormInputSmall"
            id="precoOriginal"
            type="number"
            {...register("originalPrice")}
          />
          <div className="formErrors">{errors.originalPrice?.message}</div>
        </div>

        <div className="formGroup">
          <label className="editFormLabel">Preço atual</label>
          <input
            className="editFormInputSmall"
            id="precoAtual"
            type="number"
            {...register("promotionalPrice")}
          />
          <div className="formErrors">{errors.promotionalPrice?.message}</div>
        </div>
      </div>

      <div className="smallInput">
        <div className="formGroup">
          <label className="editFormLabel">Quantidade disponível</label>
          <input
            className="editFormInputSmall"
            id="estoque"
            type="number"
            {...register("quantity")}
          />
          <div className="formErrors">{errors.quantity?.message}</div>
        </div>
        <div className="formGroup">
          <label className="editFormLabel">Data de vencimento</label>
          <input
            className="editFormInputSmall"
            id="vencimento"
            type="text"
            {...register("dueDate")}
          />
          <div className="formErrors">{errors.dueDate?.message}</div>
        </div>
      </div>

      <div className="smallInput">
        <div className="formGroup">
          <label className="editFormLabel">Categoria</label>
          <input
            className="editFormInputSmall"
            id="categoria"
            type="text"
            {...register("category")}
          />
          <div className="formErrors">{errors.category?.message}</div>
        </div>
        <div className="formGroup">
          <label className="editFormLabel">Prazo para retirada</label>
          <input
            className="editFormInputSmall"
            id="retirada"
            type="text"
            {...register("getDate")}
          />
          <div className="formErrors">{errors.getDate?.message}</div>
        </div>
      </div>

      <button className="saveEditBtn">Cadastrar</button>
    </form>
  );
}

export default ProductForm;
