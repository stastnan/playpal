import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "src/components/ui/Layout";
import Homepage from "src/pages/Homepage";
import Error from "src/pages/Error";
import Search from "src/pages/Search";
import GamePage from "src/pages/GamePage";

function AppRouter({ setIsGameInfoPage, isGameInfoPage }) {
  return (
    <ErrorBoundary fallback={<Error isErrorPage />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Homepage
                isGameInfoPage={isGameInfoPage}
                setIsGameInfoPage={setIsGameInfoPage}
              />
            }
          />
          <Route path="*" element={<Error />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/games/:gameId"
            element={
              <GamePage
                setIsGameInfoPage={setIsGameInfoPage}
                isGameInfoPage={isGameInfoPage}
              />
            }
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default AppRouter;
