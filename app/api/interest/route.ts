import { NextResponse } from 'next/server';
import { validateInterest } from '@/lib/interest';
import { DuplicateInterestError, saveInterest, SheetsNotConfiguredError } from '@/lib/sheets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function respond(body: object, status: number) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return respond({ error: 'Format permintaan tidak didukung.' }, 415);
  let input: unknown;
  try {
    if (Number(request.headers.get('content-length') || 0) > 4096) return respond({ error: 'Permintaan terlalu panjang.' }, 413);
    const text = await request.text();
    if (text.length > 4096) return respond({ error: 'Permintaan terlalu panjang.' }, 413);
    input = JSON.parse(text);
  } catch { return respond({ error: 'Format permintaan tidak valid.' }, 400); }
  const { value, errors } = validateInterest(input);
  if (!value) return respond({ error: 'Periksa kembali formulir.', fields: errors }, 400);
  try {
    await saveInterest(value);
    return respond({ message: 'Terima kasih! Minatmu berhasil didaftarkan.' }, 201);
  } catch (error) {
    if (error instanceof DuplicateInterestError) return respond({ error: 'Email ini sudah terdaftar. Gunakan email lain jika ingin mendaftar.' }, 409);
    if (error instanceof SheetsNotConfiguredError) return respond({ error: 'Pendaftaran belum tersedia. Silakan coba lagi nanti.' }, 503);
    console.error('Gagal menyimpan pendaftaran minat ke Sheets:', error instanceof Error ? error.message : 'Kesalahan tidak diketahui');
    return respond({ error: 'Pendaftaran belum berhasil dikirim. Silakan coba lagi.' }, 502);
  }
}
