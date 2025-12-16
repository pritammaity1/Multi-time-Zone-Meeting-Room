// Mock Data for Testing Purposes

export const offices = [
  {
    id: "ny",
    name: "New York ",
    timezone: "America/New_York",
  },
  {
    id: "ldn",
    name: "London",
    timezone: "Europe/London",
  },
  {
    id: "tyo",
    name: "Tokyo",
    timezone: "Asia/Tokyo",
  },
];

export const rooms = [
  {
    id: "ny-small",
    officeId: "ny",
    name: "NY Small",
    capacity: 4,
  },
  {
    id: "ny-medium",
    officeId: "ny",
    name: "NY Medium",
    capacity: 8,
  },
  {
    id: "ny-large",
    officeId: "ny",
    name: "NY Large",
    capacity: 20,
  },

  {
    id: "ldn-small",
    officeId: "ldn",
    name: "London Small",
    capacity: 4,
  },
  {
    id: "ldn-medium",
    officeId: "ldn",
    name: "London Medium",
    capacity: 8,
  },
  {
    id: "ldn-large",
    officeId: "ldn",
    name: "London Large",
    capacity: 20,
  },

  {
    id: "tyo-small",
    officeId: "tyo",
    name: "Tokyo Small",
    capacity: 4,
  },
  {
    id: "tyo-medium",
    officeId: "tyo",
    name: "Tokyo Medium",
    capacity: 8,
  },
  {
    id: "tyo-large",
    officeId: "tyo",
    name: "Tokyo Large",
    capacity: 20,
  },
];

// Intentionally overlaping bookings

export const mockbookings = [
  {
    id: "1",
    roomId: "ny-small",
    title: "Team Standup",
    startTime: "2025-10-17T09:00:00", // Room local time Ny
    endTime: "2025-10-17T09:30:00",
    attendees: 4,
    isRecurring: true,
    frequency: "Weekly",
    status: "scheduled",
  },
  {
    id: "2",
    roomId: "ny-small",
    title: "Client Call",
    startTime: "2025-10-17T09:15:00", // conflict
    endTime: "2025-10-17T10:00:00",
    attendees: 3,
    isRecurring: false,

    status: "scheduled",
  },
  {
    id: "3",
    roomId: "ldn-medium",
    title: "Design Review",
    startTime: "2025-10-17T14:00:00",
    endTime: "2025-10-17T15:30:00",
    attendees: 6,
    isRecurring: false,

    status: "scheduled",
  },
];
