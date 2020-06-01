import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoticiasService } from '../../shared/services/noticias-service/noticias.service';
import { Noticia } from '../../shared/models/noticia.model';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.page.html',
  styleUrls: ['./listado-noticias.page.scss'],
})
export class ListadoNoticiasPage implements OnInit {

  noticias: Noticia[];

  constructor(public noticiasService: NoticiasService, public toastController: ToastController,
              public route: Router, ) { }

  ngOnInit() {
    this.noticiasService.verNoticias().subscribe((noticiasObtenidas) => {
      this.noticias = noticiasObtenidas;
    }, (errorObtenido) => {
      console.log(errorObtenido);
    });
  }

  eliminarNoticia(noticiaId: number, indice: number) {
    this.noticiasService.eliminarNoticia(noticiaId).subscribe(() => {
      this.noticias.splice(indice, 1);
      this.mostrarToast('Noticia eliminada', 'toastOk');
    },
      error => {
        this.mostrarToast('Ha ocurrido un error', 'toastNotOk');
        console.log(error);
      });
  }


  modificarNoticia(noticia: Noticia, id: number) {
    console.log('Quieres modificar una noticia' + noticia + ' ' + id);
  }



  // Metodo para mostrar un Toast
  // class: toastOk / toastNotOk
  async mostrarToast(mensaje: string, okOrNotOk: string) {
    const toast = await this.toastController.create(
      {
        message: mensaje,
        cssClass: okOrNotOk,
        duration: 2000
      });
    toast.present();
  }


}
