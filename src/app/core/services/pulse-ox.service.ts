import { Injectable, signal, inject, PLATFORM_ID, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HealthStatus, Measurement } from '../models/measurement.model';

@Injectable({ providedIn: 'root' })
export class PulseOxService {
	private platformId = inject(PLATFORM_ID);
	private measurements = signal<Measurement[]>(this.loadFromStorage());
	readonly history = computed(() => this.measurements());
	readonly latestEntry = computed(() => {
		const list = this.measurements();
		return list.length > 0 ? list[0] : null;
	});

	addEntry(spo2: number, bpm: number, name: string): void {
		const newEntry = this.createEntry(spo2, bpm, name);
		this.measurements.update(list => [newEntry, ...list]);
		this.saveToStorage();
	}

	private loadFromStorage(): Measurement[] {
		if (isPlatformBrowser(this.platformId)) {
			const data = localStorage.getItem('pulse_data');
			return data ? JSON.parse(data) : [];
		}
		return [];
	}

	deleteEntry(id: string): void {
		this.measurements.update(prev => prev.filter(m => m.id !== id));
		this.saveToStorage();
	}

	private saveToStorage(): void {
		if (isPlatformBrowser(this.platformId)) {
			const data = JSON.stringify(this.measurements());
			localStorage.setItem('pulse_data', data);
		}
	}

	private getSpo2Status(val: number): HealthStatus {
		if (val === 0 || val < 90) return 'danger';
		return val < 95 ? 'warning' : 'normal';
	}

	private getBpmStatus(val: number): HealthStatus {
		if (val < 60 || val > 130) return 'danger';
		if (val < 70 || val > 110) return 'warning';
		return 'normal';
	}

	private createEntry(spo2: number, bpm: number, name: string): Measurement {
		return {
			id: crypto.randomUUID(),
			spo2,
			bpm,
			name,
			timestamp: new Date(),
			status: this.getSpo2Status(spo2),
			bpmStatus: this.getBpmStatus(bpm)
		};
	}

	getTrendPoints(currentId: string, type: 'bpm' | 'spo2'): string {
		const all = this.measurements();
		const index = all.findIndex(m => m.id === currentId);
		const subset = all.slice(index, index + 5).reverse();

		if (subset.length < 2) return '';

		const min = type === 'bpm' ? 60 : 85;
		const max = type === 'bpm' ? 130 : 100;

		return this.generatePath(subset.map(m => m[type]), min, max);
	}

	private generatePath(values: number[], min: number, max: number): string {
		const range = max - min;
		return values.map((val, i) => {
			const x = i * 25;
			const clampedVal = Math.max(min, Math.min(max, val));
			const y = 30 - ((clampedVal - min) / range) * 30;
			return `${x},${y}`;
		}).join(' ');
	}

}