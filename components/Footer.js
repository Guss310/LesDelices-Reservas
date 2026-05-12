import Link from 'next/link';

const hours = [
  { day: 'Lunes a Viernes', time: '08:00 – 23:00' },
  { day: 'Sábado', time: '08:00 – 23:30' },
  { day: 'Domingo', time: '09:00 – 22:00' },
];

export default function Footer() {
  return (
    <footer className="bg-verde-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h3 className="font-heading text-dorado text-2xl font-bold mb-2">Les Délices</h3>
          <p className="text-white/60 text-sm mb-4 leading-relaxed">
            Una experiencia gastronómica única en el corazón de Punta del Este.
          </p>
          <p className="text-white/50 text-xs">
            Calle 20 & 29, Punta del Este, Maldonado, Uruguay
          </p>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-dorado font-semibold text-sm tracking-widest uppercase mb-4">
            Horarios
          </h4>
          <ul className="space-y-2">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between text-sm text-white/70 gap-4">
                <span>{h.day}</span>
                <span className="text-white/90 whitespace-nowrap">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-dorado font-semibold text-sm tracking-widest uppercase mb-4">
            Navegación
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-dorado transition-colors">Inicio</Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-dorado transition-colors">Nuestra Carta</Link>
            </li>
            <li>
              <Link href="/reservas" className="hover:text-dorado transition-colors">Reservar Mesa</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Les Délices. Todos los derechos reservados.</p>
          <p>Punta del Este, Uruguay</p>
        </div>
      </div>
    </footer>
  );
}
