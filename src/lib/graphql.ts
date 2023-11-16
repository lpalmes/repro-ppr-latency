export async function fetchQuery(
  query: string,
  variables: any = {},
  next?: NextFetchRequestConfig,
  cache?: RequestCache
) {
  const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    cache: cache,
    body: JSON.stringify({
      query,
      variables,
    }),
    next,
  });

  if (!response.ok) {
    throw new Error("Error fetching");
  }

  const json = await response.json();

  if (json.errors) {
    console.log(json.errors);
    throw new Error("GraphQL error");
  }

  return json.data;
}

export function graphql(template: TemplateStringsArray) {
  return template.join("\n");
}
