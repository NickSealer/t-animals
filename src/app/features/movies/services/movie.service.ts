import { Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { Genders } from '../models/genders';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private years: number[] = [2015, 2018, 2025, 1996, 1987, 2006, 2000]
  private genders: string[] = Object.values(Genders)

  private movies: MovieModel[] = Array.from({length: 6}, (_, idx) => 
    new MovieModel(idx + 1, `Película ${idx} random.`, this.random(this.years), this.random(this.genders))
  )

  getMovies(): MovieModel[] {
    return this.movies
  }

  orderedMovies(): MovieModel[] {
    return this.movies.sort((a, b) => a.year - b.year )
  }

  orderByName(): MovieModel[] {
    return this.movies.sort((a, b) => a.name.localeCompare(b.name))
  }

  findMovieById(id: number): MovieModel | undefined {
    return this.movies.find(m => m.id === id)
  }

  findMoviesByYear(year: number): MovieModel[] {
    return this.movies.filter(m => m.year === year)
  }

  private random<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)]
  }
}
