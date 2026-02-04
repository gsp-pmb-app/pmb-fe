import { useState } from "react";
import Input from "../../components/Input";
import {
  useAppDispatch,
  registerPendaftar,
  useAppSelector,
  selectAuthLoading,
} from "../../stores";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";
import LoadingSpinner from "../../components/Spinner";

export const RegisterPendaftar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);

  const [form, setForm] = useState({
    nama_lengkap: "",
    no_tele: "",
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
      const result = await dispatch(registerPendaftar(form)).unwrap();

      navigate("/auth/register-sukses", {
        state: {
          telegram_url: result.telegram_url,
        },
      });
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  const disableButton = !form.nama_lengkap || !form.no_tele || loading;
  return (
    <div className="w-full max-w-md flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Register User
        </h2>

        <div className="space-y-4">
          <Input
            id="nama_lengkap"
            label="Nama Lengkap"
            name="nama_lengkap"
            type="text"
            placeholder="Masukkan nama lengkap"
            value={form.nama_lengkap}
            onChange={handleChange}
          />

          <div className="flex flex-col gap-2">
            <Input
              id="no_tele"
              label="No. Telegram"
              name="no_tele"
              type="text"
              placeholder="Masukkan no telegram"
              value={form.no_tele}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500">
              Masukkan nomor telegram yang aktif. format: 08123456789
            </p>
          </div>
        </div>

        <Button
          disabled={disableButton}
          type="submit"
          className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 flex justify-center items-center"
        >
          {loading ? <LoadingSpinner /> : "Daftar"}
        </Button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Sudah punya akun?{" "}
            <Link to="/auth/login" className="text-indigo-600 hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPendaftar;
