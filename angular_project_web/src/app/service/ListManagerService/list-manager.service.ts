import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ListItem } from '../../model/List';

@Injectable({
  providedIn: 'root',
})
export class ListManagerService {
  private renderListSubject = new BehaviorSubject<ListItem[]>([]);
  renderList$ = this.renderListSubject.asObservable();

  private renderContinueListSubject = new BehaviorSubject<ListItem[]>([]);
  renderContinueList$ = this.renderContinueListSubject.asObservable();

  private isFavoriteSubject = new BehaviorSubject<boolean>(false);
  isFavorite$ = this.isFavoriteSubject.asObservable();

  private isWatchListSubject = new BehaviorSubject<boolean>(false);
  isWatchList$ = this.isWatchListSubject.asObservable();

  private isContinueSubject = new BehaviorSubject<boolean>(false);
  isContinue$ = this.isContinueSubject.asObservable();

  private favoriteList: ListItem[] = [];
  private watchList: ListItem[] = [];
  private continueList: ListItem[] = [];

  setFavoriteList(list: ListItem[]): void {
    this.favoriteList = list;
  }

  setWatchList(list: ListItem[]): void {
    this.watchList = list;
  }

  setContinueList(list: ListItem[]): void {
    this.continueList = list;
  }

  getContinueList(): ListItem[] {
    return this.continueList;
  }

  openFavoriteList(): void {
    this.isFavoriteSubject.next(true);
    this.isWatchListSubject.next(false);
    this.isContinueSubject.next(false);
    this.renderListSubject.next(this.favoriteList);
  }

  openWatchList(): void {
    this.isFavoriteSubject.next(false);
    this.isWatchListSubject.next(true);
    this.isContinueSubject.next(false);
    this.renderListSubject.next(this.watchList);
  }

  openContinueList(): void {
    this.isFavoriteSubject.next(false);
    this.isWatchListSubject.next(false);
    this.isContinueSubject.next(true);
    this.renderListSubject.next(this.continueList);
  }
}
