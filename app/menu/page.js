import { menuCategories } from '@/data/menu';
import MenuClientNav from '@/components/MenuClientNav';

export const metadata = {
  title: 'Nuestra Carta | Les Délices',
  description: 'Explore nuestra carta completa. Jugos, licuados, sandwiches, carnes, pescados, postres y más en Les Délices, Punta del Este.',
};

function MenuItem({ item }) {
  return (
    <div className="flex justify-between items-start gap-4 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className={`text-sm text-gray-800 font-medium ${item.featured ? 'font-semibold' : ''}`}>
          {item.name}
          {item.featured && (
            <span className="ml-2 text-[10px] bg-[#E1C872]/20 text-[#326c2d] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide">
              Destacado
            </span>
          )}
        </p>
        {item.description && (
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.description}</p>
        )}
      </div>
      {item.price && (
        <p className="text-sm text-[#326c2d] font-semibold whitespace-nowrap shrink-0">{item.price}</p>
      )}
    </div>
  );
}

function CategorySection({ category }) {
  if (category.subsections) {
    return (
      <section id={category.id} className="scroll-mt-24">
        <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-[#326c2d]">
          {category.name}
        </h2>
        {category.subsections.map((sub) => (
          <div key={sub.name} className="mb-6">
            <h3 className="text-sm font-semibold text-[#326c2d] uppercase tracking-widest mb-3">
              {sub.name}
            </h3>
            <div>
              {sub.items.map((item) => (
                <MenuItem key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id={category.id} className="scroll-mt-24">
      <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-[#326c2d]">
        {category.name}
      </h2>
      <div>
        {category.items.map((item) => (
          <MenuItem key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <div
        className="pt-32 pb-16 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0f2a0c 0%, #326c2d 100%)' }}
      >
        <p className="text-[#E1C872] text-xs tracking-[0.35em] uppercase mb-3">Les Délices</p>
        <h1 className="font-heading text-white text-4xl sm:text-5xl font-bold mb-3">
          Nuestra Carta
        </h1>
        <div className="w-20 h-px bg-[#E1C872] mx-auto" />
      </div>

      {/* Sticky category nav */}
      <MenuClientNav categories={menuCategories} />

      {/* Menu content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {menuCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}

        {/* Note */}
        <p className="text-center text-xs text-gray-400 pt-4 border-t border-gray-200">
          Los precios están expresados en pesos uruguayos (UYU) e incluyen IVA. Sujetos a cambios sin previo aviso.
          Cubierto: $150.
        </p>
      </div>
    </div>
  );
}
