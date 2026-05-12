'use client';

import { useState } from 'react';
import { reservationSchema, getTimeSlots, getTodayDate } from '@/lib/validations';
import { supabase, isDemoMode } from '@/lib/supabase';

const TIME_SLOTS = getTimeSlots();
const TODAY = getTodayDate();

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  special_requests: '',
};

function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-600">{msg}</p>;
}

function InputField({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

function SummaryPanel({ data }) {
  const hasDate = data.date && data.time;
  return (
    <div className="bg-[#326c2d] text-white rounded-xl p-6 sticky top-24">
      <h3 className="font-heading text-lg font-bold text-[#E1C872] mb-4">
        Resumen de su reserva
      </h3>
      <div className="space-y-3 text-sm">
        <SummaryRow label="Restaurante" value="Les Délices" />
        <SummaryRow label="Nombre" value={data.name || '—'} />
        <SummaryRow
          label="Fecha"
          value={
            data.date
              ? new Date(data.date + 'T00:00:00').toLocaleDateString('es-UY', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '—'
          }
        />
        <SummaryRow label="Hora" value={data.time || '—'} />
        <SummaryRow
          label="Personas"
          value={data.guests > 0 ? `${data.guests} persona${data.guests !== 1 ? 's' : ''}` : '—'}
        />
        {data.special_requests && (
          <SummaryRow label="Notas" value={data.special_requests} />
        )}
      </div>
      {hasDate && (
        <div className="mt-5 pt-4 border-t border-white/20">
          <p className="text-xs text-white/60 leading-relaxed">
            Su reserva quedará confirmada al enviar el formulario. Recibirá un email de confirmación.
          </p>
        </div>
      )}
      {isDemoMode && (
        <div className="mt-4 p-3 bg-[#E1C872]/10 border border-[#E1C872]/30 rounded text-xs text-[#E1C872]/80 leading-relaxed">
          Modo demo activo. Configure Supabase para guardar reservas en la base de datos.
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-white/60 shrink-0">{label}</span>
      <span className="text-right text-white/90 capitalize">{value}</span>
    </div>
  );
}

function ConfirmationScreen({ data, onReset }) {
  const formattedDate = data.date
    ? new Date(data.date + 'T00:00:00').toLocaleDateString('es-UY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : data.date;

  return (
    <div className="text-center py-12 px-4 max-w-lg mx-auto">
      <div className="w-16 h-16 bg-[#326c2d]/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-[#326c2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-heading text-3xl font-bold text-gray-800 mb-2">
        Reserva confirmada
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        Gracias, <strong>{data.name}</strong>. Su reserva ha sido registrada con éxito.
      </p>

      <div className="bg-[#326c2d]/5 border border-[#326c2d]/15 rounded-xl p-6 text-left space-y-3 mb-8 text-sm">
        <Detail label="Fecha" value={formattedDate} />
        <Detail label="Hora" value={data.time} />
        <Detail label="Personas" value={`${data.guests} persona${data.guests !== 1 ? 's' : ''}`} />
        <Detail label="Email de confirmación" value={data.email} />
      </div>

      <p className="text-xs text-gray-400 mb-6">
        Para cancelar o modificar su reserva, contáctenos con al menos 24 horas de anticipación.
      </p>

      <button
        onClick={onReset}
        className="text-sm text-[#326c2d] font-semibold hover:underline"
      >
        Hacer otra reserva
      </button>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800 font-medium text-right capitalize">{value}</span>
    </div>
  );
}

export default function ReservationForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const set = (field) => (e) => {
    const value = field === 'guests' ? Number(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const result = reservationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    try {
      if (isDemoMode) {
        await new Promise((r) => setTimeout(r, 800));
      } else {
        const { error } = await supabase.from('reservations').insert([result.data]);
        if (error) throw new Error(error.message);
      }

      // Fire-and-forget: enviar email de confirmación vía n8n
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.data),
        }).catch(() => {});
      }

      setIsConfirmed(true);
    } catch (err) {
      setSubmitError(
        'Ocurrió un error al registrar la reserva. Por favor intente nuevamente o contáctenos por teléfono.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
    setIsConfirmed(false);
    setSubmitError('');
  };

  if (isConfirmed) {
    return <ConfirmationScreen data={formData} onReset={handleReset} />;
  }

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
      errors[field]
        ? 'border-red-400 focus:ring-red-200 bg-red-50'
        : 'border-gray-300 focus:ring-[#326c2d]/30 focus:border-[#326c2d]'
    }`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6" noValidate>

        {/* Step 1: Date & time */}
        <fieldset className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
          <legend className="font-heading text-lg font-bold text-gray-800 px-1">
            1. Fecha, horario y personas
          </legend>

          <InputField label="Fecha" error={errors.date}>
            <input
              type="date"
              min={TODAY}
              value={formData.date}
              onChange={set('date')}
              className={inputClass('date')}
              data-error={!!errors.date}
            />
          </InputField>

          <InputField label="Horario" error={errors.time}>
            <select
              value={formData.time}
              onChange={set('time')}
              className={inputClass('time')}
              data-error={!!errors.time}
            >
              <option value="">Seleccione un horario</option>
              <optgroup label="Almuerzo">
                {TIME_SLOTS.filter((t) => t < '16:00').map((t) => (
                  <option key={t} value={t}>{t} hs</option>
                ))}
              </optgroup>
              <optgroup label="Cena">
                {TIME_SLOTS.filter((t) => t >= '19:00').map((t) => (
                  <option key={t} value={t}>{t} hs</option>
                ))}
              </optgroup>
            </select>
          </InputField>

          <InputField label="Número de personas" error={errors.guests}>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, guests: Math.max(1, p.guests - 1) }))}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#326c2d] hover:text-[#326c2d] transition-colors text-lg font-light"
                aria-label="Reducir personas"
              >
                −
              </button>
              <span className="text-lg font-semibold text-gray-800 w-8 text-center">
                {formData.guests}
              </span>
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, guests: Math.min(20, p.guests + 1) }))}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#326c2d] hover:text-[#326c2d] transition-colors text-lg font-light"
                aria-label="Aumentar personas"
              >
                +
              </button>
              <span className="text-xs text-gray-400">máx. 20 personas</span>
            </div>
            <FieldError msg={errors.guests} />
          </InputField>
        </fieldset>

        {/* Step 2: Contact info */}
        <fieldset className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
          <legend className="font-heading text-lg font-bold text-gray-800 px-1">
            2. Sus datos de contacto
          </legend>

          <InputField label="Nombre completo" error={errors.name}>
            <input
              type="text"
              placeholder="Ej: María González"
              value={formData.name}
              onChange={set('name')}
              className={inputClass('name')}
              data-error={!!errors.name}
              autoComplete="name"
            />
          </InputField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Correo electrónico" error={errors.email}>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={set('email')}
                className={inputClass('email')}
                data-error={!!errors.email}
                autoComplete="email"
              />
            </InputField>

            <InputField label="Teléfono" error={errors.phone}>
              <input
                type="tel"
                placeholder="+598 99 XXX XXX"
                value={formData.phone}
                onChange={set('phone')}
                className={inputClass('phone')}
                data-error={!!errors.phone}
                autoComplete="tel"
              />
            </InputField>
          </div>

          <InputField label="Solicitudes especiales (opcional)" error={errors.special_requests}>
            <textarea
              rows={3}
              placeholder="Alergias, ocasión especial, preferencias de mesa..."
              value={formData.special_requests}
              onChange={set('special_requests')}
              className={`${inputClass('special_requests')} resize-none`}
            />
            <p className="mt-1 text-xs text-gray-400 text-right">
              {formData.special_requests?.length || 0}/500
            </p>
          </InputField>
        </fieldset>

        {/* Error global */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            {submitError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#326c2d] text-white font-semibold py-4 rounded-xl hover:bg-[#245220] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm tracking-wide"
        >
          {isSubmitting ? 'Registrando reserva...' : 'Confirmar reserva'}
        </button>

        <p className="text-center text-xs text-gray-400">
          Al confirmar, acepta nuestra política de cancelación con 24 horas de anticipación.
        </p>
      </form>

      {/* Summary sidebar */}
      <div className="lg:col-span-1">
        <SummaryPanel data={formData} />
      </div>
    </div>
  );
}
