import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() emitNumber = new EventEmitter<number>();
  count = 0;
  intervalRef;

  constructor() { }

  ngOnInit() {
  }

  onStartInterval() {
    this.intervalRef = setInterval(() => {
      // console.log(this.count++);
      this.emitNumber.emit(this.count);
      this.count++;
    }, 1000);
  }
  onStopInterval() {
    clearInterval(this.intervalRef);
    console.log('current number: ', this.count);
  }
}
