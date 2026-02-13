import React from "react";
import type { StatusPendaftar } from "../../stores";

interface StatusKelulusanProps {
  nomor_pendaftaran: string;
  nama: string;
  tanggal_lahir: string;
  status: StatusPendaftar;
  prodi?: string;
  jenjang?: string;
}

const StatusView: React.FC<StatusKelulusanProps> = ({
  nomor_pendaftaran,
  nama,
  tanggal_lahir,
  status,
  prodi,
  jenjang,
}) => {
  const isLulus = status === "lulus";
  const isVerified = status === "lulus" || status === "tidak_lulus";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-center text-xl font-semibold">
        PENGUMUMAN KELULUSAN PMB 2026
      </h2>

      <div className="flex flex-col gap-6 p-8 rounded-lg shadow-sm bg-white">
        {isVerified ? (
          <>
            {" "}
            <div className="grid grid-cols-[160px_10px_1fr] gap-y-2 text-sm">
              <p>Nomor Peserta</p>
              <p>:</p>
              <p>{nomor_pendaftaran}</p>

              <p>Nama</p>
              <p>:</p>
              <p>{nama}</p>

              <p>Tanggal Lahir</p>
              <p>:</p>
              <p>{tanggal_lahir}</p>
            </div>
            <div className="text-center space-y-2">
              {isLulus ? (
                <>
                  <p className="text-green-600 font-semibold text-lg">
                    Selamat atas keberhasilan Anda!
                  </p>
                  <p>
                    Anda dinyatakan <span className="font-bold">LULUS</span>{" "}
                    pada seleksi PMB 2026 pada program studi:
                  </p>
                  <p className="font-bold uppercase">
                    {prodi}, Jenjang {jenjang}, Universitas Gemilang Sapta
                    Perdana
                  </p>
                </>
              ) : (
                <>
                  <p className="text-red-600 font-semibold text-lg">
                    Terima kasih atas partisipasi Anda.
                  </p>
                  <p>
                    Anda dinyatakan{" "}
                    <span className="font-bold">TIDAK LULUS</span> pada seleksi
                    PMB 2026.
                  </p>
                </>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 text-sm">
            Hasil kelulusan ujian belum dapat dilihat.
          </p>
        )}
      </div>
    </div>
  );
};

export default StatusView;
