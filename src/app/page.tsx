import Navbar from "@/components/Navbar";
import MenuSection from "@/components/MenuSection";
import StorySection from "@/components/StorySection";
import ReservationSection from "@/components/ReservationSection";
import OrderSection from "@/components/OrderSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#050503] text-white">
        <section
          id="hero"
          className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(232,184,109,0.18),transparent_28%),linear-gradient(180deg,#050503_0%,#090906_58%,#080806_100%)]"
        >
          <div className="max-w-6xl mx-auto px-6 pt-28 pb-24 lg:pt-32 lg:pb-32">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
              <div className="max-w-2xl">
                <p className="text-[#e8b86d] text-xs tracking-[0.3em] uppercase mb-4">Authentic Neapolitan dining</p>
                <h1 className="text-5xl md:text-6xl leading-tight font-semibold mb-6" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                  Napoli Pizzeria
                  <br />
                  From Naples, with fire.
                </h1>
                <p className="text-[#b2b2a4] text-base md:text-lg leading-relaxed max-w-xl mb-10">
                  A modern restaurant experience for classic Italian flavors. Order online, reserve a table, or explore the menu crafted from San Marzano tomatoes, fresh buffalo mozzarella, and oak-fired ovens.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#menu"
                    className="inline-flex items-center justify-center rounded-full bg-[#e8b86d] px-8 py-4 text-sm font-semibold tracking-[0.2em] uppercase text-[#0a0a08] transition-colors hover:bg-[#d4a55e]"
                  >
                    View Menu
                  </a>
                  <a
                    href="#order"
                    className="inline-flex items-center justify-center rounded-full border border-[#e8b86d] px-8 py-4 text-sm font-semibold tracking-[0.2em] uppercase text-[#e8b86d] transition-colors hover:bg-[#1a1a14]"
                  >
                    Order Now
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#2a2a20] bg-[#090906]/90 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
                <div className="grid gap-5">
                  {[
                    {
                      title: "Wood-fired pizza",
                      description: "Each pie bakes at 900°F for the perfect char, fold, and chew.",
                    },
                    {
                      title: "Handmade pasta",
                      description: "Fresh pasta is cut daily and finished in rich, slow-simmered sauces.",
                    },
                    {
                      title: "Easy online ordering",
                      description: "Fast digital checkout plus same-day delivery and takeaway options.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="border-b border-[#1a1a12] pb-5 last:border-none last:pb-0">
                      <p className="text-[#e8b86d] text-xs tracking-[0.35em] uppercase mb-2">{item.title}</p>
                      <p className="text-[#b2b2a4] text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#080806] py-20 px-6 border-t border-[#1a1a12]">
          <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-3">
            {[
              { title: "Seasonal ingredients", text: "Locally sourced produce and cheese delivered fresh every morning." },
              { title: "Expert service", text: "Authentic hospitality with every reservation, order, and table served." },
              { title: "Fast validation", text: "Validate your product with live menu, ordering, contact, and reservation inputs." },
            ].map((feature) => (
              <div key={feature.title} className="bg-[#11100f] border border-[#2a2a20] p-8 rounded-3xl">
                <p className="text-[#e8b86d] text-xs tracking-[0.35em] uppercase mb-3">{feature.title}</p>
                <p className="text-[#b2b2a4] text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <MenuSection />
        <StorySection />
        <ReservationSection />
        <OrderSection />
        <ContactSection />

        <footer className="border-t border-[#171713] bg-[#070705] py-10 px-6">
          <div className="max-w-6xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-[#7a7a64] text-sm">
            <p>© {new Date().getFullYear()} Napoli Pizzeria. Crafted for AI-readiness validation.</p>
            <p>API endpoints: /api/getMenu, /api/contact, /api/order, /api/reservations</p>
          </div>
        </footer>
      </main>
    </>
  );
}
