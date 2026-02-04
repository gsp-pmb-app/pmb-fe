import { useState } from "react";
import Input from "../../components/Input";

export const LoginAdmin = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // TODO: call API login admin
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
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

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;
