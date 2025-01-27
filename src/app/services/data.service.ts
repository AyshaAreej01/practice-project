// src/app/services/data.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; 
  http = inject(HttpClient);

  constructor() {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
