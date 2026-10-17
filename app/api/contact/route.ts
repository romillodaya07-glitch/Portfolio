import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact } from "@/lib/validateContact";

export const runtime = "nodejs";

type ApiResponse = {
  success: boolean;
  error?: string;
  fields?: Record<string, string>;
};

// Best-effort in-memory rate limit (per warm instance). Not a hard guarantee
// on serverless, but a cheap deterrent against rapid submissions.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function json(body: ApiResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json(
      { success: false, error: "Too many messages — please try again later." },
      429
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: "Invalid request." }, 400);
  }

  const { valid, errors, isBot, clean } = validateContact(
    body as Record<string, string>
  );

  // Silently accept bots (honeypot filled) so they don't retry.
  if (isBot) return json({ success: true }, 200);

  if (!valid) {
    return json(
      { success: false, error: "Please fix the errors below.", fields: errors },
      400
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env.");
    return json(
      {
        success: false,
        error: "Messaging isn't configured yet. Please email directly for now.",
      },
      503
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: clean.email,
      subject: `Portfolio enquiry from ${clean.name}`,
      text: `Name: ${clean.name}\nEmail: ${clean.email}\n\n${clean.message}`,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return json(
        { success: false, error: "Couldn't send right now — please try again." },
        502
      );
    }
    return json({ success: true }, 200);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unexpected error";
    console.error("[contact] Send failed:", msg);
    return json(
      { success: false, error: "Something went wrong — please try again." },
      500
    );
  }
}
