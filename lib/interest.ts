export const JOB_STATUSES = ['Aktif melamar', 'Pasif mencari peluang', 'Tidak sedang melamar'] as const;
export type Interest = { email: string; jobSearchStatus: string; feedback: string; consent: true };
export type InterestErrors = Partial<Record<keyof Interest, string>>;

export function validateInterest(input: unknown): { value?: Interest; errors: InterestErrors } {
  const errors: InterestErrors = {};
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return { errors: { email: 'Masukkan email yang valid.', consent: 'Persetujuan wajib diberikan.' } };
  const data = input as Record<string, unknown>;
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const jobSearchStatus = typeof data.jobSearchStatus === 'string' ? data.jobSearchStatus.trim() : '';
  const feedback = typeof data.feedback === 'string' ? data.feedback.trim() : '';
  if (!email) errors.email = 'Email wajib diisi.';
  else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Masukkan email yang valid.';
  if (data.jobSearchStatus != null && typeof data.jobSearchStatus !== 'string' || jobSearchStatus && !JOB_STATUSES.some(status => status === jobSearchStatus)) errors.jobSearchStatus = 'Pilih status yang tersedia.';
  if (data.feedback != null && typeof data.feedback !== 'string' || feedback.length > 500) errors.feedback = 'Masukan maksimal 500 karakter.';
  if (data.consent !== true) errors.consent = 'Persetujuan wajib diberikan.';
  return Object.keys(errors).length ? { errors } : { errors, value: { email, jobSearchStatus, feedback, consent: true } };
}
