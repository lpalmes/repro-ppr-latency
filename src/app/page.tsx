import { Suspense } from "react";

async function fetchListOfNumbers() {
  // simulate network fetch
  await sleep(200);

  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}

export default async function Home() {
  const listOfNumbers = await fetchListOfNumbers();
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
    <div className="w-20 h-20 flex justify-center items-center bg-orange-400 rounded-md">
      <span>Loading</span>
    </div>
  );
}

async function Block(props: { number: number }) {
  await sleep(2000); // wait for two seconds
  await sleep(props.number * 100); // and add some afterwards
  return (
    <div className="w-20 h-20 flex justify-center items-center bg-orange-400 rounded-md">
      <span>Block {props.number}</span>
    </div>
  );
}

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
