import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class HeroesLayoutPageComponent{

  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './list'},
    {label: 'Añadir pj', icon: 'add', url: './new-hero'},
    {label: 'Buscar', icon: 'search', url: './search'},
  ]

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  onLogout() {
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }

  get user(): User|undefined {
    return this.authService.currentUser;
  }


}
