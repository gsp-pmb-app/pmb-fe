import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores";
import { inputNilai } from "../../stores";
import Input from "../../components/Input";
import FileUpload from "../../components/FileUpload";
import { Button } from "@headlessui/react";
import LoadingSpinner from "../../components/Spinner";

export const Nilai = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.private.staff.isLoading);

  const [form, setForm] = useState({
    nomor_pendaftaran: "",
    nilai: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid =
    form.nomor_pendaftaran.trim() !== "" && form.nilai.trim() !== "";

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("nomor_pendaftaran", form.nomor_pendaftaran);
      formData.append("nilai", form.nilai);

      if (file) {
        formData.append("file", file);
      }

      await dispatch(inputNilai(formData)).unwrap();

      // reset
      setForm({
        nomor_pendaftaran: "",
        nilai: "",
      });
      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6 rounded-lg bg-white p-6 shadow">
      <div>
        <h2 className="text-lg font-semibold">Input Nilai Ujian</h2>
        <p className="text-sm text-gray-500">
          Masukkan nomor pendaftaran dan unggah file nilai ujian.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          id="nomor_pendaftaran"
          label="Nomor Pendaftaran"
          name="nomor_pendaftaran"
          value={form.nomor_pendaftaran}
          onChange={handleChange}
          placeholder="Contoh: PMB002028455"
          required
        />

        <Input
          id="nilai"
          label="Nilai"
          name="nilai"
          type="number"
          value={form.nilai}
          onChange={handleChange}
          placeholder="Contoh: 85"
          required
        />

        <FileUpload
          id="file_nilai"
          label="Upload File Nilai (PDF)"
          accept=".pdf"
          onChange={(f) => setFile(f)}
        />

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          className="w-full rounded-md bg-indigo-600 py-2 text-white disabled:opacity-50 flex justify-center items-center"
        >
          {loading ? <LoadingSpinner /> : "Simpan Nilai"}
        </Button>
      </div>
    </div>
  );
};

export default Nilai;
