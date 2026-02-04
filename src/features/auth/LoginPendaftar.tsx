import { useState } from "react";
import Input from "../../components/Input";

export const LoginPendaftar = () => {
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

export default LoginPendaftar;
