import { useEffect, useState } from "react";
import Table, { type TableColumn } from "../../components/Table";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import {
  useAppDispatch,
  useAppSelector,
  getRuangan,
  createRuangan,
  updateRuangan,
  deleteRuangan,
  type Ruangan as RuanganType,
} from "../../stores";

/* ================= PAGE ================= */
export const Ruangan = () => {
  const dispatch = useAppDispatch();
  const ruanganList = useAppSelector(
    (state) => state.private.admin.ruangan.data,
  );

  /* ================= STATE ================= */
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<RuanganType | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    nama_ruangan: "",
    kapasitas: "",
    lokasi: "",
  });

  /* ================= EFFECT ================= */
  useEffect(() => {
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
    setForm({ nama_ruangan: "", kapasitas: "", lokasi: "" });
    setOpenModal(true);
  };

  const handleOpenEdit = (row: RuanganType) => {
    setEditing(row);
    setForm({
      nama_ruangan: row.nama_ruangan,
      kapasitas: String(row.kapasitas),
      lokasi: row.lokasi,
    });
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        nama_ruangan: form.nama_ruangan,
        kapasitas: Number(form.kapasitas),
        lokasi: form.lokasi,
      };

      if (editing) {
        await dispatch(updateRuangan({ id: editing.id, ...payload })).unwrap();
      } else {
        await dispatch(createRuangan(payload)).unwrap();
      }

      setOpenModal(false);
      dispatch(getRuangan());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;

    setLoading(true);
    try {
      await dispatch(deleteRuangan(deletingId)).unwrap();
      dispatch(getRuangan());
      setOpenDeleteModal(false);
      setDeletingId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    form.nama_ruangan.trim() !== "" &&
    form.kapasitas.trim() !== "" &&
    !isNaN(Number(form.kapasitas)) &&
    form.lokasi.trim() !== "";

  /* ================= TABLE ================= */
  const columns: TableColumn<RuanganType>[] = [
    { key: "nama_ruangan", label: "Nama Ruangan" },
    { key: "kapasitas", label: "Kapasitas" },
    { key: "lokasi", label: "Lokasi" },
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
        <h2 className="text-lg font-semibold">Ruangan</h2>

        <button
          onClick={handleOpenCreate}
          className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Tambah Ruangan
        </button>
      </div>

      <Table
        columns={columns}
        data={ruanganList}
        emptyText="Belum ada ruangan"
      />

      {/* MODAL CREATE / EDIT */}
      <Modal
        open={openModal}
        title={editing ? "Edit Ruangan" : "Tambah Ruangan"}
        onClose={() => setOpenModal(false)}
        onConfirm={handleSubmit}
        loading={loading}
        confirmText="Simpan"
        confirmDisabled={!isFormValid}
      >
        <div className="space-y-3">
          <Input
            id="nama_ruangan"
            label="Nama Ruangan"
            name="nama_ruangan"
            value={form.nama_ruangan}
            onChange={handleChange}
            required
          />

          <Input
            id="kapasitas"
            label="Kapasitas"
            name="kapasitas"
            value={form.kapasitas}
            onChange={handleChange}
            required
          />

          <Input
            id="lokasi"
            label="Lokasi"
            name="lokasi"
            value={form.lokasi}
            onChange={handleChange}
            required
          />
        </div>
      </Modal>

      {/* MODAL DELETE */}
      <Modal
        open={openDeleteModal}
        title="Hapus Ruangan"
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        confirmText="Ya, Hapus"
        loading={loading}
      >
        <p>Apakah kamu yakin ingin menghapus ruangan ini?</p>
      </Modal>
    </div>
  );
};

export default Ruangan;
