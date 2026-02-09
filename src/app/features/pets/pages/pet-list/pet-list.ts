import { Component, inject, signal } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { PetModel } from '../../models/pet.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pet-list',
  imports: [RouterLink],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.scss',
})
export class PetList {
  private petService = inject(PetService)
  
  pets = signal<PetModel[]>([])
  loading = signal(true)
  error = signal<string | null>(null)

  async ngOnInit() {
    try {
      const data = await this.petService.getPets()
      this.pets.set(data)
    } catch (error: any) {
      this.error.set(error)
    } finally {
      this.loading.set(false)
    }
  }
}
