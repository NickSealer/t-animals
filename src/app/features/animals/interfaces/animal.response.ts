import { AnimalInterface } from "./animal.interface"

export interface AnimalResponseList {
  animals: AnimalInterface[],
  metadata: {
    current_page: number
    per_page: number
    next_page: number | null
    previous_page: number | null
    total_pages: number
    total_entries: number
  }
}

export interface AnimalResponseObject {
  animal: AnimalInterface,
  success: boolean
}