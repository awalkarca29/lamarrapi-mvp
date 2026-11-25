import { SectionHeading } from '@/components/ui/section-heading';

const problems = [
  { title: 'Informasi tersebar', pain: 'Detail lamaran tersimpan di banyak tab, pesan, dan catatan.', solution: 'Satu ringkasan untuk setiap lamaran.' },
  { title: 'Jadwal sulit diingat', pain: 'Undangan wawancara dan tenggat bisa datang berdekatan.', solution: 'Lihat agenda rekrutmen dengan lebih jelas.' },
  { title: 'Pelacakan masih manual', pain: 'Sulit mengingat proses mana yang sedang berjalan dan harus menyiapkan apa.', solution: 'Tahapan dan langkah berikutnya lebih terarah.' },
];
const benefits = [
  { title: 'Pantau Tahapan', description: 'Lihat perkembangan tiap lamaran dari administrasi hingga penawaran dalam alur yang mudah dipahami.' },
  { title: 'Kelola Jadwal', description: 'Temukan jadwal tes dan wawancara agar kamu bisa menyiapkan diri lebih awal.' },
  { title: 'Ketahui Next Action', description: 'Ketahui persiapan berikutnya untuk tiap proses seleksi yang sedang berjalan.' },
];

export function ProblemsAndBenefits() {
  return <>
    <section className="py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <SectionHeading eyebrow="Dari tersebar menjadi teratur" title="Banyak lamaran, tak harus banyak kebingungan." description="Konsep LamarRapi berangkat dari tantangan mengelola beberapa proses seleksi sekaligus." />
      <div className="grid gap-4 md:grid-cols-3">{problems.map((item, index) => <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7" key={item.title}><span className="font-semibold text-slate-500">0{index+1}</span><h3 className="mt-5 text-xl font-bold">{item.title}</h3><p className="mt-4 min-h-14 leading-7 text-slate-600">{item.pain}</p><p className="mt-5 text-sm font-semibold text-indigo-600">Potensi manfaat LamarRapi</p><p className="mt-1 font-medium leading-6">{item.solution}</p></article>)}</div>
    </div></section>
    <section id="manfaat" className="bg-slate-50 py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <SectionHeading eyebrow="Manfaat utama" title="Lebih jelas di setiap langkah." />
      <div className="grid gap-4 md:grid-cols-3">{benefits.map((item,index) => <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-7"><span className="text-3xl font-bold text-indigo-600">0{index+1}</span><h3 className="mt-6 text-xl font-bold">{item.title}</h3><p className="mt-4 leading-7 text-slate-600">{item.description}</p></article>)}</div>
    </div></section>
  </>;
}
