import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Observable";
import { HttpServiceProvider } from '../../services/http-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private pokemonList: any;
  private pokemon: any;

  constructor(private router: Router, private httpService: HttpServiceProvider,
  private spinnerService: Ng4LoadingSpinnerService) {
    this.pokemon = { url: '', name: '', front_default: '', front_shiny: '', back_default: '',  back_shiny: ''};
  }

  ngOnInit() {
    this.getPokemonsList();

    // this.pokemonList = [
    //   { url: "http://pokeapi.salestock.net/api/v2/pokemon/1/", name: "bulbasaur" },
    //   { url: "http://pokeapi.salestock.net/api/v2/pokemon/7/", name: "squirtle" },
    //   { url: "http://pokeapi.salestock.net/api/v2/pokemon/9/", name: "blastoise" },
    //   { url: "http://pokeapi.salestock.net/api/v2/pokemon/11/", name: "metapod" },
    //   { url: "http://pokeapi.salestock.net/api/v2/pokemon/17/", name: "pidgeotto" },
    //   { url: "http://pokeapi.salestock.net/api/v2/pokemon/19/", name: "rattata" },
    // ]
  }

  private getPokemonsList() {
    this.spinnerService.show();
    this.httpService.getAllPokemons().subscribe((resp) => {
      this.pokemonList = resp.json().results;
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
      this.pokemon.front_shiny = resp.sprites.front_shiny;
      this.pokemon.back_default = resp.sprites.back_default;
      this.pokemon.back_shiny = resp.sprites.back_shiny;
      this.spinnerService.hide();
    })

  }

  private pokemonStats(name) {
    this.router.navigate(['pokemon-stats']);
  }

  private exit() {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  private renderNextPage() {
    this.spinnerService.show();
    this.pokemonList = [];
    this.spinnerService.hide();

  }

  private renderPreviusPage() {
    this.spinnerService.show();
    this.pokemonList = [];

    this.spinnerService.hide();

  }

}
