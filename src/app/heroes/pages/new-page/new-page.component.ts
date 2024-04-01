import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { filter, switchMap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id:               new FormControl(''),
    superhero:        new FormControl('', { nonNullable : true }),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  })


  public publishers = [
    { id: 'DC Comics', value: 'DC - Comics' },
    { id: 'Marvel Comics', value: 'Marvel - Comics' },
  ]

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
     ) { }

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroById( id ) )
      ).subscribe( hero => {
        if ( !hero ) return this.router.navigateByUrl('/');

        this.heroForm.reset( hero );
        return
      })

  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }


  onSubmit(): void {
    if ( !this.heroForm.valid ) throw Error( 'Valide que todos los campos esten completos' )

    if ( this.currentHero.id ) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          // TODO: mostrar snack bar
          this.showSnackbar( `${ hero.superhero} ha sido actualizado!` ),
        this.router.navigateByUrl('/heroes/list')
        });
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        // TODO: mostrar snackbar y redirigir a /heroes/edit/hero.id
        this.router.navigate(['/heroes/edit/', hero.id]),
        this.showSnackbar( `${ hero.superhero} ha sido creado correctamente!`)
      });
  }

  onDeleteHero() {
    if ( !this.currentHero.id ) throw Error('Id is required');

    const dialogRef = this.dialog.open( DialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () =>  this.heroesService.deleteHeroById( this.currentHero.id )),
        filter( wasDeleted => wasDeleted)
      ). subscribe( () => {
        this.router.navigateByUrl('/');
      })

      // this.heroesService.deleteHeroById( this.currentHero.id )
      //   .subscribe( wasDeleted => {
      //     if ( wasDeleted ) this.router.navigateByUrl('/');
      //   })

  }

  showSnackbar( message: string ): void {
    this.snackbar.open( message, 'done', {
      duration: 2000,
    })
  }


}
