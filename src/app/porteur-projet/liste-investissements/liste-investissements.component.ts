import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-investissements',
  templateUrl: './liste-investissements.component.html',
  styleUrls: ['./liste-investissements.component.css']
})
export class ListeInvestissementsComponent implements OnInit {

   ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/script.js'; 
    document.body.appendChild(script);
  }
}
