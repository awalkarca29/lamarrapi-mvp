import { Check } from 'lucide-react';
import { insights, recruitments, type Recruitment } from '@/lib/preview-data';
import { SectionHeading } from '@/components/ui/section-heading';

function RecruitmentCard({ item }: { item: Recruitment }) {
  return <article className="min-w-0 rounded-2xl bg-slate-50 p-5 sm:p-6">
    <h4 className="text-lg font-bold">{item.company}</h4><p className="mt-1 text-sm text-slate-500">{item.role}</p>
    <ol className="mt-5 flex flex-wrap gap-2">{item.stages.map((stage, index) => <li key={stage.name} className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold sm:text-sm ${stage.state === 'berjalan' ? 'bg-indigo-600 text-white' : stage.state === 'selesai' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-600'}`} aria-label={`${stage.name}: ${stage.state === 'berjalan' ? 'Sedang berjalan' : stage.state === 'belum' ? 'Belum dimulai' : stage.state === 'berikutnya' ? 'Berikutnya' : 'Selesai'}`}>
      {stage.state === 'selesai' && <Check size={14} aria-hidden="true" />}{index+1}. {stage.name}
    </li>)}</ol>
    <p className="mt-5 rounded-lg bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700">Jadwal contoh: {item.schedule}</p>
    <p className="mt-4 text-sm leading-6 text-slate-600"><strong className="text-slate-800">Next Action:</strong> {item.nextAction}</p>
  </article>;
}

function Bars({ title, rows }: { title: string; rows: { name: string; total: number; interview: number }[] }) {
  return <div className="mt-8"><h4 className="text-base font-bold">Berdasarkan {title}</h4><p className="mt-1 text-xs text-slate-500">Total lamaran / mencapai interview</p>
    <div className="mt-5 space-y-5">{rows.map(row => <div key={row.name} role="img" aria-label={`${row.name}: ${row.total} lamaran, ${row.interview} mencapai interview`}><div className="mb-2 flex justify-between gap-2 text-sm"><span className="text-slate-600">{row.name}</span><strong className="shrink-0">{row.total} / {row.interview}</strong></div><div className="space-y-1"><div className="h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-indigo-200" style={{width: `${row.total/5*100}%`}} /></div><div className="h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-indigo-600" style={{width: `${row.interview/5*100}%`}} /></div></div></div>)}</div>
  </div>;
}

export function Preview() {
  return <section id="preview" className="py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
    <SectionHeading eyebrow="Preview produk" title="Satu pandangan untuk semua peluangmu." description="Contoh tampilan LamarRapi untuk memperkenalkan konsep tahapan seleksi dan ringkasan lamaran." />
    <p className="mb-7 rounded-xl bg-indigo-50 px-5 py-4 text-sm leading-6 text-slate-600"><strong className="mr-2 text-indigo-600">ILUSTRASI</strong> Semua nama perusahaan, jadwal, dan angka berikut adalah data fiktif.</p>
    <div className="grid items-stretch gap-5 lg:grid-cols-[1.8fr_1fr]">
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-7"><div className="flex flex-wrap justify-between gap-2"><h3 className="text-xl font-bold">Tahapan rekrutmen</h3><span className="text-sm text-slate-500">2 contoh dari 8 lamaran aktif</span></div><div className="mt-6 space-y-4">{recruitments.map(item => <RecruitmentCard key={item.company} item={item} />)}</div><p className="mt-5 text-xs leading-5 text-slate-500">Ungu tua: sedang berjalan · Ungu muda: selesai · Abu-abu: tahap berikutnya atau belum dimulai. Setiap perusahaan memiliki alur berbeda.</p></div>
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7"><h3 className="text-xl font-bold">Application Insights</h3><div className="mt-5 grid grid-cols-3 gap-2">{[['12','Total'],['8','Aktif'],['2','Interview']].map(([number,label]) => <div className="rounded-xl bg-white p-3 text-center" key={label}><p className="text-2xl font-bold text-indigo-600">{number}</p><p className="mt-1 text-xs text-slate-600">{label}</p></div>)}</div><div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500"><span><i className="mr-1 inline-block h-2 w-4 rounded bg-indigo-200" />Total lamaran</span><span><i className="mr-1 inline-block h-2 w-4 rounded bg-indigo-600" />Mencapai interview</span></div><Bars title="posisi" rows={insights.positions} /><Bars title="industri" rows={insights.industries} /><p className="mt-7 text-xs leading-5 text-slate-500">Kedua grafik merangkum 12 lamaran yang sama. Lamaran yang mencapai interview termasuk dalam total.</p></div>
    </div>
    <p className="mt-7 text-sm leading-6 text-slate-600">Data ilustrasi untuk memperkenalkan konsep LamarRapi. Fitur monitoring dan analisis lamaran belum tersedia pada MVP ini.</p>
  </div></section>;
}
