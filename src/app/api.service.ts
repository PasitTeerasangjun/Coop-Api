import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  getdata(endpoint : number){
    const api = this.baseUrl + endpoint;
    return this.http.get(api);
  }
}
