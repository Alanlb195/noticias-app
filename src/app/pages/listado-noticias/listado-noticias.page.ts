import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NoticiasService } from "../../shared/services/noticias-service/noticias.service";
import { Noticia } from "../../shared/models/noticia.model";
import { LoadingController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-listado-noticias",
  templateUrl: "./listado-noticias.page.html",
  styleUrls: ["./listado-noticias.page.scss"],
})
export class ListadoNoticiasPage implements OnInit {
  noticias: Noticia[];

  constructor(
    public noticiasService: NoticiasService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public router: Router
  ) {}

  // Se cargan todas las noticias
  ngOnInit() {
    this.noticiasService.getNoticias().subscribe(
      (response: Noticia[]) => {
        this.noticias = response;
      },
      () => {
        this.mostrarToast(
          "Hubo un error al cargar las noticias",
          "toastNotOk"
        );
      }
    );
  }

  async eliminarNoticia(noticiaId: number, indice: number) {
    // Loading
    const loading = await this.loadingController.create({
      message: "Eliminando noticia...",
      spinner: "bubbles",
    });
    await loading.present();
    this.noticiasService.deleteNoticia(noticiaId).subscribe(
      () => {
        this.loadingController.dismiss();
        this.noticias.splice(indice, 1);
        this.mostrarToast("Noticia eliminada", "toastOk");
      },
      () => {
        this.loadingController.dismiss();
        this.mostrarToast("Ha ocurrido un error", "toastNotOk");
      }
    );
  }

  async noticiaDetalle(id: number) {
    await this.router.navigate(["/noticia-detalle", id]);
  }


  async agregarNoticia() {
    await this.router.navigateByUrl('/agregar-noticia');
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
