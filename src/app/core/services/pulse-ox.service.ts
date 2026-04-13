import { Injectable, signal, inject, PLATFORM_ID, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HealthStatus, Measurement } from '../models/measurement.model';

@Injectable({ providedIn: 'root' })
export class PulseOxService {
	private platformId = inject(PLATFORM_ID);
	private measurements = signal<Measurement[]>(this.loadFromStorage());
	readonly history = computed(() => this.measurements());
	readonly latestEntry = computed(() => this.measurements()[0]);

	addEntry(spo2: number, bpm: number): void {
		const newEntry = this.createEntry(spo2, bpm);
		this.measurements.update(list => [newEntry, ...list]);
		this.saveToStorage();
	}

	private loadFromStorage(): Measurement[] {
		// Check: Sind wir im Browser? Wenn nicht, gib leeres Array zurück
		if (isPlatformBrowser(this.platformId)) {
			const data = localStorage.getItem('pulse_data');
			return data ? JSON.parse(data) : [];
		}
		return [];
	}

	deleteEntry(id: string): void {
		// Update triggert alle Komponenten, die das Signal 'history' nutzen
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
		return val < 95 ? 'danger' : 'normal';
	}

	private getBpmStatus(val: number): HealthStatus {
		if (val < 45 || val > 120) return 'danger';
		if (val < 55 || val > 100) return 'warning';
		return 'normal';
	}

	private createEntry(spo2: number, bpm: number): Measurement {
		return {
			id: crypto.randomUUID(),
			spo2,
			bpm,
			timestamp: new Date(),
			status: this.getSpo2Status(spo2),
			bpmStatus: this.getBpmStatus(bpm)
		};
	}
}