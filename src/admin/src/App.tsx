import { RootRouter } from "./routes/RootRouter";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "styles/index.scss";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        rtl={false}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RootRouter />
    </>
  );
}

export default App;
