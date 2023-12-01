import { Typography, CircularProgress } from "@mui/material";
import { LoadingContainer } from "../styles/components";

const Loading = ({ message }) => {
  return (
    <LoadingContainer>
      <Typography variant="h5" gutterBottom>
        {message}
      </Typography>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default Loading;
