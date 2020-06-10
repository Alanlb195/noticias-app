import { Component, OnInit } from "@angular/core";
import { AutorService } from "src/app/shared/services/autor-service/autor.service";
import { Autor } from "src/app/shared/models/autor.model";
import { Noticia } from "src/app/shared/models/noticia.model";
import { NoticiasService } from "src/app/shared/services/noticias-service/noticias.service";
import { LoadingController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-agregar-noticia",
  templateUrl: "./agregar-noticia.page.html",
  styleUrls: ["./agregar-noticia.page.scss"],
})
export class AgregarNoticiaPage implements OnInit {
  autores: Autor[] = new Array<Autor>();
  noticia: Noticia = new Noticia();

  constructor(
    public autorService: AutorService,
    public noticiaService: NoticiasService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    // To select the autor
    this.autorService.verAutores().subscribe((response: Autor[]) => {
      this.autores = response;
    });
  }

  async agregarNoticia() {
    // Loading...
    const loading = await this.loadingController.create({
      message: "Guardando noticia...",
      spinner: "bubbles",
    });
    await loading.present();

    this.noticiaService.createNoticia(this.noticia).subscribe(
      () => {
        this.loadingController.dismiss();
        this.mostrarToast("Noticia agregada", "toastOk");
        this.noticia = new Noticia;
      },
      () => {
        this.loadingController.dismiss();
        this.mostrarToast("Ha ocurrido un error: ", "toastNotOk");
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
}
