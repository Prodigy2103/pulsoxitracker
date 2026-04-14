// src/app/app.component.ts
import { Component } from '@angular/core';
import { TrackerFormComponent } from './features/tracker-form/tracker-form.component';
import { TrackerListComponent } from './features/tracker-list/tracker-list.component';
import { RouterOutlet } from '@angular/router';
import { TrackerStatusComponent } from "./features/tracker-status/tracker-status.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TrackerFormComponent, TrackerListComponent, RouterOutlet, TrackerStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PulseOx Tracker';
}