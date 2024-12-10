import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

//SERVICES  
import { CategoryService } from '../../service/CategoryService/category.service';
//MODELS
import { RouterModule } from '@angular/router';
import { GenreList } from '../../model/Categories';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './genres-page.component.html',
  styleUrl: './genres-page.component.css'
})
export class GenresPageComponent  implements OnInit{
 
  //img right menu (genres)
  newest = 'assets/res-rightmenu/rick.jpg'; 
  genre = 'assets/res-rightmenu/rick.jpg';
  ctn = 'assets/res-rightmenu/th.jpg';
  // icon left menu
  show = 'assets/res-leftmenu/Arrow down-circle.png';
  home = 'assets/res-leftmenu/Squircle.png';
  sort = 'assets/res-leftmenu/Discover.png';
  recent = 'assets/res-leftmenu/Recent.png';  
  playlists = 'assets/res-leftmenu/Playlists.png';
  watchlist = 'assets/res-leftmenu/Watchlist.png';
  continue = 'assets/res-leftmenu/Continue.png';
  settings = 'assets/res-leftmenu/Settings.png';
  logout = 'assets/res-leftmenu/Log Out.png';


  categoryService = inject(CategoryService);
  
  genreList =  signal<GenreList[]>([]);
  
  trackById(index: number, item: GenreList): number {
    return item._id; // Trả về thuộc tính `_id` làm giá trị duy nhất
  }
  ngOnInit(): void {
    this.loadAllGenres();
  }
  loadAllGenres(){
    this.categoryService.getAllGenres().subscribe((res:GenreList[]) => {
      this.genreList.set(res); 
    })
  }

}
