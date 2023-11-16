import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>PPR Repro</h1>

      <ul className="mt-4 list-disc">
        <li>
          <Link href="/6">Try loading 6 pokemons</Link>
        </li>
        <li>
          <Link href="/12">Try loading 12 pokemons</Link>
        </li>
        <li>
          <Link href="/24">Why not 24?</Link>
        </li>
      </ul>
    </main>
  );
}
