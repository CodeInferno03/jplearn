import * as React from "react";
import Navbar from "../../components/global/Navbar";
import { useSearchParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { formatLevel, reformatLevel } from "../../utils/formatLevel";
// import ReturnButton from "../../components/flashcards/ReturnButton";
import StudyFlashcard from "../../components/flashcards/StudyFlashcard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import NavigateCardButton from "../../components/flashcards/NavigateCardButton";
import axios from "axios";
import { areEqual, shuffleArray } from "../../utils/arrayUtils";
import Topbar from "../../components/global/Topbar";
import ProgressBar from "../../components/flashcards/ProgressBar";

function MobileStudyPage() {
  const {
    flashcardLevel,
    setFlashcardLevel,
    KANJI_API,
    kanjiArr,
    setKanjiArr,
    studyCardFlipped,
    setStudyCardFlipped,
    setLoading,
    loading,
  } = React.useContext(GlobalContext)!;
  const [searchParams, setSearchParams] = useSearchParams();

  // displaying flash cards
  const savedIndex = sessionStorage.getItem("flashcardIndex");
  const [currentIndex, setCurrentIndex] = React.useState<number>(
    Number(savedIndex!) ?? 0,
  );
  const [currentKanjiData, setCurrentKanjiData] = React.useState<any>(null);
  const [showBlankCard, setShowBlankCard] = React.useState<boolean>(false);

  React.useEffect(() => {
    setStudyCardFlipped(false);
    const levelFromUrl = searchParams.get("level");
    const existingLevel = sessionStorage.getItem("level");

    const resolvedLevel = levelFromUrl
      ? reformatLevel(levelFromUrl)
      : flashcardLevel;

    // Keep URL in sync if missing
    if (!levelFromUrl) {
      setSearchParams({ level: formatLevel(resolvedLevel) });
    }

    setFlashcardLevel(resolvedLevel);

    if (existingLevel !== resolvedLevel || !kanjiArr.length) {
      setLoading(true);
      sessionStorage.setItem("level", resolvedLevel);

      const url = `${KANJI_API}/kanji/${formatLevel(resolvedLevel)}`;
      axios
        .get(url, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          const data = response.data;
          if (!areEqual(kanjiArr, data)) setKanjiArr(shuffleArray(data));
        })
        .catch((err) => console.error(`Error: ${err}`));
    }
  }, [searchParams]);

  // fetch the current card - ONLY ONCE
  React.useEffect(() => {
    if (!kanjiArr.length) return;

    const currentKanji = kanjiArr[currentIndex];
    if (!currentKanji) return;

    axios
      .get(`${KANJI_API}/kanji/${currentKanji}`)
      .then((res) => {
        sessionStorage.setItem("flashcardIndex", `${currentIndex}`);
        setCurrentKanjiData(res.data);
      })
      .catch((err) => console.error(`Error: ${err}`))
      .finally(() => {
        if (loading) setLoading(false);
        setShowBlankCard(false);
      });
  }, [currentIndex, kanjiArr]);

  const handleNextCard = () => {
    setCurrentIndex((prev) => prev + 1);
    setShowBlankCard(true);
    setStudyCardFlipped(false);
  };

  return (
    <>
      <Topbar
        title="Study Flashcards"
        textVariant="h6"
        navDestination="/flashcards"
      />
      {currentKanjiData && (
        <>
          <StudyFlashcard
            data={currentKanjiData}
            showBlankCard={showBlankCard}
          />
          <ProgressBar
            // progress={currentIndex / kanjiArr.length}
            current={currentIndex + 1}
            total={kanjiArr.length}
          />
          <NavigateCardButton
            onNext={handleNextCard}
            finish={currentIndex >= kanjiArr.length - 1}
          />
        </>
      )}
    </>
  );
}

export default MobileStudyPage;
