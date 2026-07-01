import { KeyChange } from '../types';

interface Props {
  changes: KeyChange[];
}

export function KeyChanges({ changes }: Props) {
  return (
    <section className="panel">
      <h2>今天最该看懂的变化</h2>
      <ol className="change-list">
        {changes.map((change) => (
          <li key={`${change.from}-${change.to}`}>
            <span>{change.from}</span>
            <b>→</b>
            <span>{change.to}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
