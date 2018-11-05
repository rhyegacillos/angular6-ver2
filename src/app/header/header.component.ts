import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
  }

  onSaveRecipes() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: Response) => console.log(response.json()),
      (error: Response) => console.log(error.json())
    );
  }

  onFetchRecipes() {
    this.dataStorageService.getRecipes();
  }
}
