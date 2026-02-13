import { useEffect, useMemo, useState } from "react";
import Table, { type TableColumn } from "../../components/Table";
import SelectList from "../../components/SelectList";
import type { Option } from "../../components/SelectList";
import LoadingSpinner from "../../components/Spinner";
import {
  useAppDispatch,
  useAppSelector,
  getYudisium,
  getProdi,
  type YudisiumItem,
} from "../../stores";
import { selectProdi } from "../../stores/features/admin/adminSelector";
import {
  selectYudisium,
  selectStaffLoading,
} from "../../stores/features/staff/staffSelector";

export const Yudisium = () => {
  const dispatch = useAppDispatch();

  const yudisiumList = useAppSelector(selectYudisium);
  const prodiList = useAppSelector(selectProdi);
  const loading = useAppSelector(selectStaffLoading);

  const [statusFilter, setStatusFilter] = useState<Option | null>(null);
  const [prodiFilter, setProdiFilter] = useState<Option | null>(null);
  const [jenjangFilter, setJenjangFilter] = useState<Option | null>(null);

  useEffect(() => {
    dispatch(getProdi());
    dispatch(getYudisium({}));
  }, [dispatch]);

  const handleFilter = () => {
    dispatch(
      getYudisium({
        status: statusFilter?.value as string,
        prodiId: prodiFilter?.value as string,
        jenjang: jenjangFilter?.value as string,
      }),
    );
  };

  /* ================= OPTIONS ================= */

  const statusOptions: Option[] = [
    { label: "Semua", value: "" },
    { label: "Lulus", value: "lulus" },
    { label: "Tidak Lulus", value: "tidak_lulus" },
  ];

  const jenjangOptions: Option[] = [
    { label: "S2", value: "S2" },
    { label: "S3", value: "S3" },
  ];

  const prodiOptions: Option[] = useMemo(
    () =>
      prodiList.map((p) => ({
        label: p.nama_prodi,
        value: String(p.id),
      })),
    [prodiList],
  );

  /* ================= TABLE ================= */

  const columns: TableColumn<YudisiumItem>[] = [
    { key: "nomor_pendaftaran", label: "No Pendaftaran" },
    { key: "nama", label: "Nama" },
    { key: "jenjang", label: "Jenjang" },
    { key: "prodi", label: "Prodi" },
    { key: "nilai", label: "Nilai" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            row.status === "lulus"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "file",
      label: "File Nilai",
      render: (row) =>
        row.file_path ? (
          <a
            href={row.file_path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline text-sm"
          >
            Lihat File
          </a>
        ) : (
          "-"
        ),
    },
  ];

  /* ================= RENDER ================= */

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Data Yudisium</h2>

      {/* FILTER AREA */}
      <div
        className="
        grid grid-cols-1
        lg:flex lg:flex-wrap lg:items-end
        gap-3
      "
      >
        <SelectList
          id="status"
          label="Status"
          value={statusFilter!}
          onChange={setStatusFilter}
          options={statusOptions}
          className="lg:min-w-46"
        />

        <SelectList
          id="jenjang"
          label="Jenjang"
          value={jenjangFilter!}
          onChange={setJenjangFilter}
          options={jenjangOptions}
          className="lg:min-w-46"
        />

        <SelectList
          id="prodi"
          label="Program Studi"
          value={prodiFilter!}
          onChange={setProdiFilter}
          options={prodiOptions}
          className="lg:min-w-46"
        />

        {/* BUTTON */}
        <button
          onClick={handleFilter}
          className="
          h-10 min-w-24
          rounded-md bg-indigo-600
          px-4 text-sm font-semibold text-white
          hover:bg-indigo-500
          w-full sm:w-auto
        "
        >
          Filter
        </button>
      </div>

      {/* TABLE / LOADING */}
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <LoadingSpinner />
        </div>
      ) : (
        <Table
          columns={columns}
          data={yudisiumList}
          emptyText="Belum ada data yudisium"
        />
      )}
    </div>
  );
};

export default Yudisium;
