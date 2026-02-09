import { MovieInterface } from "../interfaces/movie.interface";

export class MovieModel implements MovieInterface {
  constructor(public readonly id: number, public name: string, public year: number, public gender: string){}

  get releasedYear(): string {
    return `Se estreno en el año ${this.year}`
  }

  get infoFicha(): string {
    return `${this.name.toUpperCase()} - Genero: ${this.gender}`
  }
}
