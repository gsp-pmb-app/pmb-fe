import { useEffect, useState } from "react";
import {
  getJadwal,
  getProdi,
  getProfile,
  selectPendaftarProfile,
  updateProfile,
  uploadDokumen,
  useAppDispatch,
  useAppSelector,
} from "../../stores";
import type { Option } from "../../components/SelectList";
import ProfileForm from "../../components/pendaftar/FormProfile";
import ProfileView from "../../components/pendaftar/ProfileView";
import Modal from "../../components/Modal";
import { MAX_FILE_SIZE } from "../../constants";

const Home = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectPendaftarProfile);
  const prodiList = useAppSelector((state) => state.private.admin.prodi);

  /* ================= STATE ================= */
  const [form, setForm] = useState({
    nama_lengkap: "",
    no_tele: "",
    pendidikan_institusi: "",
    pendidikan_jurusan: "",
    tahun_lulus: "",
  });

  const [jenjang, setJenjang] = useState<Option | null>(null);
  const [prodi, setProdi] = useState<Option | null>(null);
  const [jadwal, setJadwal] = useState<Option | null>(null);

  const [foto, setFoto] = useState<File | null>(null);
  const [dokumen, setDokumen] = useState<File | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= EFFECT ================= */
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getJadwal());
    dispatch(getProdi());
  }, [dispatch]);

  useEffect(() => {
    if (!profile) return;

    setForm({
      nama_lengkap: profile.nama_lengkap,
      no_tele: profile.no_tele,
      pendidikan_institusi: profile.pendidikan_institusi ?? "",
      pendidikan_jurusan: profile.pendidikan_jurusan ?? "",
      tahun_lulus: profile.tahun_lulus ?? "",
    });
  }, [profile]);

  /* ================= OPTIONS (DUMMY) ================= */
  const prodiOptions: Option[] = [
    { label: "Teknik Informatika", value: 1 },
    { label: "Sistem Informasi", value: 2 },
  ];

  const jadwalOptions: Option[] = [
    { label: "2025-07-12 09:00 WIB", value: 1 },
    { label: "2025-07-12 13:00 WIB", value: 2 },
    { label: "2025-07-13 09:00 WIB", value: 3 },
  ];

  /* ================= HANDLER ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFotoChange = (file: File | null) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("Ukuran foto maksimal 5MB");
      return;
    }

    setFoto(file);
  };

  const handleDokumenChange = (file: File | null) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("Ukuran dokumen maksimal 5MB");
      return;
    }

    setDokumen(file);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);

    try {
      await dispatch(
        updateProfile({
          pendidikan_jenjang: jenjang?.value,
          pendidikan_institusi: form.pendidikan_institusi,
          pendidikan_jurusan: form.pendidikan_jurusan,
          tahun_lulus: form.tahun_lulus,
          prodiId: prodi?.value,
          jadwalUjianId: jadwal?.value,
          status: "aktif",
        }),
      ).unwrap();

      if (foto || dokumen) {
        const formData = new FormData();
        if (foto) formData.append("foto", foto);
        if (dokumen) formData.append("dokumen", dokumen);

        await dispatch(uploadDokumen(formData)).unwrap();
      }

      await dispatch(getProfile());
      setShowConfirm(false);
    } catch (err) {
      console.error("Gagal submit:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const prodiPendaftar = prodiList.find((item) => item.id === profile?.prodiId);

  const isFormValid =
    form.nama_lengkap.trim() !== "" &&
    form.no_tele.trim() !== "" &&
    jenjang !== null &&
    prodi !== null &&
    jadwal !== null &&
    form.pendidikan_institusi.trim() !== "" &&
    form.pendidikan_jurusan.trim() !== "" &&
    String(form.tahun_lulus).length === 4;

  /* ================= RENDER ================= */
  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
      {profile?.status === "baru" ? (
        <>
          <h2 className="mb-6 text-xl font-bold">Lengkapi Data Diri</h2>

          <ProfileForm
            form={form}
            jenjang={jenjang}
            prodi={prodi}
            jadwal={jadwal}
            prodiOptions={prodiOptions}
            jadwalOptions={jadwalOptions}
            loading={isSubmitting}
            onChange={handleChange}
            onJenjangChange={setJenjang}
            onProdiChange={setProdi}
            onJadwalChange={setJadwal}
            onFotoChange={handleFotoChange}
            onDokumenChange={handleDokumenChange}
            onSubmit={() => setShowConfirm(true)}
            isFormValid={isFormValid}
          />
        </>
      ) : (
        <ProfileView
          profile={{
            nama_lengkap: profile?.nama_lengkap,
            no_tele: profile?.no_tele,
            pendidikan_jenjang: profile?.pendidikan_jenjang,
            pendidikan_institusi: profile?.pendidikan_institusi,
            pendidikan_jurusan: profile?.pendidikan_jurusan,
            tahun_lulus: profile?.tahun_lulus,
            prodi: prodiPendaftar?.nama_prodi,
            jadwal: profile?.JadwalUjian?.tanggal,
            foto_path: profile?.foto_path,
          }}
          kartuUjian={profile?.kartuUjian}
        />
      )}

      {/* MODAL KONFIRMASI */}
      <Modal
        open={showConfirm}
        title="Konfirmasi Data"
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSubmit}
        loading={isSubmitting}
        confirmText="Ya, Simpan"
      >
        Pastikan data yang kamu isi sudah benar. Setelah disimpan, data tidak
        dapat diubah dan akan diverifikasi oleh pihak prodi.
      </Modal>
    </div>
  );
};

export default Home;
