import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey: string = 'ApcSkiWk0qDJTzVf7s7KgUrwDJNXHj8S';

  constructor() { }

  get tagsHistory(){
    return [...this._tagsHistory]; //hace una copia del array (en lugar de pasar por referencia)
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes(tag) ){
      this._tagsHistory = this.tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this.tagsHistory.splice(0,10);
  }

  async searchTag( tag:string ): Promise<void> {
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    fetch('https://api.giphy.com/v1/gifs/search?api_key=ApcSkiWk0qDJTzVf7s7KgUrwDJNXHj8S&q=valorant&limit=10')
      .then( resp => resp.json() )
      .then( data => console.log(data));

  }

}
