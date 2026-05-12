import ReservationForm from '@/components/ReservationForm';

export const metadata = {
  title: 'Reservar Mesa | Les Délices',
  description: 'Reserve su mesa en Les Délices, Punta del Este. Sistema de reservas online rápido y sencillo.',
};

export default function ReservasPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <div
        className="pt-32 pb-16 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0f2a0c 0%, #326c2d 100%)' }}
      >
        <p className="text-[#E1C872] text-xs tracking-[0.35em] uppercase mb-3">Les Délices</p>
        <h1 className="font-heading text-white text-4xl sm:text-5xl font-bold mb-3">
          Reservar Mesa
        </h1>
        <div className="w-20 h-px bg-[#E1C872] mx-auto mb-5" />
        <p className="text-white/70 max-w-sm mx-auto text-sm leading-relaxed">
          Complete el formulario y confirme su reserva al instante. Haremos todo lo posible para atenderle perfectamente.
        </p>
      </div>

      {/* FAQ strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          <span>Almuerzo: 12:00 – 15:30</span>
          <span className="text-gray-300">|</span>
          <span>Cena: 19:00 – 22:00</span>
          <span className="text-gray-300">|</span>
          <span>Cancelación con 24 hs. de anticipación</span>
          <span className="text-gray-300">|</span>
          <span>Grupos grandes: contáctenos</span>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <ReservationForm />
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="font-heading text-xl font-bold text-gray-800 mb-6 text-center">
          Preguntas frecuentes
        </h2>
        <div className="space-y-4">
          {[
            {
              q: '¿Puedo cancelar o modificar mi reserva?',
              a: 'Sí. Le pedimos que nos avise con al menos 24 horas de anticipación para cancelaciones o cambios, para permitirnos ofrecer la mesa a otros clientes.',
            },
            {
              q: '¿Qué pasa si llego tarde?',
              a: 'Mantenemos la mesa por 15 minutos. Si cree que llegará tarde, contáctenos para avisarnos y haremos lo posible por conservar su lugar.',
            },
            {
              q: '¿Pueden atender grupos grandes?',
              a: 'Para grupos de más de 20 personas, le recomendamos contactarnos directamente por teléfono para coordinar el espacio y el menú.',
            },
            {
              q: '¿Aceptan pedidos especiales o alergias?',
              a: 'Por supuesto. Puede indicarlo en el campo de solicitudes especiales del formulario o avisarnos al llegar. Nuestro equipo hará lo posible por acomodar sus necesidades.',
            },
          ].map((faq) => (
            <details
              key={faq.q}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden group"
            >
              <summary className="flex justify-between items-center px-5 py-4 cursor-pointer text-sm font-semibold text-gray-800 hover:bg-gray-50 list-none">
                {faq.q}
                <svg
                  className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
