// Simple in-memory OTP store for testing
const otpStore = new Map<string, { otp: string; expires: number }>();

export function storeOTP(email: string, otp: string) {
  otpStore.set(email, {
    otp,
    expires: Date.now() + 10 * 60 * 1000 // 10 minutes
  });
}

export function verifyOTP(email: string, otp: string): boolean {
  const stored = otpStore.get(email);
  if (!stored || Date.now() > stored.expires) {
    otpStore.delete(email);
    return false;
  }
  
  if (stored.otp === otp) {
    otpStore.delete(email);
    return true;
  }
  
  return false;
}