import { Component, inject, signal } from '@angular/core';
import { PulseOxService } from '../../core/services/pulse-ox.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tracker-list',
  imports: [DatePipe],
  templateUrl: './tracker-list.component.html',
  styleUrl: './tracker-list.component.scss'
})
export class TrackerListComponent {
  private service = inject(PulseOxService);
  readonly history = this.service.history;
  isModalOpen = signal(false);
  activeId = signal<string | null>(null);

  openDeleteModal(id: string): void {
    this.activeId.set(id);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.activeId.set(null);
  }

  confirmDelete(): void {
    if (this.activeId()) this.service.deleteEntry(this.activeId()!);
    this.closeModal();
  }

  getTrend(id: string, type: 'bpm' | 'spo2'): string {
    return this.service.getTrendPoints(id, type);
  }

  getBounds(id: string, type: 'bpm' | 'spo2') {
    const all = this.history();
    const index = all.findIndex(m => m.id === id);
    const subset = all.slice(index, index + 5).map(m => m[type]);

    return {
      max: Math.max(...subset),
      min: Math.min(...subset)
    };
  }
}