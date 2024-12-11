import { Component, Input } from '@angular/core';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-continue-frame',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './continue-frame.component.html',
  styleUrl: './continue-frame.component.css'
})
export class ContinueFrameComponent {
    @Input() thumb_url!: string;
    @Input() name!: string;
    @Input() current_episode!: string;
    
}
