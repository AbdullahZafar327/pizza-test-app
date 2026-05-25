import { NextRequest, NextResponse } from "next/server";

export type ContactRequest = {
  name: string;
  email: string;
  subject: "feedback" | "complaint" | "inquiry" | "catering" | "other";
  message: string;
  rating?: 1 | 2 | 3 | 4 | 5;
};

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequest = await request.json();

    const required = ["name", "email", "subject", "message"];
    for (const field of required) {
      if (!body[field as keyof ContactRequest]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ticketId: `TKT-${Date.now().toString(36).toUpperCase()}`,
        status: "received",
        message: `Thank you, ${body.name}! We've received your ${body.subject} and will respond to ${body.email} within 24 hours.`,
        receivedAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}