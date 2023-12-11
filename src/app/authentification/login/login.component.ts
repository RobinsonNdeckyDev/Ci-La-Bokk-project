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

  // attributs
  email: string = "";
  password: string = "";
  role: string = ""; 

  // tableaux
  tabUsers: any = [];
  currentUser: any;

 
  constructor(private userService: UtilisateurServiceService, private route: Router){
    this.loadUsers();
  }

  ngOnInit(): void {
    this.loadUsers();
  }


  // Récupération des articles 
  loadUsers() {
      this.userService.getUsers().subscribe((data) => {
      this.tabUsers = data;
      console.log("ddddddddd");
      console.log(this.tabUsers);
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
    // else if (!this.tabUsers || this.tabUsers.length === 0) {
    // this.verifInfos("Erreur!", "Aucun utilisateur trouvé", "error");
    // }
    else {
      this.currentUser = this.tabUsers.find((element: any) => (element.email == this.email));
      console.log(this.currentUser);
      if(this.currentUser){

        this.verifInfos("super","utilisateur trouvé", "success");
        if(this.currentUser.email == "binta@gmail.com" && this.currentUser.password == "123456"){
          this.route.navigate(['/admin']);
        }
         else if(this.currentUser.role == "Admin"){
          this.route.navigate(['/dashboard']);
        }
        else if (this.currentUser.role == "Bailleur") {
          this.route.navigate(['/dashboardbailleur']);
        }
         else{
          this.verifInfos("Attention","utilisateur non connecté", "error");
        }

        // Utiliser l'ID de l'utilisateur ici
        const userId = this.currentUser.id;
        console.log("ID de l'utilisateur connecté :", userId);
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

  // ShowForm() {
  //   this.email = "";
  //   this.password = "";
  //   this.formChoice = !this.formChoice;
  // }
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
