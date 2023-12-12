import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projet } from 'src/app/Models/projet.model';
import { ProjetServiceService } from 'src/app/services/projet-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-projet',
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.css']
})
export class AjoutProjetComponent implements OnInit{

  projetDetails: Projet[] = [];  // Déclarez votre modèle projet

  // attributs
  projets: any[] = [];
  nom: string = "";
  description: string = "";
  echeance: string = "";
  budget: string = "";
  categorie: string = "";
  photo: string = "";
  etat: string = "non aprouver";

  selectedProjet: Projet | null = null;

  isEditing: boolean = false;
  editedProjet: Projet = {
    id: 0,
    nom: '',
    photo: '',
    description: '',
    echeance: '',
    budget: '',
    etat: '',
    categorie: ''
  };

 
  
  constructor(private projetService: ProjetServiceService, private route: ActivatedRoute){}
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/script.js'; 
    document.body.appendChild(script);
    this.loadProjets();
  }

   // Récupération des projets
  loadProjets() {
      this.projetService. getProjets().subscribe((data) => {
      this.projets = data;
    });
  }

  // Méthode pour ajouter un projet
  addProjet() {
    // Validation d'ajout de projet
    if (!this.nom || !this.description || !this.echeance || !this.budget || !this.categorie || !this.photo) {
      this.alertMessage("Erreur", "Veuillez remplir tous les champs obligatoires", "error");
      return;
    }else{
      // Notre variable newprojet pour ajouter un nouveau projet
      const newProjet:
      Projet = { 
        nom: this.nom, 
        echeance: this.echeance,
        budget: this.budget,
        categorie: this.categorie,
        photo: this.photo, 
        description: this.description,
        etat: this.etat,
      };

      this.projetService.addProjet(newProjet).subscribe(() => {
        this.projets.unshift(newProjet);

        this.alertMessage("success","Bravo!","projet ajouté avec succés");
        this.loadProjets();

      });
    }

  }

  // Nouvelle méthode pour afficher les détails d'un projet
  showProjetDetails(projet: Projet) {
    this.selectedProjet = projet;
    // console.log('Selected Projet:', this.selectedProjet);
  }

  // Modification d'un projet
  editProjet(projet: Projet) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous allez modifier ce projet!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#308AA7',
      cancelButtonColor: '#E75761',
      confirmButtonText: 'Oui, Modifier!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isEditing = true;
        this.editedProjet = { ...projet }; 
        console.log('Données du projet à modifier :', this.editedProjet);
      }
    });
  }

  refreshProjectList() {
    // Logique pour rafraîchir la liste des projets
    this.projetService.getProjets().subscribe((projets) => {
        this.projets = projets;
    });
}

  // Mise à jour de projet modifié
  updateProjet() {
    this.projetService.updateProjet(this.editedProjet).subscribe(() => {
      this.isEditing = false;
      this.alertMessage("success", "Bravo!", "projet mis à jour avec succès");
      this.loadProjets();
      this.refreshProjectList(); 
      console.log(this.editedProjet);
    });
  }

  // Annulation de la modification de l'projet
  cancelEditing() {
    this.isEditing = false;
  }


  // Suppression d'un projet
  deleteProjet(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière après cette action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#308AA7',
      cancelButtonColor: '#E75761',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projetService.deleteProjet(id).subscribe(() => {
          this.alertMessage("success", "Supprimé!", "L'projet a été supprimé avec succès");
          this.loadProjets();
        });
      }
    });
  }


 
  

  // Fonction pour afficher un sweetalert 
  alertMessage(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    })
  }


  

}
