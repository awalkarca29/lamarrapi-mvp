import { ArrowRight, CalendarDays } from 'lucide-react';

export function Hero() {
  return <section id="atas" className="bg-slate-50">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-10 lg:py-28">
      <div>
        <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-indigo-600">Lebih terarah, lebih tenang</span>
        <h1 className="mt-8 max-w-2xl text-4xl font-extrabold leading-[1.13] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.5rem]">Pantau perjalanan rekrutmenmu dalam satu tempat.</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Kelola tahapan seleksi, jadwal penting, dan persiapan berikutnya dari berbagai lamaran dengan lebih terstruktur.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#daftar-minat" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 font-semibold text-white shadow-sm hover:bg-indigo-700">Daftar Minat <ArrowRight size={18} aria-hidden="true" /></a>
          <a href="#preview" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-600">Lihat Preview</a>
        </div>
        <p className="mt-5 text-sm text-slate-500">Kenali konsepnya dan bantu validasi awal LamarRapi. Pendaftaran ini bukan pembuatan akun.</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_22px_60px_-35px_rgba(26,36,80,.26)] sm:p-8" aria-label="Ilustrasi ringkasan perjalanan lamaran">
        <div className="flex items-start justify-between gap-4"><h2 className="text-xl font-bold sm:text-2xl">Perjalanan lamaranmu</h2><span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">Ilustrasi</span></div>
        <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">{[['08','Lamaran aktif'],['02','Wawancara'],['03','Tindak lanjut']].map(([number,label]) => <div className="min-w-0 rounded-2xl bg-slate-50 p-3 sm:p-4" key={label}><p className="text-2xl font-bold text-indigo-600 sm:text-3xl">{number}</p><p className="mt-2 text-xs text-slate-600 sm:text-sm">{label}</p></div>)}</div>
        <div className="mt-8"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Jadwal ilustratif</p><p className="mt-3 text-lg font-bold">Psikotes Management Trainee</p><p className="mt-1 text-sm text-slate-600">PT Bank Arunika · Management Trainee</p><p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600"><CalendarDays size={16} aria-hidden="true" />15 Januari 2027 · 09.00 WIB</p><p className="mt-5 text-sm leading-6 text-slate-600">Langkah berikutnya: periksa petunjuk seleksi dan persiapkan psikotes.</p></div>
      </div>
    </div>
  </section>;
}
