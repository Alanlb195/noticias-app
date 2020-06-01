import { Component, OnInit } from '@angular/core';
import { AutorService } from '../../shared/services/autor-service/autor.service';
import { Autor } from '../../shared/models/autor.model';
import { Noticia } from '../../shared/models/noticia.model';
import { NoticiasService } from '../../shared/services/noticias-service/noticias.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-noticia',
  templateUrl: './agregar-noticia.page.html',
  styleUrls: ['./agregar-noticia.page.scss'],
})
export class AgregarNoticiaPage implements OnInit {

  autores: Autor[] = new Array<Autor>();
  noticia: Noticia = new Noticia();

  constructor(public autorService: AutorService, public noticiaService: NoticiasService,
              public loadingController: LoadingController, public toastController: ToastController) { }

  ngOnInit() {
    this.autorService.verAutores().subscribe((arregloAutores) => {
      this.autores = arregloAutores;
    });
  }

  // Al hacer click en el boton agregar
  async agregarNoticia() {
    // Loading...
    const loading = await this.loadingController.create(
      {
        message: 'Guardando noticia...'
      });
    await loading.present();

    this.noticiaService.agregarNoticia(this.noticia).subscribe(() => {
      // Si se logro agragar la noticia
      this.loadingController.dismiss();
      this.mostrarToast('Noticia agregada', 'toastOk');
    },
      (error) => {
        // Si ocurrio un error
        this.loadingController.dismiss();
        this.mostrarToast('Ha ocurrido un error', 'toastNotOk');
        console.log(error);
      });
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
