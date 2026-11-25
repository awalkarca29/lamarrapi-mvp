import { beforeEach, describe, expect, it, vi } from 'vitest';

const save = vi.hoisted(() => vi.fn());
vi.mock('../lib/sheets', () => ({
  saveInterest: save,
  DuplicateInterestError: class DuplicateInterestError extends Error {},
  SheetsNotConfiguredError: class SheetsNotConfiguredError extends Error {},
}));
import { POST } from '../app/api/interest/route';

const request = (value: unknown) => new Request('http://localhost/api/interest', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value) });
const valid = { email: 'Hi@Example.com', consent: true, feedback: '', jobSearchStatus: '' };

describe('POST /api/interest', () => {
  beforeEach(() => save.mockReset());
  it('menolak input invalid tanpa menyimpan', async () => {
    const response = await POST(request({ email: 'salah', consent: false }));
    expect(response.status).toBe(400);
    expect((await response.json()).fields).toHaveProperty('consent');
    expect(save).not.toHaveBeenCalled();
  });
  it('berhasil hanya setelah penulisan terkonfirmasi', async () => {
    save.mockResolvedValue(undefined);
    const response = await POST(request(valid));
    expect(response.status).toBe(201);
    expect(save).toHaveBeenCalledWith({ ...valid, email: 'hi@example.com' });
  });
  it('gagal jika penulisan gagal dan tidak mengembalikan sukses', async () => {
    save.mockImplementationOnce(async () => { throw new Error('Google tidak tersedia'); });
    const response = await POST(request(valid));
    expect(response.status).toBe(502);
    expect((await response.json()).error).toMatch(/belum berhasil/);
  });
});
