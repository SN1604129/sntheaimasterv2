import { enquiry } from "@/content/services";

export type EnquiryValues = {
  name: string;
  email: string;
  organisation: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
};
export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length > 100)
    errors.name = "Keep your name under 100 characters.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) ||
    values.email.length > 254
  )
    errors.email = "Please enter a valid email address.";
  if (!values.details.trim())
    errors.details = "Tell me a little about your project.";
  else if (values.details.trim().length > 5000)
    errors.details = "Keep project details under 5,000 characters.";
  if (values.organisation.length > 200)
    errors.organisation = "Keep the organisation name under 200 characters.";
  if (values.service && !enquiry.serviceOptions.includes(values.service))
    errors.service = "Please choose a listed service.";
  if (values.budget && !enquiry.budgetOptions.includes(values.budget))
    errors.budget = "Please choose a listed budget.";
  if (values.timeline && !enquiry.timelineOptions.includes(values.timeline))
    errors.timeline = "Please choose a listed timeline.";
  return errors;
}
