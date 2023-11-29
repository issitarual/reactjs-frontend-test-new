import { useDispatch, useSelector } from "react-redux";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";
import Loading from "./Loading";

import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  AppBar,
  styled
} from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.home);

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

  const TableCellHead = styled(TableCell)({
    fontWeight: 'bold'
  });

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
        <TableHead>
          <TableRow>
            <TableCellHead>Nome</TableCellHead>
            <TableCellHead>Cidade/UF</TableCellHead>
            <TableCellHead>Idade</TableCellHead>
            <TableCellHead>Ações</TableCellHead>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortByBirthDate(data).map((u) => {
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
                  <DeleteOutline />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
    </>
  );
};

export default HomePage;
