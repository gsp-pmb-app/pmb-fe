import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster
        position="bottom-left"
        closeButton
        toastOptions={{
          classNames: {
            error:
              "bg-red-700 backdrop-blur-lg text-white border border-red-700",
            success:
              "bg-green-600 backdrop-blur-lg text-white border border-green-600",
            warning:
              "bg-yellow-600 backdrop-blur-lg text-white border border-yellow-600",
            closeButton: "bg-red-100 backdrop-blur-lg border border-red-100",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
