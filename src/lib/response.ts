import { NextResponse } from "next/server";

export interface CacheOptions {
  maxAge?: number;
  staleWhileRevalidate?: number;
}

/**
 * Creates a standardized API response with optional caching headers.
 */
export function mkResponse(data: unknown, cache?: CacheOptions) {
  const headers = new Headers();

  if (cache) {
    const directives = [];
    if (cache.maxAge) directives.push(`max-age=${cache.maxAge}`);
    if (cache.staleWhileRevalidate) directives.push(`stale-while-revalidate=${cache.staleWhileRevalidate}`);
    headers.set("Cache-Control", directives.join(", "));
  } else {
    headers.set("Cache-Control", "no-store");
  }

  return NextResponse.json(data, { headers });
}

/**
 * Creates a paginated response with cursor-based pagination.
 */
export function mkPagedResponse(
  items: unknown[],
  nextCursor: string | undefined,
  hasMore: boolean,
  cache?: CacheOptions
) {
  return mkResponse(
    {
      items,
      nextCursor,
      hasMore,
    },
    cache
  );
}

/**
 * Creates an error response.
 */
export function mkError(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}
