import { useState } from "react";
import AppRouter from "src/utils/AppRouter";
import { ToastContainer } from "react-toastify";

// Import react toastify styles
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isGameInfoPage, setIsGameInfoPage] = useState(false);

  return (
    <>
      <AppRouter
        setIsGameInfoPage={setIsGameInfoPage}
        isGameInfoPage={isGameInfoPage}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
export default App;
