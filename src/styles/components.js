import { FormControl, TableCell, styled } from "@mui/material";

const FormContainer = styled(FormControl)({
  width: "100%",
});

const TableCellHead = styled(TableCell)({
  fontWeight: "bold",
});

const LoadingContainer = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export {
    FormContainer,
    TableCellHead,
    LoadingContainer
}
