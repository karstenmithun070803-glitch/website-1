"use client";

import { useEffect, useRef, useState } from "react";
import type { StubHomePage } from "@/lib/stubContent";
import { track } from "@/lib/analytics";

export function ContactModal({
  open,
  onClose,
  content,
}: {
  open: boolean;
  onClose: () => void;
  content: StubHomePage["contactModal"];
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSubmitted(false);
        onClose();
      }
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      const firstInput = dialogRef.current?.querySelector<HTMLElement>("input, textarea");
      firstInput?.focus();
    });

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <>
      {/* Ambient background layer */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[80] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <img
          src={content.backgroundImagePath}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "blur(12px) brightness(0.55)" }}
        />
        <div className="absolute inset-0 bg-ink/40" />
        <button
          aria-label="Close contact modal"
          onClick={handleClose}
          className="absolute inset-0 h-full w-full"
        />
      </div>

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Contact Karst"
        aria-hidden={!open}
        className={`fixed left-1/2 top-1/2 z-[90] w-[calc(100%-2rem)] max-w-[640px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-page shadow-2xl transition-all duration-300 ${
          open ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
        }`}
      >
        <div className="h-1 w-full bg-sage" />

        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-8 md:p-10">
          {!submitted ? (
            <>
              <h2 className="font-display text-3xl font-semibold text-ink md:text-[2.5rem]">
                {content.heading}
              </h2>
              <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-ink/70 md:text-[15px]">
                {content.subline}
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setError("");
                  setSubmitting(true);
                  try {
                    const form = e.currentTarget;
                    const data = {
                      name: (form.elements.namedItem("name") as HTMLInputElement).value,
                      email: (form.elements.namedItem("email") as HTMLInputElement).value,
                      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
                    };
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    });
                    if (!res.ok) throw new Error("Failed to send");
                    track("contact_form_submitted");
                    setSubmitted(true);
                  } catch {
                    setError("Something went wrong. Please try again.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="mt-8 space-y-5"
              >
                <Field label="Your name" name="name" type="text" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Tell us about the space" name="message" textarea required />

                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-full rounded-full bg-sage py-3 font-body text-sm font-medium text-modal-bg transition-colors hover:bg-sage/90 disabled:opacity-50"
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>
              </form>
            </>
          ) : (
            <div className="py-10 text-center">
              <span aria-hidden className="mb-4 inline-block text-4xl text-copper">
                ◆
              </span>
              <p className="font-display text-2xl leading-snug text-ink md:text-3xl">
                {content.confirmationMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          className="w-full resize-none border-b border-gray-faded/40 bg-transparent py-2 font-body text-[15px] text-ink outline-none transition-colors focus:border-copper"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className="w-full border-b border-gray-faded/40 bg-transparent py-2 font-body text-[15px] text-ink outline-none transition-colors focus:border-copper"
        />
      )}
    </label>
  );
}
