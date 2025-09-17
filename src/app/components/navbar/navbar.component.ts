import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  openSHXSite() {
    window.open('https://matheusbrendoo.github.io/MatheusBrendoPortfolio/', '_blank');
  }


}
