import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { actions } from "../reducers/user.actions";
import { ControlledTextField } from "../components/inputs";
import Loading from "../components/Loading";
import { Button, Typography, AppBar } from "@mui/material";
import { FormContainer } from "../styles/components";

const UserPage = () => {
  const dispatch = useDispatch();
  const { loading, data, id } = useSelector((state) => state.user);
  console.log(data)
  const rules = {};
  const initialValues = {
    nome: "",
    dataNascimento: "",
    cep: "",
    cidade: "",
    uf: "",
    ...data,
  };
  const formProps = {
    ...useForm(),
    rules,
    initialValues,
  };
  const handleSubmit = (values) => {
    dispatch(actions.saveUser.request(values));
  };

  const getCepData = async (cep) => {
    if (cep.lenght !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: "GET",
      });
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <Loading message={"Carregando usuário"} />;
  }

  return (
    <>
      <AppBar position="static">
        <Typography variant="h2" component="h2" align="center">
          Usuário #{id}
        </Typography>
      </AppBar>

      <FormContainer onSubmit={formProps.handleSubmit(handleSubmit)} >
        <ControlledTextField label="Nome" name={"nome"} formProps={formProps} value={data.nome}/>
        <ControlledTextField label="Cep" name={"cep"} formProps={formProps} />
        <ControlledTextField
          label="Cidade"
          name={"cidade"}
          formProps={formProps}
        />
        <ControlledTextField label="UF" name={"uf"} formProps={formProps} />
        <Button type={"submit"} onClick={formProps.handleSubmit(handleSubmit)}>GRAVAR</Button>
      </FormContainer>
    </>
  );
};

export default UserPage;
