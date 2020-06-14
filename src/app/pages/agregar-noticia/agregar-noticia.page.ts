import { Component, OnInit } from "@angular/core";
import { AutorService } from "src/app/shared/services/autor-service/autor.service";
import { Autor } from "src/app/shared/models/autor.model";
import { Noticia } from "src/app/shared/models/noticia.model";
import { NoticiasService } from "src/app/shared/services/noticias-service/noticias.service";
import { LoadingController, ToastController } from "@ionic/angular";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-agregar-noticia",
  templateUrl: "./agregar-noticia.page.html",
  styleUrls: ["./agregar-noticia.page.scss"],
})
export class AgregarNoticiaPage implements OnInit {
  autores: Autor[] = new Array<Autor>();
  noticia: Noticia = new Noticia();
  editable: boolean;

  constructor(
    private autorService: AutorService,
    private noticiaService: NoticiasService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    // if there is a noticie recibed
    if (this.activatedRoute.snapshot.params.noticiaEditar != undefined) {
      this.noticia = JSON.parse(this.activatedRoute.snapshot.params.noticiaEditar);
      this.editable = true;
    } else {
      this.editable = false;
    }
    // To show all the authors to select one
    this.autorService.verAutores().subscribe((response: Autor[]) => {
      this.autores = response;
    });
  }

  async agregarNoticia() {
    const loading = await this.loadingController.create({
      message: "Guardando noticia...",
      spinner: "bubbles",
    });
    await loading.present();

    this.noticiaService.createNoticia(this.noticia).subscribe(
      () => {
        this.loadingController.dismiss();
        this.mostrarToast("Noticia agregada", "toastOk");
        this.cleanNoticia(this.noticia);
      },
      () => {
        this.loadingController.dismiss();
        this.mostrarToast("Ha ocurrido un error: ", "toastNotOk");
      }
    );
  }

  async editarNoticia() {
    const loading = await this.loadingController.create({
      message: "Guardando noticia...",
      spinner: "bubbles",
    });
    await loading.present();

    this.noticiaService.updateNoticia(this.noticia.noticiaId,this.noticia).subscribe(
      () => {
        this.loadingController.dismiss();
        this.mostrarToast("Noticia editada", "toastOk");
        this.cleanNoticia(this.noticia);
      },
      () => {
        this.loadingController.dismiss();
        this.mostrarToast("Ha ocurrido un error", "toastNotOk");
      }
    );
  }

  // Metodo para mostrar un Toast, class: toastOk / toastNotOk
  async mostrarToast(mensaje: string, okOrNotOk: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      cssClass: okOrNotOk,
      duration: 2000,
    });
    toast.present();
  }

  // Limpiar noticia
  async cleanNoticia(notice: Noticia) {
    notice.noticiaId == null,
      (notice.titulo = ""),
      (notice.descripcion = ""),
      (notice.contenido = ""),
      (notice.fecha = null),
      (notice.autor = null),
      (notice.autorId = null);
  }
}
