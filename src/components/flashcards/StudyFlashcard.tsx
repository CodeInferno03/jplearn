import * as React from "react";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { GlobalContext } from "../../contexts/GlobalContextProvider";

function StudyFlashcard({ data }) {
  // const [studyCardFlipped, setStudyCardFlipped] = React.useState<boolean>(false);
  const { studyCardFlipped, setStudyCardFlipped } = React.useContext(GlobalContext)!

  const kanjiPaperSx = {
    borderRadius: "30px",
    position: "absolute",
    width: "100%",
    height: "120%",
    backfaceVisibility: "hidden",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    pl: 2,
    pr: 2,
    gap: 5,
    textAlign: "center",
  };

  // const data = {
  //   freq_mainichi_shinbun: 24,
  //   grade: 2,
  //   heisig_en: "part",
  //   jlpt: null,
  //   kanji: "分",
  //   kun_readings: ["わ.かつ", "わ.かる", "わ.かれる", "わ.け", "わ.ける"],
  //   meanings: [
  //     "1%",
  //     "chances",
  //     "degree",
  //     "duty",
  //     "know",
  //     "minute of time",
  //     "one's lot",
  //     "part",
  //     "rate",
  //     "segment",
  //     "shaku/100",
  //     "share",
  //     "understand",
  //   ],
  //   name_readings: ["いた", "わけ"],
  //   notes: [],
  //   on_readings: ["フン", "ブ", "ブン"],
  //   stroke_count: 4,
  //   unicode: "5206",
  // };

  // console.log(`data: ${JSON.stringify(data)}`)

  // removes the '.' and replaces it with parentheses
  const formatKunyomi = (text: string): string => {
    const index = text.indexOf(".");

    if (index === -1) return text;

    return `(${text.slice(0, index)})${text.slice(index + 1)}`;
  };

  return (
    <Box
      sx={{
        perspective: "500rem",
        mt: 3,
        // bgcolor: 'red',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        onClick={() => setStudyCardFlipped((prev) => !prev)}
        sx={{
          // position: "relative",
          width: "80%",
          height: "25em",
          transformStyle: "preserve-3d",
          transition: "transform 1s",
          transform: studyCardFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
          cursor: "pointer",
          mt: 5,
        }}
      >
        {/* FRONT */}
        <Paper
          elevation={0}
          component={ButtonBase}
          sx={{
            ...kanjiPaperSx,
          }}
        >
          <Typography sx={{ fontSize: "9rem", fontWeight: "bold" }}>
            {data.kanji}
          </Typography>
          <Typography sx={{ fontSize: "1.25rem" }}>
            {data.meanings.join(", ")}
          </Typography>
        </Paper>

        {/* BACK */}
        <Paper
          elevation={0}
          component={ButtonBase}
          sx={{
            ...kanjiPaperSx,
            transform: "rotateY(180deg)",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
              Kunyomi
            </Typography>
            <Typography sx={{ fontSize: "1.5rem" }}>
              {data.kun_readings.length ? data.kun_readings
                .map((reading) => formatKunyomi(reading))
                .join("、") : "No Kunyomi for this kanji!"}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
              Onyomi
            </Typography>
            <Typography sx={{ fontSize: "1.5rem" }}>
              {data.on_readings.length ? data.on_readings.join("、") : "No Onyomi for this kanji!"}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default StudyFlashcard;
