import { ThemeProvider } from "@/shared";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import router from "./router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster position="top-center" reverseOrder={false} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
