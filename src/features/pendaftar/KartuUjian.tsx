import { useEffect, useRef } from "react";
import {
  getJadwal,
  getProfile,
  useAppDispatch,
  useAppSelector,
} from "../../stores";
import {
  selectJadwal,
  selectPendaftarProfile,
  selectPendaftarProfileLoading,
} from "../../stores";
import generatePDF from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import { Button } from "@headlessui/react";
import { ArrowDownTrayIcon, PrinterIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../../components/Spinner";

export const KartuUjian = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectPendaftarProfileLoading);
  const profile = useAppSelector(selectPendaftarProfile);
  const jadwalUjian = useAppSelector(selectJadwal);
  const jadwal = jadwalUjian?.find((j) => j.id === profile?.jadwalUjianId);

  const targetRef = useRef(null);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getJadwal());
  }, [dispatch]);

  const isNotVerified =
    profile?.status === "baru" || profile?.status === "aktif";

  const data = {
    ...profile,
    jadwal: jadwal,
  };

  const handleGeneratePdf = () => {
    generatePDF(targetRef, {
      filename: `Kartu-Ujian-${data?.nomor_pendaftaran}.pdf`,
    });
  };

  const handlePrint = useReactToPrint({
    contentRef: targetRef,
    documentTitle: "Kartu Ujian",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-4 sm:p-6 shadow flex flex-col gap-3">
        {isNotVerified ? (
          <p className="text-center text-gray-500 text-sm">
            Kartu ujian akan tersedia setelah dokumen diverifikasi.
          </p>
        ) : (
          <>
            {" "}
            {/* MOBILE HINT */}
            <p className="text-xs text-gray-400 sm:hidden">
              Geser ke samping untuk melihat kartu
            </p>
            {/* MOBILE SCROLL WRAPPER */}
            <div className="w-full overflow-x-auto sm:overflow-visible">
              <div
                ref={targetRef}
                className="
              mx-auto p-6 pb-0
              min-w-[620px] sm:min-w-0
              w-[620px] sm:w-155
            "
              >
                <div className="border-2 border-black p-6 flex flex-col gap-4">
                  <div className="text-black capitalize flex flex-col justify-center items-center border-b-2 border-black pb-3 text-center">
                    <h2 className="text-md font-semibold">
                      KARTU TANDA PESERTA UJIAN MASUK
                      <br />
                      UNIVERSITAS GEMILANG SAPTA PERDANA
                    </h2>
                    <h5 className="text-sm">
                      PENERIMAAN MAHASISWA BARU PROGRAM PASCASARJANA (S2 & S3)
                    </h5>
                  </div>

                  <div className="flex flex-row justify-between mt-3">
                    <div className="grid grid-cols-[160px_10px_1fr] gap-y-1 text-sm">
                      <p>Nomor Peserta</p>
                      <p>:</p>
                      <p>{data?.nomor_pendaftaran ?? "-"}</p>

                      <p>Nama</p>
                      <p>:</p>
                      <p>{data?.nama_lengkap ?? "-"}</p>

                      <p>Program</p>
                      <p>:</p>
                      <p>
                        {data?.jadwal?.prodi?.nama_prodi ?? "-"} (
                        {data?.jadwal?.prodi?.jenjang ?? "-"})
                      </p>

                      <p>Tanggal Ujian</p>
                      <p>:</p>
                      <p>{data?.jadwal?.tanggal ?? "-"}</p>

                      <p>Ruangan</p>
                      <p>:</p>
                      <p>{data?.jadwal?.ruangan?.nama_ruangan ?? "-"}</p>

                      <p>Sesi / Jam</p>
                      <p>:</p>
                      <p>
                        <span className="capitalize">
                          {data?.jadwal?.sesi ?? "-"}
                        </span>{" "}
                        /{" "}
                        {data?.jadwal?.sesi === "pagi"
                          ? "9:00 WIB"
                          : "13:00 WIB"}
                      </p>
                    </div>

                    <div>
                      <img
                        src={data?.foto_path ?? "/default-avatar.jpg"}
                        className="w-26 h-32 object-cover border"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Kartu ujian wajib dicetak dan dibawa saat hari pelaksanaan ujian
              sebagai bukti keikutsertaan.
            </p>
            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button
                className="w-full sm:w-43 rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 flex justify-center items-center gap-1"
                onClick={handleGeneratePdf}
              >
                <ArrowDownTrayIcon height={16} width={16} />
                Download Kartu
              </Button>

              <Button
                className="w-full sm:w-43 rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 flex justify-center items-center gap-1"
                onClick={handlePrint}
              >
                <PrinterIcon height={16} width={16} />
                Cetak Kartu
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KartuUjian;
