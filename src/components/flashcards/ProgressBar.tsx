import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function ProgressBar({ progress }) {
  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        mt: 13,
        px: 5,
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress * 100}
        sx={{
          height: 15,
          borderRadius: 7.5,
          bgcolor: "#525252",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#0faada", // completed portion color
            borderRadius: 7.5,
          },
        }}
      />
    </Box>
  );
}

export default ProgressBar;
