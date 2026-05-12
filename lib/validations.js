import { z } from 'zod';

export const reservationSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'Nombre muy largo'),
  email: z
    .string()
    .email('Por favor ingrese un email válido'),
  phone: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(20, 'Teléfono muy largo')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Formato de teléfono inválido'),
  date: z
    .string()
    .min(1, 'Seleccione una fecha')
    .refine((val) => {
      const selected = new Date(val + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, 'No se pueden hacer reservas en fechas pasadas'),
  time: z
    .string()
    .min(1, 'Seleccione un horario'),
  guests: z
    .number()
    .int()
    .min(1, 'Mínimo 1 persona')
    .max(20, 'Para grupos de más de 20 personas, contáctenos directamente'),
  special_requests: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    .default(''),
});

export function getTimeSlots() {
  const slots = [];
  const ranges = [
    { start: 12, end: 15.5 },
    { start: 19, end: 22.5 },
  ];
  for (const range of ranges) {
    let hour = range.start;
    while (hour < range.end) {
      const h = Math.floor(hour);
      const m = (hour % 1) === 0.5 ? '30' : '00';
      slots.push(`${String(h).padStart(2, '0')}:${m}`);
      hour += 0.5;
    }
  }
  return slots;
}

export function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}
