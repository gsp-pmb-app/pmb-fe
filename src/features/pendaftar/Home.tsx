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

const Home = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectPendaftarProfile);

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

  // sync redux profile → local form
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
          jadwalId: jadwal?.value,
        }),
      ).unwrap();

      if (foto || dokumen) {
        const formData = new FormData();
        if (foto) formData.append("foto", foto);
        if (dokumen) formData.append("dokumen", dokumen);

        await dispatch(uploadDokumen(formData)).unwrap();
      }

      await dispatch(getProfile()); // refresh profile
      setShowConfirm(false);
    } catch (err) {
      console.error("Gagal submit:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= RENDER ================= */
  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
      {!profile?.isSubmitted ? (
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
            onFotoChange={setFoto}
            onDokumenChange={setDokumen}
            onSubmit={() => setShowConfirm(true)}
          />
        </>
      ) : (
        <ProfileView
          profile={{
            nama_lengkap: profile.nama_lengkap,
            no_tele: profile.no_tele,
            pendidikan_jenjang: profile.pendidikan_jenjang,
            pendidikan_institusi: profile.pendidikan_institusi,
            pendidikan_jurusan: profile.pendidikan_jurusan,
            tahun_lulus: profile.tahun_lulus,
            prodi: profile.Prodi?.nama_prodi,
            jadwal: profile.JadwalUjian?.tanggal,
          }}
          kartuUjian={profile.kartuUjian}
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
