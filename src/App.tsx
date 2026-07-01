import data from '../data/today.json';
import { RadarData } from './types';
import { WindDashboard } from './components/WindDashboard';
import { StatusTags } from './components/StatusTags';
import { KeyChanges } from './components/KeyChanges';

const radarData = data as RadarData;

export default function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Global Trend Radar</p>
          <h1>全球风向盘</h1>
          <p className="date">{radarData.date}</p>
        </div>
        <div className="summary">
          <p className="summary-main">{radarData.headline}</p>
          <p className="summary-sub">{radarData.summary}</p>
        </div>
      </section>

      <WindDashboard windows={radarData.windows} />

      <section className="bottom-grid">
        <StatusTags groups={radarData.statusGroups} />
        <KeyChanges changes={radarData.keyChanges} />
      </section>
    </main>
  );
}
