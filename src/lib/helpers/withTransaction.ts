import mongoose, { ClientSession } from "mongoose";

/**
 * Runs `fn` inside a MongoDB transaction.
 * If an external `session` is provided, reuses it (no nested transaction).
 * Otherwise, starts a new session + transaction and commits/aborts automatically.
 */
export async function withTransaction<T>(
    fn: (session: ClientSession) => Promise<T>,
    existingSession?: ClientSession
): Promise<T> {
    if (existingSession) {
        return fn(existingSession);
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const result = await fn(session);
        await session.commitTransaction();
        return result;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}
