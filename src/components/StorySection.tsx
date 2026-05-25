export default function StorySection() {
  return (
    <section id="story" className="bg-[#080806] py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div>
          <p className="text-[#e8b86d] text-xs tracking-[0.3em] uppercase mb-4">
            La Nostra Storia
          </p>
          <h2
            className="text-white text-4xl md:text-5xl leading-tight mb-6"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Born in the
            <br />
            shadow of
            <br />
            <span className="text-[#e8b86d]">Vesuvius</span>
          </h2>
          <div className="space-y-4 text-[#5a5a4a] text-sm leading-relaxed">
            <p>
              In 1987, Salvatore Esposito left his family's bakery in the Quartieri
              Spagnoli with a single recipe, a cast-iron wood-burning oven, and an
              unwavering conviction that true Neapolitan pizza could not be
              replicated without the right hands and the right fire.
            </p>
            <p>
              Four decades later, nothing essential has changed. We still import
              our San Marzano tomatoes from the volcanic slopes of Campania. Our
              dough ferments for 48 hours. The oven reaches 900°F. And every pizza
              is charred, blistered, and served within 90 seconds — the only way.
            </p>
            <p>
              We earned our first Michelin Bib Gourmand in 2019. We don't mention
              it much. The queue was already long enough.
            </p>
          </div>

          <div className="mt-8 flex gap-8">
            {[
              { label: "Michelin Bib Gourmand", year: "2019–2024" },
              { label: "Best Neapolitan Pizza", year: "City Awards 2023" },
            ].map((award) => (
              <div key={award.label} className="border-l border-[#e8b86d]/30 pl-4">
                <p className="text-[#e8b86d] text-xs tracking-wide">{award.label}</p>
                <p className="text-[#3a3a2a] text-xs mt-1">{award.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual element */}
        <div className="relative">
          <div className="bg-[#141410] border border-[#2a2a20] p-8 space-y-6">
            <p
              className="text-[#e8b86d] text-xl md:text-2xl leading-relaxed"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              "Pizza is not fast food. It is not convenience. It is a ritual that
              demands respect for fire, flour, and time."
            </p>
            <div className="border-t border-[#2a2a20] pt-4">
              <p className="text-white text-sm font-medium">Salvatore Esposito</p>
              <p className="text-[#4a4a3a] text-xs tracking-widest uppercase mt-1">
                Founder & Head Pizzaiolo
              </p>
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-[#e8b86d]/20" />
          <div className="absolute -top-6 -left-6 w-24 h-24 border border-[#2a2a20]" />
        </div>
      </div>

      {/* Process timeline */}
      <div className="max-w-6xl mx-auto mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1e1e14]">
          {[
            { step: "01", title: "The Flour", desc: "Caputo '00' Pizzeria, milled in Naples since 1924" },
            { step: "02", title: "The Ferment", desc: "48 hours cold fermentation develops complexity and digestibility" },
            { step: "03", title: "The Fire", desc: "Oak-burning oven at 485°C — no gas, no shortcuts" },
            { step: "04", title: "90 Seconds", desc: "That is all the time it takes. That is all it needs." },
          ].map((item) => (
            <div key={item.step} className="bg-[#080806] p-6">
              <p
                className="text-[#2a2a1a] text-3xl font-black mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {item.step}
              </p>
              <p className="text-[#e8b86d] text-xs tracking-widest uppercase mb-2">
                {item.title}
              </p>
              <p className="text-[#4a4a3a] text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}