import { NextRequest, NextResponse } from "next/server";

export type ReservationRequest = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
};

export type ReservationResponse = {
  reservationId: string;
  status: "confirmed" | "pending" | "waitlisted";
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  tableNumber: number;
  confirmationCode: string;
  message: string;
};

const AVAILABLE_TIMES = [
  "12:00", "12:30", "13:00", "13:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
];

export async function POST(request: NextRequest) {
  try {
    const body: ReservationRequest = await request.json();

    const required = ["name", "email", "phone", "date", "time", "guests"];
    for (const field of required) {
      if (!body[field as keyof ReservationRequest]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    if (body.guests < 1 || body.guests > 12) {
      return NextResponse.json(
        { error: "Party size must be between 1 and 12 guests" },
        { status: 400 }
      );
    }

    if (!AVAILABLE_TIMES.includes(body.time)) {
      return NextResponse.json(
        {
          error: "Selected time is not available",
          availableTimes: AVAILABLE_TIMES,
        },
        { status: 400 }
      );
    }

    const reservationDate = new Date(body.date);
    if (isNaN(reservationDate.getTime()) || reservationDate < new Date()) {
      return NextResponse.json(
        { error: "Please select a future date" },
        { status: 400 }
      );
    }

    const tableNumber = Math.floor(Math.random() * 20) + 1;
    const confirmationCode = `NP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const response: ReservationResponse = {
      reservationId: `RES-${Date.now().toString(36).toUpperCase()}`,
      status: "confirmed",
      name: body.name,
      email: body.email,
      date: body.date,
      time: body.time,
      guests: body.guests,
      tableNumber,
      confirmationCode,
      message: `Reservation confirmed for ${body.guests} guest${body.guests > 1 ? "s" : ""} on ${body.date} at ${body.time}. Your confirmation code is ${confirmationCode}.`,
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    availableTimes: AVAILABLE_TIMES,
    maxPartySize: 12,
    advanceBookingDays: 30,
    message: "Use POST to create a reservation",
  });
}