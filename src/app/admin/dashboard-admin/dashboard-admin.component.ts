import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {


  // Gestion bouton
  boutonActif = 1;

  // Initialiser le contenu actuel
  currentContent: string = 'dashDefault';

  // Mettre à jour le contenu actuel
  showComponant(contentId: string): void {
    this.currentContent = contentId; 
  }



    ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/script.js'; 
    document.body.appendChild(script);
  }
}
