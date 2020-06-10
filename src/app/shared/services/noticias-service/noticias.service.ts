import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../../models/noticia.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(public http: HttpClient) { }

  url = 'http://localhost:5872/api/Noticias/';

  // GET
  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.url);
  }

  // GET ONE
  getNoticia(noticiaId: number): Observable<Noticia> {
    return this.http.get<Noticia>(this.url + noticiaId);
  }
  
  // CREATE
  createNoticia(noticia: Noticia): Observable<void> {
    return this.http.post<void>(this.url, noticia);
  }

  // UPDATE
  updateNoticia(id: number ,noticia: Noticia): Observable<void> {
    return this.http.put<void>(this.url + id, noticia);
  }

  // DELETE
  deleteNoticia(noticiaId: number): Observable<void> {
    return this.http.delete<void>(this.url + noticiaId);
  }

}
