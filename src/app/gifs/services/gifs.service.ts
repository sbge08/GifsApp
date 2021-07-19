import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  //Propiedades
  private apikey:string='EanlSL9QmyLqAveqsxW0AAiouP5OEVdS';
  private servicioUrl:string='https://api.giphy.com/v1/gifs';
  private _historial:string[]=[];
 

  public resultados:Gif[]=[];

  get historial(){
    //this._historial=this._historial.splice(0,10);//Cortar a los ultimo 10
    return [...this._historial];
  }
  constructor(private http:HttpClient){

    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial=JSON.parse(localStorage.getItem('historial')!);
    // }
    
  }



  //async buscarGifs(query:string){
buscarGifs(query:string){

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);//Cortar a los ultimo 10

      localStorage.setItem('historial', JSON.stringify(this._historial));

      

    }    
    //  fetch('https://api.giphy.com/v1/gifs/search?api_key=EanlSL9QmyLqAveqsxW0AAiouP5OEVdS&q=Dragon ball z&limit=10')
    //  .then(resp =>{
    //      resp.json().then(data=>{
    //        console.log(data)
    //      })       
    // });

    //const resp= await fetch('https://api.giphy.com/v1/gifs/search?api_key=EanlSL9QmyLqAveqsxW0AAiouP5OEVdS&q=Dragon ball z&limit=10');
    //const data=await resp.json();
    //console.log(data);

  const params=new HttpParams()
  .set('api_key',this.apikey)
  .set('limit', '10')
  .set('q',query);

  //this.http.get<SearchGifsResponse>(`/search?api_key=EanlSL9QmyLqAveqsxW0AAiouP5OEVdS&q=${query}&limit=10`)
  this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
  .subscribe((resp)=>{
      //console.log(resp.data);     
      this.resultados=resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
  });

}

}
 