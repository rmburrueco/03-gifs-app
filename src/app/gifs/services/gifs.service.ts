import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey:       string = 'ApcSkiWk0qDJTzVf7s7KgUrwDJNXHj8S';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor( private http:HttpClient ) { }

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

  searchTag( tag:string ): void {
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params } ) //sería {params: params} redundante en ECMS6
      .subscribe( resp =>{
        this.gifList = resp.data;
        //console.log( {gifs: this.gifList} );      
      });
    
    

  }

}
