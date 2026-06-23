"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

const SUBJECTS = [
  { value: "feedback", label: "Feedback" },
  { value: "complaint", label: "Complaint" },
  { value: "inquiry", label: "Inquiry" },
  { value: "catering", label: "Catering" },
  { value: "other", label: "Other" },
] as const;

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<typeof SUBJECTS[number]["value"]>("feedback");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setStatus(null);
    setError(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send message.");
      setStatus(data.message ?? "Message sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
      setSubject("feedback");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-[#080806] py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
        <div>
          <p className="text-[#e8b86d] text-xs tracking-[0.3em] uppercase mb-3">Get in touch</p>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            Have a question or request?
          </h2>
          <p className="text-[#7a7a64] max-w-xl leading-relaxed">
            Whether you want to ask about private dining, catering, or just say hello, our team is ready to make your visit unforgettable.
          </p>


        <div className="mt-10 space-y-4 text-sm text-[#7a7a64]">
          <p>📍 Via Napoli 14, Naples, Italy</p>
          <p>📞 1234567890</p>
          <p>📞 (555) 123-4567</p>
          <p>📞 +44 20 7946 0958</p>
          <p>📞 +39 081 987 6543</p>

          <p>📧 codingbucketorg@gmail.com</p>

         <p className="flex items-center gap-2">
          <a
            href="mailto:contact@codingbucket.org"
            title="contact@codingbucket.org"
            aria-label="contact@codingbucket.org"
            className="hover:text-[#e8b86d] transition-colors"
          >
            <Mail size={18} />
          </a>
        </p>

          <p>
            Support Email:{" "}
            <span data-email="support@codingbucket.org">
              support@codingbucket.org
            </span>
          </p>

          <p>
            Business Inquiries:{" "}
            <a href="mailto:hello@codingbucket.org">
              hello@codingbucket.org
            </a>
          </p>

          <p>⏰ Mon–Sun: 12:00–15:00, 18:00–22:30</p>
        </div>
        </div>

        <div className="bg-[#141410] border border-[#2a2a20] p-8 rounded-3xl shadow-xl">
          <div className="space-y-4">
            <label className="text-[#7a7a64] uppercase text-[10px] tracking-[0.35em]">Name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full bg-[#0a0a08] border border-[#2a2a20] px-4 py-3 text-white text-sm outline-none"
              placeholder="Maria Bianchi"
            />
          </div>
          <div className="space-y-4 mt-4">
            <label className="text-[#7a7a64] uppercase text-[10px] tracking-[0.35em]">Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-[#0a0a08] border border-[#2a2a20] px-4 py-3 text-white text-sm outline-none"
              placeholder="maria@example.com"
            />
          </div>
          <div className="space-y-4 mt-4">
            <label className="text-[#7a7a64] uppercase text-[0.7rem] tracking-[0.35em]">Subject</label>
            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value as typeof subject)}
              className="w-full bg-[#0a0a08] border border-[#2a2a20] px-4 py-3 text-white text-sm outline-none"
            >
              {SUBJECTS.map((subjectOption) => (
                <option key={subjectOption.value} value={subjectOption.value} className="bg-[#0a0a08] text-white">
                  {subjectOption.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4 mt-4">
            <label className="text-[#7a7a64] uppercase text-[10px] tracking-[0.35em]">Message</label>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              className="w-full bg-[#0a0a08] border border-[#2a2a20] px-4 py-3 text-white text-sm outline-none resize-none"
              placeholder="Write your request or feedback here..."
            />
          </div>

          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
          {status && <p className="text-[#e8b86d] text-sm mt-4">{status}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 w-full bg-[#e8b86d] text-[#0a0a08] uppercase text-xs tracking-[0.25em] font-semibold py-4 transition-colors hover:bg-[#d4a55e] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </section>
  );
}
