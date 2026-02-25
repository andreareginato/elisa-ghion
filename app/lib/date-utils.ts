/**
 * Generate a human-readable date range from ISO date strings.
 * Examples:
 *   ("2026-03-15", "")           → "March 15, 2026"
 *   ("2026-03-15", "2026-03-17") → "March 15–17, 2026"
 *   ("2026-03-15", "2026-04-02") → "March 15 – April 2, 2026"
 *   ("2025-12-20", "2026-01-05") → "December 20, 2025 – January 5, 2026"
 */
export function formatDateRange(startDate: string, endDate?: string): string {
  if (!startDate) return "";

  const start = new Date(startDate + "T12:00:00");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const startMonth = monthNames[start.getMonth()];
  const startDay = start.getDate();
  const startYear = start.getFullYear();

  if (!endDate) {
    return `${startMonth} ${startDay}, ${startYear}`;
  }

  const end = new Date(endDate + "T12:00:00");
  const endMonth = monthNames[end.getMonth()];
  const endDay = end.getDate();
  const endYear = end.getFullYear();

  if (startYear !== endYear) {
    return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
  }

  if (start.getMonth() === end.getMonth()) {
    return `${startMonth} ${startDay}–${endDay}, ${startYear}`;
  }

  return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${startYear}`;
}
