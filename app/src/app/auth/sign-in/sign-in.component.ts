import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { Client } from '../../model/client';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private clientService: ClientService, private router: Router) {}

  onSubmit() {
    this.clientService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('client', JSON.stringify(response));
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = error;
      }
    );
  }
}
