import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const durationParam = searchParams.get("duration");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Valid date parameter required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const duration = durationParam ? parseInt(durationParam, 10) : 60;
  const validDurations = [60, 90, 120];
  const safeDuration = validDurations.includes(duration) ? duration : 60;

  try {
    const slots = await getAvailableSlots(date, safeDuration);
    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Calendar API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
