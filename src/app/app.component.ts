// src/app/app.component.ts
import { Component } from '@angular/core';
import { TrackerFormComponent } from './features/tracker-form/tracker-form.component';
import { TrackerListComponent } from './features/tracker-list/tracker-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TrackerFormComponent, TrackerListComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PulseOx Tracker';
}