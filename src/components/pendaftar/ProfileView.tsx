import React from "react";

interface ProfileViewProps {
  profile: {
    nama_lengkap: string;
    no_tele: string;
    pendidikan_jenjang: string;
    pendidikan_institusi: string;
    pendidikan_jurusan: string;
    tahun_lulus: string;
    prodi: string;
    jadwal: string;
    foto_path: string;
    tanggal_lahir: string;
    status: string;
  };
  isStaff?: boolean;
}

const Item = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-xs sm:text-sm text-gray-500">{label}</p>
    <p className="text-sm sm:text-base font-medium text-gray-900 break-words">
      {value || "-"}
    </p>
  </div>
);

const ProfileView: React.FC<ProfileViewProps> = ({ profile, isStaff }) => {
  const isNotVerified =
    profile.status === "aktif" || profile.status === "ditolak";

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Avatar + Header */}
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border bg-gray-100 shrink-0">
          <img
            src={profile.foto_path || "/default-avatar.jpg"}
            alt="Foto Profil"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/default-avatar.jpg";
            }}
          />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {isStaff ? "Data Pendaftar" : "Data Diri"}
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            {isStaff
              ? "Silakan lakukan pemeriksaan data pendaftar secara menyeluruh sebelum proses verifikasi."
              : isNotVerified
                ? "Data diri belum terverifikasi. Silakan tunggu proses verifikasi dari pihak prodi."
                : "Data diri telah terverifikasi."}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Data Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <Item label="Nama Lengkap" value={profile.nama_lengkap} />
        <Item label="Tanggal Lahir" value={profile.tanggal_lahir} />
        <Item label="No. Telegram" value={profile.no_tele} />
        <Item label="Jenjang Pilihan" value={profile.pendidikan_jenjang} />
        <Item label="Institusi Terakhir" value={profile.pendidikan_institusi} />
        <Item label="Jurusan Terakhir" value={profile.pendidikan_jurusan} />
        <Item label="Tahun Lulus" value={profile.tahun_lulus} />
        <Item label="Program Studi" value={profile.prodi} />
        <Item label="Jadwal Ujian" value={profile.jadwal} />
      </div>
    </div>
  );
};

export default ProfileView;
