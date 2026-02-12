import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "sonner";
import { getJadwal, getProfile, useAppDispatch } from "./stores";
import { useEffect } from "react";
import { getAccessToken, getRole } from "./utils/auth";

function App() {
  const dispatch = useAppDispatch();
  const token = getAccessToken();
  const role = getRole();

  useEffect(() => {
    if (token && role === "pendaftar") {
      dispatch(getProfile());
      dispatch(getJadwal());
    }
  }, [token, role, dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="bottom-left" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;
