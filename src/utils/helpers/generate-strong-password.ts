const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function generateStrongPassword(length = 16): string {
    return Array.from({ length }, () =>
        CHARSET[Math.floor(Math.random() * CHARSET.length)]
    ).join("");
}
