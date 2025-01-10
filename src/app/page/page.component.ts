import { Component } from '@angular/core';
import { ApiService } from '../api.service';

export interface pokemonData {
  name: string;
  moveset: string;
  img_front: string;
  weight: number;
  type_1: string;
  type_2: string;
}

export interface pokemonDataImg {
  name: string;
  img_front: string;
  img_back: string;
  front_shiny: string;
  back_shiny: string;
}


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {

  constructor(private api: ApiService) { }

  status: boolean = false;

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.getPokemon(i);
      this.get_imgPokemon(i);
    }
  }

  pokemonlist: any[] = [];
  getPokemon(id: number) {
    this.api.getdata(id).subscribe((res: any) => {
      this.pokemonlist.push(res);
      console.log(this.pokemonlist);
      this.convertData(this.pokemonlist);
    });
  }

  Data_pokemon: pokemonData[] = [];
  convertData(data: any) {
    let _data = [];
    for (let i = 0; i < data.length; i++) {
      _data.push({
        name: data[i]['name'] || " ",
        moveset: data[i]['moves'][0]?.['move']['name'] || " ",
        img_front: data[i]['sprites']['front_default'] || " ",
        weight: data[i]['weight'] || " ",
        type_1: data[i]['types'][0]?.['type']['name'] || "-",
        type_2: data[i]['types'][1]?.['type']['name'] || "-",
      });
    }
    // console.log(_data);
    this.Data_pokemon = _data;
  }

  pokemonlist_img: any[] = [];
  get_imgPokemon(id: number) {
    this.api.getdata(id).subscribe((res: any) => {
      this.pokemonlist_img.push(res)
      this.convertData_imgPokemon(this.pokemonlist_img);
    });
  }

  DataImg_pokemon: pokemonDataImg[] = [];
  convertData_imgPokemon(data: any) {
    let _data = [];
    for (let i = 0; i < data.length; i++) {
      _data.push({
        name: data[i]['name'] || "-",
        img_front: data[i]['sprites']['front_default'] || "-",
        img_back: data[i]['sprites']['back_default'] || "-",
        front_shiny: data[i]['sprites']['front_shiny'] || "-",
        back_shiny: data[i]['sprites']['back_shiny'] || "-",
      });
    }
    // console.log(_data);
    this.DataImg_pokemon = _data;
  }
}
