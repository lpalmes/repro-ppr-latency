import { fetchQuery, graphql } from "@/lib/graphql";
import { Suspense } from "react";

export default async function BlockPage({
  params,
}: {
  params: { blocks: string };
}) {
  const data = await fetchQuery(
    graphql`
      query samplePokeAPIquery($limit: Int!) {
        pokemon_v2_pokemon(limit: $limit) {
          id
        }
      }
    `,
    {
      limit: parseInt(params.blocks),
    },
    {
      revalidate: 30,
    }
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>PPR Repro</h1>

      <div className="grid grid-cols-3 gap-4 mt-5">
        {data.pokemon_v2_pokemon.map((pokemon: any) => (
          <Suspense fallback={<BlockSkeleton />} key={pokemon.id}>
            <Block id={pokemon.id} />
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

async function Block(props: { id: number }) {
  await sleep(2000); // wait for two seconds
  const data = await fetchQuery(
    graphql`
      query pokemonQuery($id: Int!) {
        pokemon_v2_pokemon_by_pk(id: $id) {
          id
          name
        }
      }
    `,
    { id: props.id },
    {},
    "no-store"
  );

  const pokemon = data.pokemon_v2_pokemon_by_pk;
  return (
    <div className="w-80 h-80 flex justify-center items-center bg-orange-400 rounded-md">
      <span>{pokemon.name}</span>
    </div>
  );
}

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
