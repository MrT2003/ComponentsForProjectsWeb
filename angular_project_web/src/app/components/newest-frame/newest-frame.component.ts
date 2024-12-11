import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-newest-frame',
  standalone: true,
  imports: [],
  templateUrl: './newest-frame.component.html',
  styleUrl: './newest-frame.component.css'
})
export class NewestFrameComponent {
    @Input() poster_url!: string;
    @Input() name!: string;
    @Input() current_episode!: string;

}
