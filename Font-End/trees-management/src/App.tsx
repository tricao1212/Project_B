import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { router } from "./config/routePath";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Loading from "./components/Loading";

const queryClient = new QueryClient()
const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <RouterProvider router={router} />
            <ToastContainer />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
