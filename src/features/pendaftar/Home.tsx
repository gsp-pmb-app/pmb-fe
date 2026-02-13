import { useEffect, useState } from "react";
import {
  selectProdi,
  selectJadwal,
  getProdi,
  getProfile,
  selectPendaftarProfile,
  updateProfile,
  uploadDokumen,
  useAppDispatch,
  useAppSelector,
  type SesiUjian,
  getJadwal,
} from "../../stores";
import type { Option } from "../../components/SelectList";
import ProfileForm from "../../components/pendaftar/FormProfile";
import ProfileView from "../../components/pendaftar/ProfileView";
import Modal from "../../components/Modal";
import { MAX_FILE_SIZE } from "../../constants";
import { toast } from "sonner";
import { formatJam } from "../../utils/formatJam";

const Home = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectPendaftarProfile);
  const prodiList = useAppSelector(selectProdi);
  const jadwalList = useAppSelector(selectJadwal);

  /* ================= STATE ================= */
  const [form, setForm] = useState({
    nama_lengkap: "",
    no_tele: "",
    pendidikan_institusi: "",
    pendidikan_jurusan: "",
    tahun_lulus: "",
    tanggal_lahir: "",
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
    dispatch(getProdi());
    dispatch(getJadwal());
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    setProdi(null);
    setJadwal(null);
  }, [jenjang]);

  useEffect(() => {
    if (!profile) return;

    setForm({
      nama_lengkap: profile.nama_lengkap,
      no_tele: profile.no_tele,
      pendidikan_institusi: profile.pendidikan_institusi ?? "",
      pendidikan_jurusan: profile.pendidikan_jurusan ?? "",
      tahun_lulus: String(profile.tahun_lulus) ?? "",
      tanggal_lahir: profile.tanggal_lahir ?? "",
    });
  }, [profile]);

  /* ================= OPTIONS (DUMMY) ================= */
  const prodiOptions: Option[] = prodiList
    .filter((item) => item.jenjang === jenjang?.value)
    .map((item) => ({
      label: item.nama_prodi,
      value: item.id,
    }));

  const jadwalOptions: Option[] = jadwalList
    .filter((item) => item.prodiId === prodi?.value)
    .map((item) => ({
      label: `${item.tanggal} ${formatJam(item.sesi)} WIB`,
      value: item.id,
    }));

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
      alert("Ukuran foto maksimal 2MB");
      return;
    }

    setFoto(file);
  };

  const handleDokumenChange = (file: File | null) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("Ukuran dokumen maksimal 2 MB");
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
          tahun_lulus: Number(form.tahun_lulus),
          prodiId: prodi?.value,
          jadwalUjianId: jadwal?.value,
          status: "aktif",
          tanggal_lahir: form.tanggal_lahir,
        }),
      ).unwrap();

      if (foto || dokumen) {
        const formData = new FormData();
        if (foto) formData.append("foto", foto);
        if (dokumen) formData.append("dokumen", dokumen);

        await dispatch(uploadDokumen(formData)).unwrap();
      }

      await dispatch(getProfile());
      toast.success("Data pendaftaran berhasil disimpan");
      setShowConfirm(false);
    } catch (err) {
      console.error("Gagal submit:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const prodiPendaftar = prodiList.find((item) => item.id === profile?.prodiId);
  const jadwalPendaftar = jadwalList.find(
    (item) => item.id === profile?.jadwalUjianId,
  );
  const jadwalUjianPendaftar = `${jadwalPendaftar?.tanggal} ${formatJam(jadwalPendaftar?.sesi!)} WIB`;

  const isFormValid =
    form.nama_lengkap.trim() !== "" &&
    form.no_tele.trim() !== "" &&
    form.tanggal_lahir.trim() !== "" &&
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
            nama_lengkap: profile?.nama_lengkap!,
            no_tele: profile?.no_tele!,
            pendidikan_jenjang: profile?.pendidikan_jenjang!,
            pendidikan_institusi: profile?.pendidikan_institusi!,
            pendidikan_jurusan: profile?.pendidikan_jurusan!,
            tahun_lulus: String(profile?.tahun_lulus!),
            prodi: prodiPendaftar?.nama_prodi!,
            jadwal: jadwalUjianPendaftar,
            foto_path: profile?.foto_path!,
            tanggal_lahir: profile?.tanggal_lahir!,
          }}
          isStaff={false}
        />
      )}

      {/* MODAL KONFIRMASI */}
      <Modal
        open={showConfirm}
        title="Konfirmasi Data"
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSubmit}
        loading={isSubmitting}
        confirmDisabled={!isFormValid}
        confirmText="Ya, Simpan"
      >
        Pastikan data yang kamu isi sudah benar. Setelah disimpan, data tidak
        dapat diubah dan akan diverifikasi oleh pihak prodi.
      </Modal>
    </div>
  );
};

export default Home;
