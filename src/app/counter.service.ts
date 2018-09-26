import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  activeCounter = 0;
  inactiveCounter = 0;

  constructor() { }

  onActiveCounter() {
    this.activeCounter++;
    alert('count: ' + this.activeCounter);
  }

  onInactiveCounter() {
    this.inactiveCounter++;
    alert('count: ' + this.inactiveCounter);
  }
}
