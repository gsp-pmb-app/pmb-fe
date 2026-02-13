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
import { useEffect, useState } from "react";
import ProfileView from "../../components/pendaftar/ProfileView";
import { formatJam } from "../../utils/formatJam";
import { Button } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../../components/Spinner";
import Modal from "../../components/Modal";

export const Verifikasi = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const loading = useAppSelector(selectPendaftarByIdLoading);
  const pendaftar = useAppSelector(selectPendaftarById);
  const prodiList = useAppSelector(selectProdi);
  const jadwalList = useAppSelector(selectJadwal);

  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "verifikasi" | "ditolak" | null
  >(null);

  const isUjian =
    pendaftar?.status === "lulus" || pendaftar?.status === "tidak_lulus";

  useEffect(() => {
    if (id) {
      dispatch(getPendaftarById(id));
      dispatch(getProdi());
      dispatch(getJadwal());
    }
  }, [id, dispatch]);

  const handleConfirm = () => {
    if (!selectedStatus) return;

    dispatch(
      verifikasiDokumen({
        id: id!,
        status: selectedStatus,
      }),
    );

    setOpenModal(false);
  };

  const prodiPendaftar = prodiList.find(
    (item) => item.id === pendaftar?.prodiId,
  );
  const jadwalPendaftar = jadwalList.find(
    (item) => item.id === pendaftar?.jadwalUjianId,
  );
  const jadwalUjianPendaftar = `${jadwalPendaftar?.tanggal} ${formatJam(jadwalPendaftar?.sesi!)} WIB`;
  const fileUrl = pendaftar?.file_path;

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <LoadingSpinner />
        </div>
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
              status: pendaftar?.status!,
            }}
            isStaff={true}
          />

          <div className="mt-6">
            <p className="text-gray-500">
              {fileUrl
                ? "Dokumen Persyaratan:"
                : "Tidak ada dokumen persyaratan"}
            </p>
            {fileUrl && (
              <iframe
                src={fileUrl}
                width="100%"
                height="600px"
                className="rounded border"
              />
            )}
          </div>
          {!isUjian && (
            <div className="flex flex-row gap-4 justify-end items-center mt-6">
              <Button
                className="w-36 rounded-md bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 flex justify-center items-center gap-1 cursor-pointer"
                onClick={() => {
                  setSelectedStatus("verifikasi");
                  setOpenModal(true);
                }}
              >
                <CheckIcon height={16} width={16} /> Verifikasi
              </Button>

              <Button
                className="w-36 rounded-md bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 flex justify-center items-center gap-1 cursor-pointer"
                onClick={() => {
                  setSelectedStatus("ditolak");
                  setOpenModal(true);
                }}
              >
                <XMarkIcon height={16} width={16} /> Tolak
              </Button>
            </div>
          )}
        </>
      )}

      <Modal
        open={openModal}
        title="Konfirmasi Verifikasi"
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirm}
        confirmText={
          selectedStatus === "verifikasi" ? "Ya, Verifikasi" : "Ya, Tolak"
        }
      >
        Apakah kamu yakin ingin{" "}
        <span className="font-semibold">
          {selectedStatus === "verifikasi" ? "memverifikasi" : "menolak"}
        </span>{" "}
        dokumen pendaftar ini?
      </Modal>
    </div>
  );
};

export default Verifikasi;
