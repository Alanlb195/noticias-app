import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias-service/noticias.service';
import { Noticia } from '../../models/noticia.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.page.html',
  styleUrls: ['./listado-noticias.page.scss'],
})
export class ListadoNoticiasPage implements OnInit {
  noticias: Noticia[];

  constructor(public noticiasService: NoticiasService, public route: Router) { }

  ngOnInit() {
    this.noticiasService.verNoticias().subscribe((noticiasObtenidas) => {
      this.noticias = noticiasObtenidas;
    }, (errorObtenido) => {
      console.log(errorObtenido);
    });
  }

  irADetalle(noticia: Noticia) {
    this.route.navigate(['noticia-detalle', { noticia: JSON.stringify(noticia) }]);
  }

}
