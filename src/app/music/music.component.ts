import { Component } from '@angular/core';
import { TrackComponent } from './track/track.component';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [TrackComponent],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent {

}
