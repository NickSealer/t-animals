import { Component } from '@angular/core';
import { PetModel } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pets-two',
  imports: [],
  templateUrl: './pets.html',
  styleUrl: './pets.scss',
})
export class Pets {
  pets: PetModel[] = []

  constructor(private petService: PetService) {
    this.pets = this.petService.getPets()
  }

  toggleOwned(pet: PetModel): void {
    this.petService.toggle(pet)
  }
}
