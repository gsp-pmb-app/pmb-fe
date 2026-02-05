import React from "react";
import { Button } from "@headlessui/react";
import type { Option } from "../SelectList";
import Input from "../Input";
import SelectList from "../SelectList";
import FileUpload from "../FileUpload";

interface ProfileFormProps {
  form: {
    nama_lengkap: string;
    no_tele: string;
    pendidikan_institusi: string;
    pendidikan_jurusan: string;
    tahun_lulus: string;
  };
  jenjang: Option | null;
  prodi: Option | null;
  jadwal: Option | null;
  prodiOptions: Option[];
  jadwalOptions: Option[];
  loading?: boolean;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onJenjangChange: (val: Option | null) => void;
  onProdiChange: (val: Option | null) => void;
  onJadwalChange: (val: Option | null) => void;

  onFotoChange: (file: File) => void;
  onDokumenChange: (file: File) => void;

  onSubmit: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  form,
  jenjang,
  prodi,
  jadwal,
  prodiOptions,
  jadwalOptions,
  loading = false,
  onChange,
  onJenjangChange,
  onProdiChange,
  onJadwalChange,
  onFotoChange,
  onDokumenChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <Input
        id="nama_lengkap"
        label="Nama Lengkap"
        name="nama_lengkap"
        value={form.nama_lengkap}
        disabled
      />

      <Input
        id="no_tele"
        label="No. Telegram"
        name="no_tele"
        value={form.no_tele}
        disabled
      />

      <SelectList
        id="jenjang"
        label="Jenjang Pendidikan"
        value={jenjang}
        onChange={onJenjangChange}
        options={[
          { label: "S1", value: "S1" },
          { label: "S2", value: "S2" },
        ]}
        required
      />

      <Input
        id="jenjang_terakhir"
        label="Jenjang Pendidikan Terakhir"
        value={
          jenjang?.value === "S1" ? "S2" : jenjang?.value === "S2" ? "S3" : ""
        }
        disabled
      />

      <Input
        id="pendidikan_institusi"
        label="Institusi Pendidikan Terakhir"
        name="pendidikan_institusi"
        value={form.pendidikan_institusi}
        onChange={onChange}
      />

      <Input
        id="pendidikan_jurusan"
        label="Jurusan Pendidikan Terakhir"
        name="pendidikan_jurusan"
        value={form.pendidikan_jurusan}
        onChange={onChange}
      />

      <Input
        id="tahun_lulus"
        label="Tahun Lulus"
        name="tahun_lulus"
        type="number"
        value={form.tahun_lulus}
        onChange={onChange}
      />

      <SelectList
        id="prodi"
        label="Program Studi"
        value={prodi}
        onChange={onProdiChange}
        options={prodiOptions}
      />

      <SelectList
        id="jadwal"
        label="Pilih Jadwal Ujian"
        value={jadwal}
        onChange={onJadwalChange}
        options={jadwalOptions}
      />

      <FileUpload
        label="Upload Foto (JPG / JPEG)"
        accept=".jpg,.jpeg"
        onChange={onFotoChange}
      />

      <FileUpload
        label="Upload Dokumen Pendukung (PDF)"
        accept=".pdf"
        onChange={onDokumenChange}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-indigo-600 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Simpan Data"}
      </Button>
    </form>
  );
};

export default ProfileForm;
