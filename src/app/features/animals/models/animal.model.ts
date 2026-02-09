import { AnimalInterface } from "../interfaces/animal.interface";
import { Diet, LifetimeUnit } from "./animal.enums";

export class AnimalModel {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string,
    public specie: string,
    public lifetime: number,
    public lifetimeUnit: number,
    public diet: number,
    public userId: number | null
  ) {}

  get fullDesc(): string {
    return `${this.name} (${this.specie}) - ${this.lifetime} ${this.lifetimeUnit}`
  }

  lifetimeUnitAsEnum(value: string | undefined): number {
    if (value === undefined) return 0

    return LifetimeUnit[`${value.slice(0,1).toUpperCase()}${value.slice(1)}` as keyof typeof LifetimeUnit]
  }

  dietAsEnum(value: string | undefined): number {
    if (value === undefined) return 0
    
    return Diet[`${value.slice(0,1).toUpperCase()}${value.slice(1)}` as keyof typeof Diet]
  }

  static fromDTO(dto: AnimalInterface): AnimalModel {
    return new AnimalModel(
      dto.id,
      dto.name,
      dto.description,
      dto.specie,
      dto.lifetime,
      dto.lifetimeUnit,
      dto.diet,
      dto.user_id
    )
  }
}
