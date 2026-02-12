import StatusView from "../../components/pendaftar/StatusView";
import { selectPendaftarProfile, useAppSelector } from "../../stores";

export const StatusKelulusan = () => {
  const profile = useAppSelector(selectPendaftarProfile);

  return (
    <div>
      <StatusView
        nama={profile?.nama_lengkap || "-"}
        nomor_pendaftaran={profile?.nomor_pendaftaran || "-"}
        status={profile?.status!}
        tanggal_lahir="11-03-1998"
        jenjang={"S2"}
        prodi={"Teknologi Informasi"}
      />
    </div>
  );
};

export default StatusKelulusan;
