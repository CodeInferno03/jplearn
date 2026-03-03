import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileHomepage from "../pages/mobile/MobileHomepage";
import MobileDictionaryPage from "../pages/mobile/MobileDictionaryPage";
import MobileStudyPage from "../pages/mobile/MobileStudyPage";
import MobileQuizPage from "../pages/mobile/MobileQuizPage";
import MobileFlashcardsPage from "../pages/mobile/MobileFlashcardsPage";
import ThemeButton from "../components/global/ThemeButton";
import Topbar from "../components/global/Topbar";
import Loader from "../components/global/Loader";

function MobileRoutes() {
  return (
    <>
      {/* <ThemeButton /> */}
      {/* <Topbar title={"Flashcards"}/> */}
      <Loader />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="" element={<MobileHomepage />} />
          <Route path="/dictionary" element={<MobileDictionaryPage />} />
          <Route path="/flashcards" element={<MobileFlashcardsPage />} />
          <Route path="/flashcards/study" element={<MobileStudyPage />} />
          <Route path="/flashcards/quiz" element={<MobileQuizPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default MobileRoutes;
