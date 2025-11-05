// frontend/src/lib/http.ts
export async function fetchWithTimeout(
  url: string,
  opts: RequestInit & { timeoutMs?: number } = {}
) {
  const { timeoutMs = 800, ...init } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}
