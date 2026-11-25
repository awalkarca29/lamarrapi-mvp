import { describe, expect, it } from 'vitest';
import { validateInterest } from '../lib/interest';

describe('validasi pendaftaran minat', () => {
  it('menolak email kosong, format keliru, dan consent kosong', () => {
    expect(validateInterest({ email: '', consent: false }).errors).toMatchObject({ email: 'Email wajib diisi.', consent: 'Persetujuan wajib diberikan.' });
    expect(validateInterest({ email: 'bukan-email', consent: true }).errors.email).toBeTruthy();
  });
  it('menerima field opsional kosong dan menormalisasi email', () => {
    const result = validateInterest({ email: '  AUDIMA@Example.COM  ', consent: true });
    expect(result.value).toEqual({ email: 'audima@example.com', consent: true, jobSearchStatus: '', feedback: '' });
  });
  it('membatasi panjang feedback dan nilai status', () => {
    expect(validateInterest({ email: 'a@example.com', consent: true, feedback: 'x'.repeat(501), jobSearchStatus: 'lainnya' }).errors).toMatchObject({ feedback: expect.any(String), jobSearchStatus: expect.any(String) });
  });
});
