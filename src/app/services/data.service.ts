import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) {

  }

  public async loadAsset<T>(url: string) {
    return new Promise<T>((resolve, reject) => {
      this.http.get<T>(`/assets/${url}`).subscribe(
        (data) => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    });
  }
}
