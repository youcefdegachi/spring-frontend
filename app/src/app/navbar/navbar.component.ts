import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  client: Client | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const clientData = localStorage.getItem('client');
    if (clientData) {
      this.client = JSON.parse(clientData);
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']); // Adjust the route to your profile page
  }

  logout() {
    localStorage.removeItem('client');
    this.client = null;
    this.router.navigate(['/']); // Adjust the route to your home page or sign-in page
  }
}
