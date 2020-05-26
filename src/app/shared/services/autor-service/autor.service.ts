import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../../models/autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(public http: HttpClient) { }

  url = 'http://localhost:58156/api/Authors/';

  // GET
  verAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.url);
  }

}
