export type StageState = 'selesai' | 'berjalan' | 'berikutnya' | 'belum';
export type Recruitment = {
  company: string;
  role: string;
  stages: { name: string; state: StageState }[];
  schedule: string;
  nextAction: string;
};

export const recruitments: Recruitment[] = [
  {
    company: 'PT Bank Arunika', role: 'Management Trainee',
    stages: [
      { name: 'Administrasi', state: 'selesai' }, { name: 'Tes Online', state: 'selesai' },
      { name: 'Psikotes', state: 'berjalan' }, { name: 'Interview', state: 'berikutnya' },
      { name: 'Offering', state: 'belum' },
    ],
    schedule: 'Psikotes · 15 Januari 2027, 09.00 WIB',
    nextAction: 'Persiapkan psikotes dan periksa petunjuk seleksi.',
  },
  {
    company: 'PT Nusa Konsultasi', role: 'Business Analyst',
    stages: [
      { name: 'CV Screening', state: 'selesai' }, { name: 'HR Interview', state: 'selesai' },
      { name: 'User Interview', state: 'berjalan' }, { name: 'Case Study', state: 'berikutnya' },
    ],
    schedule: 'User Interview · 19 Januari 2027, 13.00 WIB',
    nextAction: 'Persiapkan materi user interview dan contoh analisis.',
  },
];

export const insights = {
  total: 12, active: 8, interview: 2,
  positions: [
    { name: 'Product', total: 5, interview: 1 },
    { name: 'Business Analyst', total: 4, interview: 1 },
    { name: 'Project Management', total: 3, interview: 0 },
  ],
  industries: [
    { name: 'Banking', total: 4, interview: 1 },
    { name: 'FMCG', total: 3, interview: 0 },
    { name: 'IT Consulting', total: 5, interview: 1 },
  ],
};
