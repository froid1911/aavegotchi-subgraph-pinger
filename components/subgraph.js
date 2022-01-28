export default function Subgraph({ name, meta }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{JSON.stringify(meta, null, 2)}</td>
    </tr>
  );
}
