import { Pet } from "../interfaces/pet.interface"

export class PetModel implements Pet{
  constructor(public readonly id: number, public name: string, public specie: string, public age: number, public owned: boolean, public color: string){}

  get fullDescription(): string {
    return `${this.name} - (${this.specie} - ${this.age} años de color ${this.color})`
  }

  get birthYear(): number {
    return new Date().getFullYear() - this.age
  }

  isOwned(): void {
    this.owned = !this.owned
  }
}
