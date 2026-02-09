import { Component, Input } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {
  @Input() username: string = ''
  movies: MovieModel[] = []
  favMovie: string = ''

  constructor(private movieService: MovieService) {
    this.movies = movieService.orderedMovies()
  }

  favoriteMovie(name: string): void {
    this.favMovie = name;
  }
}
