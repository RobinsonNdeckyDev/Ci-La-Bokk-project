import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { UtilisateurServiceService } from 'src/app/services/utilisateur-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  // Tableau articles
  utilisateurs: User[] = [];

  // attributs
  email: string = "";
  password: string = "";
  role: string = ""; 

  // tableaux
  tabUsers: any;
  currentUser: any;

  formChoice = true;


  constructor(private userService: UtilisateurServiceService,private route: Router){}

  ngOnInit(): void {
    this.loadUsers();
  }


  // Récupération des articles 
  loadUsers() {
      this.userService.getUsers().subscribe((data) => {
      this.utilisateurs = data;
      console.log(this.utilisateurs);
    });
  }



  
  // fonction qui permet de vider les champs
  viderChamps() {
    this.email = "";
    this.password = "";
  }



  login() {
    //  On verifie si les champs contiennent de l'information 
    if (this.email == "") {
      this.verifInfos("Erreur!", "Veuillez renseigner l'email", "error");
    }else if(this.password == ""){
      this.verifInfos("Erreur!", "Veuillez renseigner le mot de passe", "error");
    }
    else if (this.tabUsers.length == 0) {
      this.verifInfos("Erreur!", "Ce compte n'existe pas", "error");
    }
    else {
      this.currentUser = this.tabUsers.find((element: any) => (element.email == this.email && element.password == this.password))
      if (this.currentUser) {
        this.verifInfos("Cool!", "Bienvenu dans votre espace de travail ", "success");
        if (this.currentUser.role === 'Bailleur') {
          this.route.navigate(['/dashboardBailleur', this.currentUser.idUser]);
        }
        else if (this.currentUser.role === 'Porteur') {
          this.route.navigate(['/ajout', this.currentUser.idUser]);   
        }
        else if (this.currentUser.role === 'Admin') {
          this.route.navigate(['/dashboard', this.currentUser.idUser]);
        }
        else {
          this.verifInfos("Erreur!", "Ce compte n'existe pas", "error");
        }
      }
      else {
        this.verifInfos("Erreur!", "Ce compte n'existe pas", "error");
      }
    }
  }

  
  // Fonction pour afficher un sweetalert 
  verifInfos(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    })
  }

  ShowForm() {
    this.email = "";
    this.password = "";
    this.formChoice = !this.formChoice;
  }
}


















// inscription() {
//     const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

//     if (this.nomComplet == "" || this.email == "" || this.password == "" || this.telephone == "") {
//       this.verifInfos("Erreur!", "Veuillez remplir les champs", "error");
//     }
//     else if (!this.email.match(emailPattern)) {
//       this.verifInfos("Erreur!", "Email invalide", "error");
//     }
//     else if (this.password.length < 8) {
//       this.verifInfos("Erreur!", "Mot de passe doit être supérieur ou égal à 8", "error");
//     }
//     else {
//       this.verifInfos("Merci", "Compte créé avec succes", "success");
//       this.viderChamps();
//       this.ShowForm();
//     }
//   }
