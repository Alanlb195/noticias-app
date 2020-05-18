import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../../models/noticia.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(public http: HttpClient) { }

  // GET
  verNoticias(): Observable<Noticia[]> {
  	return this.http.get<Noticia[]>("https://localhost:44308/api/noticias/obtener");
  }


}
