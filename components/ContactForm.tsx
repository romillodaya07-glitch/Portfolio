"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { validateContact, type FieldErrors } from "@/lib/validateContact";
import { burst } from "@/lib/confetti";
import { Star } from "./ui/Doodles";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border-2 border-ink bg-paper px-4 py-3 font-medium text-ink placeholder:text-ink/40 shadow-[3px_3px_0_0_#15121c] outline-none transition-shadow focus:shadow-[5px_5px_0_0_#2f4bff]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""), // honeypot
    };

    const { valid, errors: clientErrors } = validateContact(payload);
    setErrors(clientErrors);
    setServerError("");
    if (!valid) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({ success: false }));

      if (res.ok && result.success) {
        setStatus("success");
        setErrors({});
        form.reset();
        const r = form.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + 80, 40);
      } else {
        setErrors(result.fields ?? {});
        setServerError(result.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error — please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-3xl border-4 border-ink bg-pop-green p-8 text-center text-white shadow-[8px_8px_0_0_#15121c]"
      >
        <Star className="h-12 w-12 animate-spin-slow text-gold" />
        <h3 className="ts-hard font-display text-3xl">Message sent!</h3>
        <p className="max-w-sm font-medium text-white/90">
          Thanks for reaching out — I&apos;ll get back to you soon. Same energy,
          always.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-full border-2 border-ink bg-paper px-5 py-2 text-sm font-black text-ink shadow-[3px_3px_0_0_#15121c] transition-transform hover:-translate-y-0.5"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border-4 border-ink bg-card p-6 text-ink shadow-[8px_8px_0_0_#15121c] sm:p-8"
    >
      <h3 className="ts-pop font-display text-3xl">Send a message</h3>

      {/* Honeypot — hidden from humans */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block label-mono text-ink/60">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
            className={inputClass}
          />
          {errors.name && (
            <p id="cf-name-err" className="mt-1.5 text-sm font-semibold text-pop-red">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block label-mono text-ink/60">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@email.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            className={inputClass}
          />
          {errors.email && (
            <p id="cf-email-err" className="mt-1.5 text-sm font-semibold text-pop-red">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-message" className="mb-1.5 block label-mono text-ink/60">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder="Tell me about the brand you're building…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          className={`${inputClass} resize-y`}
        />
        {errors.message && (
          <p id="cf-message-err" className="mt-1.5 text-sm font-semibold text-pop-red">
            {errors.message}
          </p>
        )}
      </div>

      <AnimatePresence>
        {serverError && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-4 rounded-xl border-2 border-pop-red bg-pop-red/10 px-4 py-2 text-sm font-semibold text-pop-red"
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-electric px-6 py-3.5 font-black text-white shadow-[4px_4px_0_0_#15121c] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#15121c] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
