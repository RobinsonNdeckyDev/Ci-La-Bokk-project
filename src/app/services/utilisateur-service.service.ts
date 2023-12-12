import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurServiceService {

   url = 'http://[::1]:3000/users';
  constructor(private http :HttpClient) { }

  getUsers(){
    return this.http.get(this.url);
  }

  // Ajouter un user
  ajouterUser(user : User) {
    return this.http.post<{ message: string }>(`${this.url}/users`, user);
  }

}
