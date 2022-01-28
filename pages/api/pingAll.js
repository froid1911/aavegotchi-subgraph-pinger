// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createApolloFetch } from "apollo-fetch";
import * as subgraphs from "../../subgraphs.json";

const query = `{_meta {block { hash number } deployment hasIndexingErrors}}`;

export default async function handler(req, res) {
  const fetchMetaData = async (graphName) => {
    const graph = createApolloFetch({
      uri: `https://api.thegraph.com/subgraphs/name/${graphName}`,
    });

    const { data } = await graph({ query });
    return { name: graphName, meta: data._meta };
  };

  const updateDb = (result) => {};

  let promisses = [];
  for (let i = 0; i < subgraphs.length; i++) {
    promisses.push(fetchMetaData(subgraphs[i]));
  }

  res.json(await Promise.all(promisses));
}
