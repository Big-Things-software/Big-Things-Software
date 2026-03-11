"use client";

import { useState, type FormEvent } from "react";
import { HEADING, SECTION_DESC, BTN_PRIMARY } from "@/lib/styles";

const INPUT =
  "py-4 px-5 text-base border border-[var(--color-border)] rounded-[10px] bg-[var(--color-surface)] backdrop-blur-sm text-[var(--color-text)] transition-all duration-300 placeholder:text-[var(--color-text-muted)] placeholder:opacity-60 focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_var(--color-accent-glow)]";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<"ok" | "fail" | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setFeedback(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setFeedback("ok");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setFeedback("fail");
    }

    setSending(false);
  }

  return (
    <section className="py-20 px-8 relative max-[480px]:py-12 max-[480px]:px-4">
      <div className="max-w-[720px] mx-auto relative z-[1]">
        <h1 className={HEADING}>Get In Touch</h1>
        <p className={SECTION_DESC}>
          Interested in joining our team or collaborating? Drop us a message and
          we&apos;ll get back to you.
        </p>

        <form
          onSubmit={submit}
          className="flex flex-col gap-6 p-12 bg-[var(--color-surface)] backdrop-blur-xl border border-[var(--color-border)] rounded-2xl max-md:p-8"
        >
          <label className="flex flex-col gap-2">
            <span className="text-[15px] font-semibold text-[var(--color-text)]">
              Name
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={INPUT}
              placeholder="Your name"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[15px] font-semibold text-[var(--color-text)]">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={INPUT}
              placeholder="you@example.com"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[15px] font-semibold text-[var(--color-text)]">
              Message
            </span>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${INPUT} resize-y min-h-[140px]`}
              placeholder="Tell us how you'd like to contribute..."
            />
          </label>

          <button
            type="submit"
            className={`${BTN_PRIMARY} w-full`}
            disabled={sending}
          >
            {sending ? "Sending\u2026" : "Send Message"}
          </button>

          {feedback === "ok" && (
            <p className="text-[15px] font-medium text-center p-4 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
              Thanks! We&apos;ll be in touch soon.
            </p>
          )}
          {feedback === "fail" && (
            <p className="text-[15px] font-medium text-center p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/30">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
