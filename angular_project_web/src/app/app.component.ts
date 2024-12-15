import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_project_web';
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => { 
        window.scrollTo(0, 0); // Scroll to top of the page    
    });
  }
}
