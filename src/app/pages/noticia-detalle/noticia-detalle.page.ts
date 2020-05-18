import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-noticia-detalle',
  templateUrl: './noticia-detalle.page.html',
  styleUrls: ['./noticia-detalle.page.scss'],
})
export class NoticiaDetallePage implements OnInit {

  constructor(private state: ActivatedRoute) { }
  noticia: Noticia;

  ngOnInit() {
    this.noticia = JSON.parse(this.state.snapshot.params.noticia);
  }

}
