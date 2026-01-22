import { redirect } from "next/navigation";

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ error?: string, callbackUrl?: string }> }) {
    const Login = (await import("@/components/auth/Login")).default;
    return <Login />;
}