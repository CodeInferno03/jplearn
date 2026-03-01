import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useNavigate } from "react-router-dom";

function NavigateCardButton({ onNext, finish }) {
  const { studyCardFlipped } = React.useContext(GlobalContext)!;
  const [hasBeenFlipped, setHasBeenFlipped] = React.useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (studyCardFlipped) {
      setHasBeenFlipped(true);
    }
  }, [studyCardFlipped]);

  const nextAction = () => {
    if (finish) {
      sessionStorage.removeItem("flashcardIndex")
      navigate("/flashcards");
    } else {
      setHasBeenFlipped(false);
      onNext();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 3,
      }}
    >
      <Button
        disabled={!hasBeenFlipped}
        variant="contained"
        onClick={nextAction}
        sx={{
          width: "80%",
          display: "flex",
          borderRadius: "7.5px",
          bgcolor: "#0faada",
          fontWeight: "bold",
        }}
      >
        {finish ? "Finish" : "Next Card"}
      </Button>
    </Box>
  );
}

export default NavigateCardButton;
