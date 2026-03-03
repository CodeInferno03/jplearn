import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";

function Loader() {
  const { loading } = React.useContext(GlobalContext)!;

  return (
    <Backdrop
      open={loading}
      sx={(theme) => ({
        zIndex: theme.zIndex.appBar - 1, // below AppBar
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(0,0,0,0.2)", // optional subtle dim
      })}
    >
      <CircularProgress sx={{ color: "#525252" }} />
    </Backdrop>
  );
}

export default Loader;
