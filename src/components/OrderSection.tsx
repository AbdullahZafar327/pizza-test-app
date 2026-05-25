"use client";

import { useState } from "react";
import { menuItems } from "@/lib/menu-data";

type CartItem = { id: string; name: string; price: number; quantity: number };

type OrderResult = {
  orderId: string;
  status: string;
  estimatedMinutes: number;
  total: number;
  message: string;
};

export default function OrderSection() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway" | "delivery">("dine-in");
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OrderResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addItem = (item: (typeof menuItems)[0]) => {
    setCart((prev) => {
      const ex = prev.find((c) => c.id === item.id);
      if (ex) return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      const ex = prev.find((c) => c.id === id);
      if (!ex) return prev;
      if (ex.quantity === 1) return prev.filter((c) => c.id !== id);
      return prev.map((c) => c.id === id ? { ...c, quantity: c.quantity - 1 } : c);
    });
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleSubmit = async () => {
    setError(null);
    if (!customerName.trim()) { setError("Please enter your name"); return; }
    if (cart.length === 0) { setError("Add at least one item"); return; }
    if (orderType === "delivery" && !deliveryAddress.trim()) { setError("Please enter delivery address"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((i) => ({ itemId: i.id, name: i.name, quantity: i.quantity, price: i.price })),
          customerName,
          orderType,
          tableNumber: tableNumber ? parseInt(tableNumber) : undefined,
          deliveryAddress: deliveryAddress || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");
      setResult(data);
      setCart([]);
      setCustomerName("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <section id="order" className="bg-[#0a0a08] py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <span className="text-5xl mb-6 block">✓</span>
          <p className="text-[#e8b86d] text-xs tracking-[0.3em] uppercase mb-3">Order Confirmed</p>
          <h2 className="text-white text-3xl mb-4" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            Grazie!
          </h2>
          <p className="text-[#5a5a4a] text-sm mb-8">{result.message}</p>
          <div className="bg-[#141410] border border-[#2a2a20] p-6 text-left space-y-3 mb-8">
            <div className="flex justify-between text-xs">
              <span className="text-[#4a4a3a] tracking-widest uppercase">Order ID</span>
              <span className="text-white font-mono">{result.orderId}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#4a4a3a] tracking-widest uppercase">Est. Time</span>
              <span className="text-[#e8b86d]">{result.estimatedMinutes} mins</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#4a4a3a] tracking-widest uppercase">Total</span>
              <span className="text-white">${result.total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => setResult(null)}
            className="text-xs tracking-[0.2em] uppercase text-[#5a5a4a] hover:text-[#e8b86d] transition-colors"
          >
            Place Another Order
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="bg-[#0a0a08] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#e8b86d] text-xs tracking-[0.3em] uppercase mb-3">Ready to Eat?</p>
          <h2 className="text-white text-4xl md:text-5xl" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            Place Your Order
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Item selector */}
          <div>
            <p className="text-[#4a4a3a] text-xs tracking-[0.2em] uppercase mb-4">Select Items</p>
            <div className="space-y-1 max-h-[420px] overflow-y-auto pr-2">
              {menuItems.map((item) => {
                const inCart = cart.find((c) => c.id === item.id);
                return (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b border-[#1a1a12] group">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.image}</span>
                      <div>
                        <p className="text-white text-xs font-medium">{item.name}</p>
                        <p className="text-[#e8b86d] text-xs">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {inCart && (
                        <>
                          <button onClick={() => removeItem(item.id)} className="w-6 h-6 border border-[#2a2a20] text-[#6a6a5a] hover:text-white hover:border-[#4a4a3a] text-xs flex items-center justify-center transition-colors">−</button>
                          <span className="text-white text-xs w-4 text-center">{inCart.quantity}</span>
                        </>
                      )}
                      <button onClick={() => addItem(item)} className="w-6 h-6 border border-[#2a2a20] text-[#6a6a5a] hover:text-[#e8b86d] hover:border-[#e8b86d]/40 text-xs flex items-center justify-center transition-colors">+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order form */}
          <div className="space-y-5">
            <div>
              <label className="text-[#4a4a3a] text-xs tracking-[0.2em] uppercase block mb-2">Your Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Marco Rossi"
                className="w-full bg-[#141410] border border-[#2a2a20] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#e8b86d]/50 placeholder:text-[#3a3a2a]"
              />
            </div>

            <div>
              <label className="text-[#4a4a3a] text-xs tracking-[0.2em] uppercase block mb-2">Order Type</label>
              <div className="grid grid-cols-3 gap-1">
                {(["dine-in", "takeaway", "delivery"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`text-xs tracking-widest uppercase py-3 border transition-all ${
                      orderType === type
                        ? "bg-[#e8b86d] border-[#e8b86d] text-[#0a0a08] font-semibold"
                        : "border-[#2a2a20] text-[#4a4a3a] hover:border-[#4a4a3a]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {orderType === "dine-in" && (
              <div>
                <label className="text-[#4a4a3a] text-xs tracking-[0.2em] uppercase block mb-2">Table Number</label>
                <input
                  type="number"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Ask your server"
                  className="w-full bg-[#141410] border border-[#2a2a20] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#e8b86d]/50 placeholder:text-[#3a3a2a]"
                />
              </div>
            )}

            {orderType === "delivery" && (
              <div>
                <label className="text-[#4a4a3a] text-xs tracking-[0.2em] uppercase block mb-2">Delivery Address</label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Full street address"
                  className="w-full bg-[#141410] border border-[#2a2a20] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#e8b86d]/50 placeholder:text-[#3a3a2a]"
                />
              </div>
            )}

            {/* Cart summary */}
            {cart.length > 0 && (
              <div className="bg-[#141410] border border-[#2a2a20] p-4 space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span className="text-[#6a6a5a]">{item.name} × {item.quantity}</span>
                    <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-[#2a2a20] pt-2 flex justify-between">
                  <span className="text-[#4a4a3a] text-xs tracking-widest uppercase">Total</span>
                  <span className="text-[#e8b86d] text-sm font-medium">${total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {error && (
              <p className="text-red-400/80 text-xs tracking-wide">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#e8b86d] text-[#0a0a08] text-xs font-bold tracking-[0.2em] uppercase py-4 hover:bg-[#d4a55e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}