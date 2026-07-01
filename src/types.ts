export type Status = 'high' | 'rising' | 'accelerating' | 'seed';

export interface WindWindow {
  id: string;
  icon: string;
  name: string;
  title: string;
  summary: string;
  keywords: string[];
  status: Status;
}

export interface KeyChange {
  from: string;
  to: string;
}

export interface RadarData {
  date: string;
  headline: string;
  summary: string;
  windows: WindWindow[];
  statusGroups: Record<Status, string[]>;
  keyChanges: KeyChange[];
}
