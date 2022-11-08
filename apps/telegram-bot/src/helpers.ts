export function isExpired(dateParameter: Date): boolean {
  const today = new Date();

  return !(
    dateParameter.getDate() === today.getDate() &&
    dateParameter.getMonth() === today.getMonth() &&
    dateParameter.getFullYear() === today.getFullYear()
  );
}
