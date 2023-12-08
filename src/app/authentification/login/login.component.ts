import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // attributs
  nom: string = "";
  prenom: string = "";
  email: string = "";
  password: string = "";

  // tableaux
  tabUsers: any;
  currentUser: any;

  formChoice = true;

  inscription() {
    
  }

  login() {
    
  }
   ShowForm() {
    this.email = "";
    this.password = "";
    this.formChoice = !this.formChoice;
  }
}
