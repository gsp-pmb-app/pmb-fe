import { useState } from "react";
import Input from "../../components/Input";
import {
  useAppDispatch,
  loginAdmin,
  useAppSelector,
  selectAuthLoading,
} from "../../stores";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";
import LoadingSpinner from "../../components/Spinner";

export const LoginAdmin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginAdmin(form)).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const disableButton = !form.username || !form.password || loading;

  return (
    <div className="w-full max-w-md flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login Admin / Staff
        </h2>

        <div className="space-y-4">
          <Input
            id="username"
            label="Username"
            name="username"
            type="text"
            placeholder="Masukkan username"
            value={form.username}
            onChange={handleChange}
          />

          <Input
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Masukkan password"
            value={form.password}
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
            <Link to="/register" className="text-indigo-600 hover:underline">
              Daftar
            </Link>
          </p>
          <Link
            to="/auth/login"
            className="text-sm text-indigo-600 hover:underline"
          >
            Login User / Pendaftar
          </Link>
        </div>

        <div className="mt-4 text-center flex flex-col gap-1">
          <p className="text-sm text-gray-500">
            Login Admin - username: admin, password: admin
          </p>
          <p className="text-sm text-gray-500">
            Login Staff - username: staff, password: staff
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginAdmin;
