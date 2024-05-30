import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Commande } from '../../model/commande';
import { CommandeService } from '../../service/commande.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit  {
  client: Client | null = null;
  commandes: Commande[] = [];

  constructor(private commandeService: CommandeService) { }

  ngOnInit() {
    const clientData = localStorage.getItem('client');
    if (clientData) {
      this.client = JSON.parse(clientData);
      if (this.client?.clId) {
        this.commandeService.getCommandesByClientId(this.client.clId).subscribe((data: Commande[]) => {
          this.commandes = data;
        });
      }
    }
  }
}
