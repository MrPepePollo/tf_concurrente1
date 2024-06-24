import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cluster {
  Centroid: number[];
  Sum: number[];
  Count: number;
}

@Injectable({
  providedIn: 'root'
})
export class KmeansService {
  private url = "http://localhost:8080/api/kmeans";
  private datasetUrl = "https://raw.githubusercontent.com/MrPepePollo/TF_Concurrente/master/SocialNetworkDataset.csv";

  constructor(private http: HttpClient) { }

  loadDataset(): Observable<string> {
    return this.http.get(this.datasetUrl, { responseType: 'text' });
  }

  getKMeans(data: any): Observable<Cluster[]> {
    return this.http.post<Cluster[]>(this.url, data);
  }
}
