import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AproposComponent } from './pages/apropos/apropos.component';
import { ProjetComponent } from './pages/projet/projet.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ConditionUtilisationComponent } from './pages/condition-utilisation/condition-utilisation.component';
import { PolitiqueConfidentialiteComponent } from './pages/politique-confidentialite/politique-confidentialite.component';
import { LoginComponent } from './authentification/login/login.component';
import { AjoutProjetComponent } from './porteur-projet/ajout-projet/ajout-projet.component';
import { ListeInvestissementsComponent } from './porteur-projet/liste-investissements/liste-investissements.component';
import { ProfilPorteurComponent } from './porteur-projet/profil-porteur/profil-porteur.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { ListeInvestissementBailleurComponent } from './bailleur/liste-investissement-bailleur/liste-investissement-bailleur.component';
import { ListeProjetsBailleurComponent } from './bailleur/liste-projets-bailleur/liste-projets-bailleur.component';
import { ProfilBailleurComponent } from './bailleur/profil-bailleur/profil-bailleur.component';
import { InvestissementPorteurComponent } from './porteur-projet/investissement-porteur/investissement-porteur.component';
import { DetailProjetComponent } from './porteur-projet/detail-projet/detail-projet.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Redirection par défaut
  { path: 'accueil', component: AccueilComponent},
  { path: 'apropos', component: AproposComponent },
  { path: 'projet', component: ProjetComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'condition-utilisation', component: ConditionUtilisationComponent },
  { path: 'politique-confidentialite', component: PolitiqueConfidentialiteComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ajout', component: AjoutProjetComponent },
  { path: 'listeporteur', component: ListeInvestissementsComponent },
  { path: 'profilporteur', component: ProfilPorteurComponent },
  { path: 'dashboard', component: DashboardAdminComponent},
  { path: 'dashboardbailleur', component: ListeInvestissementBailleurComponent},
  { path: 'projetsBailleur', component: ListeProjetsBailleurComponent},
  { path: 'profilBailleur', component: ProfilBailleurComponent},
  { path: 'liste-investissement-porteur', component: InvestissementPorteurComponent},
  { path: 'detail-projet/:id', component: DetailProjetComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
