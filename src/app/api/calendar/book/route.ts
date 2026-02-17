import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/google-calendar";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      startTime,
      endTime,
      meno,
      priezvisko,
      adresa,
      telefon,
      zdravotnyStav,
      massageType,
    } = body;

    if (
      !startTime ||
      !endTime ||
      !meno ||
      !priezvisko ||
      !adresa ||
      !telefon ||
      !zdravotnyStav ||
      !massageType
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const event = await createBooking(
      startTime,
      endTime,
      meno,
      priezvisko,
      adresa,
      telefon,
      zdravotnyStav,
      massageType
    );

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
