import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const BlurredBackground = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(10px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
});

const CircularProgressBar = () => {
  return (
    <BlurredBackground>
      <CircularProgress />
    </BlurredBackground>
  );
};

export default CircularProgressBar;
