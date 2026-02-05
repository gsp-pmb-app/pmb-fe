import { useEffect, useState } from "react";
import Table, { type TableColumn } from "../components/Table";
import SelectList from "../components/SelectList";
import {
  useAppDispatch,
  useAppSelector,
  getAllPendaftar,
  getProdi,
} from "../stores";

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

  const { data, isLoading } = useAppSelector(
    (state) => state.private.pendaftarAdmin,
  );

  const prodiList = useAppSelector((state) => state.private.admin.prodi);

  // 🔥 SIMPAN SEBAGAI STRING
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

  /* ===== FILTER ===== */
  const handleFilterProdi = (option?: { label: string; value: string }) => {
    setProdiId(option?.value ?? "");
  };

  /* ===== TABLE ===== */
  const columns: TableColumn<PendaftarRow>[] = [
    { key: "nomor_pendaftaran", label: "No. Pendaftaran" },
    { key: "nama_lengkap", label: "Nama Lengkap" },
    { key: "no_tele", label: "Telegram" },
    {
      key: "prodi",
      label: "Prodi",
      render: (row) => row.prodi?.nama_prodi || "-",
    },
    { key: "pendidikan_jenjang", label: "Jenjang" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Data Pendaftar</h2>

      {/* FILTER */}
      <div className="w-64">
        <SelectList
          label="Filter Prodi"
          value={prodiId}
          onChange={handleFilterProdi}
          options={[
            { label: "Semua Prodi", value: "" },
            ...prodiList.map((p) => ({
              label: p.nama_prodi,
              value: String(p.id),
            })),
          ]}
        />
      </div>

      {isLoading ? (
        <div className="text-sm text-gray-500">Memuat data...</div>
      ) : (
        <Table columns={columns} data={data} emptyText="Belum ada pendaftar" />
      )}
    </div>
  );
};

export default Pendaftar;
