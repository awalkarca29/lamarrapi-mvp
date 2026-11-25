'use client';

import { useRef, useState, type FormEvent } from 'react';
import { LoaderCircle } from 'lucide-react';
import { JOB_STATUSES, validateInterest, type InterestErrors } from '@/lib/interest';

type FormValues = { email: string; jobSearchStatus: string; feedback: string; consent: boolean };
const initial: FormValues = { email: '', jobSearchStatus: '', feedback: '', consent: false };

export function InterestForm() {
  const [form, setForm] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<InterestErrors>({});
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'failed' | 'duplicate'>('idle');
  const pending = useRef(false);

  function change<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setForm(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
    if (state === 'failed' || state === 'duplicate') setState('idle');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || state === 'success') return;
    const checked = validateInterest(form);
    setErrors(checked.errors);
    if (!checked.value) return;
    pending.current = true;
    setState('loading');
    try {
      const response = await fetch('/api/interest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(checked.value) });
      if (response.status === 201) { setState('success'); setForm(initial); return; }
      if (response.status === 409) { setState('duplicate'); return; }
      if (response.status === 400) {
        const body: { fields?: InterestErrors } = await response.json();
        if (body.fields) { setErrors(body.fields); setState('idle'); return; }
      }
      setState('failed');
    } catch { setState('failed'); }
    finally { pending.current = false; }
  }

  return <form onSubmit={submit} noValidate className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <h3 className="text-xl font-bold sm:text-2xl">Jadi bagian dari langkah awal kami.</h3>
    <p className="mt-3 text-sm text-slate-500">Tanda * menunjukkan kolom wajib.</p>
    <div className="mt-7 space-y-5">
      <div><label htmlFor="email" className="block text-sm font-semibold">Email *</label><input id="email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} required value={form.email} onChange={event => change('email', event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="nama@email.com" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-900 placeholder:text-slate-400" />{errors.email && <p id="email-error" className="mt-2 text-sm text-red-700">{errors.email}</p>}</div>
      <div><label htmlFor="job-status" className="block text-sm font-semibold">Status Pencarian Kerja (opsional)</label><select id="job-status" name="jobSearchStatus" value={form.jobSearchStatus} onChange={event => change('jobSearchStatus', event.target.value)} aria-invalid={!!errors.jobSearchStatus} aria-describedby={errors.jobSearchStatus ? 'job-status-error' : undefined} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900"><option value="">Pilih status pencarian kerja</option>{JOB_STATUSES.map(status => <option value={status} key={status}>{status}</option>)}</select>{errors.jobSearchStatus && <p id="job-status-error" className="mt-2 text-sm text-red-700">{errors.jobSearchStatus}</p>}</div>
      <div><label htmlFor="feedback" className="block text-sm font-semibold">Feedback (opsional)</label><textarea id="feedback" name="feedback" rows={4} maxLength={500} value={form.feedback} onChange={event => change('feedback', event.target.value)} aria-invalid={!!errors.feedback} aria-describedby={errors.feedback ? 'feedback-error' : 'feedback-hint'} placeholder="Apa yang paling sulit saat mengelola lamaran?" className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400" /><p id="feedback-hint" className="mt-1 text-xs text-slate-500">Maksimal 500 karakter. Jangan sertakan CV atau data sensitif.</p>{errors.feedback && <p id="feedback-error" className="mt-2 text-sm text-red-700">{errors.feedback}</p>}</div>
      <div><label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600"><input id="consent" name="consent" type="checkbox" required checked={form.consent} onChange={event => change('consent', event.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} className="mt-1 h-5 w-5 shrink-0 accent-indigo-600" /><span>Saya memahami dan menyetujui penggunaan data yang saya kirim untuk validasi awal konsep LamarRapi. *</span></label>{errors.consent && <p id="consent-error" className="mt-2 text-sm text-red-700">{errors.consent}</p>}</div>
    </div>
    {state === 'success' && <p role="status" className="mt-6 rounded-xl bg-emerald-50 p-4 font-semibold text-emerald-800">Terima kasih! Minatmu berhasil didaftarkan.</p>}
    {state === 'duplicate' && <p role="alert" className="mt-6 rounded-xl bg-amber-50 p-4 text-amber-900">Email ini sudah terdaftar. Gunakan email lain jika ingin mendaftar.</p>}
    {state === 'failed' && <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-red-800">Pendaftaran belum berhasil dikirim. Silakan coba lagi.</p>}
    {state !== 'success' && <button type="submit" disabled={state === 'loading'} className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-60">{state === 'loading' && <LoaderCircle aria-hidden="true" size={18} className="animate-spin" />}{state === 'loading' ? 'Mengirim...' : state === 'failed' ? 'Coba Lagi' : 'Kirim Minat'}</button>}
  </form>;
}
