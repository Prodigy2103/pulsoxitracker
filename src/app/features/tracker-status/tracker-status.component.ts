import { Component, computed, inject } from '@angular/core';
import { PulseOxService } from '../../core/services/pulse-ox.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tracker-status',
  imports: [DatePipe],
  templateUrl: './tracker-status.component.html',
  styleUrl: './tracker-status.component.scss'
})
export class TrackerStatusComponent {
  private service = inject(PulseOxService);
  latest = this.service.latestEntry;

  overallStatus = computed(() => {
    const entry = this.latest();
    if (!entry) return 'normal';

    if (entry.status === 'danger' || entry.bpmStatus === 'danger') return 'danger';
    if (entry.status === 'warning' || entry.bpmStatus === 'warning') return 'warning';
    return 'normal';
  });

  statusMessage = computed(() => {
    const entry = this.latest();
    if (!entry) return 'Bereit für Messung';

    const spo2Msg = entry.spo2 < 95 ? 'Sauerstoff zu niedrig' : '';
    const bpmMsg = this.getBpmDetail(entry.bpm);

    return [spo2Msg, bpmMsg].filter(Boolean).join(' & ') || 'Werte im Normbereich';
  });

  private getBpmDetail(bpm: number): string {
    if (bpm > 130) return 'Puls kritisch hoch';
    if (bpm > 110) return 'Puls erhöht';
    if (bpm < 60) return 'Puls kritisch niedrig';
    if (bpm < 70) return 'Puls niedrig';
    return '';
  }
}
