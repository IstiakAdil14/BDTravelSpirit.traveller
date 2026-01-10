import { Document, Model } from "mongoose";

export interface PaginateResult<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
}

/**
 * Cursor-based pagination helper for MongoDB collections.
 * Uses _id as cursor for efficient pagination.
 *
 * @param collection - Mongoose model
 * @param query - MongoDB query filter
 * @param limit - Number of items per page
 * @param cursor - Base64 encoded _id for pagination
 * @returns Paginated result with items, nextCursor, and hasMore
 */
export async function paginateCursor<T extends Document>(
  collection: Model<T>,
  query: Record<string, unknown>,
  limit: number,
  cursor?: string
): Promise<PaginateResult<T>> {
  let cursorId: string | undefined;

  if (cursor) {
    try {
      // Decode base64 cursor to get ObjectId string
      cursorId = Buffer.from(cursor, 'base64').toString('ascii');
    } catch (error) {
      throw new Error('Invalid cursor');
    }
  }

  // Build query with cursor condition
  const queryWithCursor = cursorId
    ? { ...query, _id: { $lt: cursorId } }
    : query;

  // Fetch items + 1 to check if there are more
  const items = await collection
    .find(queryWithCursor)
    .sort({ _id: -1 })
    .limit(limit + 1)
    .lean();

  const hasMore = items.length > limit;
  const actualItems = hasMore ? items.slice(0, limit) : items;

  // Generate next cursor from last item
  const nextCursor = hasMore && actualItems.length > 0
    ? Buffer.from((actualItems[actualItems.length - 1] as any)._id.toString()).toString('base64')
    : undefined;

  return {
    items: actualItems as T[],
    nextCursor,
    hasMore,
  };
}
