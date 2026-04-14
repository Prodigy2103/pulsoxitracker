export type HealthStatus = 'normal' | 'warning' | 'danger';

export interface Measurement {
	id: string;
	spo2: number;
	bpm: number;
	timestamp: Date;
	status: HealthStatus;
	bpmStatus: string;
	name: string;
}