import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LamarRapi | Perjalanan rekrutmen lebih terarah',
  description: 'Kenali konsep LamarRapi untuk memantau tahapan seleksi, jadwal, dan persiapan berikutnya. Daftarkan minatmu untuk validasi awal.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
