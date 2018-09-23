import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  evenNumbers = [];
  oddNumbers = [];

  onGetEmitNumber(numberEmitted: number) {
    if (numberEmitted % 2 === 0) {
      this.evenNumbers.push(numberEmitted);
    } else {
      this.oddNumbers.push(numberEmitted);
    }
  }
}
