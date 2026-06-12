import mongoose, { Model, Schema } from "mongoose";

/**
 * Hot-reload-safe model factory.
 * Returns the existing compiled model if available, otherwise compiles a new one.
 */
export function defineModel<T, M extends Model<T> = Model<T>>(
    name: string,
    schema: Schema<T, M>
): M {
    return (mongoose.models[name] as M) || mongoose.model<T, M>(name, schema);
}
