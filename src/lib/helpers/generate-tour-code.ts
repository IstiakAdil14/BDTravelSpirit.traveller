const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function generateTourCode(length = 10): string {
    return Array.from({ length }, () =>
        CHARS[Math.floor(Math.random() * CHARS.length)]
    ).join("");
}
