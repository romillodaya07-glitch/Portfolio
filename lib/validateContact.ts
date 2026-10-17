/** Shared, dependency-free validation for the contact form (client + server). */

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  company?: string; // honeypot — must stay empty
};

export type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactInput>): {
  valid: boolean;
  errors: FieldErrors;
  isBot: boolean;
  clean: ContactInput;
} {
  const errors: FieldErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();
  const company = (input.company ?? "").trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "That name is too long.";

  if (!email) errors.email = "Please enter your email.";
  else if (email.length > 254 || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email.";

  if (message.length < 10)
    errors.message = "A little more detail, please (10+ characters).";
  else if (message.length > 5000) errors.message = "That message is too long.";

  const isBot = company.length > 0;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    isBot,
    clean: { name, email, message, company },
  };
}
