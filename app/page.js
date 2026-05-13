import Link from 'next/link';
import { featuredDishes } from '@/data/menu';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center px-4"
        style={{
          background: 'linear-gradient(135deg, #0f2a0c 0%, #1a4016 35%, #245220 70%, #326c2d 100%)',
        }}
      >
        <div
          className="absolute inset-6 border border-[#E1C872]/20 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-[#E1C872] text-sm tracking-[0.35em] uppercase mb-6 font-light">
            Restaurante &amp; Café
          </p>
          <h1 className="font-heading text-white text-6xl sm:text-7xl font-bold leading-tight mb-4">
            Les Délices
          </h1>
          <div className="w-24 h-px bg-[#E1C872] mx-auto mb-6" />
          <p className="text-white/70 text-lg leading-relaxed mb-10">
            Una experiencia gastronómica única en el corazón de Punta del Este.
            Sabores auténticos, ambiente elegante, momentos inolvidables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservas"
              className="bg-[#E1C872] text-[#245220] font-semibold px-8 py-3.5 rounded hover:bg-[#f0dfa0] transition-colors text-sm tracking-wide"
            >
              Reservar Mesa
            </Link>
            <Link
              href="/menu"
              className="border border-[#E1C872]/60 text-[#E1C872] font-semibold px-8 py-3.5 rounded hover:bg-[#E1C872]/10 transition-colors text-sm tracking-wide"
            >
              Ver Carta
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs tracking-widest">
          <span>EXPLORAR</span>
          <div className="w-px h-8 bg-white/20" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#326c2d] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Por qué elegirnos
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-gray-800 font-bold">
              Una experiencia completa
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Cocina de autor',
                text: 'Platos elaborados con ingredientes frescos y de temporada, combinando la tradición uruguaya con la cocina internacional.',
              },
              {
                title: 'Ambiente único',
                text: 'Un espacio elegante y acogedor en pleno corazón de Punta del Este, ideal para cada ocasión.',
              },
              {
                title: 'Reserva fácil',
                text: 'Reserva tu mesa en minutos a través de nuestro sistema online, disponible las 24 horas.',
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="group p-8 border border-gray-100 rounded-lg hover:border-[#326c2d]/30 hover:shadow-md transition-all"
              >
                <div className="w-10 h-1 bg-[#E1C872] mb-5 group-hover:w-16 transition-all duration-300" />
                <h3 className="font-heading text-xl font-bold text-gray-800 mb-3">{feat.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{feat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured dishes */}
      <section className="py-20 px-4" style={{ background: '#f4f0e8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#326c2d] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Lo que no te podés perder
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-gray-800 font-bold">
              Platos destacados
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <div
                key={dish.name}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="h-36 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #326c2d, #245220)' }}
                >
                  <span className="font-heading text-[#E1C872] text-xs tracking-widest uppercase opacity-80">
                    {dish.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-gray-800 text-base mb-2">{dish.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{dish.description}</p>
                  <p className="text-[#326c2d] font-bold text-sm">{dish.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-block border-2 border-[#326c2d] text-[#326c2d] font-semibold px-8 py-3 rounded hover:bg-[#326c2d] hover:text-white transition-colors text-sm tracking-wide"
            >
              Ver carta completa
            </Link>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section
        className="py-24 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #1a4016, #326c2d)' }}
      >
        <div className="max-w-xl mx-auto">
          <p className="text-[#E1C872] text-xs tracking-[0.3em] uppercase mb-4">Reservas online</p>
          <h2 className="font-heading text-white text-3xl sm:text-4xl font-bold mb-5">
            Reserve su mesa hoy
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Disponibilidad sujeta a confirmación. Reserve con anticipación para asegurar el horario de su preferencia.
          </p>
          <Link
            href="/reservas"
            className="inline-block bg-[#E1C872] text-[#245220] font-bold px-10 py-4 rounded hover:bg-[#f0dfa0] transition-colors tracking-wide"
          >
            Reservar ahora
          </Link>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[#326c2d] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Cómo llegarnos
            </p>
            <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
              Ubicación y horarios
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed mb-8">
              <p>
                <strong className="text-gray-800">Dirección:</strong><br />
                Calle 20 &amp; 29, Punta del Este, Uruguay
              </p>
              <p>
                <strong className="text-gray-800">Teléfono:</strong><br />
                +598 42 XXX XXX
              </p>
            </div>
            <div className="border-l-4 border-[#326c2d] pl-4 space-y-1 text-sm text-gray-600">
              <p className="font-semibold text-gray-800 mb-2">Horarios de atención</p>
              <p>Lunes a Viernes: 07:00 – 20:00</p>
              <p>Sábado: 07:00 – 20:00</p>
              <p>Domingo: 07:00 – 20:00</p>
            </div>
          </div>

          <div
            className="rounded-lg overflow-hidden h-72 flex items-center justify-center text-white/80 text-sm"
            style={{ background: 'linear-gradient(135deg, #326c2d 0%, #1a4016 100%)' }}
          >
            <div className="text-center">
              <svg className="w-10 h-10 mx-auto mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="font-heading text-[#E1C872]">Punta del Este</p>
              <p className="text-white/60 text-xs mt-1">Uruguay</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
