import { Component, Input } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { FilmsServiceService } from '../../service/FilmService/films-service.service';
import { MovieList } from '../../model/Movies';
import { ContinueListService } from '../../service/ContinueListService/continue-list.service';
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
    @Input() item!: any;
    
    constructor(private filmsService: FilmsServiceService,private continueList: ContinueListService) {}

    
    goToWatch(movie: MovieList) {
      this.filmsService.goToWatch(movie);
    }
    deleteContinue (movieId: string) {
      this.continueList.deleteFromContinueList(movieId);
    }
}
