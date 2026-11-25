export function Header() {
  return <header className="border-b border-slate-100 bg-white">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-5 gap-y-3 px-5 py-5 sm:px-8 lg:px-10">
      <a href="#atas" className="text-2xl font-extrabold tracking-tight text-indigo-600" aria-label="LamarRapi, kembali ke atas">LamarRapi</a>
      <nav aria-label="Navigasi utama" className="flex items-center gap-3 text-sm font-semibold sm:gap-7 sm:text-base">
        <a className="rounded-md px-1 py-2 text-slate-600 hover:text-indigo-600" href="#manfaat">Manfaat</a>
        <a className="rounded-md px-1 py-2 text-slate-600 hover:text-indigo-600" href="#preview">Preview</a>
        <a className="rounded-xl bg-indigo-600 px-3 py-3 text-white hover:bg-indigo-700 sm:px-5" href="#daftar-minat">Daftar Minat</a>
      </nav>
    </div>
  </header>;
}
