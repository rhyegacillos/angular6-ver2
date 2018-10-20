import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['Male', 'Female'];
  signUpForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  onSubmit() {
    console.log(this.signUpForm)
    this.signUpForm.reset({
      'gender' : 'Male'
    });
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('Male'),
      'hobbies': new FormArray([])
    });

    this.signUpForm.valueChanges.subscribe(
      value => {
        console.log(value.userData.username);
      }
    );

    this.signUpForm.statusChanges.subscribe(
      status => {
        console.log(status);
      }
    );

    this.signUpForm.setValue({
      'userData' : {
        'username' : 'Jessie',
        'email' : 'test@gmail.com'
      },
      'gender' : 'Female',
      'hobbies' : []
    });

    this.signUpForm.patchValue({
      'userData' : {
        'email' : 'jessie@gmail.com'
      }
      }
    );

  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }

    return null;
  }
}
