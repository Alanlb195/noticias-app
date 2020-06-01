import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../../models/noticia.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(public http: HttpClient) { }

  url = 'http://localhost:63029/api/Noticias/';

  // GET
  verNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.url);
  }

  verNoticia(id: number): Observable<Noticia> {
    return this.http.get<Noticia>(this.url + id);
  }

  // DELETE
  eliminarNoticia(noticiaId: number): Observable<void> {
    return this.http.delete<void>(this.url + noticiaId);
  }

  // CREATE
  agregarNoticia(noticia: Noticia): Observable<void> {
    return this.http.post<void>(this.url, noticia);
  }

  // UPDATE
  actualizarNoticia(noticia: Noticia): Observable<void> {
    return this.http.put<void>(this.url, noticia);
  }


}
