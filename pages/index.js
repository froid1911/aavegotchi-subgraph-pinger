import React from "react";
import useSWR from "swr";
import Subgraph from "../components/subgraph";

export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/pingAll", fetcher);

  if (!data || data.length == 0) {
    return "Nothing to show";
  }

  return (
    <div className="container">
      <h2>Subgraphs of Aavegotchi</h2>
      <div className="row">
        <table className="table">
          <thead>
            <th>Subgraph Name</th>
            <th>Subgraph Meta</th>
          </thead>
          <tbody>
            {data.map((e) => {
              return <Subgraph name={e.name} meta={e.meta} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
