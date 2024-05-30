import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = "http://localhost:8081/client";

  constructor(private HttpClient: HttpClient) { }

  addClient(client: any): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}/add`, client);
  }

  login(email: string, password: string): Observable<Client> {
    return this.HttpClient.post<Client>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
