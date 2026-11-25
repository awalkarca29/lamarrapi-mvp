import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const calls = vi.hoisted(() => ({ get: vi.fn(), append: vi.fn() }));
vi.mock('server-only', () => ({}));
vi.mock('googleapis', () => ({ google: { auth: { JWT: class JWT {} }, sheets: () => ({ spreadsheets: { values: calls } }) } }));
import { DuplicateInterestError, saveInterest } from '../lib/sheets';

const interest = { email: 'satu@example.com', jobSearchStatus: '', feedback: '', consent: true as const };
const original = { ...process.env };

describe('integrasi Google Sheets', () => {
  beforeEach(() => {
    calls.get.mockReset(); calls.append.mockReset();
    Object.assign(process.env, { GOOGLE_SPREADSHEET_ID: 'sheet-id', GOOGLE_SHEET_TAB: 'Interest', GOOGLE_SERVICE_ACCOUNT_EMAIL: 'test@example.iam.gserviceaccount.com', GOOGLE_PRIVATE_KEY: 'dummy' });
  });
  afterEach(() => { process.env = { ...original }; });

  it('memetakan data ke kolom A–E dengan RAW dan meminta konfirmasi baris', async () => {
    calls.get.mockResolvedValue({ data: { values: [['Submission Timestamp', 'Email', 'Job Search Status', 'Feedback', 'Consent']] } });
    calls.append.mockResolvedValue({ data: { updates: { updatedRows: 1, updatedRange: 'Interest!A2:E2' } } });
    await saveInterest(interest);
    expect(calls.append).toHaveBeenCalledWith(expect.objectContaining({
      spreadsheetId: 'sheet-id', range: "'Interest'!A:E", valueInputOption: 'RAW',
      requestBody: { majorDimension: 'ROWS', values: [[expect.any(String), 'satu@example.com', '', '', 'Ya']] },
    }));
    expect(new Date(calls.append.mock.calls[0][0].requestBody.values[0][0]).toISOString()).toBe(calls.append.mock.calls[0][0].requestBody.values[0][0]);
  });
  it('menolak email yang sudah ada tanpa append', async () => {
    calls.get.mockResolvedValue({ data: { values: [['Submission Timestamp', 'Email'], ['yesterday', '  SATU@EXAMPLE.COM  ']] } });
    await expect(saveInterest(interest)).rejects.toBeInstanceOf(DuplicateInterestError);
    expect(calls.append).not.toHaveBeenCalled();
  });
  it('tidak menganggap berhasil jika Google tidak mengonfirmasi baris', async () => {
    calls.get.mockResolvedValue({ data: { values: [] } });
    calls.append.mockResolvedValue({ data: {} });
    await expect(saveInterest(interest)).rejects.toThrow(/Konfirmasi/);
  });
});
