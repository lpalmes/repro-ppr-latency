import { Suspense } from "react";

async function fetchListOfNumbers(n: number) {
  // simulate network fetch
  await sleep(200);

  return Array.from(Array(n).keys());
}

export default async function BlockPage({
  params,
}: {
  params: { blocks: string };
}) {
  const listOfNumbers = await fetchListOfNumbers(parseInt(params.blocks, 10));
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>PPR Repro</h1>

      <div className="grid grid-cols-3 gap-4 mt-5">
        {listOfNumbers.map((num) => (
          <Suspense fallback={<BlockSkeleton />} key={num}>
            <Block number={num} />
          </Suspense>
        ))}
      </div>
    </main>
  );
}

function BlockSkeleton() {
  return (
    <div className="w-80 h-80 flex justify-center items-center bg-orange-400 rounded-md">
      <span>Loading</span>
    </div>
  );
}

async function Block(props: { number: number }) {
  await sleep(2000); // wait for two seconds
  const secret = await fetchSecret();
  return (
    <div className="w-80 h-80 flex justify-center items-center bg-orange-400 rounded-md">
      <span>{secret}</span>
    </div>
  );
}

async function fetchSecret() {
  const res = await fetch("https://generate-secret.vercel.app/32", {
    cache: "no-store",
  });
  const text = await res.text();
  return text;
}

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
