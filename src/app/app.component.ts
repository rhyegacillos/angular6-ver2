import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectForm: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectName = 'Test';

  ngOnInit(): void {

    this.projectForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenProjectName.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }

    return null;
  }
}
