import Link from "next/link";


console.log('NODE_ENV=', process.env.NODE_ENV);
console.log('VERCEL_ENV=', process.env.VERCEL_ENV);

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Link
        href="/notes"
        className="md:px-4 py-2 block text-(--color-text) hover:text-(--color-secondary)"
      >
        Notes
      </Link>
    </main>
  );
}
