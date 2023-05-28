import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Link
        href="/register"
        className="block text-blue-400 underline font-bold py-2 px-4 rounded mt-4 w-full max-w-xl"
      >
        Register
      </Link>
    </main>
  );
}
