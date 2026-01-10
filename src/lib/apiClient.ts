// src/lib/apiClient.ts
export async function serverFetch<T = unknown>(url: string, opts?: RequestInit & { timeoutMs?: number }) : Promise<T> {
  const controller = new AbortController();
  const timeout = opts?.timeoutMs ?? 15000;
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal, ...opts });
    if (!res.ok) throw new Error(`Fetch ${url} failed with ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(id);
  }
}
