import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../Providers/userProvider";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";

function EditConsumerForm () {

    const { user } = useContext(UserContext)

    const idUser = localStorage.getItem('id')
    const token = localStorage.getItem('token')

    const formSchema = yup.object().shape({
        name: yup
            .string()
            .required('Nome obrigatório')
            .matches('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$', 'Digite letras somente'),
        email: yup
            .string()
            .required('E-mail obrigatório!')
            .email('E-mail inválido!'),
        cpf: yup
            .string()
            .required('CPF obrigatório!')
            .matches("^([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})$", 'Digite um CPF válido!'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema)
    })


    const onSubmit = (data) => {
        console.log(data)
        axios.patch(`https://ecomarketapi.herokuapp.com/users/${idUser}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    return (
        <form className="editSellerForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="formTitle">Editar Informações</div>

      <div className="formGroup">
        <label className="editFormLabel">
          Nome
        </label>
        <input 
          className="editFormInput"
          id="name"
          type="text"
          placeholder="Nome"
          defaultValue={user.name}
          {...register('name')}
        />
        {errors.name && <span className='errorSpan'>{errors.name?.message}</span>}
      </div>

      <div className="formGroup">
        <label className="editFormLabel">
          E-mail
        </label>
        <input
          className="editFormInput"
          id="email"
          type="email"
          placeholder="E-mail"
          defaultValue={user.email}
          {...register('email')}
        />
        {errors.email && <span className='errorSpan'>{errors.email?.message}</span>}
      </div>

      <div className="formGroup">
        <label className="editFormLabel">
          CPF
        </label>
        <input
          className="editFormInput"
          id="cpf"
          type="number"
          placeholder="CPF"
          defaultValue={user.cpf}
          {...register('cpf')}
        />
        {errors.cpf && <span className='errorSpan'>{errors.cpf?.message}</span>}
      </div>

      <button className="saveEditBtn">Salvar</button>
    </form>
    )

}

export default EditConsumerForm