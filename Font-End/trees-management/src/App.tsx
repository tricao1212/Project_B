import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { router } from "./config/routePath";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </>
  );
};

export default App;
