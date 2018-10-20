import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') myForm: NgForm;
  subscriptions = ['Basic', 'Advance', 'Pro'];
  submitted = false;
  signUpForm = {
    email: '',
    subscription: '',
    password: ''
  };

  onSubmit() {
    this.submitted = true;
    console.log(this.signUpForm);
    this.signUpForm.email = this.myForm.form.value.email;
    this.signUpForm.subscription = this.myForm.form.value.subscription;
    this.signUpForm.password = this.myForm.form.value.password;

    this.myForm.reset();
  }
}
