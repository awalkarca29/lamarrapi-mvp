import { Header } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { ProblemsAndBenefits } from '@/components/sections/benefits';
import { Preview } from '@/components/sections/preview';
import { Registration } from '@/components/sections/registration';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return <><a href="#konten" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Lewati navigasi</a><Header /><main id="konten"><Hero /><ProblemsAndBenefits /><Preview /><Registration /></main><Footer /></>;
}
