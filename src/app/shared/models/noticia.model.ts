import { Autor } from './autor.model';

export class Noticia {
	noticiaId: number;
	titulo: string;
	descripcion: string;
	contenido: string;
	fecha: Date;
	autorId: number;
	autor: Autor;
}
