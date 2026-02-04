import { useState } from "react";
import Input from "../../components/Input";
import {
  useAppDispatch,
  loginPendaftar,
  useAppSelector,
  selectAuthLoading,
} from "../../stores";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";
import LoadingSpinner from "../../components/Spinner";

export const LoginPendaftar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);

  const [form, setForm] = useState({
    nomor_pendaftaran: "",
    kode_akses: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginPendaftar(form)).unwrap();
      navigate(result.role ? "/dashboard" : "/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const disableButton = !form.nomor_pendaftaran || !form.kode_akses || loading;

  return (
    <div className="w-full max-w-md flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login User
        </h2>

        <div className="space-y-4">
          <Input
            id="nomor_pendaftaran"
            label="Nomor Pendaftaran"
            name="nomor_pendaftaran"
            type="text"
            placeholder="PMB20250001"
            value={form.nomor_pendaftaran}
            onChange={handleChange}
          />

          <Input
            id="kode_akses"
            label="Kode Akses"
            name="kode_akses"
            type="password"
            placeholder="Masukkan kode akses"
            value={form.kode_akses}
            onChange={handleChange}
          />
        </div>

        <Button
          disabled={disableButton}
          type="submit"
          className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 flex justify-center items-center"
        >
          {loading ? <LoadingSpinner /> : "Login"}
        </Button>

        <div className="mt-4 text-center flex flex-col gap-1">
          <p className="text-sm text-gray-500">
            Belum punya akun?{" "}
            <Link
              to="/auth/register"
              className="text-indigo-600 hover:underline"
            >
              Daftar
            </Link>
          </p>
          <Link
            to="/auth/login-admin"
            className="text-sm text-indigo-600 hover:underline"
          >
            Login Admin / Staff
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPendaftar;
