import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { useNavigate } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { paperBorder } from "../../ui/a11y";

function Flashcards() {
  const navigate = useNavigate();
  const { flashcardLevel, setFlashcardLevel } =
    React.useContext(GlobalContext)!;

  const selectLevel = (event: SelectChangeEvent) => {
    // sessionStorage.setItem("kanjiLevel", event.target.value);
    setFlashcardLevel(event.target.value);
    sessionStorage.removeItem("flashcardIndex");
  };

  const flashcardLevels = [
    "JLPT 5",
    "JLPT 4",
    "JLPT 3",
    "JLPT 2",
    "JLPT 1",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 8",
    "Jouyou",
    "Jinmeiyou",
    "Kyouiku",
    "Heisig",
  ];

  const flashcardButtonDetails = [
    {
      destination: "/flashcards/study",
      title: "Study",
      description:
        "Learn kanji of any level using simple, easy-to-understand flashcards!",
      specialSx: { mt: 5 },
    },
    {
      destination: "/flashcards/quiz",
      title: "Quiz",
      description: "Test your kanji memorization and usage skills!",
      specialSx: { mt: 1 },
    },
  ];


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        overflowY: "auto",
      }}
    >
      <Box sx={{ mt: 3 }}>
        <InputLabel sx={{ color: (theme) => theme.palette.text.primary }}>
          Kanji Level
        </InputLabel>
        <Select
          value={flashcardLevel}
          onChange={selectLevel}
          sx={{ width: "80%", mt: 7 }}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  maxHeight: "25em", // makes it scrollable
                  borderBottomRightRadius: "1em",
                  borderBottomLeftRadius: "1em",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  bgcolor: (theme) => theme.palette.background.paper
                },
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
        >
          {flashcardLevels.map((level, i) => (
            <MenuItem key={i} value={level} sx={{ justifyContent: "center" }}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {flashcardButtonDetails.map((details, i) => (
        <Paper
          key={i}
          component={ButtonBase}
          elevation={0}
          sx={{
            display: "flex",
            borderRadius: "1em",
            height: "12em",
            width: "80%",
            alignSelf: "center",
            flexDirection: "column",
            gap: 1,
            border: (theme) =>
              theme.palette.mode == "dark"
                ? `0.15em solid #8C8C8C`
                : `0.15em solid #8C8C8C`,
            ...details.specialSx,
          }}
          onClick={() => navigate(details.destination)}
        >
          <Typography variant="h4">{details.title}</Typography>
          <Typography
            sx={{
              width: "80%",
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            {details.description}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default Flashcards;
