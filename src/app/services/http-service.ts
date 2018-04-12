import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpServiceProvider {

  private headers: any
  private options: any

  private url: string = 'http://pokeapi.salestock.net/api/v2/';

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json'});
    this.options = new RequestOptions({ headers: this.headers });
  }

  /*------------------------------- USERS ----------------------------------*/

  public getAllPokemons() {
    return this.http.get(this.url+'pokemon/', this.options);
  }

  public getPokemonStats(name) {
    return this.http.get(this.url+'pokemon/'+name+'/', this.options);
  }

  public getPokemonImage(name) {
    return this.http.get(this.url+'pokemon-form/'+name+'/', this.options);
  }

  public setPage(pag) {
    return this.http.get(this.url+'pokemon/'+pag, this.options);
  }

}
