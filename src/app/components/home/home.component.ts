import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceProvider } from '../../services/http-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

interface AppState {
  message: string,
  nextPage: string,
  previusPage: string,
  pokemonStored: any
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private pokemonList: any;
  private pokemon: any;
  private next: any;
  private previous: any;

  constructor(private router: Router,
  private httpService: HttpServiceProvider,
  private spinnerService: Ng4LoadingSpinnerService) {
    this.pokemon = { url: '', name: '', front_default: '' };
  }

  ngOnInit() {
    this.getPokemonsList();
  }

  private getPokemonsList() {
    this.spinnerService.show();
    this.httpService.getAllPokemons().subscribe((resp) => {
      this.pokemonList = resp.json().results;
      this.next = resp.json().next;
      this.spinnerService.hide();
    }, err => {
      console.log('error ', err);
      this.spinnerService.hide();
    });
  }

  private renderPokemon(pk) {
    this.spinnerService.show();
    this.httpService.getPokemonImage(pk.name).subscribe((res) => {
      let resp = res.json();
      this.pokemon.name = resp.name;
      this.pokemon.front_default = resp.sprites.front_default;
      this.spinnerService.hide();
    })

  }

  private pokemonStats(name) {
    this.router.navigate(['pokemon-stats', name ]);
  }

  private exit() {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  private renderNextPage() {
    this.spinnerService.show();
    this.pokemonList = [];
    let pg = this.next
    this.httpService.setPage(pg).subscribe((res)=> {
      this.pokemonList = res.json().results;
      this.next = res.json().next;
      this.previous = res.json().previous;
      this.spinnerService.hide();
    })
  }

  private renderPreviusPage() {
    this.spinnerService.show();
    this.pokemonList = [];
    let pg = this.previous
    this.httpService.setPage(pg).subscribe((res)=> {
      this.pokemonList = res.json().results;
      this.next = res.json().next;
      this.previous = res.json().previous;
      this.spinnerService.hide();
    })
  }

}
