import { Component, Input  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FilmsServiceService } from '../../service/FilmService/films-service.service';
//MODELS
import { MovieList, NewestList } from '../../model/Movies';
@Component({
  selector: 'app-newfilm-frame',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './newfilm-frame.component.html',
  styleUrl: './newfilm-frame.component.css'
})
export class NewfilmFrameComponent {
  isComplete = false;

  constructor(private router: Router, private filmsService: FilmsServiceService) {}

  @Input() item!: NewestList;
  @Input() displayFrame: number = 3;
  @Input() newest: NewestList[] = []; 

  goToDescription(movie: MovieList) {
    this.filmsService.goToDescription(movie);
  }

  checkIfComplete() {
    if (this.item.current_episode.startsWith('Hoàn tất') || this.item.current_episode.startsWith('FULL')) {
      this.isComplete = true;
    }
  }
}




