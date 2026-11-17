"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { profile } from "@/content/profile";
import { enquiry } from "@/content/services";
import {
  validateEnquiry,
  type EnquiryValues,
  type EnquiryErrors,
} from "@/lib/enquiry";
import { Icon } from "./icon";

const empty: EnquiryValues = {
  name: "",
  email: "",
  organisation: "",
  service: "",
  budget: "",
  timeline: "",
  details: "",
};

export function EnquiryForm({
  initialService = "",
}: {
  initialService?: string;
}) {
  const [values, setValues] = useState({ ...empty, service: initialService });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const notice = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    setValues((current) => ({ ...current, service: initialService }));
  }, [initialService]);

  function update(name: keyof EnquiryValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const validation = validateEnquiry(values);
    setErrors(validation);
    const first = Object.keys(validation)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // Web3Forms' documented honeypot field. Ignore bots without contacting the provider.
    if (new FormData(event.currentTarget).get("botcheck")) return;

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      setStatus("error");
      setMessage(
        "The enquiry form is being connected. Please email me directly using the address below.",
      );
      requestAnimationFrame(() => notice.current?.focus());
      return;
    }

    inFlight.current = true;
    setStatus("loading");
    setMessage("");
    try {
      const service = values.service || "Other";
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          access_key: key,
          subject: `${enquiry.subjectPrefix}${service}`,
          from_name: "Sudipta Nath Portfolio",
          name: values.name.trim(),
          email: values.email.trim(),
          replyto: values.email.trim(),
          organisation: values.organisation.trim(),
          service,
          budget: values.budget || "Not specified",
          timeline: values.timeline || "Not specified",
          message: values.details.trim(),
          botcheck: false,
        }),
      });
      const result: { success?: boolean } = await response.json();
      if (!response.ok || result.success !== true)
        throw new Error("Submission not accepted");
      setStatus("success");
      setValues({ ...empty });
      form.current?.reset();
      // Only non-identifying service information is recorded; never names, emails or project text.
      try {
        track("Enquiry submitted", { service });
      } catch {
        /* Analytics never prevents a successful enquiry. */
      }
    } catch {
      setStatus("error");
      setMessage(
        "Your enquiry could not be sent. Please try again, or email me directly below. Your details are still here.",
      );
    } finally {
      inFlight.current = false;
      requestAnimationFrame(() => notice.current?.focus());
    }
  }

  const described = (name: keyof EnquiryValues) =>
    errors[name] ? `${name}-error` : undefined;
  const error = (name: keyof EnquiryValues) =>
    errors[name] && (
      <p id={`${name}-error`} className="field-error">
        {errors[name]}
      </p>
    );

  return (
    <div className="enquiry-form-wrap">
      {status === "success" ? (
        <div
          className="success-notice"
          ref={notice}
          tabIndex={-1}
          role="status"
        >
          <span className="success-icon">
            <Icon name="check" />
          </span>
          <h3>{enquiry.success}</h3>
          <p>Your project enquiry has been sent.</p>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setStatus("idle");
              requestAnimationFrame(() =>
                form.current
                  ?.querySelector<HTMLInputElement>('[name="name"]')
                  ?.focus(),
              );
            }}
          >
            Send another enquiry <Icon name="arrow" />
          </button>
        </div>
      ) : (
        <form
          ref={form}
          onSubmit={submit}
          noValidate
          aria-label="Project enquiry"
          aria-busy={status === "loading"}
        >
          <p className="form-note">
            Fields marked <span aria-hidden="true">*</span>
            <span className="sr-only">with an asterisk</span> are required.
          </p>
          <fieldset disabled={status === "loading"}>
            <legend className="sr-only">Your project details</legend>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="name">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  maxLength={100}
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={described("name")}
                />
                {error("name")}
              </div>
              <div className="form-field">
                <label htmlFor="email">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={described("email")}
                />
                {error("email")}
              </div>
              <div className="form-field">
                <label htmlFor="organisation">Business / Organisation</label>
                <input
                  id="organisation"
                  name="organisation"
                  autoComplete="organization"
                  maxLength={200}
                  value={values.organisation}
                  onChange={(e) => update("organisation", e.target.value)}
                  aria-invalid={!!errors.organisation}
                  aria-describedby={described("organisation")}
                />
                {error("organisation")}
              </div>
              <div className="form-field">
                <label htmlFor="service">Service needed</label>
                <select
                  id="service"
                  name="service"
                  value={values.service}
                  onChange={(e) => update("service", e.target.value)}
                  aria-invalid={!!errors.service}
                  aria-describedby={described("service")}
                >
                  <option value="">Choose a service</option>
                  {enquiry.serviceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                {error("service")}
              </div>
              <div className="form-field">
                <label htmlFor="budget">
                  Budget <span className="optional">(AUD)</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={values.budget}
                  onChange={(e) => update("budget", e.target.value)}
                  aria-invalid={!!errors.budget}
                  aria-describedby={described("budget")}
                >
                  <option value="">Choose a range</option>
                  {enquiry.budgetOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                {error("budget")}
              </div>
              <div className="form-field">
                <label htmlFor="timeline">Timeline</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={values.timeline}
                  onChange={(e) => update("timeline", e.target.value)}
                  aria-invalid={!!errors.timeline}
                  aria-describedby={described("timeline")}
                >
                  <option value="">Choose a timeline</option>
                  {enquiry.timelineOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                {error("timeline")}
              </div>
              <div className="form-field full-width">
                <label htmlFor="details">
                  Project details <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  required
                  maxLength={5000}
                  placeholder="What do you want to build or improve?"
                  value={values.details}
                  onChange={(e) => update("details", e.target.value)}
                  aria-invalid={!!errors.details}
                  aria-describedby={described("details")}
                />
                {error("details")}
              </div>
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="botcheck">Leave this field empty</label>
              <input
                id="botcheck"
                name="botcheck"
                type="checkbox"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <p className="form-privacy">
              Your details are used to respond to your enquiry.{" "}
              <Link href="/privacy">Privacy details</Link>
            </p>
            <button
              className="button button-primary submit-button"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading"
                ? "Sending enquiry…"
                : "Send project enquiry"}
              <Icon name="arrow" />
            </button>
          </fieldset>
          {status === "error" && (
            <div
              ref={notice}
              tabIndex={-1}
              role="alert"
              className="form-error-notice"
            >
              {message}
            </div>
          )}
        </form>
      )}
      <p className="direct-email">
        Or email me directly:{" "}
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
    </div>
  );
}
