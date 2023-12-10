import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { Article } from 'src/app/Models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-blog',
  templateUrl: './gestion-blog.component.html',
  styleUrls: ['./gestion-blog.component.css']
})
export class GestionBlogComponent {

// attributs
titreArticle: string = "";
articlePhoto: string = "";
descriptionArticle: string = "";

  
articles: Article[] = [];

isEditing: boolean = false;
editedArticle: Article = { id: 0, titre: '', photo: '', description: '' };



  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
    });
  }

  addArticle() {

    if (this.titreArticle == "") {
      this.alertMessage("error","Attention","Merci d'ajouter le titre de l'article");
    }else if(this.articlePhoto == ""){
      this.alertMessage("error","Attention","Merci d'ajouter la photo de l'article");
    }else if(this.descriptionArticle == ""){
      this.alertMessage("error","Attention","Merci d'ajouter la description de l'article");
    }else{
      const newArticle: Article = { titre: this.titreArticle, photo: this.articlePhoto, description: this.descriptionArticle };
      this.articleService.addArticle(newArticle).subscribe(() => {
        this.alertMessage("success","Bravo!","Article ajouté avec succés");
        this.loadArticles();
      });
    }

  }


  editArticle(article: Article) {
    this.isEditing = true;
    this.editedArticle = { ...article }; // Crée une copie pour éviter de modifier l'original directement
  }

  updateArticle() {
    this.articleService.updateArticle(this.editedArticle).subscribe(() => {
      this.isEditing = false;
      this.alertMessage("success", "Bravo!", "Article mis à jour avec succès");
      this.loadArticles();
    });
  }

  cancelEditing() {
    this.isEditing = false;
  }



deleteArticle(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière après cette action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticle(id).subscribe(() => {
          this.alertMessage("success", "Supprimé!", "L'article a été supprimé avec succès");
          this.loadArticles();
        });
      }
    });
  }

  

alertMessage(icon: any, title: any, text: any){
  Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
}


}


