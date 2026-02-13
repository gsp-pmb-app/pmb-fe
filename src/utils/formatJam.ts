import type { SesiUjian } from "../stores";

  export const formatJam = (sesi: SesiUjian) => {
    if (sesi === "pagi") return "09:00";
    if (sesi === "siang") return "13:00";
    return "";
  };
