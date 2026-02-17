import { google } from "googleapis";
import { TimeSlot } from "@/types";

const TIMEZONE = "Europe/Bratislava";
const BUFFER_MINUTES = 30;

function getCalendarClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

function generateDaySlots(date: string, durationMinutes: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startHour = 8;
  const endHour = 18;
  const durationHours = durationMinutes / 60;

  for (let hour = startHour; hour + durationHours <= endHour; hour++) {
    const startH = hour;
    const endH = hour + durationHours;
    const endHour2 = Math.floor(endH);
    const endMin = Math.round((endH - endHour2) * 60);

    const start = `${date}T${startH.toString().padStart(2, "0")}:00:00+01:00`;
    const end = `${date}T${endHour2.toString().padStart(2, "0")}:${endMin.toString().padStart(2, "0")}:00+01:00`;
    slots.push({ start, end, available: true });
  }
  return slots;
}

function isOverlapping(
  slotStart: string,
  slotEnd: string,
  busyStart?: string | null,
  busyEnd?: string | null
): boolean {
  if (!busyStart || !busyEnd) return false;
  const sStart = new Date(slotStart).getTime();
  const sEnd = new Date(slotEnd).getTime();
  const bStart = new Date(busyStart).getTime();
  // Add 30-minute buffer after each booked event
  const bEnd = new Date(busyEnd).getTime() + BUFFER_MINUTES * 60 * 1000;
  return sStart < bEnd && sEnd > bStart;
}

export async function getAvailableSlots(
  date: string,
  durationMinutes: number = 60
): Promise<TimeSlot[]> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const startOfDay = new Date(`${date}T00:00:00+01:00`);
  const endOfDay = new Date(`${date}T23:59:59+01:00`);

  try {
    const response = await calendar.events.list({
      calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      timeZone: TIMEZONE,
    });

    const busySlots = response.data.items || [];
    const allSlots = generateDaySlots(date, durationMinutes);

    return allSlots.map((slot) => ({
      ...slot,
      available: !busySlots.some((busy) =>
        isOverlapping(
          slot.start,
          slot.end,
          busy.start?.dateTime,
          busy.end?.dateTime
        )
      ),
    }));
  } catch (error) {
    console.error("Google Calendar API error:", error);
    // If the API call fails, return all slots as available
    // so the user can still attempt to book
    const allSlots = generateDaySlots(date, durationMinutes);
    return allSlots;
  }
}

export async function createBooking(
  startTime: string,
  endTime: string,
  meno: string,
  priezvisko: string,
  adresa: string,
  telefon: string,
  zdravotnyStav: string,
  massageType: string
) {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Masáž - ${meno} ${priezvisko} (${massageType})`,
      description: [
        `Klient: ${meno} ${priezvisko}`,
        `Adresa: ${adresa}`,
        `Telefón: ${telefon}`,
        `Typ masáže: ${massageType}`,
        ``,
        `Zdravotný stav:`,
        zdravotnyStav,
      ].join("\n"),
      start: { dateTime: startTime, timeZone: TIMEZONE },
      end: { dateTime: endTime, timeZone: TIMEZONE },
    },
  });

  return event.data;
}
