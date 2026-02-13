import { useEffect, useState } from "react";
import Table, { type TableColumn } from "../components/Table";
import SelectList from "../components/SelectList";
import {
  useAppDispatch,
  useAppSelector,
  getAllPendaftar,
  getProdi,
  selectPendaftarList,
  selectPendaftarListLoading,
  selectProdi,
} from "../stores";
import { getRole } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/Spinner";
import { Button } from "@headlessui/react";

interface PendaftarRow {
  id: number;
  nomor_pendaftaran: string;
  nama_lengkap: string;
  no_tele: string;
  pendidikan_jenjang?: string;
  status: string;
  prodi?: {
    id: number;
    nama_prodi: string;
  };
}

export const Pendaftar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const data = useAppSelector(selectPendaftarList);
  const isLoading = useAppSelector(selectPendaftarListLoading);
  const prodiList = useAppSelector(selectProdi);
  const role = getRole();

  const [prodiId, setProdiId] = useState<string>("");

  /* ===== FETCH PRODI ===== */
  useEffect(() => {
    dispatch(getProdi());
  }, [dispatch]);

  /* ===== FETCH PENDAFTAR ===== */
  useEffect(() => {
    dispatch(
      prodiId
        ? getAllPendaftar({ prodiId: Number(prodiId) })
        : getAllPendaftar(),
    );
  }, [dispatch, prodiId]);

  const prodiOptions = [
    { label: "Semua Prodi", value: "" },
    ...prodiList.map((p) => ({
      label: p.nama_prodi,
      value: String(p.id),
    })),
  ];

  const selectedProdi =
    prodiOptions.find((opt) => opt.value === prodiId) ?? prodiOptions[0];

  const columns: TableColumn<PendaftarRow>[] = [
    { key: "nomor_pendaftaran", label: "No. Pendaftaran" },
    { key: "nama_lengkap", label: "Nama Lengkap" },
    { key: "no_tele", label: "Telegram" },
    {
      key: "prodi",
      label: "Prodi",
      render: (row) => row.prodi?.nama_prodi || "-",
    },
    {
      key: "pendidikan_jenjang",
      label: "Jenjang",
      render: (row) => row.pendidikan_jenjang || "-",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs whitespace-nowrap">
          {row.status}
        </span>
      ),
    },
    ...(role === "staff"
      ? [
          {
            key: "aksi",
            label: "Aksi",
            render: (row: PendaftarRow) => (
              <Button
                onClick={() =>
                  navigate(`/staff/verifikasi/${row.nomor_pendaftaran}`)
                }
                className="
                  rounded-md bg-indigo-600
                  px-3 py-1.5 text-xs sm:text-sm
                  font-semibold text-white
                  hover:bg-indigo-500
                  whitespace-nowrap
                "
              >
                {row.status === "lulus" || row.status === "tidak_lulus"
                  ? "Detail"
                  : "Verifikasi"}
              </Button>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-4">
      {/* HEADER + FILTER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-lg font-semibold">Data Pendaftar</h2>

        <div className="w-full sm:w-64">
          <SelectList
            id="filter-prodi"
            label="Filter Prodi"
            value={selectedProdi}
            onChange={(opt) => setProdiId(String(opt.value))}
            options={prodiOptions}
          />
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <LoadingSpinner />
          </div>
        ) : (
          <Table
            columns={columns}
            data={data}
            emptyText="Belum ada pendaftar"
          />
        )}
      </div>
    </div>
  );
};

export default Pendaftar;
