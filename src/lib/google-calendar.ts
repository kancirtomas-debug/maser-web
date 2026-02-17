import { google } from "googleapis";
import { TimeSlot } from "@/types";

function getCalendarClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

function generateDaySlots(date: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = 8; hour < 18; hour++) {
    const start = `${date}T${hour.toString().padStart(2, "0")}:00:00`;
    const end = `${date}T${(hour + 1).toString().padStart(2, "0")}:00:00`;
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
  const bEnd = new Date(busyEnd).getTime();
  return sStart < bEnd && sEnd > bStart;
}

export async function getAvailableSlots(date: string): Promise<TimeSlot[]> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const startOfDay = new Date(`${date}T00:00:00+01:00`);
  const endOfDay = new Date(`${date}T23:59:59+01:00`);

  const response = await calendar.events.list({
    calendarId,
    timeMin: startOfDay.toISOString(),
    timeMax: endOfDay.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    timeZone: "Europe/Bratislava",
  });

  const busySlots = response.data.items || [];
  const allSlots = generateDaySlots(date);

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
      start: { dateTime: startTime, timeZone: "Europe/Bratislava" },
      end: { dateTime: endTime, timeZone: "Europe/Bratislava" },
    },
  });

  return event.data;
}
