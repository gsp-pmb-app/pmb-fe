import { useState } from "react";
import Input from "../components/Input";
import { Button } from "@headlessui/react";
import LoadingSpinner from "../components/Spinner";
import StatusView from "../components/pendaftar/StatusView";
import {
  checkKelulusan,
  selectCheckKelulusan,
  selectCheckKelulusanLoading,
} from "../stores/features/public";
import { useAppDispatch, useAppSelector } from "../stores";

export const CheckStatus = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectCheckKelulusan);
  const loading = useAppSelector(selectCheckKelulusanLoading);

  const [isSearch, setIsSearch] = useState(false);

  const [form, setForm] = useState({
    nomor_pendaftaran: "",
    tanggal_lahir: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nomor_pendaftaran: form.nomor_pendaftaran,
      tanggal_lahir: form.tanggal_lahir,
    };

    try {
      await dispatch(checkKelulusan(payload)).unwrap();
      setIsSearch(true);
    } catch (err: any) {
      console.error(err);
    }
  };

  const disableButton =
    !form.nomor_pendaftaran || !form.tanggal_lahir || loading;

  const handleSearchAgain = () => {
    setIsSearch(false);
    setForm({ nomor_pendaftaran: "", tanggal_lahir: "" });
  };

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-6">
      {!isSearch ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4"
        >
          <Input
            id="nomor_pendaftaran"
            label="Nomor Pendaftaran"
            name="nomor_pendaftaran"
            type="text"
            placeholder="PMB20260001"
            value={form.nomor_pendaftaran}
            onChange={handleChange}
          />

          <Input
            id="tanggal_lahir"
            label="Tanggal Lahir"
            name="tanggal_lahir"
            type="date"
            value={form.tanggal_lahir}
            onChange={handleChange}
          />

          <Button
            disabled={disableButton}
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? <LoadingSpinner /> : "Cek Status"}
          </Button>
        </form>
      ) : (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">
          <StatusView
            nomor_pendaftaran={data?.nomor_pendaftaran!}
            nama={data?.nama!}
            tanggal_lahir={data?.tanggal_lahir!}
            status={data?.status!}
            prodi={data?.prodi!}
            jenjang={data?.jenjang!}
          />

          <Button
            onClick={handleSearchAgain}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 flex justify-center items-center"
          >
            Cari data lain
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckStatus;
