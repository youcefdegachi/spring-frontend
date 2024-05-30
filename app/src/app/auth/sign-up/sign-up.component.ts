import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Client } from '../../model/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  client = {
    numcl: '',
    nomcl: '',
    prenomcl: '',
    adressecl: '',
    telcl: '',
    email: '',
    password: ''
  };
  constructor(private clientService: ClientService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addClient() {
    this.clientService.addClient(this.client).subscribe(
      response => {
        localStorage.setItem('client', JSON.stringify(response));
        alert('Client added successfully');
        this.router.navigate(['/']);
      },
      error => {
        alert('Failed to add client: ' + error.error);
      }
    );
  }
}
