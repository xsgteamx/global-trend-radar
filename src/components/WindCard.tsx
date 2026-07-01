import { WindWindow, Status } from '../types';

const statusText: Record<Status, string> = {
  high: '高位 🔥',
  rising: '升温 ⬆️',
  accelerating: '加速 🚀',
  seed: '苗头 🌱',
};

interface Props {
  window: WindWindow;
}

export function WindCard({ window }: Props) {
  return (
    <article className={`wind-card status-${window.status}`}>
      <div className="card-head">
        <span className="domain">
          <span className="domain-icon">{window.icon}</span>
          {window.name}
        </span>
        <span className="status-badge">{statusText[window.status]}</span>
      </div>

      <h2>{window.title}</h2>
      <p className="card-summary">{window.summary}</p>

      <div className="keyword-block">
        <p className="keyword-title">相关关键词</p>
        <div className="keywords" aria-label="相关关键词">
          {window.keywords.map((keyword) => (
            <span key={keyword}>{keyword}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
