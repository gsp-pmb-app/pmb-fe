import { useState } from "react";
import Input from "../../components/Input";

export const RegisterPendaftar = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // TODO: call API login pendaftar
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
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

          <Input
            id="no_tele"
            label="No Telegram"
            name="no_tele"
            type="text"
            placeholder="Masukkan no telegram"
            value={form.no_tele}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPendaftar;
