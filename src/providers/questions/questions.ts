import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the QuestionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionsProvider {
  
  private url: string = '../../assets/data/questions.json';

  constructor(public http: HttpClient) {
    console.log('Hello QuestionsProvider Provider');
  }
  
  public getJSON() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe(data => {
        resolve(data);
      }, error => {
        reject("Error retriving JSON!")
      });
    });
  }

}
