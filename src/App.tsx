import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="bottom-left" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;
