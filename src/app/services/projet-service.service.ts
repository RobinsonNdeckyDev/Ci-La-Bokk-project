import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from './apiUrl'
import { Projet } from '../Models/projet.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjetServiceService {

  url = 'http://[::1]:3000';

  constructor(private http: HttpClient) { }
  
  getProjet() {
    return this.http.get(`${this.url}/projets`); 
  }
  
  // Liste 
  getAlls() : Observable<any>{
    return this.http.get<Projet[]>(`${url}/projets`);
  }

  getProjetById(id: string)
  {
    return this.http.get<Projet>(`${url}/projets/`+ id);
  }
  
  // Ajouter un projet
  ajouterProjet(projet : Projet) {
    return this.http.post<{ message: string }>(`${this.url}/projets`, projet);
  }

  modifierProjet(id:any, projet:any){
    return this.http.put(`${this.url}/${id}`, projet)
  }
 

  supprimerProjet(id: any) {
    return this.http.delete(`${this.url}/${id}`)
  }
}
