export interface PetInterface {
  id: number,
  name: string,
  description: string,
  specie: string,
  lifetime: number,
  lifetimeUnit: number,
  diet: number
  user_id: number | null
  created_at: Date
  updated_at: Date
}
