// Convert Date objects (or BSON Dates) into ISO strings in an object tree.
// Light recursive serializer that leaves primitives alone.

export function serializeDates<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (obj instanceof Date) return (obj.toISOString() as unknown) as T;
  if (Array.isArray(obj)) {
    return obj.map((v) => serializeDates(v)) as unknown as T;
  }
  if (typeof obj === 'object') {
    const out: any = {};
    for (const [k, v] of Object.entries(obj as any)) {
      if (v instanceof Date) out[k] = v.toISOString();
      else out[k] = serializeDates(v);
    }
    return out as T;
  }
  return obj;
}