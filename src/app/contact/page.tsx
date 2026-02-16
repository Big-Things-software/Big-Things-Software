"use client";

import { useState, type FormEvent } from "react";

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
    <section className="section">
      <div className="section__inner section__inner--narrow">
        <h1 className="section__heading">Get In Touch</h1>
        <p className="section__description">
          Interested in joining our team or collaborating? Drop us a message and
          we&apos;ll get back to you.
        </p>

        <form onSubmit={submit} className="contact-form">
          <label className="form-field">
            <span className="form-field__label">Name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-field__input"
              placeholder="Your name"
            />
          </label>

          <label className="form-field">
            <span className="form-field__label">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-field__input"
              placeholder="you@example.com"
            />
          </label>

          <label className="form-field">
            <span className="form-field__label">Message</span>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-field__input form-field__input--textarea"
              placeholder="Tell us how you'd like to contribute..."
            />
          </label>

          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={sending}
          >
            {sending ? "Sending\u2026" : "Send Message"}
          </button>

          {feedback === "ok" && (
            <p className="form-status form-status--success">
              Thanks! We&apos;ll be in touch soon.
            </p>
          )}
          {feedback === "fail" && (
            <p className="form-status form-status--error">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
