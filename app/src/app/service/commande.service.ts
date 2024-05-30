import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Commande {
  id: number;
  numcom: string;
  datecom: Date;
  client: any;
}

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl = 'http://localhost:8081/commande';

  constructor(private http: HttpClient) { }

  getCommandesByClientId(clientId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/client/${clientId}`);
  }
  createCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(this.apiUrl, commande);
  }
}