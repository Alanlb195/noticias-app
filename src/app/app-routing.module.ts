import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'listado-noticias',
    loadChildren: () => import('./pages/listado-noticias/listado-noticias.module').then( m => m.ListadoNoticiasPageModule)
  },
  {
    path: '',
    redirectTo: 'listado-noticias',
    pathMatch: 'full'
  },
  {
    path: 'noticia-detalle',
    loadChildren: () => import('./pages/noticia-detalle/noticia-detalle.module').then( m => m.NoticiaDetallePageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./pages/folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'agregar-noticia',
    loadChildren: () => import('./pages/agregar-noticia/agregar-noticia.module').then( m => m.AgregarNoticiaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
