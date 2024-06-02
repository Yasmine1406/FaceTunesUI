import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-track',
  standalone: true,
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss'
})
export class TrackComponent {
  @Input() songCover!: string;
  @Input() songTitle!: string;
  @Input() songUrl!: string;
}
