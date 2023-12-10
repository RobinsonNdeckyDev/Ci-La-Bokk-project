import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projet } from 'src/app/Models/projet.model';
import { ProjetServiceService } from 'src/app/services/projet-service.service';

@Component({
  selector: 'app-ajout-projet',
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.css']
})
export class AjoutProjetComponent implements OnInit{

  projetDetail: Projet | undefined;  

  // attributs
  projets: any[] = [];
  nom: string = "";
  description: string = "";
  echeance: string = "";
  budget: string = "";
  categorie: string = "";
  photo: string = "";
  etat: string = "non aprouver";

  
  projet: Projet = {
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
    this.afficherProjet();
    console.log(this.projets);

    // Récupérez l'ID du projet depuis les paramètres de l'URL
    const projetId = this.route.snapshot.paramMap.get('id');

    // Appelez la fonction getProjetById pour obtenir les détails du projet
     if (projetId) {
      this.projetService.getProjetById(projetId).subscribe((data: Projet) => {
        // Ajoutez les détails directement dans le tableau des projets
        const index = this.projets.findIndex(projet => projet.id === projetId);
        if (index !== -1) {
          this.projets[index] = { ...this.projets[index], ...data };
        }
      });
    }
    
  }
  
  ajoutProjet() {
    this.projetService.ajouterProjet(this.mapToProjet()).subscribe((data: any) => {
      this.afficherProjet();
    });
  }
  

  mapToProjet(): Projet {
    // Crée une nouvelle instance de Projet en utilisant l'instance existante
    const projet: Projet = this.projet;
    projet.nom = this.nom;
    projet.budget = this.budget;
    projet.echeance = this.echeance;
    projet.categorie = this.categorie;
    projet.etat = this.etat;
    projet.photo = this.photo;
    projet.description = this.description;
    
    return this.projet;
  }

   afficherProjet() {
    this.projetService.getProjet().subscribe((data:any) => {
      this.projets = data;
      console.log(this.projets);
    });
  }

  

}
