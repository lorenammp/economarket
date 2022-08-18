import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function EditProductForm({ product }) {
  const navigate = useNavigate();

  const base_URL = "https://ecomarketapi.herokuapp.com";

  const token = localStorage.getItem("token");

  const notifyError = () =>
    toast.error("Produto não editado. Tente novamente.");

  const notifySuccess = () => toast.success("Produto editado com sucesso!");

  const editProductData = (data, productId) => {
    axios
      .patch(`${base_URL}/products/${productId}`, data, {
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
    dueDate: yup.string().required("Digite a data de vencimento do produto"),
    category: yup.string().required("Digite uma categoria"),
    getDate: yup.string().required("Digite uma data de retirada"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleEditProduct = (data) => {
    const id = localStorage.getItem("id");
    const userId = parseInt(id);
    const productId = product.id;

    data.id = productId;
    data.userId = userId;

    editProductData(data, productId);
  };

  return (
    <form className="editSellerForm" onSubmit={handleSubmit(handleEditProduct)}>
      <div className="formTitle">Editar Produto</div>

      <div className="formGroup">
        <label className="editFormLabel">Nome do produto</label>
        <input
          className="editFormInput"
          id="name"
          type="text"
          defaultValue={product.name}
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
          defaultValue={product.image}
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
          defaultValue={product.description}
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
            defaultValue={product.originalPrice}
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
            defaultValue={product.promotionalPrice}
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
            defaultValue={product.quantity}
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
            defaultValue={product.dueDate}
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
            defaultValue={product.category}
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
            defaultValue={product.getDate}
            {...register("getDate")}
          />
          <div className="formErrors">{errors.getDate?.message}</div>
        </div>
      </div>

      <button className="saveEditBtn">Editar</button>
    </form>
  );
}

export default EditProductForm;
