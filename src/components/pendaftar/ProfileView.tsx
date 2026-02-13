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
  };
  isStaff?: boolean;
}

const Item = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const ProfileView: React.FC<ProfileViewProps> = ({ profile, isStaff }) => {
  return (
    <div className="space-y-6">
      <div className="h-24 w-24 overflow-hidden rounded-full border">
        <img
          src={profile.foto_path || "/default-avatar.jpg"}
          alt="Foto Profil"
          onError={(e) => {
            e.currentTarget.src = "/default-avatar.jpg";
          }}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold">
          {" "}
          {isStaff ? "Data pendaftar" : "Data diri"}
        </h2>
        <p className="text-sm text-gray-500">
          {isStaff
            ? "Silakan lakukan pemeriksaan data pendaftar secara menyeluruh sebelum proses verifikasi."
            : "Data telah dikunci dan sedang diverifikasi oleh prodi."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <Item label="Nama Lengkap" value={profile.nama_lengkap} />
        <Item label="Tanggal Lahir" value={profile.tanggal_lahir || "-"} />
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
