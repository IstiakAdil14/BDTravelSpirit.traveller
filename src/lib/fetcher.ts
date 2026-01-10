// Typed server fetch wrapper for internal API calls in server components.
// Use `absolute` when running in serverless or if you need full origin.
// Default no-store; allow override.

export async function serverFetch<T = unknown>(url: string, opts?: RequestInit & { absolute?: boolean }) : Promise<T> {
  const init: RequestInit = { method: 'GET', ...opts };
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return (await res.json()) as T;
}
