import { useEffect, useState } from "react";
import Table, { type TableColumn } from "../../components/Table";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import {
  useAppDispatch,
  useAppSelector,
  getProdi,
  createProdi,
  updateProdi,
  deleteProdi,
} from "../../stores";

/* ================= TYPES ================= */
interface ProdiItem {
  id: number;
  nama_prodi: string;
  jenjang: string;
}

/* ================= PAGE ================= */
export const Prodi = () => {
  const dispatch = useAppDispatch();
  const prodiList = useAppSelector((state) => state.private.admin.prodi); // sesuaikan slice

  /* ================= STATE ================= */
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<ProdiItem | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    nama_prodi: "",
    jenjang: "",
  });

  /* ================= EFFECT ================= */
  useEffect(() => {
    dispatch(getProdi());
  }, [dispatch]);

  /* ================= HANDLER ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name!]: e.target.value,
    }));
  };

  const handleOpenCreate = () => {
    setEditing(null);
    setForm({ nama_prodi: "", jenjang: "" });
    setOpenModal(true);
  };

  const handleOpenEdit = (row: ProdiItem) => {
    setEditing(row);
    setForm({
      nama_prodi: row.nama_prodi,
      jenjang: row.jenjang,
    });
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editing) {
        const payload = {
          id: editing.id,
          nama_prodi: form.nama_prodi,
          jenjang: form.jenjang,
        };
        await dispatch(updateProdi(payload)).unwrap();
        await dispatch(getProdi());
      } else {
        await dispatch(createProdi(form)).unwrap();
      }

      setOpenModal(false);
      dispatch(getProdi());
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
      await dispatch(deleteProdi(deletingId)).unwrap();
      dispatch(getProdi());
      setOpenDeleteModal(false);
      setDeletingId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isJenjangValid = ["S2", "S3"].includes(
    form.jenjang.trim().toUpperCase(),
  );

  const isFormValid =
    form.nama_prodi.trim() !== "" &&
    form.jenjang.trim() !== "" &&
    isJenjangValid;

  /* ================= TABLE ================= */
  const columns: TableColumn<ProdiItem>[] = [
    { key: "nama_prodi", label: "Nama Prodi" },
    { key: "jenjang", label: "Jenjang" },
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
        <h2 className="text-lg font-semibold">Program Studi</h2>

        <button
          onClick={handleOpenCreate}
          className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Tambah Prodi
        </button>
      </div>

      <Table
        columns={columns}
        data={prodiList}
        emptyText="Belum ada program studi"
      />

      {/* MODAL CREATE / EDIT */}
      <Modal
        open={openModal}
        title={editing ? "Edit Program Studi" : "Tambah Program Studi"}
        onClose={() => setOpenModal(false)}
        onConfirm={handleSubmit}
        loading={loading}
        confirmText="Simpan"
        confirmDisabled={!isFormValid}
      >
        <div className="space-y-3">
          <Input
            id="nama_prodi"
            label="Nama Program Studi"
            name="nama_prodi"
            value={form.nama_prodi}
            onChange={handleChange}
            required
          />

          <Input
            id="jenjang"
            label="Jenjang"
            name="jenjang"
            placeholder="S2 / S3"
            value={form.jenjang}
            onChange={handleChange}
            required
          />
        </div>
      </Modal>

      <Modal
        open={openDeleteModal}
        title="Hapus Program Studi"
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        confirmText="Ya, Hapus"
        loading={loading}
      >
        <p>Apakah kamu yakin ingin menghapus program studi ini?</p>
      </Modal>
    </div>
  );
};

export default Prodi;
