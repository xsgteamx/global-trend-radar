import { Status } from '../types';

const labels: Record<Status, string> = {
  high: '【高位 🔥】',
  rising: '【升温 ⬆️】',
  accelerating: '【加速 🚀】',
  seed: '【苗头 🌱】',
};

interface Props {
  groups: Record<Status, string[]>;
}

export function StatusTags({ groups }: Props) {
  const order: Status[] = ['high', 'rising', 'accelerating', 'seed'];

  return (
    <section className="panel">
      <h2>今日状态标签</h2>
      <div className="status-list">
        {order.map((status) => (
          <div className={`status-row status-row-${status}`} key={status}>
            <strong>{labels[status]}</strong>
            <div className="status-cloud">
              {groups[status].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
