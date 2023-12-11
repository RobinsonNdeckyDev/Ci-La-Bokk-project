import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { UtilisateurServiceService } from 'src/app/services/utilisateur-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription-bailleur',
  templateUrl: './inscription-bailleur.component.html',
  styleUrls: ['./inscription-bailleur.component.css']
})
export class InscriptionBailleurComponent {

  // Attributs
  nom: string = "";
  email: string = "";
  password: string = "";
  telephone: string = "";
  organisation: string = "";
  image: string = "";
  description: string = "";
  role: string = "";

  // Tableau utilisateurs
  tabUtilisateurs: User[] = [];
  idLastUser: any = 0;


  constructor(private userService: UtilisateurServiceService, private route: Router){}

  ngOnInit(): void {
    this.loadUsers();
  }


  // Récupération des articles 
  loadUsers() {
      this.userService.getUsers().subscribe((data) => {
      this.tabUtilisateurs = data;
      console.log(this.tabUtilisateurs);
    });
  }

  // Ajout d'un Bailleur
  addBailleur(){

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    // Validation inscription bailleur
    if (this.nom == ""){
      this.alertMessage("error","Attention", "Merci de renseigner le nom SVP!");
    } else if(this.email == "") {
      this.alertMessage("error","Attention", "Merci de renseigner l'email!");
    }else if (!this.email.match(emailPattern)) {
      this.alertMessage("error","Attention", "Merci de renseigner un email correct!");
    }else if(this.telephone == "") {
      this.alertMessage("error","Attention", "Merci de renseigner le numéro de téléphone!");
    }else if(this.organisation == "") {
      this.alertMessage("error","Attention", "Merci de renseigner votre organisation!");
    }else if(this.description == "") {
      this.alertMessage("error","Attention", "Merci de renseigner votre description!");
    }else{
      
      // Notre variable newArticle pour ajouter un nouveau article
     
      const newBailleur : User = { 
        name: this.nom,
        email: this.email,
        password: this.password,
        image: this.image,
        telephone: this.telephone,
        description: this.description,
        organisation: this.organisation,
        role: "Bailleur", 
      };

      console.log("User à ajouter");
      console.log(newBailleur);

      // On cherche si le user existe dans le local Storage tabUsers
      let userExist = this.tabUtilisateurs.find((item: any) => item.email== this.email);


      if (userExist) {
        // Si il n'existe pas
        this.alertMessage('error','Attention','Ce compte existe déja');
      } else {

        // this.tabUtilisateurs.push(newBailleur);
          this.userService.addUser(newBailleur).subscribe(() => {
          this.alertMessage("success","Bravo!","Inscription réussie avec succés");
          this.loadUsers();
          this.route.navigate(['/login']);
        });

      }

    }

  }




  // Message d'alerte
  alertMessage(icon: any, title: any, text: any){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

}
