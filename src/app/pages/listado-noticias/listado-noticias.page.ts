import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoticiasService } from '../../shared/services/noticias-service/noticias.service';
import { Noticia } from '../../shared/models/noticia.model';

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

  verNoticia(noticia: Noticia) {
    this.route.navigate(['noticia-detalle', { noticia: JSON.stringify(noticia) }]);
  }

  eliminarNoticia(noticiaId: number, indice: number) {
    this.noticiasService.eliminarNoticia(noticiaId).subscribe(() => {
      this.noticias.splice(indice, 1);
      console.log('Noticia eliminada');
    },
    error => {
      console.log(error);
    });
  }

  agregarNoticia(noticia: Noticia) {
    this.noticiasService.agregarNoticia(noticia).subscribe(() => {
      console.log('Noticia agregada');
    }, error => {
      console.log(error);
    });
  }


}
