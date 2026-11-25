import { InterestForm } from './interest-form';

export function Registration() {
  return <section id="daftar-minat" className="bg-indigo-50 py-20 sm:py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-10">
    <div><p className="text-xs font-bold uppercase tracking-[.12em] text-indigo-600">Daftar minat</p><h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Tertarik mencoba LamarRapi?</h2><p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">Daftarkan minatmu untuk membantu kami memahami kebutuhan calon pengguna LamarRapi.</p><div className="mt-9 space-y-4 text-slate-600"><p><strong className="mr-3 text-indigo-600">01</strong> Sampaikan minatmu dengan email.</p><p><strong className="mr-3 text-indigo-600">02</strong> Bagikan kebutuhanmu secara opsional.</p><p><strong className="mr-3 text-indigo-600">03</strong> Tanpa akun dan tanpa biaya pendaftaran.</p></div><p className="mt-9 max-w-md text-sm leading-6 text-slate-500">LamarRapi masih pada tahap validasi konsep. Pendaftaran minat tidak membuat akun dan tidak mengaktifkan fitur monitoring.</p></div>
    <InterestForm />
  </div></section>;
}
