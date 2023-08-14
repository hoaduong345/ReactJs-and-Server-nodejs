import { ToastContainer } from "react-toastify";
import useRouterElement from "./hooks/useRouterElement";
// import Product from "./pages/home/Product";
function App() {
  const routerElement = useRouterElement();
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      >
      
      </ToastContainer>
      <div>{routerElement}</div>
      
    </>
  );
}

export default App;
