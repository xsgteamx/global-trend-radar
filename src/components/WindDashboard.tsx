import { WindWindow } from '../types';
import { WindCard } from './WindCard';

interface Props {
  windows: WindWindow[];
}

export function WindDashboard({ windows }: Props) {
  return (
    <section className="dashboard" aria-label="世界观察窗">
      {windows.map((window) => (
        <WindCard key={window.id} window={window} />
      ))}
    </section>
  );
}
