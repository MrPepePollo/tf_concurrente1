import { Component } from '@angular/core';
import { KmeansService, Cluster } from './kmeans.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
  response: string;

  constructor(private kmeansService: KmeansService) {
    this.response = '';
    this.clusters = [];
  }

  clusters: Cluster[];
  displayedColumns: string[] = ['Centroid', 'Sum', 'Count'];

  ngOnInit(): void {
    this.startProcess();
  }

  startProcess(): void {
    this.kmeansService.startProcess().subscribe(clusters => {
      this.clusters = clusters;
    });
  }
}
