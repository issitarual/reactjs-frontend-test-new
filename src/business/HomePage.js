import { useDispatch, useSelector } from "react-redux";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";
import Loading from "../components/Loading";

import {
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  AppBar,
  Table,
} from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { TableCellHead } from "../styles/components";
import { actions } from "../reducers/user.actions";
import { useState } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.home);
  const [initialData, setInicialData] = useState([]);

  const calculate_age = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const sortByBirthDate = (users) => {
    return users.sort(function (a, b) {
      return a.dataNascimento.getTime() - b.dataNascimento.getTime();
    });
  };

  const handleDelete = ({ id }) => {
    dispatch(actions.deleteUser.request({ id }));
    // Remove with API
    let removeUser;
    if (initialData.length) {
      removeUser = initialData.filter((u) => u.id !== id);
    } else {
      removeUser = data.filter((u) => u.id !== id);
    }

    setInicialData(removeUser);
  };

  if (loading) {
    return <Loading message={"Carregando usuários"} />;
  }

  return (
    <>
      <AppBar position="static">
        <Typography variant="h2" component="h2" align="center">
          Usuários
        </Typography>
      </AppBar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 390 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCellHead>Nome</TableCellHead>
              <TableCellHead>Cidade/UF</TableCellHead>
              <TableCellHead>Idade</TableCellHead>
              <TableCellHead>Ações</TableCellHead>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortByBirthDate(initialData.length ? initialData : data).map(
              (u) => {
                return (
                  <TableRow key={u.id}>
                    <TableCell>{u.nome}</TableCell>
                    <TableCell>
                      {u.cidade}/{u.uf}
                    </TableCell>
                    <TableCell>{calculate_age(u.dataNascimento)}</TableCell>
                    <TableCell>
                      <Edit
                        onClick={() =>
                          dispatch(
                            routeActions.redirectTo(routes.USER, { id: u.id })
                          )
                        }
                      />
                      <DeleteOutline
                        onClick={() => handleDelete({ id: u.id })}
                      />
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HomePage;
