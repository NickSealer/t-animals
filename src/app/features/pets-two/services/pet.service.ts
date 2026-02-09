import { Injectable } from '@angular/core';
import { PetModel } from '../models/pet.model';
import { Species } from '../models/species';
import { Colors } from '../models/colors';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private species: string[] = Object.values(Species)
  private colors: string[] = Object.values(Colors)
  private ages: number[] = [1,2,5,8,10,6]
  private owner: boolean[] = [true, false]

  private pets: PetModel[] = Array.from({length: 10}, (_, idx) => 
    new PetModel(idx + 1, `Name ${idx}`, this.random(this.species), this.random(this.ages), this.random(this.owner), this.random(this.colors))
  )

  getPets(): PetModel[] {
    return this.pets.sort((a, b) => a.age - b.age)
  }

  toggle(pet: PetModel): void {
    pet.isOwned()
  }

  private random<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)]
  }

}
