import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit{

  @Input()
  public hero!: Hero;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    if ( !this.hero ) throw Error('Hero property is required')
  }
}
