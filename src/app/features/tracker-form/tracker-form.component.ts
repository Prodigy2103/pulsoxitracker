import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PulseOxService } from '../../core/services/pulse-ox.service';

@Component({
  selector: 'app-tracker-form',
  imports: [FormsModule],
  templateUrl: './tracker-form.component.html',
  styleUrl: './tracker-form.component.scss'
})
export class TrackerFormComponent {
  private service = inject(PulseOxService);

  spo2: number | null = null;
  bpm: number | null = null;

  isValid(): boolean {
    return this.spo2 !== null && this.bpm !== null;
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.spo2 !== null && this.bpm !== null) {
      this.service.addEntry(this.spo2, this.bpm);
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.spo2 = null;
    this.bpm = null;
  }
}
