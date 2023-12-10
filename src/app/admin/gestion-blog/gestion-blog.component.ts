import { Component } from '@angular/core';
import { Article } from 'src/app/Models/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-gestion-blog',
  templateUrl: './gestion-blog.component.html',
  styleUrls: ['./gestion-blog.component.css']
})
export class GestionBlogComponent {

  articles: any[] = []; 

  // attributs
  titreArticle: string = "";
  articlePhoto: string = "";
  descriptionArticle: string = "";

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
      // test
      console.log(this.articles);
    });
  }

  addArticle(article: Article) {
    this.articleService.postArticle(article).subscribe(() => {
      this.loadArticles();
    });
  }

  updateArticle(article: Article) {
    this.articleService.updateArticle(article).subscribe(() => {
      this.loadArticles();
    });
  }

  deleteArticle(id: number) {
    this.articleService.deleteArticle(id).subscribe(() => {
      this.loadArticles();
    });
  }




  // Ajout article


  ajouterArticle() {
  if (this.articles.length > 0) {
    let lastArticleId = this.articles[this.articles.length - 1].id;
    console.log(lastArticleId);

    if (this.titreArticle && this.articlePhoto && this.descriptionArticle) {
      let newArticle = {
        id: lastArticleId + 1,
        titreArticle: this.titreArticle,
        articlePhoto: this.articlePhoto,
        descriptionArticle: this.descriptionArticle,
      };

      console.log(newArticle);

      this.articleService.postArticle(newArticle).subscribe((data) => {
        this.articles.push(data);
        localStorage.setItem("tabArticles", JSON.stringify(this.articles));
        console.log(this.articles);
      });
    }
  }
}









  // ajouterArticle(){

  //   let lastArticleId= this.articles[this.articles.length - 1].id
  //   console.log(lastArticleId);

  //   if (this.titreArticle && this.articlePhoto && this.descriptionArticle) {
  //     let newArticle = {
  //       id: lastArticleId + 1,
  //       titreArticle: this.titreArticle,
  //       articlePhoto: this.articlePhoto,
  //       descriptionArticle: this.descriptionArticle
  //     }

  //     console.log(newArticle);

  //     this.articleService.postArticle(newArticle).subscribe((data) => {
  //         this.articles.push(data)
  //         localStorage.setItem("tabArticles", JSON.stringify(this.articles))
  //         console.log(this.articles);
          
  //     })
  //   }

  // }
  
  
}


