import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class HeroesLayoutPageComponent {

  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './list'},
    {label: 'Añadir pj', icon: 'add', url: './new-hero'},
    {label: 'Buscar', icon: 'search', url: './search'},
  ]

}
