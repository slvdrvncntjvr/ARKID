import Link from "next/link";

const ERROR_TEXT: Record<string, string> = {
  missing: "Please enter both username and password.",
  invalid: "Invalid admin credentials.",
};

interface LoginPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CertificatesLoginPage({ searchParams }: LoginPageProps) {
  const resolved = searchParams ? await searchParams : {};
  const errorRaw = resolved.error;
  const errorKey = Array.isArray(errorRaw) ? errorRaw[0] : errorRaw;
  const errorMessage = errorKey ? ERROR_TEXT[errorKey] : "";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-12">
      <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-xl">
        <h1 className="text-2xl font-semibold">Certificate Admin Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to issue and revoke certificates.
        </p>

        {errorMessage ? (
          <p className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
            {errorMessage}
          </p>
        ) : null}

        <form action="/api/certificates/auth/login" method="post" className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Sign In
          </button>
        </form>

        <Link
          href="/certificates"
          className="mt-5 inline-block text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Back to verification portal
        </Link>
      </div>
    </main>
  );
}
