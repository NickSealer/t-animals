import { PetInterface } from "../interfaces/pet.interface"
import { PetDiet, PetLifeTimeUnit } from "./pet.enums"

export class PetModel {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string,
    public specie: string,
    public lifetime: number,
    public lifetimeUnit: number,
    public diet: number,
    public userId: number | null,
    public createAt: Date | null,
    public updatedAt: Date | null
  ){}

  get info(): string {
    return `Pet: ${this.name} - ${this.description}`
  }

  lifetimeUnitAsEnum(value: string | undefined): number {
    if (value === undefined) return 0
    return PetLifeTimeUnit[`${value.slice(0,1).toUpperCase()}${value.slice(1)}` as keyof typeof PetLifeTimeUnit]
  }

  dietAsEnum(value: string | undefined): number {
    if(value === undefined) return 0
    return PetDiet[`${value.slice(0,1).toUpperCase()}${value.slice(1)}` as keyof typeof PetDiet]
  }

  static fromDTO(dto: PetInterface): PetModel {
    return new PetModel(
      dto.id, dto.name, dto.description, dto.specie, dto.lifetime, dto.lifetimeUnit,
      dto.diet, dto.user_id, dto.created_at, dto.updated_at
    )
  }
}
