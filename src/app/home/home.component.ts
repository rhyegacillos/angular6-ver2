import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, Observer, interval} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numbersSubscription: Subscription;
  customObservable: Subscription;

  constructor() {
  }

  ngOnInit() {
    const myNumbers = interval(1000).
      pipe(map(
      (data: number) => {
        return data * 2;
      }
    ));

    this.numbersSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.next('next package');
        }, 2000);
        setTimeout(() => {
          observer.next('second package');
        }, 4000);
        setTimeout(() => {
          observer.complete();
        }, 5000);
        setTimeout(() => {
          observer.next('third package');
        }, 6000);
      });

    this.customObservable = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('completed');
      }
    );
  }

  ngOnDestroy(): void {
    this.numbersSubscription.unsubscribe();
    this.customObservable.unsubscribe();
  }

}

