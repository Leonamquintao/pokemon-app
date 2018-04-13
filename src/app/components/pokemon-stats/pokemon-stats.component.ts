import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceProvider } from '../../services/http-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.css']
})

export class PokemonStatsComponent implements OnInit {

  private pokemon: any;
  private status: any;

  constructor(private route: ActivatedRoute,
  private router: Router,
  private httpService: HttpServiceProvider,
  private spinnerService: Ng4LoadingSpinnerService) {

    this.status = { front_default: '', front_shiny: '', back_default: '', back_shiny: '' }
  }

  ngOnInit() {
    this.getPokemonStatus();
  }

  private getPokemonStatus() {
    this.spinnerService.show();
    this.route.params.subscribe((param) => {
      this.pokemon = param['name'];
      this.httpService.getPokemonStats(this.pokemon).subscribe((res) => {
        let resp = res.json();

        this.pokemon = res.json();

        this.status.front_default = resp.sprites.front_default;
        this.status.front_shiny = resp.sprites.front_shiny;
        this.status.back_default = resp.sprites.back_default;
        this.status.back_shiny = resp.sprites.back_shiny;

        console.log(this.pokemon);

        this.spinnerService.hide();
      }, err => {
        console.log(err);
        this.spinnerService.hide();
      })
    })
  }

  private back() {
    this.router.navigate(['home']);
  }

}
