import { Component, inject, signal } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { AnimalModel } from '../../models/animal.model';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-animal-list',
  imports: [RouterLink],
  templateUrl: './animal-list.html',
  styleUrl: './animal-list.scss',
})
export class AnimalList {
  private animalService = inject(AnimalService)
  authService = inject(AuthService)

  animals = signal<AnimalModel[]>([])
  loading = signal(true)
  error = signal<string | null>(null)

  async ngOnInit() {
    try {
      this.loading.set(true)
      const data = await this.animalService.getAnimals()
      this.animals.set(data)
    } catch (error: any) {
      this.error.set(error)
    } finally {
      this.loading.set(false)
    }
  }
}
