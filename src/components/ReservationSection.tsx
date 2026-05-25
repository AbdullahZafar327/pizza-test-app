"use client";

import { useState } from "react";

const AVAILABLE_TIMES = [
  "12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
];

export default function ReservationSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(AVAILABLE_TIMES[0]);
  const [guests, setGuests] = useState(2);
  const [requests, setRequests] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setResult(null);

    if (!name.trim() || !email.trim() || !phone.trim() || !date) {
      setError("Please complete the reservation details.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          date,
          time,
          guests,
          specialRequests: requests || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to book reservation.");
      setResult(data.message);
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setGuests(2);
      setRequests("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservations" className="bg-[#090906] py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.3fr_0.9fr] items-center">
        <div>
          <p className="text-[#e8b86d] text-xs tracking-[0.3em] uppercase mb-3">Reserve a table</p>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            Secure your seat at Napoli
          </h2>
          <p className="text-[#7a7a64] max-w-xl leading-relaxed">
            Book ahead for lunch or dinner and enjoy a flawless experience with wood-fired pizza, handcrafted pastas, and wine poured by the glass.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="bg-[#141410] border border-[#2a2a20] p-5">
              <p className="text-sm text-[#e8b86d] uppercase tracking-[0.25em] mb-2">Opening</p>
              <p className="text-sm text-[#d9d9c9]">12:00–15:00 & 18:00–22:30</p>
            </div>
            <div className="bg-[#141410] border border-[#2a2a20] p-5">
              <p className="text-sm text-[#e8b86d] uppercase tracking-[0.25em] mb-2">Party size</p>
              <p className="text-sm text-[#d9d9c9]">1–12 guests</p>
            </div>
            <div className="bg-[#141410] border border-[#2a2a20] p-5">
              <p className="text-sm text-[#e8b86d] uppercase tracking-[0.25em] mb-2">Confirm</p>
              <p className="text-sm text-[#d9d9c9]">Fast confirmation with booking code</p>
            </div>
          </div>
        </div>

        <div className="bg-[#141410] border border-[#2a2a20] p-8 rounded-3xl shadow-xl">
          <div className="space-y-4">
            <label className="text-[#7a7a64] uppercase text-[10px] tracking-[0.35em]">Name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full bg-[#0a0a08] border border-[#2a2a20] px-4 py-3 text-white text-sm outline-none"
              placeholder="Marco Rossi"
            />
          </div>
          <div className="space-y-4 mt-4">
            <label className="text-[#7a7a64] uppercase text-[10px] tracking-[0.35em]">Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-[#0a0a08] border border-[#2a2a20] px-4 py-3 text-white text-sm outline-none"
              placeholder="hello@napoli.com"
            />
          </div>
          <div className="space-y-4 mt-4">
            <label className="text-[#7a7a64] uppercase text-[10px] tracking-[0.35em]">Phone</label>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full bg-[#0a0a08] border border-[#2a2a20] px-4 py-3 text-white text-sm outline-none"
              placeholder="+39 081 123 4567"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="space-y-4">
              <label className="text-[#7a7a64] uppercase text-[10px] tracking-[0.35em]">Date</label>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full bg-[#0a0a08] border border-[#2a2a20] px-4 py-3 text-white text-sm outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[#7a7a64] uppercase text-[10px] tracking-[0.35em]">Time</label>
              <select
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-full bg-[#0a0a08] border border-[#2a2a20] px-4 py-3 text-white text-sm outline-none"
              >
                {AVAILABLE_TIMES.map((value) => (
                  <option key={value} value={value} className="bg-[#0a0a08] text-white">
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="space-y-4">
              <label className="text-[#7a7a64] uppercase text-[10px] tracking-[0.35em]">Guests</label>
              <input
                type="number"
                min={1}
                max={12}
                value={guests}
                onChange={(event) => setGuests(Number(event.target.value))}
                className="w-full bg-[#0a0a08] border border-[#2a2a20] px-4 py-3 text-white text-sm outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[#7a7a64] uppercase text-[10px] tracking-[0.35em]">Requests</label>
              <input
                value={requests}
                onChange={(event) => setRequests(event.target.value)}
                className="w-full bg-[#0a0a08] border border-[#2a2a20] px-4 py-3 text-white text-sm outline-none"
                placeholder="Allergies, seating preference"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
          {result && <p className="text-[#e8b86d] text-sm mt-4">{result}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 w-full bg-[#e8b86d] text-[#0a0a08] uppercase text-xs tracking-[0.25em] font-semibold py-4 transition-colors hover:bg-[#d4a55e] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Booking..." : "Confirm Reservation"}
          </button>
        </div>
      </div>
    </section>
  );
}
