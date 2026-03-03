import * as React from "react";
import { getTheme } from "../ui/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

type ThemeMode = "light" | "dark";

interface GlobalContextInterface {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  flashcardLevel: string;
  setFlashcardLevel: React.Dispatch<React.SetStateAction<string>>;
  KANJI_API: string;
  kanjiArr: Array<string | undefined>;
  setKanjiArr: React.Dispatch<React.SetStateAction<Array<string | undefined>>>;
  studyCardFlipped: boolean;
  setStudyCardFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContext = React.createContext<
  GlobalContextInterface | undefined
>(undefined);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const getSystemTheme = (): ThemeMode =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const storedTheme = localStorage.getItem("theme");

  // Roundabout way of assigning type `"light" | "dark"` to this to prevent issues with
  // theme.ts
  const presetTheme: ThemeMode =
    storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : getSystemTheme();
  // const [theme, setTheme] = React.useState<"light" | "dark">(presetTheme);
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");
  const visualTheme = React.useMemo(() => getTheme(theme), [theme]);

  const [flashcardLevel, setFlashcardLevel] = React.useState<string>(
    sessionStorage.getItem("kanjiLevel") ?? "JLPT 5",
  );
  const KANJI_API = "https://kanjiapi.dev/v1";
  const [kanjiArr, setKanjiArr] = React.useState<Array<string | undefined>>([]);

  const [studyCardFlipped, setStudyCardFlipped] =
    React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        setTheme,
        flashcardLevel,
        setFlashcardLevel,
        KANJI_API,
        kanjiArr,
        setKanjiArr,
        studyCardFlipped,
        setStudyCardFlipped,
        loading,
        setLoading,
      }}
    >
      <ThemeProvider theme={visualTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};
