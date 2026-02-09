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
  };
  kartuUjian?: {
    tanggal: string;
    sesi: string;
    ruangan: string;
  };
}

const Item = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const ProfileView: React.FC<ProfileViewProps> = ({ profile, kartuUjian }) => {
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
        <h2 className="text-xl font-bold">Data Diri</h2>
        <p className="text-sm text-gray-500">
          Data telah dikunci dan sedang diverifikasi oleh prodi
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <Item label="Nama Lengkap" value={profile.nama_lengkap} />
        <Item label="Telegram" value={profile.no_tele} />
        <Item label="Jenjang" value={profile.pendidikan_jenjang} />
        <Item label="Institusi" value={profile.pendidikan_institusi} />
        <Item label="Jurusan" value={profile.pendidikan_jurusan} />
        <Item label="Tahun Lulus" value={profile.tahun_lulus} />
        <Item label="Program Studi" value={profile.prodi} />
        <Item label="Jadwal Ujian" value={profile.jadwal} />
      </div>

      {kartuUjian && (
        <div className="rounded-md border p-4">
          <h3 className="mb-2 font-semibold">Kartu Ujian</h3>
          <p className="text-sm">
            {kartuUjian.tanggal} — {kartuUjian.sesi}
          </p>
          <p className="text-sm">{kartuUjian.ruangan}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
