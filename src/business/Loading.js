import { Typography, CircularProgress, styled } from "@mui/material";

const Loading = ({ message }) => {
  const LoadingContainer = styled("div")({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });
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
