import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/base-http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { PetModel } from '../models/pet.model';
import { PetResponseListInterface, PetResponseObjectInterface } from '../interfaces/pet-response.interface';
import { PetInterface } from '../interfaces/pet.interface';

@Injectable({
  providedIn: 'root',
})
export class PetService extends BaseHttpService {
  private http = inject(HttpClient)
  private readonly url = `${environment.apiURL}/animals`

  async getPets(): Promise<PetModel[]> {
    const response =  await this.wrapper(this.http.get<PetResponseListInterface>(this.url))
    return response.animals.map(PetModel.fromDTO)
  }

  async getPet(id: number): Promise<PetModel | null>{
    const response = await this.wrapper(this.http.get<PetResponseObjectInterface>(`${this.url}/${id}`))
    return response.animal?.id ? PetModel.fromDTO(response.animal) : null
  }

  async createPet(pet: Partial<PetInterface>): Promise<PetModel> {
    const response = await this.wrapper(this.http.post<PetResponseObjectInterface>(this.url, pet))
    return PetModel.fromDTO(response.animal)
  }

  async updatePet(id: number, pet: Partial<PetInterface>): Promise<PetModel> {
    const response = await this.wrapper(this.http.put<PetResponseObjectInterface>(`${this.url}/${id}`, pet))
    return PetModel.fromDTO(response.animal)
  }

  async deletePet(id: number): Promise<boolean> {
    const response = await this.wrapper(this.http.delete<PetResponseObjectInterface>(`${this.url}/${id}`))
    return response.success
  }
}
