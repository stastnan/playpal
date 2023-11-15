import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "src/components/ui/Layout";
import Homepage from "src/pages/Homepage";
import Error from "src/pages/Error";
import Search from "src/pages/Search";

function AppRouter() {
  return (
    <ErrorBoundary fallback={<Error isErrorPage />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="*" element={<Error />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default AppRouter;
