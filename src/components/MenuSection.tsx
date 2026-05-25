"use client";

import { useState } from "react";
import { menuItems, MenuItem } from "@/lib/menu-data";

const CATEGORIES = ["all", "pizza", "pasta", "salad", "drinks", "dessert"] as const;

type CartItem = MenuItem & { quantity: number };

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <section id="menu" className="bg-[#0e0e0a] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#e8b86d] text-xs tracking-[0.3em] uppercase mb-3">
            Our Offerings
          </p>
          <h2
            className="text-white text-4xl md:text-5xl"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Il Menu
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1 mb-12 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#e8b86d] text-[#0a0a08] font-semibold"
                  : "text-[#6a6a5a] hover:text-[#9a9a8a] border border-[#2a2a20] hover:border-[#4a4a3a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e1e14]">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#0e0e0a] p-6 hover:bg-[#14140e] transition-colors duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.image}</span>
                  <div>
                    <h3 className="text-white text-sm font-medium tracking-wide">
                      {item.name}
                    </h3>
                    {item.popular && (
                      <span className="text-[#e8b86d] text-[10px] tracking-widest uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className="text-[#e8b86d] text-sm font-light"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  ${item.price.toFixed(2)}
                </span>
              </div>

              <p className="text-[#5a5a4a] text-xs leading-relaxed mb-4">
                {item.description}
              </p>

              <button
                onClick={() => addToCart(item)}
                className={`w-full text-xs tracking-[0.15em] uppercase py-2 border transition-all duration-200 ${
                  addedId === item.id
                    ? "bg-[#e8b86d] border-[#e8b86d] text-[#0a0a08] font-semibold"
                    : "border-[#2a2a20] text-[#5a5a4a] group-hover:border-[#e8b86d]/40 group-hover:text-[#e8b86d]/60"
                }`}
              >
                {addedId === item.id ? "Added ✓" : "Add to Order"}
              </button>
            </div>
          ))}
        </div>

        {/* Floating Cart */}
        {cartCount > 0 && (
          <div className="fixed bottom-8 right-8 z-40">
            <a
              href="#order"
              className="flex items-center gap-3 bg-[#e8b86d] text-[#0a0a08] px-5 py-3 shadow-xl hover:bg-[#d4a55e] transition-colors"
            >
              <span className="text-xs font-bold tracking-widest uppercase">
                Order ({cartCount})
              </span>
              <span className="text-sm font-semibold">
                ${cartTotal.toFixed(2)}
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}