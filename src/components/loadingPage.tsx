import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Loading = ({ show }: { show: boolean }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
