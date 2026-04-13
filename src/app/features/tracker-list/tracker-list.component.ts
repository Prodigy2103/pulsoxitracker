import { Component, inject } from '@angular/core';
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

  onDelete(id: string): void {
    // 1. Hinweis/Bestätigung anzeigen
    if (confirm('Eintrag wirklich löschen?')) {
      // 2. Löschvorgang im Service auslösen
      this.service.deleteEntry(id);
      // 3. (Optional) Hier könntest du eine Erfolgsmeldung anzeigen
    }
  }
}
