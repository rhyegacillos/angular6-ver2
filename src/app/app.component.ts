import { Component } from '@angular/core';
import {ServerService} from './server.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.serverService.getAppName();
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generatedId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generatedId()
    }
  ];

  constructor(private serverService: ServerService) {}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generatedId()

    });
  }

  private generatedId() {
    return Math.round(Math.random() * 10000);
  }

  onSave() {
    this.serverService.storeServers(this.servers).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onGet() {
    this.serverService.getServers(this.servers).subscribe(
      (servers: any[]) => this.servers = servers,
      (error) => console.log(error)
    );
  }
}
