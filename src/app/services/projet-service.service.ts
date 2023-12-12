import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from './apiUrl'
import { Projet } from '../Models/projet.model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ProjetServiceService {

  url = 'http://[::1]:3000/projets';

  constructor(private http: HttpClient) { }
  
 getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.url);
  }

  getProjetById(id: number): Observable<Projet> {
    const url = `${this.url}/${id}`;
    return this.http.get<Projet>(url);
  }

  addProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.url, projet);
  }

  updateProjet(projet: Projet): Observable<Projet> {
    const url = `${this.url}/${projet.id}`;
    return this.http.put<Projet>(url, projet);
  }

  deleteProjet(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

  modifierProjet(id:any, projet:any){
    return this.http.put(`${this.url}/${id}`, projet)
  }



}
