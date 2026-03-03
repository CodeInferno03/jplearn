import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

function ProgressBar({ current, total }) {
  const progress = (current / total) * 100;
  
  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        mt: 4,
        px: 5,
      }}
    >
       <Box sx={{ position: "relative" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 15,
            borderRadius: 7.5,
            bgcolor: "#525252",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#0faada",
              borderRadius: 7.5,
            },
          }}
        />

        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontWeight: "bold",
            fontSize: 12,
          }}
        >
          {current} / {total}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProgressBar;
