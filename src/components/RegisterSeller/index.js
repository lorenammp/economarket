import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import LogoWhite from "../../Assets/Register/logo-white.svg";
import TaskImg from "../../Assets/Register/task.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { ButtonRegister } from "../Button";
import { toast } from "react-toastify";

function RegisterSeller() {
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
    cnpj: yup
      .string()
      .required("CNPJ obrigatório!")
      .matches(
        "^([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})$",
        "Digite um CNPJ válido!"
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
    endCep: yup
      .string()
      .required("CEP obrigatório!")
      .matches("^([0-9]{8})$", "Digite somente números"),
    endRua: yup.string().required("Rua obrigatória!"),
    endNumero: yup.string().required("Número obrigatório"),
    endCidade: yup.string().required("Cidade obrigatória!"),
    endEstado: yup.string().required("Estado obrigatório!"),
    horarioRetirada: yup.string().required("Selecione um horário"),
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
      cnpj: data.cnpj,
      password: data.password,
      endCep: data.endCep,
      endRua: data.endRua,
      endNumero: data.endNumero,
      endCidade: data.endCidade,
      endEstado: data.endEstado,
      horarioRetirada: data.horarioRetirada,
    };
    axios
      .post("https://ecomarketapi.herokuapp.com/register", newData)
      .then((res) => LoginSuccess(res))
      .catch((err) => LoginFailed(err));
  };

  const LoginSuccess = (data) => {
    console.log(data);
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
      navigate("/");
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
    <div className="containerRegisterConsumer containerRegisterSeller">
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
          <input placeholder="Nome da empresa" {...register("name")} />
          <span className="errorSpan">{errors.name?.message}</span>
          <input placeholder="E-mail" {...register("email")} />
          <span className="errorSpan">{errors.email?.message}</span>
          <input placeholder="CNPJ" {...register("cnpj")} />
          <span className="errorSpan">{errors.cnpj?.message}</span>
          <input placeholder="CEP" {...register("endCep")} />
          <span className="errorSpan">{errors.endCep?.message}</span>
          <div className="passwordContainer">
            <div className="passwordContainer2">
              <input placeholder="Rua" {...register("endRua")} />
              <span className="errorSpan">{errors.endRua?.message}</span>
            </div>
            <div className="passwordContainer2">
              <input placeholder="Número" {...register("endNumero")} />
              <span className="errorSpan">{errors.endNumero?.message}</span>
            </div>
          </div>
          <div className="passwordContainer">
            <div className="passwordContainer2">
              <input
                placeholder="Complemento"
                {...register("endComplemento")}
              />
            </div>
            <div className="passwordContainer2">
              <input placeholder="Cidade" {...register("endCidade")} />
              <span className="errorSpan">{errors.endCidade?.message}</span>
            </div>
          </div>
          <div className="passwordContainer">
            <div className="passwordContainer2">
              <input placeholder="Estado" {...register("endEstado")} />
              <span className="errorSpan">{errors.endEstado?.message}</span>
            </div>
            <div className="passwordContainer2">
              <select {...register("horarioRetirada")}>
                <option>Horário de Retirada</option>
                <option value="8as12">das 08h às 12h</option>
                <option value="12as18">das 12h às 18h</option>
                <option value="8as18">das 08h às 18h</option>
              </select>
              <span className="errorSpan">
                {errors.horarioRetirada?.message}
              </span>
            </div>
          </div>
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
            É consumidor?{" "}
            <Link to="/consumer/register" className="ctaLink">
              Clique aqui
            </Link>{" "}
            para se cadastrar!
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

export default RegisterSeller;
