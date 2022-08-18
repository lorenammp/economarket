import "./style.css";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import LogoWhite from "../../Assets/Register/logo-white.svg";
import TaskImg from "../../Assets/Register/task.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { ButtonRegister } from "../Button";
import { toast } from "react-toastify";

function RegisterConsumer() {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome obrigatório!")
      .matches(
        "^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$",
        "Digite letras somente"
      ),
    email: yup
      .string()
      .required("E-mail obrigatório!")
      .email("E-mail inválido!"),
    cpf: yup
      .string()
      .required("CPF obrigatório!")
      .matches(
        "^([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})$",
        "Digite um CPF válido!"
      ),
    password: yup
      .string()
      .required("Senha obrigatória!")
      .matches(
        "^(?=.*[A-Z])(?=.*[!#@$%&?])(?=.*[0-9])(?=.*[a-z]).{6,15}$",
        "Use uma senha mais forte"
      ),
    passwordConfirmation: yup
      .string()
      .required("Confirmação obrigatória!")
      .oneOf([yup.ref("password"), null], "A senha deve ser igual"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    const newData = {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      password: data.password,
    };
    axios
      .post("https://ecomarketapi.herokuapp.com/register", newData)
      .then((res) => LoginSuccess(res))
      .catch((err) => LoginFailed(err));
  };

  const LoginSuccess = (data) => {
    toast.success("Cadastrado com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const LoginFailed = (data) => {
    toast.error("E-mail já cadastrado", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="containerRegisterConsumer">
      <div className="containerRegisterForm">
        <div className="headerContainerRegisterForm">
          <div className="headerContainerRegisterForm2">
            <h2>Faça seu cadastro</h2>
            <p>E comece a poupar ainda hoje com Economarket!</p>
          </div>
          <img
            src={LogoWhite}
            alt="Economarket"
            className="registerLogoHeader"
          />
        </div>
        <form
          className="registerConsumerForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input placeholder="Nome" {...register("name")} />
          <span className="errorSpan">{errors.name?.message}</span>
          <input placeholder="E-mail" {...register("email")} />
          <span className="errorSpan">{errors.email?.message}</span>
          <input placeholder="CPF" {...register("cpf")} />
          <span className="errorSpan">{errors.cpf?.message}</span>
          <div className="passwordContainer">
            <div className="passwordContainer2">
              <input
                placeholder="Senha"
                type="password"
                {...register("password")}
              />
              <span className="errorSpan">{errors.password?.message}</span>
            </div>
            <div className="passwordContainer2">
              <input
                placeholder="Confirmar senha"
                type="password"
                {...register("passwordConfirmation")}
              />
              <span className="errorSpan">
                {errors.passwordConfirmation?.message}
              </span>
            </div>
          </div>
          <ButtonRegister type="submit" text="Registrar" />
          <p className="ctaRegisterSeller">
            Possui um comércio?{" "}
            <Link to="/seller/register" className="ctaLink">
              Clique aqui
            </Link>{" "}
            para cadastrar seu negócio!
          </p>

          <p className="ctaRegisterSeller">
            Já é cadastrado?{" "}
            <Link to="/login" className="ctaLink">
              Clique aqui
            </Link>{" "}
            para entrar!
          </p>
        </form>
      </div>
      <div className="containerRegisterForm2">
        <img src={TaskImg} alt="Cadastre-se" />
      </div>
    </div>
  );
}

export default RegisterConsumer;
