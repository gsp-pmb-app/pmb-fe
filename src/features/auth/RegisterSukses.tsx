import { useLocation, Navigate, Link } from "react-router-dom";

const RegisterSukses = () => {
  const { state } = useLocation();

  if (!state?.telegram_url) {
    return <Navigate to="/auth/register" replace />;
  }

  return (
    <div className="w-screen flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl flex flex-col items-center justify-center gap-3">
        <img src={"/undraw.svg"} alt="undraww" className="w-96 h-auto" />
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Pendaftaran Berhasil!
          </h2>

          <p className="text-sm text-gray-600">
            Silahkan klik tombol di bawah ini untuk membuka Telegram dan tekan
            <strong> /start </strong>
            agar mendapatkan Nomor Pendaftaran dan Kode Akses.
          </p>

          <a
            href={state.telegram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Buka Telegram
          </a>

          <p className="text-xs text-gray-500">
            Setelah mendapatkan kode akses, silakan login.
          </p>

          <Link
            to="/auth/login"
            className="block text-indigo-600 text-sm hover:underline"
          >
            Ke halaman login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterSukses;
