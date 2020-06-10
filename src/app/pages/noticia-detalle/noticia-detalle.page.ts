import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NoticiasService } from "src/app/shared/services/noticias-service/noticias.service";
import { Noticia } from "src/app/shared/models/noticia.model";

@Component({
  selector: "app-noticia-detalle",
  templateUrl: "./noticia-detalle.page.html",
  styleUrls: ["./noticia-detalle.page.scss"],
})
export class NoticiaDetallePage implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private noticiasService: NoticiasService
  ) {}

  noticia: Noticia = new Noticia();

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((param) => {
      let id = param.get("id");
      this.noticiasService.getNoticia(parseInt(id)).subscribe((response: Noticia) => {
        this.noticia = response;
      }, (error) => {
        console.log(error);
      });
    });
  }
}
