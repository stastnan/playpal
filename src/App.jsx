import { useState } from "react";
import AppRouter from "src/utils/AppRouter";

function App() {
  const [isGameInfoPage, setIsGameInfoPage] = useState(false);

  return (
    <AppRouter
      setIsGameInfoPage={setIsGameInfoPage}
      isGameInfoPage={isGameInfoPage}
    />
  );
}
export default App;
