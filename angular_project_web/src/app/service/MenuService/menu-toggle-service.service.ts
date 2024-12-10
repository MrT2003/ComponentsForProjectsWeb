import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuToggleService {
  // BehaviorSubject to hold the current state of the menu (open or closed)
  private menuStateSubject = new BehaviorSubject<boolean>(false); // false = closed, true = open
  private rightMenuStateSubject = new BehaviorSubject<boolean>(false); // false = closed, true = open

  // Observable to allow components to subscribe to the menu state
  menuState$ = this.menuStateSubject.asObservable();
  rightMenuState$ = this.rightMenuStateSubject.asObservable();
  // Method to toggle the menu state
  toggleLeftMenu() {
    const currentState = this.menuStateSubject.value;
    this.menuStateSubject.next(!currentState); // Toggle the state
    console.log(currentState);
  }
  toggleRightMenu() {
    const currentState = this.rightMenuStateSubject.value;
    this.rightMenuStateSubject.next(!currentState); // Toggle the state
    console.log(currentState);
  }
}
