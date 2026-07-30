// Simple in-memory OTP store for testing
const globalForOtp = globalThis as unknown as {
  otpStore: Map<string, { otp: string; expires: number }> | undefined;
};

const otpStore = globalForOtp.otpStore ?? new Map<string, { otp: string; expires: number }>();
if (process.env.NODE_ENV !== "production") globalForOtp.otpStore = otpStore;

export function storeOTP(email: string, otp: string) {
  otpStore.set(email.toLowerCase(), {
    otp,
    expires: Date.now() + 30 * 60 * 1000 // 30 minutes
  });
}

export function verifyOTP(email: string, otp: string): boolean {
  const normalizedEmail = email.toLowerCase();
  const stored = otpStore.get(normalizedEmail);
  if (!stored || Date.now() > stored.expires) {
    otpStore.delete(normalizedEmail);
    return false;
  }
  
  if (stored.otp === otp) {
    otpStore.delete(normalizedEmail);
    return true;
  }
  
  return false;
}