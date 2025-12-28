import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const StyledLoading = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "auto",
    height: "25px",
  },
}));

const MatxLoading = () => {
  return (
    <StyledLoading>
      <Box position="relative">
        <CircularProgress size={24} />
      </Box>
    </StyledLoading>
  );
};

export default MatxLoading;
