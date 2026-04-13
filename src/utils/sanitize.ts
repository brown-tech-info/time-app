const escapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Escape HTML-special characters in a string to prevent XSS. */
export function sanitize(input: string): string {
  return input.replace(/[&<>"']/g, (ch) => escapeMap[ch]);
}
