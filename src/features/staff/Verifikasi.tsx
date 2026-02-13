import { useParams } from "react-router-dom";
import {
  getJadwal,
  getProdi,
  selectJadwal,
  selectProdi,
  useAppDispatch,
  useAppSelector,
  verifikasiDokumen,
} from "../../stores";
import {
  getPendaftarById,
  selectPendaftarById,
  selectPendaftarByIdLoading,
} from "../../stores";
import { useEffect } from "react";
import ProfileView from "../../components/pendaftar/ProfileView";
import { formatJam } from "../../utils/formatJam";
import { Button } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../../components/Spinner";

export const Verifikasi = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const loading = useAppSelector(selectPendaftarByIdLoading);
  const pendaftar = useAppSelector(selectPendaftarById);
  const prodiList = useAppSelector(selectProdi);
  const jadwalList = useAppSelector(selectJadwal);

  useEffect(() => {
    if (id) {
      dispatch(getPendaftarById(id));
      dispatch(getProdi());
      dispatch(getJadwal());
    }
  }, [id, dispatch]);

  const handleVerify = (status: "verifikasi" | "ditolak") => {
    dispatch(
      verifikasiDokumen({
        id: id!,
        status: status,
      }),
    );
  };

  const prodiPendaftar = prodiList.find(
    (item) => item.id === pendaftar?.prodiId,
  );
  const jadwalPendaftar = jadwalList.find(
    (item) => item.id === pendaftar?.jadwalUjianId,
  );
  const jadwalUjianPendaftar = `${jadwalPendaftar?.tanggal} ${formatJam(jadwalPendaftar?.sesi!)} WIB`;
  const fileUrl = pendaftar?.file_path || "/dummy.pdf";

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ProfileView
            profile={{
              nama_lengkap: pendaftar?.nama_lengkap!,
              no_tele: pendaftar?.no_tele!,
              pendidikan_jenjang: pendaftar?.pendidikan_jenjang!,
              pendidikan_institusi: pendaftar?.pendidikan_institusi!,
              pendidikan_jurusan: pendaftar?.pendidikan_jurusan!,
              tahun_lulus: String(pendaftar?.tahun_lulus!),
              prodi: prodiPendaftar?.nama_prodi!,
              jadwal: jadwalUjianPendaftar,
              foto_path: pendaftar?.foto_path!,
              tanggal_lahir: pendaftar?.tanggal_lahir!,
            }}
            isStaff={true}
          />

          <div className="mt-6">
            <p className="text-gray-500">Dokumen Persyaratan:</p>
            <iframe
              src={fileUrl}
              width="100%"
              height="600px"
              className="rounded border"
            />
          </div>
          <div className="flex flex-row gap-4 justify-end items-center mt-6">
            <Button
              className="w-36 rounded-md bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 flex justify-center items-center gap-1"
              onClick={() => handleVerify("verifikasi")}
            >
              <CheckIcon height={16} width={16} /> Verifikasi
            </Button>
            <Button
              className="w-36 rounded-md bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 flex justify-center items-center gap-1"
              onClick={() => handleVerify("ditolak")}
            >
              <XMarkIcon height={16} width={16} />
              Tolak
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Verifikasi;
