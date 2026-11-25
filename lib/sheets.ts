import 'server-only';
import { google } from 'googleapis';
import type { Interest } from './interest';

export class SheetsNotConfiguredError extends Error {}
export class DuplicateInterestError extends Error {}

export async function saveInterest(value: Interest): Promise<void> {
  const { GOOGLE_SPREADSHEET_ID: spreadsheetId, GOOGLE_SHEET_TAB: tab, GOOGLE_SERVICE_ACCOUNT_EMAIL: clientEmail, GOOGLE_PRIVATE_KEY: rawKey } = process.env;
  if (!spreadsheetId || !tab || !clientEmail || !rawKey || !/^[\w .-]{1,80}$/.test(tab)) throw new SheetsNotConfiguredError('Konfigurasi Google Sheets belum lengkap.');
  const auth = new google.auth.JWT({ email: clientEmail, key: rawKey.replace(/\\n/g, '\n'), scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const range = `'${tab}'!A:E`;
  const existing = await sheets.spreadsheets.values.get({ spreadsheetId, range, valueRenderOption: 'UNFORMATTED_VALUE' });
  if (existing.data.values?.some((row, index) => index > 0 && String(row[1] ?? '').trim().toLowerCase() === value.email)) throw new DuplicateInterestError('Email sudah terdaftar.');
  const result = await sheets.spreadsheets.values.append({
    spreadsheetId, range, valueInputOption: 'RAW', insertDataOption: 'INSERT_ROWS',
    requestBody: { majorDimension: 'ROWS', values: [[new Date().toISOString(), value.email, value.jobSearchStatus, value.feedback, 'Ya']] },
  });
  if (result.data.updates?.updatedRows !== 1 || !result.data.updates?.updatedRange) throw new Error('Konfirmasi penulisan Sheets tidak diterima.');
}
