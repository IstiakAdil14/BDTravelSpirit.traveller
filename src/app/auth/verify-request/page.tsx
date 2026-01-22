export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="text-3xl font-bold">Check your email</h2>
        <p className="text-gray-600">
          A sign in link has been sent to your email address.
        </p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-sm text-blue-800">
            Click the link in the email to complete your sign in.
          </p>
        </div>
      </div>
    </div>
  );
}