export function formatDate(date: Date): string {
  return date.toISOString().replace("T", " ").slice(0, 19);
}

export function randomId(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}
