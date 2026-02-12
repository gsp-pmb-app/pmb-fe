import { useEffect, useState, useMemo } from "react";
import Table, { type TableColumn } from "../../components/Table";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import {
  useAppDispatch,
  useAppSelector,
  getJadwal,
  createJadwal,
  updateJadwal,
  deleteJadwal,
  getProdi,
  getRuangan,
  type Jadwal as JadwalType,
} from "../../stores";
import SelectList from "../../components/SelectList";
import type { Option } from "../../components/SelectList";
import {
  selectJadwal,
  selectJadwalLoading,
  selectProdi,
  selectRuangan,
} from "../../stores/features/admin/adminSelector";

/* ================= PAGE ================= */
export const Jadwal = () => {
  const dispatch = useAppDispatch();

  const jadwalList = useAppSelector(selectJadwal);
  const prodiList = useAppSelector(selectProdi);
  const ruanganList = useAppSelector(selectRuangan);
  const loading = useAppSelector(selectJadwalLoading);

  /* ================= STATE ================= */
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [editing, setEditing] = useState<JadwalType | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    tanggal: "",
    sesi: null as Option | null,
    kuota: "",
    ruangan: null as Option | null,
    prodi: null as Option | null,
  });

  /* ================= EFFECT ================= */
  useEffect(() => {
    dispatch(getJadwal());
    dispatch(getProdi());
    dispatch(getRuangan());
  }, [dispatch]);

  /* ================= HANDLER ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOpenCreate = () => {
    setEditing(null);
    setForm({
      tanggal: "",
      sesi: null as Option | null,
      kuota: "",
      ruangan: null as Option | null,
      prodi: null as Option | null,
    });
    setOpenModal(true);
  };

  const handleOpenEdit = (row: JadwalType) => {
    setEditing(row);

    setForm({
      tanggal: row.tanggal,
      kuota: String(row.kuota),

      sesi: sesiOptions.find((opt) => opt.value === row.sesi) ?? null,

      ruangan:
        ruanganOptions.find((opt) => opt.value === row.ruanganId) ?? null,

      prodi: prodiOptions.find((opt) => opt.value === row.prodiId) ?? null,
    });

    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        tanggal: form.tanggal,
        sesi: String(form.sesi?.value),
        kuota: Number(form.kuota),
        ruanganId: Number(form.ruangan?.value),
        prodiId: Number(form.prodi?.value),
      };

      if (editing) {
        await dispatch(updateJadwal({ id: editing.id, ...payload })).unwrap();
      } else {
        await dispatch(createJadwal(payload)).unwrap();
      }

      setOpenModal(false);
      dispatch(getJadwal());
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await dispatch(deleteJadwal(deletingId)).unwrap();
      dispatch(getJadwal());
      setOpenDeleteModal(false);
      setDeletingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const sesiOptions = useMemo(
    () => [
      { label: "Pagi (9:00 WIB)", value: "pagi" },
      { label: "Siang (13:00 WIB)", value: "siang" },
    ],
    [],
  );

  const ruanganOptions = useMemo(
    () =>
      ruanganList.map((r) => ({
        label: `${r.nama_ruangan} (Kapasitas: ${r.kapasitas})`,
        value: r.id,
      })),
    [ruanganList],
  );

  const prodiOptions = useMemo(
    () =>
      prodiList.map((p) => ({
        label: p.nama_prodi,
        value: p.id,
      })),
    [prodiList],
  );

  const selectedRuangan = ruanganList.find(
    (r) => r.id === Number(form.ruangan?.value),
  );

  const kapasitas = selectedRuangan?.kapasitas ?? 0;
  const kuota = Number(form.kuota || 0);

  const isKuotaValid = form.ruangan ? kuota <= kapasitas : true;

  const isFormValid =
    form.tanggal.trim() !== "" &&
    form.sesi !== undefined &&
    form.kuota.trim() !== "" &&
    !isNaN(kuota) &&
    form.ruangan !== undefined &&
    form.prodi !== undefined &&
    isKuotaValid;

  /* ================= TABLE ================= */
  const columns: TableColumn<JadwalType>[] = [
    { key: "tanggal", label: "Tanggal" },
    { key: "sesi", label: "Sesi" },
    { key: "kuota", label: "Kuota" },
    {
      key: "ruangan",
      label: "Ruangan",
      render: (row) => row.ruangan?.nama_ruangan,
    },
    {
      key: "prodi",
      label: "Prodi",
      render: (row) => row.prodi?.nama_prodi,
    },
    {
      key: "aksi",
      label: "Aksi",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenEdit(row)}
            className="text-indigo-600 hover:underline text-sm cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(row.id)}
            className="text-red-600 hover:underline text-sm cursor-pointer"
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  /* ================= RENDER ================= */
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Jadwal Ujian</h2>

        <button
          onClick={handleOpenCreate}
          className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Tambah Jadwal
        </button>
      </div>

      <Table columns={columns} data={jadwalList} emptyText="Belum ada jadwal" />

      {/* MODAL CREATE / EDIT */}
      <Modal
        open={openModal}
        title={editing ? "Edit Jadwal" : "Tambah Jadwal"}
        onClose={() => setOpenModal(false)}
        onConfirm={handleSubmit}
        loading={loading}
        confirmText="Simpan"
        confirmDisabled={!isFormValid}
      >
        <div className="space-y-3">
          <Input
            id="tanggal"
            label="Tanggal"
            name="tanggal"
            type="date"
            value={form.tanggal}
            onChange={handleChange}
            required
          />

          <SelectList
            id="sesi"
            label="Sesi"
            value={form.sesi!}
            onChange={(val) =>
              setForm((prev) => ({
                ...prev,
                sesi: val,
              }))
            }
            options={sesiOptions}
          />

          <Input
            id="kuota"
            label="Kuota"
            name="kuota"
            value={form.kuota}
            onChange={handleChange}
            error={!isKuotaValid}
            description={
              !isKuotaValid
                ? `Kuota tidak boleh lebih dari kapasitas ruangan (${kapasitas})`
                : "Pastikan kuota tidak melebihi kapasitas ruangan"
            }
            required
          />

          <SelectList
            id="ruangan"
            label="Ruangan"
            value={form.ruangan!}
            onChange={(val) =>
              setForm((prev) => ({
                ...prev,
                ruangan: val,
              }))
            }
            options={ruanganOptions}
          />

          <SelectList
            id="prodi"
            label="Program Studi"
            value={form.prodi!}
            onChange={(val) =>
              setForm((prev) => ({
                ...prev,
                prodi: val,
              }))
            }
            options={prodiOptions}
          />
        </div>
      </Modal>

      {/* MODAL DELETE */}
      <Modal
        open={openDeleteModal}
        title="Hapus Jadwal"
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        confirmText="Ya, Hapus"
        loading={loading}
      >
        <p>Apakah kamu yakin ingin menghapus jadwal ini?</p>
      </Modal>
    </div>
  );
};

export default Jadwal;
