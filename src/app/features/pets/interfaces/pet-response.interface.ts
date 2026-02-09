import { PetInterface } from "./pet.interface";

export interface PetResponseListInterface {
  animals: PetInterface[],
  metadata: {
    current_page: number,
    per_page: number,
    next_page: number | null,
    previous_page: number | null
    total_pages: number,
    total_entries: number
  }
}

export interface PetResponseObjectInterface {
  animal: PetInterface,
  success: boolean
}
