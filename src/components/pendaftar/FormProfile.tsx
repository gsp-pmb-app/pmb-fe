import React from "react";
import { Button } from "@headlessui/react";
import type { Option } from "../SelectList";
import Input from "../Input";
import SelectList from "../SelectList";
import FileUpload from "../FileUpload";
import LoadingSpinner from "../Spinner";

interface ProfileFormProps {
  form: {
    nama_lengkap: string;
    no_tele: string;
    pendidikan_institusi: string;
    pendidikan_jurusan: string;
    tahun_lulus: string;
    tanggal_lahir: string;
  };
  jenjang: Option | null;
  prodi: Option | null;
  jadwal: Option | null;
  prodiOptions: Option[];
  jadwalOptions: Option[];
  loading?: boolean;
  isFormValid: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onJenjangChange: (val: Option | null) => void;
  onProdiChange: (val: Option | null) => void;
  onJadwalChange: (val: Option | null) => void;
  onFotoChange: (file: File | null) => void;
  onDokumenChange: (file: File | null) => void;
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
  isFormValid,
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
      className="space-y-5"
    >
      {/* DATA PRIBADI */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Data Pribadi</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <Input
            id="tanggal_lahir"
            label="Tanggal Lahir"
            name="tanggal_lahir"
            type="date"
            value={form.tanggal_lahir}
            onChange={onChange}
          />

          <SelectList
            id="jenjang"
            label="Jenjang Pendidikan"
            value={jenjang!}
            onChange={onJenjangChange}
            options={[
              { label: "S2", value: "S2" },
              { label: "S3", value: "S3" },
            ]}
            required
          />
        </div>

        <Input
          id="jenjang_terakhir"
          label="Jenjang Pendidikan Terakhir"
          value={
            jenjang?.value === "S2" ? "S1" : jenjang?.value === "S3" ? "S2" : ""
          }
          disabled
        />
      </div>

      {/* PENDIDIKAN */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Riwayat Pendidikan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* AKADEMIK */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Informasi Akademik
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectList
            id="prodi"
            label="Program Studi"
            value={prodi!}
            onChange={onProdiChange}
            options={prodiOptions}
          />

          <SelectList
            id="jadwal"
            label="Pilih Jadwal Ujian"
            value={jadwal!}
            onChange={onJadwalChange}
            options={jadwalOptions}
          />
        </div>
      </div>

      {/* DOKUMEN */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Dokumen</h2>

        <FileUpload
          id="foto"
          label="Upload Foto (JPG / JPEG); Max 2MB"
          accept=".jpg,.jpeg"
          onChange={onFotoChange}
        />

        <div>
          <FileUpload
            id="dokumen"
            label="Upload Dokumen Pendukung (PDF); Max 2MB"
            accept=".pdf"
            onChange={onDokumenChange}
          />

          <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-relaxed">
            Silakan unggah seluruh dokumen persyaratan pendaftaran dengan cara
            menggabungkan seluruh persyaratan ke dalam satu (1) file PDF.
            Pastikan dokumen tersusun rapi, jelas terbaca, dan tidak melebihi
            batas ukuran.
          </p>
        </div>
      </div>

      {/* BUTTON */}
      <Button
        type="submit"
        disabled={!isFormValid || loading}
        className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 flex justify-center items-center transition"
      >
        {loading ? <LoadingSpinner /> : "Simpan Data"}
      </Button>
    </form>
  );
};

export default ProfileForm;
