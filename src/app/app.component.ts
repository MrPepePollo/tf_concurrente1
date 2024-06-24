import { Component, OnInit } from '@angular/core';
import { KmeansService, Cluster } from './kmeans.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  clusters: Cluster[] = [];
  loadingData: boolean = false;
  sendingRequest: boolean = false;
  requestComplete: boolean = false;

  constructor(private kmeansService: KmeansService) {}

  ngOnInit() {
    this.loadAndSendData();
  }

  loadAndSendData(): void {
    this.loadingData = true;
    this.kmeansService.loadDataset().subscribe(dataset => {
      this.loadingData = false;
      console.log('Dataset loaded:', dataset);
      this.sendingRequest = true;
      this.kmeansService.getKMeans(dataset.split('\n').map(line => line.split(','))).subscribe(response => {
        this.sendingRequest = false;
        this.requestComplete = true;
        this.clusters = response;
        console.log('Clusters:', response);
      }, error => {
        this.sendingRequest = false;
        console.error('Error getting KMeans:', error);
      });
    }, error => {
      this.loadingData = false;
      console.error('Error loading dataset:', error);
    });
  }
}
